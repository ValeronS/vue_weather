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
    console.log(
      event.data.city ||
        event.data.city_with_type ||
        event.data.settlement ||
        event.value
    );
  };

  return {
    selectedItem,
    selectSearchItem,
    chosenLocation,
  };
}
