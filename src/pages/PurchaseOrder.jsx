import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
}

const dummyPurchaseOrders = [
  {
    id: 1,
    po_number: 'PO-2024-001',
    supplier: 'ABC Supplies',
    total_amount: 15000,
    status: 'Pending',
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
  },
  {
    id: 2,
    po_number: 'PO-2024-002',
    supplier: 'XYZ Trading',
    total_amount: 22000,
    status: 'Approved',
    created_at: '2024-06-03T09:30:00Z',
    updated_at: '2024-06-11T08:45:00Z',
  },
  {
    id: 3,
    po_number: 'PO-2024-003',
    supplier: 'SupplyPro Inc.',
    total_amount: 8000,
    status: 'Delivered',
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
    case 'Delivered':
      return 'success';
    default:
      return 'default';
  }
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'po_number', headerName: 'PO Number', width: 130 },
  { field: 'supplier', headerName: 'Supplier', width: 160 },
  {
    field: 'total_amount',
    headerName: 'Total Amount',
    width: 140,
    valueGetter: (params) =>
      params.row?.total_amount !== undefined
        ? `₱${params.row.total_amount.toLocaleString()}`
        : '',
  },
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

function PurchaseOrder() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Purchase Orders
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dummyPurchaseOrders}
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

export default PurchaseOrder;