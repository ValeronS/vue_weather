import { createStore } from 'vuex';

export default createStore({
  state: () => ({
    chosenLocation: 'Город не определен',
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
  },
});
