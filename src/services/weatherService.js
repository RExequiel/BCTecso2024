import api from './api';

const weatherService = {
  getWeatherForecast: async () => {
    try {
      const response = await api.get('/WeatherForecast');
      return response.data;
    } catch (error) {
      console.error('Error al obtener el pronóstico del clima:', error);
      throw error;
    }
  },
};

export default weatherService;
