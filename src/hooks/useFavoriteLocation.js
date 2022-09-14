import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useFillStar } from './useFillStar';

export default function useFavoriteLocation(fillStar) {
  const store = useStore();
  const favoriteLocations = ref({});
  const favoriteLocationsLength = ref(0);
  const chosenLocation = ref('');
  const deletedFavoriteCity = ref({});
  const favoriteLocation = { name: '', latitude: 0, longitude: 0 };
  const objKey = ref(0);

  const addToFavorite = () => {
    favoriteLocationsLength.value = store.state.favoriteLocationsLength;
    chosenLocation.value = store.state.chosenLocation;
    favoriteLocations.value = store.state.favoriteLocations;
    let obj = {};
    if (chosenLocation.value !== 'Город не определен') {
      if (favoriteLocationsLength.value === 0) {
        favoriteLocation.name = store.state.chosenLocation;
        favoriteLocation.latitude = store.state.chosenLocationLatitude;
        favoriteLocation.longitude = store.state.chosenLocationLongitude;
        store.commit('setFavoriteLocationsLength', 1);
        store.commit('setFavoriteLocation', favoriteLocation);

        fillStar();
      } else {
        if (!checkFavoriteCity(chosenLocation.value)) {
          favoriteLocation.name = store.state.chosenLocation;
          favoriteLocation.latitude = store.state.chosenLocationLatitude;
          favoriteLocation.longitude = store.state.chosenLocationLongitude;
          store.commit(
            'setFavoriteLocationsLength',
            favoriteLocationsLength.value + 1
          );
          store.commit('setFavoriteLocation', favoriteLocation);

          fillStar();
        } else {
          removeCity(store.state.chosenCity);
          store.commit('setCityFavorite', false);
          fillStar();
        }
      }
      console.log('localStorage');
      localStorage.favoriteLocationsLength =
        store.state.favoriteLocationsLength;
      localStorage.setItem(
        'favoriteLocations',
        JSON.stringify(store.state.favoriteLocations)
      );
    }
  };

  const checkFavoriteCity = (city) => {
    favoriteLocationsLength.value = store.state.favoriteLocationsLength;
    favoriteLocations.value = store.state.favoriteLocations;
    // chosenLocation.value = store.state.chosenLocation;
    console.log('city', city);
    for (let i = 0; i < favoriteLocationsLength.value; i++) {
      let obj = Object.values(favoriteLocations.value)[i];
      console.log('obj.name', obj?.name);
      // console.log('chosen', chosenLocation.value);
      // console.log(obj?.name !== chosenLocation.value);
      objKey.value = Object.keys(favoriteLocations.value)[i];
      console.log('objKey', objKey);
      if (obj?.name === city) {
        console.log('obj?.name !== city', true);
        return true;
      }
    }
    console.log('obj?.name !== city', false);
    return false;
  };

  const removeCity = (favoriteCity) => {
    favoriteLocations.value = store.state.favoriteLocations;
    console.log('removeCity');
    console.log('favoriteCity', favoriteCity);
    chosenLocation.value = store.state.chosenLocation;

    if (checkFavoriteCity(favoriteCity.name)) {
      delete favoriteLocations.value[objKey.value];
      store.commit('setFavoriteLocations', favoriteLocations.value);
      store.commit('setDeletedFavoriteCity', favoriteCity);
      setTimeout(() => {
        store.commit('setDeletedFavoriteCity', '');
      }, 2000);
      console.log(favoriteLocations.value);
      if (chosenLocation.value === favoriteCity.name) {
        store.commit('setCityFavorite', false);
      }
      console.log('localStorage2');
      localStorage.favoriteLocationsLength =
        store.state.favoriteLocationsLength;
      localStorage.setItem(
        'favoriteLocations',
        JSON.stringify(store.state.favoriteLocations)
      );
    }
  };

  const cancelRemoveCity = () => {
    if (store.state.deletedFavoriteCity) {
      favoriteLocationsLength.value = store.state.favoriteLocationsLength;
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
      store.commit('setDeletedFavoriteCity', '');
    }
  };

  return {
    favoriteLocation,
    favoriteLocations,
    addToFavorite,
    removeCity,
    cancelRemoveCity,
  };
}
