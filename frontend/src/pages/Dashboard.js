import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { monitoringService } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorDisplay from '../components/Common/ErrorDisplay';

function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // For now, use mock data since the backend might not be ready
      const mockData = {
        current_risk: {
          risk_score: 25.5,
          risk_level: 'low',
          last_updated: '2024-01-15T10:30:00Z'
        },
        real_time_metrics: {
          heart_rate: 72,
          heart_rate_variability: 65,
          training_load: 345,
          fatigue_level: 2
        },
        risk_trend: [
          { date: '2024-01-10', score: 20 },
          { date: '2024-01-11', score: 22 },
          { date: '2024-01-12', score: 25 },
          { date: '2024-01-13', score: 24 },
          { date: '2024-01-14', score: 26 },
          { date: '2024-01-15', score: 25 }
        ],
        alerts: [
          {
            type: 'info',
            message: 'Training load within safe limits',
            timestamp: '2024-01-15T09:00:00Z'
          }
        ],
        recommendations: [
          'Maintain current training intensity',
          'Ensure 8 hours of sleep',
          'Stay hydrated during sessions'
        ]
      };
      setDashboardData(mockData);
      
      // Uncomment when backend is ready:
      // const response = await monitoringService.getDashboard();
      // setDashboardData(response.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
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
      case 'high': return <WarningIcon />;
      case 'medium': return <WarningIcon />;
      case 'low': return <CheckCircleIcon />;
      default: return <CheckCircleIcon />;
    }
  };

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;
  if (error) return <ErrorDisplay message={error} onRetry={loadDashboardData} />;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Welcome back, {user?.first_name}!
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Risk Overview */}
        <Grid item xs={12} md={3}>
          <Card className="card-hover">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: `${getRiskColor(dashboardData?.current_risk?.risk_level)}.light`,
                    color: `${getRiskColor(dashboardData?.current_risk?.risk_level)}.main`,
                    mr: 2,
                  }}
                >
                  {getRiskIcon(dashboardData?.current_risk?.risk_level)}
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Current Risk
                  </Typography>
                  <Typography variant="h6" component="div">
                    {dashboardData?.current_risk?.risk_level?.toUpperCase() || 'LOW'}
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={dashboardData?.current_risk?.risk_score || 0}
                color={getRiskColor(dashboardData?.current_risk?.risk_level)}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Score: {dashboardData?.current_risk?.risk_score || 0}/100
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Training Load */}
        <Grid item xs={12} md={3}>
          <Card className="card-hover">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    mr: 2,
                  }}
                >
                  <TrendingUpIcon />
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Training Load
                  </Typography>
                  <Typography variant="h6" component="div">
                    {dashboardData?.real_time_metrics?.training_load || 0}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Optimal Range
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Heart Rate */}
        <Grid item xs={12} md={3}>
          <Card className="card-hover">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'secondary.light',
                    color: 'secondary.main',
                    mr: 2,
                  }}
                >
                  <PeopleIcon />
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Heart Rate
                  </Typography>
                  <Typography variant="h6" component="div">
                    {dashboardData?.real_time_metrics?.heart_rate || 0} BPM
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Resting: 60-100 BPM
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Fatigue Level */}
        <Grid item xs={12} md={3}>
          <Card className="card-hover">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'warning.light',
                    color: 'warning.main',
                    mr: 2,
                  }}
                >
                  <WarningIcon />
                </Box>
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    Fatigue Level
                  </Typography>
                  <Typography variant="h6" component="div">
                    {dashboardData?.real_time_metrics?.fatigue_level || 0}/10
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(dashboardData?.real_time_metrics?.fatigue_level || 0) * 10}
                color="warning"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alerts and Recommendations */}
      <Grid container spacing={3}>
        {/* Alerts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Alerts
            </Typography>
            {dashboardData?.alerts?.length > 0 ? (
              dashboardData.alerts.map((alert, index) => (
                <Alert
                  key={index}
                  severity={alert.type}
                  sx={{ mb: 1 }}
                >
                  {alert.message}
                </Alert>
              ))
            ) : (
              <Typography color="text.secondary">
                No recent alerts
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            {dashboardData?.recommendations?.length > 0 ? (
              <Box component="ul" sx={{ pl: 2 }}>
                {dashboardData.recommendations.map((rec, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {rec}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                No recommendations at this time
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;