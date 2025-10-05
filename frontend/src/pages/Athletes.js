import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';

function Athletes() {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <PeopleIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">
          Athlete Management
        </Typography>
      </Box>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Athlete Management Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage athlete profiles, training sessions, and performance data.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This section is under development.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Athletes;