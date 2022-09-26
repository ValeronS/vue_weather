import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useSelectSearchItem() {
  const store = useStore();
  const selectedItem = ref();
  const historyItem = { name: '', latitude: 0, longitude: 0 };

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

  return {
    selectedItem,
    historyItem,
    selectItem,
    clearSearchHistory,
  };
}
