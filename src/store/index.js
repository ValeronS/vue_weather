import { createStore } from 'vuex';

export default createStore({
  state: () => ({
    chosenLocation: 'Город не определен',
    chosenLocationLatitude: 0,
    chosenLocationLongitude: 0,
    currentTemperature: '-',
    currentDescription: '-',
    currentWind: '',
    currentHumidity: '',
    iconCode: '03d',
    imgSrcIdx: 4,
    onFocus: false,
    suggestions: [],
    favoriteLocationsLength: 0,
    favoriteLocations: {},
    isCityFavorite: false,
    IconsWeather: {
      '01d': {
        label: 'clear_sky',
        src: require('@/assets/img/sun.png'),
      },
      '01n': {
        label: 'clear_sky',
        src: require('@/assets/img/sun.png'),
      },
      '02d': {
        label: 'few_clouds',
        src: require('@/assets/img/sun_cloudy.png'),
      },
      '02n': {
        label: 'few_clouds',
        src: require('@/assets/img/night.png'),
      },
      '03d': {
        label: 'scattered_clouds',
        src: require('@/assets/img/cloudy.png'),
      },
      '03n': {
        label: 'scattered_clouds',
        src: require('@/assets/img/cloudy.png'),
      },
      '04d': {
        label: 'broken_clouds',
        src: require('@/assets/img/cloudy.png'),
      },
      '04n': {
        label: 'broken_clouds',
        src: require('@/assets/img/cloudy.png'),
      },
      '09d': {
        label: 'shower_rain',
        src: require('@/assets/img/rain.png'),
      },
      '09n': {
        label: 'shower_rain',
        src: require('@/assets/img/rain.png'),
      },
      '10d': {
        label: 'rain',
        src: require('@/assets/img/rain.png'),
      },
      '10n': {
        label: 'rain',
        src: require('@/assets/img/rain.png'),
      },
      '11d': {
        label: 'thunderstorm',
        src: require('@/assets/img/thunder.png'),
      },
      '11n': {
        label: 'thunderstorm',
        src: require('@/assets/img/thunder.png'),
      },
      '13d': {
        label: 'snow',
        src: require('@/assets/img/snowy.png'),
      },
      '13n': {
        label: 'snow',
        src: require('@/assets/img/snowy.png'),
      },
      '50d': {
        label: 'mist',
        src: require('@/assets/img/cloudy.png'),
      },
      '50n': {
        label: 'mist',
        src: require('@/assets/img/cloudy.png'),
      },
    },
  }),

  mutations: {
    setFocus(state, bool) {
      state.onFocus = bool;
    },
    setSuggestions(state, array) {
      state.suggestions = array;
    },
    setChosenLocation(state, location) {
      state.chosenLocation = location;
    },
    setLatitude(state, latitude) {
      state.chosenLocationLatitude = latitude;
    },
    setLongitude(state, longitude) {
      state.chosenLocationLongitude = longitude;
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
    setIconCode(state, code) {
      state.iconCode = code;
    },
    setImgSrcIdx(state, idx) {
      state.imgSrcIdx = idx;
    },
    setWind(state, wind) {
      state.currentWind = wind;
    },
    setHumidity(state, humidity) {
      state.currentHumidity = humidity;
    },
    setFavoriteLocationsLength(state, favoriteLocationsLength) {
      state.favoriteLocationsLength = favoriteLocationsLength;
    },
    setNewFavoriteLocation(state, favoriteLocationsLength) {
      state.favoriteLocations[favoriteLocationsLength] = {};
    },
    setFavoriteLocation(state, location) {
      state.favoriteLocations[state.favoriteLocationsLength] = location;
    },
    setCityFavorite(state, bool) {
      state.isCityFavorite = bool;
    },
  },
});
