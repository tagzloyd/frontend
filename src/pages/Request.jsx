import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
}

const dummyRequests = [
  {
    id: 1,
    request_number: 'REQ-2024-001',
    requested_by: 'Juan Dela Cruz',
    item: 'Printer Ink',
    quantity: 5,
    status: 'Pending',
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
  },
  {
    id: 2,
    request_number: 'REQ-2024-002',
    requested_by: 'Maria Santos',
    item: 'Bond Paper',
    quantity: 10,
    status: 'Approved',
    created_at: '2024-06-03T09:30:00Z',
    updated_at: '2024-06-11T08:45:00Z',
  },
  {
    id: 3,
    request_number: 'REQ-2024-003',
    requested_by: 'Pedro Reyes',
    item: 'Stapler',
    quantity: 2,
    status: 'Completed',
    created_at: '2024-06-05T14:20:00Z',
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
  { field: 'request_number', headerName: 'Request #', width: 130 },
  { field: 'requested_by', headerName: 'Requested By', width: 140 },
  { field: 'item', headerName: 'Item', width: 130 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip label={params.value} color={getStatusColor(params.value)} size="small" />
    ),
  },
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

function Request() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Requests
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dummyRequests}
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

export default Request;