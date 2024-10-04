import api from './api';

const comboService = {
  getTipoRegistros: async () => {
    try {
      const response = await api.get('/api/Combos/TipoRegistros');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los tipos de registros:', error);
      throw error;
    }
  },

  getProvincias: async () => {
    try {
      const response = await api.get('/api/Combos/Provincias');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las provincias:', error);
      throw error;
    }
  },

  getCiudadesByProvincia: async (idProvincia) => {
    try {
      const response = await api.get(`/api/Combos/Ciudades/${idProvincia}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las ciudades:', error);
      throw error;
    }
  },
};

export default comboService;
