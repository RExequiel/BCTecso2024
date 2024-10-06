import api from './api';

const protectorasService = {
  getProtectoraById: async (id) => {
    try {
      const response = await api.get(`/api/Protectoras/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la protectora:', error);
      throw error;
    }
  },

  getProtectoras: async () => {
    try {
      const response = await api.get('/api/Protectoras');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las protectoras:', error);
      throw error;
    }
  },

  deleteProtectora: async (id) => {
    try {
      const response = await api.delete(`/api/Protectoras/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar la protectora:', error);
      throw error;
    }
  },

  registerProtectora: async (protectoraData) => {
    try {
      const response = await api.post('/api/Protectoras/registro', protectoraData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar la protectora:', error);
      throw error;
    }
  },
};

export default protectorasService;
