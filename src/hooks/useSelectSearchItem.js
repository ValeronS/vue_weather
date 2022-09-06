import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useSelectSearchItem() {
  const store = useStore();
  const selectedItem = ref();
  const chosenLocation = ref(store.state.chosenLocation);

  const selectSearchItem = (event) => {
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
    // store.commit('setChosenSuggestion', event);
    // console.log(event);
  };

  return {
    selectedItem,
    selectSearchItem,
    chosenLocation,
  };
}
