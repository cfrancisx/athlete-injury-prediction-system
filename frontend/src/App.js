import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Athletes from './pages/Athletes';
import Monitoring from './pages/Monitoring';
import Predictions from './pages/Predictions';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Styles
import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return !user ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="athletes" element={<Athletes />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="predictions" element={<Predictions />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;