import api from './api';

const mascotasService = {
  getMascotaById: async (id) => {
    try {
      const response = await api.get(`/api/Mascotas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la mascota:', error);
      throw error;
    }
  },

  getMascotas: async () => {
    try {
      const response = await api.get('/api/Mascotas');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
      throw error;
    }
  },

  updateMascota: async (id, mascotaData) => {
    try {
      const response = await api.put(`/api/Mascotas/${id}`, mascotaData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      throw error;
    }
  },

  registerMascota: async (mascotaData) => {
    try {
      const response = await api.post('/api/Mascotas/registro', mascotaData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      throw error;
    }
  },

  bajaMascota: async (id, bajaData) => {
    try {
      const response = await api.post(`/api/Mascotas/${id}/baja`, bajaData);
      return response.data;
    } catch (error) {
      console.error('Error al dar de baja la mascota:', error);
      throw error;
    }
  },
};

export default mascotasService;
