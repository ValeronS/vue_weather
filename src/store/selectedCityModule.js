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
    setWeatherResponseTime(state, responseTime) {
      state.chosenCity.weatherResponseTime = responseTime;
    },
    setWeatherResponse(state, response) {
      state.chosenCity.weatherResponse = response;
    },
  },
  actions: {
    fetchWeather({ commit, state }, city) {
      return weatherService.getWeather(city.latitude, city.longitude);
    },
  },
  namespaced: true,
};
