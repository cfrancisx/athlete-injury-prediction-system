import React from 'react';
import { Container, Typography, Paper, Box, Avatar, Grid } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <PersonIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">
          User Profile
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {user?.email}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                px: 2, 
                py: 0.5, 
                bgcolor: 'primary.light', 
                color: 'primary.contrastText',
                borderRadius: 1,
                textTransform: 'capitalize'
              }}
            >
              {user?.role}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This section is under development. More profile features coming soon.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;