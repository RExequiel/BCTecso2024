import api from './api';

const mascoterosService = {
  getMascoteroById: async (id) => {
    try {
      const response = await api.get(`/api/Mascoteros/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el mascoteros:', error);
      throw error;
    }
  },

  getMascoteros: async () => {
    try {
      const response = await api.get('/api/Mascoteros');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los mascoteros:', error);
      throw error;
    }
  },

  registerMascotero: async (mascoteroData) => {
    try {
      const response = await api.post('/api/Mascoteros/registro', mascoteroData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar el mascoteros:', error);
      throw error;
    }
  },
};

export default mascoterosService;
