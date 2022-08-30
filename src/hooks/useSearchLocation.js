import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useSearchLocation() {
  const store = useStore();
  const chosenLocation = ref(store.state.chosenLocation);
  const favoriteLocations = ref(store.state.favoriteLocations);

  const searchLocation = async () => {};

  return {
    chosenLocation,
    favoriteLocations,
    searchLocation,
  };
}
