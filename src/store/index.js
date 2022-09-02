import { createStore } from 'vuex';

export default createStore({
  state: () => ({
    chosenLocation: 'Город не определен',
    chosenLocationLatitude: 0,
    chosenLocationLongitude: 0,
    favoriteLocations: [],
    onFocus: false,
    suggestions: [],
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
  },
});
