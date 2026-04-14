import axios from 'axios';

// Create an Axios instance with base URL configuration
const api = axios.create({
  // Use VITE_API_BASE_URL for production, empty string (relative paths) for local proxy
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
});

// Request interceptor: Attach JWT access token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle global errors like 401 Unauthorized
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear tokens
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // Redirect to login page
      // We use window.location here as we're outside a React component 
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
