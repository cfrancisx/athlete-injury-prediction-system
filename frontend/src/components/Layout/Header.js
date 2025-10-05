import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider  // ADD THIS IMPORT
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  Settings,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={onMenuClick}
        sx={{ mr: 2, display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Athlete Safety System
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Notifications */}
        <IconButton color="inherit" onClick={handleNotificationsOpen}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleNotificationsClose}
        >
          <MenuItem onClick={handleNotificationsClose}>
            <ListItemText 
              primary="New risk assessment available" 
              secondary="5 minutes ago" 
            />
          </MenuItem>
          <MenuItem onClick={handleNotificationsClose}>
            <ListItemText 
              primary="Training session completed" 
              secondary="1 hour ago" 
            />
          </MenuItem>
          <MenuItem onClick={handleNotificationsClose}>
            <ListItemText 
              primary="System update available" 
              secondary="2 hours ago" 
            />
          </MenuItem>
        </Menu>

        {/* Profile menu */}
        <IconButton onClick={handleProfileMenuOpen} color="inherit">
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </Avatar>
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider /> {/* This was causing the error */}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
}

export default Header;