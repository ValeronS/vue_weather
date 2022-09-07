import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useFillStar } from './useFillStar';

export default function useFavoriteLocation(fillStar) {
  const store = useStore();
  const favoriteLocations = ref(store.state.favoriteLocations);
  const favoriteLocation = { name: '', latitude: 0, longitude: 0 };
  const favoriteLocationsLength = Object.keys(
    store.state.favoriteLocations
  ).length;

  const addToFavorite = () => {
    favoriteLocation.name = store.state.chosenLocation;
    favoriteLocation.latitude = store.state.chosenLocationLatitude;
    favoriteLocation.longitude = store.state.chosenLocationLongitude;

    store.commit('setFavoriteLocation', favoriteLocation);
    store.commit('setFavoriteLocationsLength', favoriteLocationsLength + 1);

    fillStar();
    console.log(
      favoriteLocation.name,
      favoriteLocation.latitude,
      favoriteLocation.longitude,
      favoriteLocationsLength
    );
  };

  return {
    favoriteLocation,
    addToFavorite,
    favoriteLocations,
  };
}
