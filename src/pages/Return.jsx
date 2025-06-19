import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
}

const dummyReturns = [
  {
    id: 1,
    return_number: 'RET-2024-001',
    item: 'Printer Ink',
    quantity: 2,
    reason: 'Defective',
    status: 'Pending',
    requested_by: 'Juan Dela Cruz',
    created_at: '2024-06-07T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
  },
  {
    id: 2,
    return_number: 'RET-2024-002',
    item: 'Bond Paper',
    quantity: 1,
    reason: 'Wrong item',
    status: 'Approved',
    requested_by: 'Maria Santos',
    created_at: '2024-06-08T09:30:00Z',
    updated_at: '2024-06-11T08:45:00Z',
  },
  {
    id: 3,
    return_number: 'RET-2024-003',
    item: 'Stapler',
    quantity: 1,
    reason: 'Damaged',
    status: 'Completed',
    requested_by: 'Pedro Reyes',
    created_at: '2024-06-09T14:20:00Z',
    updated_at: '2024-06-11T10:00:00Z',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Approved':
      return 'primary';
    case 'Completed':
      return 'success';
    default:
      return 'default';
  }
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'return_number', headerName: 'Return #', width: 130 },
  { field: 'item', headerName: 'Item', width: 130 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
  { field: 'reason', headerName: 'Reason', width: 120 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip label={params.value} color={getStatusColor(params.value)} size="small" />
    ),
  },
  { field: 'requested_by', headerName: 'Requested By', width: 140 },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 160,
    valueGetter: (params) => params.row?.created_at ? formatDate(params.row.created_at) : '',
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 160,
    valueGetter: (params) => params.row?.updated_at ? formatDate(params.row.updated_at) : '',
  },
];

function Return() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Returns
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dummyReturns}
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

export default Return;