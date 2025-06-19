import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

function Supply() {
  const [open, setOpen] = React.useState(false);

  // Dummy data
  const dummyData = [
    { id: 1, name: 'Item A', quantity: 10, supplier: 'Supplier X' },
    { id: 2, name: 'Item B', quantity: 5, supplier: 'Supplier Y' },
    { id: 3, name: 'Item C', quantity: 20, supplier: 'Supplier Z' },
  ];

  // DataGrid columns
  const columns = [
    { field: 'name', headerName: 'Supply Name', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
    { field: 'supplier', headerName: 'Supplier', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" size="small">
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Supply Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Supply
        </Button>
      </Box>

      <Box sx={{ height: 400, width: '100%', mb: 2 }}>
        <DataGrid
          rows={dummyData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          showToolbar
        />
      </Box>

      {/* Add/Edit Dialog (Design only, no function) */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Supply</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Supply Name" fullWidth />
          <TextField label="Quantity" type="number" fullWidth />
          <TextField label="Supplier" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" disabled>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Supply;
