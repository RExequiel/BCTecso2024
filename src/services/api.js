import axios from 'axios';
import authenticationService from './authenticationService';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para adjuntar el token de sesión en cada solicitud
api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta, incluyendo expiración del token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    // Si el token ha expirado (por ejemplo, status 401), intentamos refrescar el token
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Obtener el refresh token de sessionStorage
        const refreshToken = sessionStorage.getItem('refreshToken');
        const response = await authenticationService.refreshToken(refreshToken);

        // Guardar el nuevo token en sessionStorage
        sessionStorage.setItem('accessToken', response.token);

        // Repetir la solicitud original con el nuevo token
        originalRequest.headers['Authorization'] = `Bearer ${response.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error al refrescar el token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    console.error('Error en la respuesta:', error);
    return Promise.reject(error);
  }
);

export default api;
