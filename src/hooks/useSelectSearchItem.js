import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useSelectSearchItem() {
  const store = useStore();
  const selectedItem = ref();
  // const chosenLocation = ref(store.state.chosenLocation);

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
      store.commit('setEmptySuggestions');
      store.commit('setFocus', false);
    } else if (event.name) {
      store.commit('setChosenLocation', event.name);
      store.commit('setLatitude', event.latitude);
      store.commit('setLongitude', event.longitude);
      store.commit('setFocus', false);
    } else {
      console.log('event error');
    }
  };

  return {
    selectedItem,
    selectItem,
    // chosenLocation,
  };
}
