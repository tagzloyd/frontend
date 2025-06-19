import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const stocksData = [
  {
    id: 1,
    name: 'Item A',
    available: 50,
    taken: 20,
    pending: 10,
    status: 'Available'
  },
  {
    id: 2,
    name: 'Item B',
    available: 15,
    taken: 5,
    pending: 8,
    status: 'Low'
  },
  {
    id: 3,
    name: 'Item C',
    available: 0,
    taken: 30,
    pending: 20,
    status: 'Out of Stock'
  }
];

// Status color helper
const getStatusColor = (status) => {
  switch (status) {
    case 'Available':
      return 'success';
    case 'Low':
      return 'warning';
    case 'Out of Stock':
      return 'error';
    default:
      return 'default';
  }
};

const columns = [
  { field: 'name', headerName: 'Supply Name', flex: 1 },
  { field: 'available', headerName: 'Available', type: 'number', flex: 1 },
  { field: 'taken', headerName: 'Taken', type: 'number', flex: 1 },
  { field: 'pending', headerName: 'Pending', type: 'number', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <Chip label={params.value} color={getStatusColor(params.value)} size="small" />
    ),
  },
];

function Stocks() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Stocks Report
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Overview of available, taken, and pending stocks for each supply item.
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={stocksData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          showToolbar
        />
      </Box>
    </Box>
  );
}

export default Stocks;