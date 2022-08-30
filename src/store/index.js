import { createStore } from 'vuex';

export default createStore({
  state: () => ({
    chosenLocation: 'Город не определен',
    favoriteLocations: [],
    onFocus: false,
  }),

  mutations: {
    setFocus(state, bool) {
      state.onFocus = bool;
    },
  },
});
