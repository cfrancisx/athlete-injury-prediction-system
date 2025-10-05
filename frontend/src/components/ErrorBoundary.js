import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Here you could send the error to your error tracking service
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fef7cd 100%)'
            }}
          >
            <WarningIcon sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
            
            <Typography variant="h4" gutterBottom color="warning.dark">
              Oops! Something went wrong
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              The application encountered an unexpected error. Our team has been notified.
            </Typography>

            <Box sx={{ mt: 3, mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="caption" component="pre" sx={{ textAlign: 'left', overflow: 'auto' }}>
                {this.state.error && this.state.error.toString()}
              </Typography>
            </Box>

            <Box sx={{ gap: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.handleReload}
                size="large"
              >
                Reload Page
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={this.handleGoHome}
                size="large"
              >
                Go to Home
              </Button>
            </Box>

            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="h6" gutterBottom>
                  Error Stack (Development):
                </Typography>
                <Typography 
                  variant="caption" 
                  component="pre" 
                  sx={{ 
                    bgcolor: 'grey.100', 
                    p: 2, 
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.75rem'
                  }}
                >
                  {this.state.errorInfo.componentStack}
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;