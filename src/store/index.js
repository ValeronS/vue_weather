import { createStore } from 'vuex';
import { IconsWeather } from '@/utils/constants';

export default createStore({
  state: () => ({
    isLoading: false,
    chosenCity: {
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
    isSearchInputFocused: false,
    suggestions: [],
    favoriteLocations: {},
    deletedFavoriteCity: {},
    isCityFavorite: false,
    showModal: false,
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || {},
  }),

  mutations: {
    setSearchInputFocused(state, bool) {
      state.isSearchInputFocused = bool;
    },
    setSuggestions(state, array) {
      state.suggestions = array;
    },
    setChosenLocation(state, location) {
      state.chosenCity.name = location;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
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
    setEmptySuggestions(state) {
      state.suggestions = [];
    },
    setChosenSuggestion(state, suggestion) {
      state.suggestions[0] = suggestion;
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
    setFavoriteLocations(state, favoriteLocations) {
      state.favoriteLocations = favoriteLocations;
    },
    setFavoriteLocationsLength(state, favoriteLocationsLength) {
      state.favoriteLocationsLength = favoriteLocationsLength;
    },
    setFavoriteLocation(state, location) {
      state.favoriteLocations[Date.now()] = location;
    },
    setCityFavorite(state, bool) {
      state.isCityFavorite = bool;
    },
    setDeletedFavoriteCity(state, favoriteCity) {
      state.deletedFavoriteCity = favoriteCity;
    },
    setShowModal(state, bool) {
      state.showModal = bool;
    },
    setHistoryItem(state, historyItem) {
      state.searchHistory[Date.now()] = historyItem;
    },
    setSearchHistoryEmpty(state) {
      state.searchHistory = {};
    },
  },
});
