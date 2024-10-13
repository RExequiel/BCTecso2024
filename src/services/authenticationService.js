import api from './api';

const authenticationService = {
  login: async (user, password) => {
    try {
      const response = await api.post('/api/Authentication/token', { user, password });
      
      // Almacenar el accessToken y refreshToken en sessionStorage
      const { token, refreshToken } = response.data;
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  },

  // Método para refrescar el token
  refreshToken: async (token) => {
    try {
      const response = await api.post('/api/Authentication/refresh-token', { token });
      
      // Actualizar el accessToken
      sessionStorage.setItem('accessToken', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      throw error;
    }
  },
};

export default authenticationService;
