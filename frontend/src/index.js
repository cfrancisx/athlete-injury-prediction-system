import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

// Import main App component
import App from './App';

// Import error boundary
import ErrorBoundary from './components/ErrorBoundary';

// Import service worker (for PWA - optional)
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Import reporting vitals
import reportWebVitals from './reportWebVitals';

// Create theme for Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Blue
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed', // Purple
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    success: {
      main: '#10b981', // Green
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444', // Red
      light: '#f87171',
      dark: '#dc2626',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none', // Remove uppercase transformation
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals(console.log); // You can send this to analytics service

// Service worker registration (optional - for PWA)
serviceWorkerRegistration.register();

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Here you could send to your error tracking service
});

// Development helpers
if (process.env.NODE_ENV === 'development') {
  // Expose theme for development debugging
  window.MUI_THEME = theme;
  
  // Hot Module Replacement (HMR) for development
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      root.render(
        <React.StrictMode>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <BrowserRouter>
                <ErrorBoundary>
                  <NextApp />
                </ErrorBoundary>
              </BrowserRouter>
            </ThemeProvider>
          </StyledEngineProvider>
        </React.StrictMode>
      );
    });
  }
}