import React from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

function ErrorDisplay({ 
  message = 'Something went wrong', 
  onRetry, 
  severity = 'error',
  showRetry = true 
}) {
  return (
    <Box sx={{ p: 2 }}>
      <Alert 
        severity={severity}
        action={
          showRetry && onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              <RefreshIcon sx={{ mr: 1 }} />
              Retry
            </Button>
          )
        }
      >
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
        {severity === 'error' && (
          <Typography variant="body2">
            Please try again or contact support if the problem persists.
          </Typography>
        )}
      </Alert>
    </Box>
  );
}

export default ErrorDisplay;