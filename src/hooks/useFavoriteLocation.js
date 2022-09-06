import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default function useFavoriteLocation() {
  const store = useStore();
  const favoriteLocations = ref(store.state.favoriteLocations);
  const favoriteLocation = { name: '', latitude: 0, longitude: 0 };
  const favoriteLocationsLength = Object.keys(
    store.state.favoriteLocations
  ).length;

  const addToFavorite = computed(() => {
    if (store.state.chosenLocationLatitude) {
      favoriteLocation.name = store.state.chosenLocation;
      favoriteLocation.latitude = store.state.chosenLocationLatitude;
      favoriteLocation.longitude = store.state.chosenLocationLongitude;

      store.commit('setFavoriteLocation', favoriteLocation);
      store.commit('setFavoriteLocationsLength', favoriteLocationsLength + 1);

      console.log(
        favoriteLocation.name,
        favoriteLocation.latitude,
        favoriteLocation.longitude,
        favoriteLocationsLength
      );
    }
  });

  return {
    favoriteLocation,
    addToFavorite,
    favoriteLocations,
  };
}
