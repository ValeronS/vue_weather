import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default function useSearchLocation() {
  const store = useStore();
  const location = ref('');
  const suggestions = ref([]);
  const selectedItem = ref();
  const historyItem = { name: '', latitude: 0, longitude: 0 };

  const searchLocation = async (location) => {
    const response = await store.dispatch(
      'searchCity/fetchSuggestions',
      location
    );
    suggestions.value = response.data.suggestions;
    store.commit('searchCity/setSuggestions', suggestions.value);
    console.log(response.data.suggestions);
  };

  const selectItem = (event) => {
    // console.log(event);
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

      historyItem.name =
        event.data.city ||
        event.data.city_with_type ||
        event.data.settlement ||
        event.value;
      historyItem.latitude = event.data.geo_lat;
      historyItem.longitude = event.data.geo_lon;
      store.commit('searchCity/setHistoryItem', historyItem);
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(store.state.searchCity.searchHistory)
      );

      localStorage.chosenLocation =
        event.data.city ||
        event.data.city_with_type ||
        event.data.settlement ||
        event.value;
      localStorage.latitude = event.data.geo_lat;
      localStorage.longitude = event.data.geo_lon;
      store.commit('searchCity/setEmptySuggestions');
      store.commit('searchCity/setSearchInputFocused', false);
    } else if (event.name) {
      store.commit('selectedCity/setChosenLocation', event.name);
      store.commit('selectedCity/setLatitude', event.latitude);
      store.commit('selectedCity/setLongitude', event.longitude);
      localStorage.chosenLocation = event.name;
      localStorage.latitude = event.latitude;
      localStorage.longitude = event.longitude;
      store.commit('searchCity/setSearchInputFocused', false);
    } else {
      console.log('event error');
    }
  };

  const clearSearchHistory = () => {
    store.commit('searchCity/setSearchHistoryEmpty');
    localStorage.removeItem('searchHistory', '');
  };

  const isSearchInputFocused = ref(true);

  const changeFocus = (event) => {
    // console.log(event.target);
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
