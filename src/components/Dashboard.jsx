// src/components/Dashboard.jsx
import React from 'react';
import { Box } from '@mui/material';
import LeftNavbar from './LeftNavbar';
import MainContent from './MainContent';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <LeftNavbar />
      <MainContent />
    </Box>
  );
}
