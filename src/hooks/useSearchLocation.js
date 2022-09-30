import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useSearchLocation() {
  const store = useStore();
  const location = ref('');
  const suggestions = ref([]);
  const selectedItem = ref();
  const historyItem = ref(store.state.searchCity.searchHistory);

  const searchLocation = async (location) => {
    const response = await store.dispatch(
      'searchCity/fetchSuggestions',
      location
    );
    suggestions.value = response.data.suggestions;
    store.commit('searchCity/setSuggestions', suggestions.value);
  };

  const selectItem = (event) => {
    // event.data - data from suggestionsService
    if (event.data) {
      store.commit(
        'selectedCity/setChosenLocation',
        event.data.city ||
          event.data.city_with_type ||
          event.data.settlement ||
          event.value
      );
      store.commit('selectedCity/setLatitude', event.data.geo_lat);
      store.commit('selectedCity/setLongitude', event.data.geo_lon);
      store.commit('selectedCity/setWeatherResponse', {});
      store.commit('selectedCity/setWeatherResponseTime', 0);
      localStorage.setItem(
        'chosenCity',
        JSON.stringify(store.state.selectedCity.chosenCity)
      );

      store.commit('searchCity/setEmptySuggestions');
      store.commit('searchCity/setSearchInputFocused', false);
    } else if (event.name) {
      // event.name - from searchHistory
      store.commit('selectedCity/setChosenLocation', event.name);
      store.commit('selectedCity/setLatitude', event.latitude);
      store.commit('selectedCity/setLongitude', event.longitude);
      store.commit('selectedCity/setWeatherResponse', event.weatherResponse);
      store.commit(
        'selectedCity/setWeatherResponseTime',
        event.weatherResponseTime
      );

      localStorage.setItem(
        'chosenCity',
        JSON.stringify(store.state.selectedCity.chosenCity)
      );
      store.commit('searchCity/setSearchInputFocused', false);
    } else {
      console.log('event error');
    }
  };

  const clearSearchHistory = () => {
    store.commit('searchCity/setSearchHistoryEmpty');
    localStorage.removeItem('searchHistory', '');
  };

  const isSearchInputFocused = ref(false);

  const changeFocus = (event) => {
    if (event.target.tagName === 'INPUT') {
      store.commit('searchCity/setSearchInputFocused', true);
      isSearchInputFocused.value = true;
    } else if (event.target.tagName === 'IMG') {
      store.commit('searchCity/setSearchInputFocused', false);
      isSearchInputFocused.value = false;
      location.value = '';
      store.commit('searchCity/setSuggestions', []);
    } else {
      store.commit('searchCity/setSearchInputFocused', false);
      isSearchInputFocused.value = false;
    }
  };

  return {
    location,
    suggestions,
    searchLocation,
    selectedItem,
    historyItem,
    selectItem,
    clearSearchHistory,
    isSearchInputFocused,
    changeFocus,
  };
}
