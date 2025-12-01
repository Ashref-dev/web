import axios from 'axios';

// Detect runtime environment (server-side vs browser)
const isBrowser = typeof window !== 'undefined';
const clientHost = process.env.NEXT_PUBLIC_API_URL_BROWSER || 'http://localhost:3500';
const serverHost = process.env.NEXT_PUBLIC_API_URL || 'http://backend:3500';
const baseURL = (isBrowser ? clientHost : serverHost) + '/api';

const api = axios.create({
  baseURL,
  withCredentials: false, // Disable credentials mode to avoid CORS issues
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request logging and Authorization header
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const { token } = JSON.parse(user);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
