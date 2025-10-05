import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import MonitoringIcon from '../components/Common/MonitoringIcon';

function Monitoring() {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <MonitoringIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">
          Real-time Monitoring
        </Typography>
      </Box>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Live Athlete Monitoring
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor real-time biometric data, movement patterns, and injury risk indicators.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This section is under development.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Monitoring;