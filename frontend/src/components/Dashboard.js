import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Box
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import RiskChart from './RiskChart';
import RealTimeMetrics from './RealTimeMetrics';
import AlertsPanel from './AlertsPanel';
import { dashboardService } from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await dashboardService.getDashboard();
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'info';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return <ErrorIcon />;
      case 'medium': return <WarningIcon />;
      case 'low': return <CheckIcon />;
      default: return <CheckIcon />;
    }
  };

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Overall Risk Score */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overall Injury Risk
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" my={2}>
                {getRiskIcon(dashboardData?.current_risk?.risk_level)}
                <Typography
                  variant="h3"
                  color={`${getRiskColor(dashboardData?.current_risk?.risk_level)}.main`}
                  sx={{ ml: 2 }}
                >
                  {dashboardData?.current_risk?.risk_score || 0}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                color={`${getRiskColor(dashboardData?.current_risk?.risk_level)}.main`}
                align="center"
              >
                {dashboardData?.current_risk?.risk_level?.toUpperCase() || 'LOW'} RISK
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Real-time Metrics */}
        <Grid item xs={12} md={8}>
          <RealTimeMetrics metrics={dashboardData?.real_time_metrics} />
        </Grid>

        {/* Risk Trend Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Risk Trend (Last 7 Days)
            </Typography>
            <RiskChart data={dashboardData?.risk_trend} />
          </Paper>
        </Grid>

        {/* Alerts Panel */}
        <Grid item xs={12}>
          <AlertsPanel alerts={dashboardData?.alerts} />
        </Grid>

        {/* Training Load */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Training Load Management
            </Typography>
            {/* Training load components will go here */}
          </Paper>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            {dashboardData?.recommendations?.map((rec, index) => (
              <Alert key={index} severity="info" sx={{ mb: 1 }}>
                {rec}
              </Alert>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;