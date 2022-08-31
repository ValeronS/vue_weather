import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useSearchLocation() {
  const store = useStore();
  const chosenLocation = ref(store.state.chosenLocation);
  const favoriteLocations = ref(store.state.favoriteLocations);
  const token = '2a5003ab085c07782a03a08c8ec8b7fad6a5d9fc';
  const query = ref('');
  const location = ref({});

  const searchLocation = (event) => {
    console.log(location);
  };

  return {
    chosenLocation,
    favoriteLocations,
    token,
    query,
    location,
    searchLocation,
  };
}
