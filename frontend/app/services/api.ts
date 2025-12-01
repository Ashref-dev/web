import axios from 'axios';

// Detect runtime environment (server-side vs browser). In browser, use host
// reachable by the browser (localhost for host dev). In the server (SSR or
// in-container) use NEXT_PUBLIC_API_URL which can be set to the Docker
// network hostname like 'http://backend:5000'.
const isBrowser = typeof window !== 'undefined';
const clientHost = process.env.NEXT_PUBLIC_API_URL_BROWSER || 'http://localhost:5000';
const serverHost = process.env.NEXT_PUBLIC_API_URL || 'http://backend:5000';
const baseURL = (isBrowser ? clientHost : serverHost) + '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
