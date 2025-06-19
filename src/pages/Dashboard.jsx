import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from '@toolpad/core/Account';
import Supply from './Supply';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import InventoryReport from './InventoryReport';
import Stocks from './Stocks';
import Users from './Users';
import Supplier from './Supplier';
import PurchaseOrder from './PurchaseOrder';
import Request from './Request';
import Delivery from './Delivery';
import Return from './Return';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

// === BASE PATH CONFIG ======
const BASE_PATH = '/IMS';

// Branding configuration - simplified for Toolpad compatibility
const BRANDING = { segment: 'ims', title: 'INVENTORY MANAGEMENT SYSTEM' };

// Navigation configuration - simplified for Toolpad compatibility
const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'supply', title: 'Supply', icon: <ShoppingCartIcon /> },
  { segment: 'suppliers', title: 'Suppliers', icon: <PeopleIcon /> },
  { segment: 'purchase-orders', title: 'Purchase Orders', icon: <ReceiptIcon /> },
  { segment: 'requests', title: 'Requests', icon: <AssignmentIcon /> },
  { segment: 'deliveries', title: 'Deliveries', icon: <LocalShippingIcon /> },
  { segment: 'returns', title: 'Returns', icon: <ReplayIcon /> },

  { kind: 'header', title: 'Administration' },
  { segment: 'users', title: 'Users', icon: <GroupIcon /> },
  { segment: 'audit-logs', title: 'Audit Logs', icon: <HistoryIcon /> },

  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      { segment: 'inventory', title: 'Inventory Report', icon: <DescriptionIcon /> },
      { segment: 'stocks', title: 'Stocks Report', icon: <DescriptionIcon /> },
      { segment: 'sales', title: 'Sales Report', icon: <DescriptionIcon /> },
      { segment: 'trends', title: 'Purchase Trends', icon: <BarChartIcon /> },
      { segment: 'usage', title: 'Usage Statistics', icon: <BarChartIcon /> },
      { segment: 'returns-analysis', title: 'Returns Analysis', icon: <BarChartIcon /> },
    ],
  },
];

function getDesignTokens(mode) {
  return {
    palette: {
      mode,
      primary: { main: '#3B5DE7' }, // Datta Able blue
      secondary: { main: '#6C757D' },
      background: {
        default: mode === 'light' ? '#F6F8FB' : '#23272F',
        paper: mode === 'light' ? '#fff' : '#2C313A',
        sidebar: mode === 'light' ? '#2B3A55' : '#181C25',
      },
      text: {
        primary: mode === 'light' ? '#222B45' : '#F6F8FB',
        secondary: mode === 'light' ? '#6C757D' : '#A3AED0',
      },
      success: { main: '#00E096' },
      error: { main: '#FF3D71' },
      warning: { main: '#FFAA00' },
      info: { main: '#3B5DE7' },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0 2px 12px 0 rgba(60,72,88,0.08)'
              : '0 2px 12px 0 rgba(0,0,0,0.32)',
          },
        },
      },
    },
  };
}

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  open: PropTypes.bool,
};

function SidebarFooterAccountPopover({ user, handleLogout }) {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        {user.role || 'User'}
      </Typography>
      <MenuList>
        <MenuItem
          component="button"
          sx={{
            justifyContent: 'flex-start',
            width: '100%',
            columnGap: 2,
          }}
        >
          <ListItemIcon>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.95rem',
              }}
            >
              {user?.first_name?.[0] || ''}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
            }}
            primary={`${user.first_name} ${user.last_name}`}
            secondary={user.email}
            primaryTypographyProps={{ variant: 'body2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </MenuItem>
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton onClick={handleLogout} />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini, user, handleLogout }) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: (props) => <SidebarFooterAccountPopover {...props} user={user} handleLogout={handleLogout} />,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

