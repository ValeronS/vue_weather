import axios from 'axios';

const apiKey = 'a722624eaa524af8342f7a194cffad4d';

const apiWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/forecast',
  params: {
    appid: apiKey,
    units: 'metric',
    lang: 'ru',
    cnt: 8,
  },
});

export default {
  getWeather(latitude, longitude) {
    return apiWeather.post('', '', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
  },
};
