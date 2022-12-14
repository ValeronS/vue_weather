import suggestionsService from '@/services/suggestions/index';

export const searchCityModule = {
  state: () => ({
    isSearchInputFocused: true,
    suggestions: [],
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || {},
  }),
  mutations: {
    setSearchInputFocused(state, bool) {
      state.isSearchInputFocused = bool;
    },
    setSuggestions(state, array) {
      state.suggestions = array;
    },
    setEmptySuggestions(state) {
      state.suggestions = [];
    },
    setHistoryItem(state, historyItem) {
      state.searchHistory[Date.now()] = historyItem;
    },
    setSearchHistoryEmpty(state) {
      state.searchHistory = {};
    },
  },
  actions: {
    fetchSuggestions({ state }, location) {
      return suggestionsService.getSuggestions(location);
    },
  },
  namespaced: true,
};
