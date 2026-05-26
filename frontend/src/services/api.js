import axios from 'axios';

// Instância personalizada do Axios apontando para a API do nosso backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor de requisições: injeta o JWT token automaticamente caso ele exista
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rosa_dos_ventos_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
