import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
}

const dummyDeliveries = [
  {
    id: 1,
    delivery_number: 'DEL-2024-001',
    po_number: 'PO-2024-001',
    supplier: 'ABC Supplies',
    delivered_by: 'Rider Juan',
    status: 'Delivered',
    received_by: 'Maria Santos',
    created_at: '2024-06-02T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
  },
  {
    id: 2,
    delivery_number: 'DEL-2024-002',
    po_number: 'PO-2024-002',
    supplier: 'XYZ Trading',
    delivered_by: 'Rider Pedro',
    status: 'Pending',
    received_by: '',
    created_at: '2024-06-04T09:30:00Z',
    updated_at: '2024-06-11T08:45:00Z',
  },
  {
    id: 3,
    delivery_number: 'DEL-2024-003',
    po_number: 'PO-2024-003',
    supplier: 'SupplyPro Inc.',
    delivered_by: 'Rider Ana',
    status: 'In Transit',
    received_by: '',
    created_at: '2024-06-06T14:20:00Z',
    updated_at: '2024-06-11T10:00:00Z',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'In Transit':
      return 'primary';
    default:
      return 'default';
  }
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'delivery_number', headerName: 'Delivery #', width: 130 },
  { field: 'po_number', headerName: 'PO #', width: 110 },
  { field: 'supplier', headerName: 'Supplier', width: 150 },
  { field: 'delivered_by', headerName: 'Delivered By', width: 130 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip label={params.value} color={getStatusColor(params.value)} size="small" />
    ),
  },
  {
    field: 'received_by',
    headerName: 'Received By',
    width: 130,
    valueGetter: (params) => params.row?.received_by || '-',
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

function Delivery() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Deliveries
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dummyDeliveries}
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

export default Delivery;