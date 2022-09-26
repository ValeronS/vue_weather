export const favoriteCityModule = {
  state: () => ({
    favoriteLocations: {},
    deletedFavoriteCity: {},
    isCityFavorite: false,
    showModal: false,
  }),
  mutations: {
    setFavoriteLocations(state, favoriteLocations) {
      state.favoriteLocations = favoriteLocations;
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
  },
  namespaced: true,
};
