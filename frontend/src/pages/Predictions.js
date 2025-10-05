import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { Analytics as AnalyticsIcon } from '@mui/icons-material';

function Predictions() {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <AnalyticsIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">
          Injury Predictions
        </Typography>
      </Box>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          AI-Powered Risk Assessment
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View injury risk predictions, historical data, and preventive recommendations.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This section is under development.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Predictions;