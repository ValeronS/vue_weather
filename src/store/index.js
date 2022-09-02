import { createStore } from 'vuex';

export default createStore({
  state: () => ({
    chosenLocation: 'Город не определен',
    chosenLocationLatitude: 0,
    chosenLocationLongitude: 0,
    currentTemperature: '-',
    currentDescription: '-',
    iconCode: '',
    imgSrcIdx: 4,
    favoriteLocations: [],
    onFocus: false,
    suggestions: [],
    weatherIcons: [
      {
        icon: '01d',
        description: 'clear_sky',
        src: require('@/assets/img/sun.png'),
      },
      {
        icon: '01n',
        description: 'clear_sky',
        src: require('@/assets/img/sun.png'),
      },
      {
        icon: '02d',
        description: 'few_clouds',
        src: require('@/assets/img/sun_cloudy.png'),
      },
      {
        icon: '02n',
        description: 'few_clouds',
        src: require('@/assets/img/night.png'),
      },
      {
        icon: '03d',
        description: 'scattered_clouds',
        src: require('@/assets/img/cloudy.png'),
      },
      {
        icon: '03n',
        description: 'scattered_clouds',
        src: require('@/assets/img/cloudy.png'),
      },
      {
        icon: '04d',
        description: 'broken_clouds',
        src: require('@/assets/img/cloudy.png'),
      },
      {
        icon: '04n',
        description: 'broken_clouds',
        src: require('@/assets/img/cloudy.png'),
      },
      {
        icon: '09d',
        description: 'shower_rain',
        src: require('@/assets/img/rain.png'),
      },
      {
        icon: '09n',
        description: 'shower_rain',
        src: require('@/assets/img/rain.png'),
      },
      {
        icon: '10d',
        description: 'rain',
        src: require('@/assets/img/rain.png'),
      },
      {
        icon: '10n',
        description: 'rain',
        src: require('@/assets/img/rain.png'),
      },
      {
        icon: '11d',
        description: 'thunderstorm',
        src: require('@/assets/img/thunder.png'),
      },
      {
        icon: '11n',
        description: 'thunderstorm',
        src: require('@/assets/img/thunder.png'),
      },
      {
        icon: '13d',
        description: 'snow',
        src: require('@/assets/img/snowy.png'),
      },
      {
        icon: '13n',
        description: 'snow',
        src: require('@/assets/img/snowy.png'),
      },
      {
        icon: '50d',
        description: 'mist',
        src: require('@/assets/img/cloudy.png'),
      },
      {
        icon: '50n',
        description: 'mist',
        src: require('@/assets/img/cloudy.png'),
      },
    ],
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
  },
});
