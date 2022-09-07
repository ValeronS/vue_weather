import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useFillStar } from './useFillStar';

export default function useFavoriteLocation(fillStar) {
  const store = useStore();
  const favoriteLocations = ref({});
  const favoriteLocation = { name: '', latitude: 0, longitude: 0 };
  const favoriteLocationsLength = ref(0);
  const deletedFavoriteCity = ref({});

  const addToFavorite = () => {
    favoriteLocationsLength.value = Object.keys(
      store.state.favoriteLocations
    ).length;
    favoriteLocation.name = store.state.chosenLocation;
    favoriteLocation.latitude = store.state.chosenLocationLatitude;
    favoriteLocation.longitude = store.state.chosenLocationLongitude;
    store.commit(
      'setFavoriteLocationsLength',
      favoriteLocationsLength.value + 1
    );
    store.commit('setFavoriteLocation', favoriteLocation);

    fillStar();
    // console.log(
    //   favoriteLocation.name,
    //   favoriteLocation.latitude,
    //   favoriteLocation.longitude,
    //   favoriteLocationsLength.value
    // );
  };

  const removeCity = (favoriteCity) => {
    favoriteLocations.value = store.state.favoriteLocations;
    // console.log(favoriteLocations.value);
    for (let key in favoriteLocations.value) {
      if (favoriteLocations.value[key].name === favoriteCity.name) {
        delete favoriteLocations.value[key];
        store.commit('setFavoriteLocations', favoriteLocations.value);
        store.commit('setDeletedFavoriteCity', favoriteCity);
        console.log(favoriteLocations.value);
      }
    }
  };

  const cancelRemoveCity = () => {
    favoriteLocationsLength.value = Object.keys(
      store.state.favoriteLocations
    ).length;
    deletedFavoriteCity.value = store.state.deletedFavoriteCity;
    favoriteLocation.name = deletedFavoriteCity.value.name;
    favoriteLocation.latitude = deletedFavoriteCity.value.latitude;
    favoriteLocation.longitude = deletedFavoriteCity.value.longitude;
    store.commit(
      'setFavoriteLocationsLength',
      favoriteLocationsLength.value + 1
    );
    store.commit('setFavoriteLocation', favoriteLocation);
    console.log(favoriteLocation);
  };

  return {
    favoriteLocation,
    favoriteLocations,
    addToFavorite,
    removeCity,
    cancelRemoveCity,
  };
}
