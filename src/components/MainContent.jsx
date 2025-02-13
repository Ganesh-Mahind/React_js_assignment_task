// src/components/MainContent.jsx
import React, { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import AccountTable from './AccountTable';
import CreateAccountForm from './CreateAccountForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../assets/create-logo.png'; // Your custom create logo image

export default function MainContent() {
  const [activeView, setActiveView] = useState('account'); // 'account' or 'create'

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <Button
          variant={activeView === 'account' ? 'contained' : 'outlined'}
          startIcon={<AccountCircleIcon />}
          onClick={() => handleViewChange('account')}
          sx={{ textTransform: 'none' }}
        >
          Account
        </Button>
        <Button
          variant={activeView === 'create' ? 'contained' : 'outlined'}
          startIcon={
            <Box
              component="img"
              src={Logo}
              alt="Create Logo"
              sx={{ width: 15, height: 15 }}
            />
          }
          onClick={() => handleViewChange('create')}
          sx={{ textTransform: 'none' }}
        >
          Create
        </Button>
      </Paper>
      {activeView === 'account' ? <AccountTable /> : <CreateAccountForm />}
    </Box>
  );
}
