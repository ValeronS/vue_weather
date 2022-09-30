import weatherService from '@/services/weather/index';

export const selectedCityModule = {
  state: () => ({
    isLoading: false,
    chosenCity: JSON.parse(localStorage.getItem('chosenCity')) || {
      name: 'Город не определен',
      latitude: 0,
      longitude: 0,
      weatherResponse: [],
      weatherResponseTime: 0,
    },
    currentTemperature: '-',
    currentDescription: '-',
    currentWind: '',
    currentHumidity: '',
    currentWeatherType: '',
  }),
  mutations: {
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setChosenLocation(state, location) {
      state.chosenCity.name = location;
    },
    setLatitude(state, latitude) {
      state.chosenCity.latitude = latitude;
    },
    setLongitude(state, longitude) {
      state.chosenCity.longitude = longitude;
    },
    setWeatherResponseTime(state, response) {
      state.chosenCity.weatherResponseTime = response;
    },
    setWeatherResponse(state, response) {
      state.chosenCity.weatherResponse = response;
    },
    setCurrentTemperature(state, temperature) {
      state.currentTemperature = temperature;
    },
    setCurrentDescription(state, description) {
      state.currentDescription = description;
    },
    setCurrentWeatherType(state, code) {
      state.currentWeatherType = code;
    },
    setWind(state, wind) {
      state.currentWind = wind;
    },
    setHumidity(state, humidity) {
      state.currentHumidity = humidity;
    },
  },
  actions: {
    fetchWeather({ commit, state }, city) {
      return weatherService.getWeather(city.latitude, city.longitude);
    },
  },
  namespaced: true,
};
