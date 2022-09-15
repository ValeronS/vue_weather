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
        'setChosenLocation',
        event.data.city ||
          event.data.city_with_type ||
          event.data.settlement ||
          event.value
      );
      store.commit('setLatitude', event.data.geo_lat);
      store.commit('setLongitude', event.data.geo_lon);

      historyItem.name =
        event.data.city ||
        event.data.city_with_type ||
        event.data.settlement ||
        event.value;
      historyItem.latitude = event.data.geo_lat;
      historyItem.longitude = event.data.geo_lon;
      store.commit('setHistoryItem', historyItem);
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(store.state.searchHistory)
      );

      localStorage.chosenLocation =
        event.data.city ||
        event.data.city_with_type ||
        event.data.settlement ||
        event.value;
      localStorage.latitude = event.data.geo_lat;
      localStorage.longitude = event.data.geo_lon;
      store.commit('setEmptySuggestions');
      store.commit('setFocus', false);
    } else if (event.name) {
      store.commit('setChosenLocation', event.name);
      store.commit('setLatitude', event.latitude);
      store.commit('setLongitude', event.longitude);
      localStorage.chosenLocation = event.name;
      localStorage.latitude = event.latitude;
      localStorage.longitude = event.longitude;
      store.commit('setFocus', false);
    } else {
      console.log('event error');
    }
  };

  const clearSearchHistory = () => {
    store.commit('setSearchHistoryEmpty');
    localStorage.removeItem('searchHistory', '');
  };

  return {
    selectedItem,
    historyItem,
    selectItem,
    clearSearchHistory,
  };
}