// Dashboard Content Components
function DashboardHome() {
  const theme = useTheme();

  const summary = [
    {
      label: 'Total Items',
      value: 1520,
      change: '+3%',
      changeColor: theme.palette.success.main,
      icon: <Inventory2Icon color="primary" fontSize="large" />,
    },
    {
      label: 'Low Stock',
      value: 24,
      change: '-2%',
      changeColor: theme.palette.error.main,
      icon: <BatteryAlertIcon color="warning" fontSize="large" />,
    },
    {
      label: 'Out of Stock',
      value: 5,
      change: '+1%',
      changeColor: theme.palette.error.main,
      icon: <RemoveShoppingCartIcon color="error" fontSize="large" />,
    },
    {
      label: 'Suppliers',
      value: 18,
      change: '+2%',
      changeColor: theme.palette.success.main,
      icon: <PeopleIcon color="info" fontSize="large" />,
    },
    {
      label: 'Pending Orders',
      value: 12,
      change: '+4%',
      changeColor: theme.palette.warning.main,
      icon: <ReceiptIcon color="secondary" fontSize="large" />,
    },
    {
      label: 'Deliveries Today',
      value: 7,
      change: '+1%',
      changeColor: theme.palette.success.main,
      icon: <LocalShippingIcon color="success" fontSize="large" />,
    },
  ];

  // Inventory activity data (for line chart)
  const activityData = [
    { name: 'Jun 10', Received: 30 },
    { name: 'Jun 11', Received: 22 },
    { name: 'Jun 12', Received: 18 },
    { name: 'Jun 13', Received: 27 },
    { name: 'Jun 14', Received: 35 },
    { name: 'Jun 15', Received: 40 },
    { name: 'Jun 16', Received: 25 },
  ];

  // Recent inventory movements (table)
  const devActivity = [
    { user: 'John Dela Cruz', avatar: '', commit: 'Received 50 units of Printer Ink', date: 'June 15, 2025' },
    { user: 'Maria Santos', avatar: '', commit: 'Issued 10 units of Bond Paper', date: 'June 14, 2025' },
    { user: 'Pedro Reyes', avatar: '', commit: 'Returned 5 units of Toner', date: 'June 13, 2025' },
  ];

  // Donut/pie chart data (example: stock status)
  const donutData = [
    { name: 'In Stock', value: 1200 },
    { name: 'Low Stock', value: 200 },
    { name: 'Out of Stock', value: 120 },
  ];
  const pieData = [
    { name: 'Office Supplies', value: 800 },
    { name: 'Electronics', value: 400 },
    { name: 'Cleaning', value: 200 },
    { name: 'Others', value: 120 },
  ];

  const chartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
  ];

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h5" gutterBottom color="text.primary">
        Dashboard
      </Typography>
      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {summary.map((item, idx) => (
          <Paper
            key={item.label}
            sx={{
              flex: '1 1 150px',
              p: 2,
              minWidth: 150,
              textAlign: 'center',
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              boxShadow: theme.shadows[1],
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mb: 1 }}>{item.icon}</Box>
            <Typography variant="h6">{item.value}</Typography>
            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
            <Typography variant="caption" sx={{ color: item.changeColor }}>
              {item.change}
            </Typography>
          </Paper>
        ))}
      </Box>
      {/* Second Row */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {/* Inventory Activity */}
        <Paper sx={{
          flex: '2 1 400px',
          p: 2,
          minWidth: 350,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}>
          <Typography variant="subtitle1" gutterBottom>Inventory Movements</Typography>
          <LineChart width={320} height={80} data={activityData}>
            <Line type="monotone" dataKey="Received" stroke={theme.palette.primary.main} strokeWidth={2} />
          </LineChart>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {devActivity.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell width={40}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main, color: theme.palette.getContrastText(theme.palette.secondary.main) }}>
                        {row.user.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                    </TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>{row.commit}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* Charts */}
        <Box sx={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="subtitle2">Stock Status</Typography>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={35} outerRadius={50}>
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="subtitle2">Category Distribution</Typography>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={50} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>
      {/* Third Row */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper sx={{
          flex: '1 1 250px',
          p: 2,
          minWidth: 200,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}>
          <Typography variant="subtitle2">New Deliveries</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>+3</Typography>
        </Paper>
        <Paper sx={{
          flex: '1 1 250px',
          p: 2,
          minWidth: 200,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}>
          <Typography variant="subtitle2">Items Issued Today</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>+15</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

function stripBasePath(pathname) {
  // Remove base path from pathname for internal routing
  if (pathname.startsWith(BASE_PATH)) {
    return pathname.slice(BASE_PATH.length) || '/';
  }
  return pathname;
}
function withBasePath(path) {
  // Ensure path starts with /
  const clean = path.startsWith('/') ? path : '/' + path;
  // Don't double BASE_PATH
  if (clean.startsWith(BASE_PATH)) return clean;
  return BASE_PATH + clean;
}

function DashboardContent({ pathname, user }) {
  // Normalize pathname by removing leading/trailing slashes and splitting
  const normalizedPath = pathname.replace(/^\/|\/$/g, '');
  const pathSegments = normalizedPath.split('/');

  switch (pathSegments[0]) {
    case 'dashboard':
      return <DashboardHome user={user} />;
    case '':
      return <DashboardHome user={user} />; // Default dashboard view
    case 'supply':
      return <Supply />;
    case 'suppliers':
      return <Supplier />;
    case 'purchase-orders':
      return <PurchaseOrder />;
    case 'requests':
      return <Request />;
    case 'deliveries':
      return <Delivery />;
    case 'returns':
      return <Return />;
    case 'reports':
      if (pathSegments[1] === 'inventory') {
        return <InventoryReport />;
      }
      if (pathSegments[1] === 'stocks') {
        return <Stocks />;
      }
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h4">Select a report</Typography>
        </Box>
      );
    case 'users':
      return <Users />;
    default:
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h4">Page not found</Typography>
          <Typography variant="body1">The requested page doesn't exist.</Typography>
        </Box>
      );
  }
}

// Main Dashboard Component
function Dashboard() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Initialize pathname from current URL, removing BASE_PATH, or default to '/dashboard'
  const [pathname, setPathname] = React.useState(() => {
    const stripped = stripBasePath(window.location.pathname);
    return stripped === '/' ? 'dashboard' : stripped.replace(/^\/+/g, '');
  });

  // Set page title based on pathname
  useEffect(() => {
    let pageTitle = 'Dashboard';
    if (pathname === 'dashboard') pageTitle = 'Dashboard';
    else if (pathname === '') pageTitle = 'INVENTORY MANAGEMENT SYSTEM';
    else if (pathname === 'supply') pageTitle = 'Supply';
    else if (pathname === 'suppliers') pageTitle = 'Suppliers';
    else if (pathname === 'purchase-orders') pageTitle = 'Purchase Orders';
    else if (pathname === 'requests') pageTitle = 'Requests';
    else if (pathname === 'deliveries') pageTitle = 'Deliveries';
    else if (pathname === 'returns') pageTitle = 'Returns';
    else if (pathname === 'users') pageTitle = 'Users';
    else if (pathname === 'reports/sales') pageTitle = 'Sales Report';
    else if (pathname === 'reports/trends') pageTitle = 'Purchase Trends';
    else if (pathname === 'reports/usage') pageTitle = 'Usage Statistics';
    else if (pathname === 'reports/returns-analysis') pageTitle = 'Returns Analysis';
    else if (pathname === 'reports/inventory') pageTitle = 'Inventory Report';
    else if (pathname === 'reports/stocks') pageTitle = 'Stocks Report';
    else pageTitle = 'Inventory Supply Project';
    document.title = pageTitle + ' | Inventory Supply Project';
  }, [pathname]);

  // Enhanced router implementation
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(window.location.search),
      navigate: (path) => {
        const nextPath = path.startsWith('/') ? path : `/${path}`;
        setPathname(nextPath.replace(/^\/+/g, ''));
        window.history.pushState({}, '', withBasePath(nextPath));
      },
    };
  }, [pathname]);

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setPathname(stripBasePath(window.location.pathname).replace(/^\/+/g, '') || 'dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          setNotification({
            open: true,
            message: 'Session expired. Please log in again.',
            severity: 'warning'
          });
          setTimeout(() => navigate(withBasePath('/login')), 1500);
        }
      }
    };

    fetchUser();
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        }
      });
      localStorage.removeItem('auth_token');
      setNotification({
        open: true,
        message: 'Logout successful! Redirecting...',
        severity: 'success'
      });
      setTimeout(() => navigate(withBasePath('/login')), 1500);
    } catch (error) {
      console.error('Logout error:', error);
      setNotification({
        open: true,
        message: 'Logout failed. Please try again.',
        severity: 'error'
      });

      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        setTimeout(() => navigate(withBasePath('/login')), 1500);
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const session = React.useMemo(() => ({
    user: {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      avatar: user.first_name?.[0] || '',
    },
  }), [user]);

  const authentication = React.useMemo(() => ({
    signIn: () => navigate(withBasePath('/login')),
    signOut: handleLogout,
  }), [navigate]);

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
        <ThemeSwitcher mode={mode} toggleMode={toggleMode} />
        <AppProvider
          branding={BRANDING}
          navigation={NAVIGATION}
          router={router}
          theme={theme}
          authentication={authentication}
          session={session}
        >
          <DashboardLayout
            slots={{
              toolbarAccount: () => null,
              sidebarFooter: (props) => (
                <SidebarFooterAccount
                  {...props}
                  user={user}
                  handleLogout={handleLogout}
                />
              ),
            }}
          >
            <DashboardContent pathname={pathname} user={user} />
          </DashboardLayout>

          <Snackbar
            open={notification.open}
            autoHideDuration={6000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseNotification}
              severity={notification.severity}
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </AppProvider>
      </Box>
      <Box sx={{ position: 'absolute', top: 16, right: 24, zIndex: 1201 }}>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;