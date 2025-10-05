import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

function Settings() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SettingsIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">
          System Settings
        </Typography>
      </Box>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          System Configuration
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure system settings, user permissions, and application preferences.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This section is under development.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Settings;