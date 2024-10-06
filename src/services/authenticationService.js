import api from './api';

const authenticationService = {
  login: async (user, password) => {
    try {
      const response = await api.post('/api/Authentication/token', { user, password });
      return response.data;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  },

  refreshToken: async (token) => {
    try {
      const response = await api.post('/api/Authentication/refresh-token', { token });
      return response.data;
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      throw error;
    }
  },
};

export default authenticationService;
