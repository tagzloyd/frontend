import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export default function InventoryReport({ rows = [], loading = false }) {
  // Define your columns for inventory
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'item', headerName: 'Item', width: 180 },
    { field: 'category', headerName: 'Category', width: 140 },
    { field: 'quantity', headerName: 'Quantity', width: 120, type: 'number' },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'supplier', headerName: 'Supplier', width: 160 },
    // Add more columns as needed
  ];

  // Dummy date filter state (no function)
  const [date, setDate] = React.useState('');
  // Example rows (replace with your API data)
  const data = [
    { id: 1, item: 'Printer Ink', category: 'Office Supplies', quantity: 50, status: 'In Stock', supplier: 'ABC Corp' },
    { id: 2, item: 'Laptop', category: 'Electronics', quantity: 30, status: 'In Stock', supplier: 'XYZ Ltd' },
    { id: 3, item: 'Office Chair', category: 'Furniture', quantity: 20, status: 'Out of Stock', supplier: 'Furniture Co' },
    { id: 4, item: 'Projector', category: 'Electronics', quantity: 15, status: 'In Stock', supplier: 'Tech Supplies' },
    { id: 5, item: 'Whiteboard', category: 'Office Supplies', quantity: 10, status: 'In Stock', supplier: 'Office Goods' },
    { id: 6, item: 'Desk Lamp', category: 'Furniture', quantity: 25, status: 'In Stock', supplier: 'Lighting Solutions' },
    { id: 7, item: 'Keyboard', category: 'Electronics', quantity: 100, status: 'In Stock', supplier: 'Tech Gear' }, 
    { id: 8, item: 'Mouse', category: 'Electronics', quantity: 80, status: 'In Stock', supplier: 'Tech Gear' },
    { id: 9, item: 'Monitor', category: 'Electronics', quantity: 40, status: 'In Stock', supplier: 'Display World' },
    { id: 10, item: 'USB Drive', category: 'Electronics', quantity: 200, status: 'In Stock', supplier: 'Storage Solutions' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Inventory Report</Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          disabled
        >
          Export
        </Button>
      </Stack>
      <Box sx={{ mb: 2, maxWidth: 220 }}>
        <TextField
          label="Filter by Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={() => {}}
          fullWidth
        />
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          loading={loading}
          showToolbar
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          
        />
      </div>
    </Box>
  );
}
