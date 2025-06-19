import React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
}

const dummySuppliers = [
  {
    id: 1,
    name: 'ABC Supplies',
    contact_person: 'Juan Dela Cruz',
    email: 'abc@supplies.com',
    phone: '0917-123-4567',
    address: '123 Main St, Cebu City',
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
  },
  {
    id: 2,
    name: 'XYZ Trading',
    contact_person: 'Maria Santos',
    email: 'xyz@trading.com',
    phone: '0918-987-6543',
    address: '456 Market Ave, Mandaue City',
    created_at: '2024-06-03T09:30:00Z',
    updated_at: '2024-06-11T08:45:00Z',
  },
  {
    id: 3,
    name: 'SupplyPro Inc.',
    contact_person: 'Pedro Reyes',
    email: 'info@supplypro.com',
    phone: '0920-555-1234',
    address: '789 Commerce Rd, Lapu-Lapu City',
    created_at: '2024-06-05T14:20:00Z',
    updated_at: '2024-06-11T10:00:00Z',
  },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'contact_person', headerName: 'Contact Person', width: 160 },
  { field: 'email', headerName: 'Email', width: 180 },
  { field: 'phone', headerName: 'Phone', width: 140 },
  { field: 'address', headerName: 'Address', width: 200 },
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

function Supplier() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Suppliers
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dummySuppliers.filter(Boolean)}
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

export default Supplier;