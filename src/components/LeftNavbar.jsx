// src/components/LeftNavbar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';

export default function LeftNavbar() {
  const menuItems = [
    'Dashboard',
    'Account',
    'Accounts',
    'Account Report',
    'Account Upload',
    
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#DAF7A6',
          color: 'black',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
