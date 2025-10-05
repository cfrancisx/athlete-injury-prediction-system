import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import MonitoringIcon from './MonitoringIcon'; // Use our custom icon
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['admin', 'coach', 'medical_staff', 'athlete'] },
  { text: 'Athletes', icon: <PeopleIcon />, path: '/athletes', roles: ['admin', 'coach', 'medical_staff'] },
  { text: 'Real-time Monitoring', icon: <MonitoringIcon />, path: '/monitoring', roles: ['admin', 'coach', 'medical_staff'] },
  { text: 'Predictions', icon: <AnalyticsIcon />, path: '/predictions', roles: ['admin', 'coach', 'medical_staff', 'athlete'] },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile', roles: ['admin', 'coach', 'medical_staff', 'athlete'] },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings', roles: ['admin'] },
];

function Sidebar({ onItemClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    if (onItemClick) onItemClick();
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <Box>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
          🏃‍♂️ Athlete Safety
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Injury Prediction System
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'primary.main',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;