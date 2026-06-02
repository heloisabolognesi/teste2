import axios from 'axios';

// Instância personalizada do Axios apontando para a API do nosso backend
// Em desenvolvimento: http://localhost:5000/api
// Em produção: /api (mesmo domínio)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
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
