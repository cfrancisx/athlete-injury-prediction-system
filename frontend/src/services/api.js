import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  getProfile: () => 
    api.get('/auth/profile')
};

export const dashboardService = {
  getDashboard: () => 
    api.get('/monitoring/dashboard'),
  
  getRealTimeData: (athleteId) => 
    api.get(`/monitoring/real-time/${athleteId}`)
};

export const predictionService = {
  assessRisk: (data) => 
    api.post('/predictions/risk-assessment', data),
  
  getPredictionHistory: (athleteId) => 
    api.get(`/predictions/history/${athleteId}`)
};

export const athleteService = {
  getAllAthletes: () => 
    api.get('/athletes'),
  
  getAthleteProfile: (athleteId) => 
    api.get(`/athletes/${athleteId}`),
  
  updateAthleteProfile: (athleteId, data) => 
    api.put(`/athletes/${athleteId}`, data)
};

export default api;