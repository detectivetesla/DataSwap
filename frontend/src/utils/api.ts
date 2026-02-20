import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token in all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle unauthorized errors (e.g., expired token)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Clear local storage and redirect to login if unauthorized
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            } else if (error.response.status === 503) {
                // Redirect to maintenance page
                window.location.href = '/maintenance';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
