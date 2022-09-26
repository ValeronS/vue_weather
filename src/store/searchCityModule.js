export const searchCityModule = {
  state: () => ({
    isSearchInputFocused: false,
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
    // не используется?
    setChosenSuggestion(state, suggestion) {
      state.suggestions[0] = suggestion;
    },
    setHistoryItem(state, historyItem) {
      state.searchHistory[Date.now()] = historyItem;
    },
    setSearchHistoryEmpty(state) {
      state.searchHistory = {};
    },
  },
  namespaced: true,
};
