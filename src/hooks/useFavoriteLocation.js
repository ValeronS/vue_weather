import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default function useFavoriteLocation(fillStar) {
  const store = useStore();
  const favoriteLocations = ref({});
  const favoriteLocationsLength = ref(0);
  const chosenLocation = ref('');
  const deletedFavoriteCity = ref({});
  const favoriteLocation = ref({});
  const objKey = ref(0);

  const addToFavorite = () => {
    favoriteLocationsLength.value = Object.keys(
      store.state.favoriteLocations
    ).length;

    chosenLocation.value = store.state.chosenCity.name;
    favoriteLocations.value = store.state.favoriteLocations;
    let obj = {};
    if (chosenLocation.value !== 'Город не определен') {
      if (!checkFavoriteCity(chosenLocation.value)) {
        favoriteLocation.value = { ...store.state.chosenCity };
        store.commit('setFavoriteLocation', favoriteLocation.value);
        fillStar();
      } else {
        removeCity(store.state.chosenCity);
        store.commit('setCityFavorite', false);
        fillStar();
      }
      console.log('localStorage');
      localStorage.setItem(
        'favoriteLocations',
        JSON.stringify(store.state.favoriteLocations)
      );
    }
  };

  const checkFavoriteCity = (city) => {
    favoriteLocationsLength.value = Object.keys(
      store.state.favoriteLocations
    ).length;
    favoriteLocations.value = store.state.favoriteLocations;
    console.log('city', city);
    for (let i = 0; i < favoriteLocationsLength.value; i++) {
      let obj = Object.values(favoriteLocations.value)[i];
      console.log('obj.name', obj?.name);
      objKey.value = Object.keys(favoriteLocations.value)[i];
      if (obj?.name === city) {
        console.log('objKey.value', objKey.value);
        console.log('obj?.name !== city', true);
        return true;
      }
    }
    return false;
  };

  const removeCity = (favoriteCity) => {
    favoriteLocations.value = store.state.favoriteLocations;
    chosenLocation.value = store.state.chosenCity.name;
    console.log('removeCity');

    if (checkFavoriteCity(favoriteCity.name)) {
      delete favoriteLocations.value[objKey.value];
      store.commit('setFavoriteLocations', favoriteLocations.value);
      store.commit('setDeletedFavoriteCity', favoriteCity);
      setTimeout(() => {
        store.commit('setDeletedFavoriteCity', '');
      }, 2000);
      if (chosenLocation.value === favoriteCity.name) {
        store.commit('setCityFavorite', false);
      }
      console.log('localStorage2');
      localStorage.setItem(
        'favoriteLocations',
        JSON.stringify(store.state.favoriteLocations)
      );
    }
  };

  const cancelRemoveCity = () => {
    if (store.state.deletedFavoriteCity) {
      store.commit('setFavoriteLocation', store.state.deletedFavoriteCity);

      console.log('localStorage3');
      localStorage.setItem(
        'favoriteLocations',
        JSON.stringify(store.state.favoriteLocations)
      );
      store.commit('setDeletedFavoriteCity', '');
    }
  };

  const showModal = () => {
    console.log('showModal');
    store.commit('setShowModal', true);
    setTimeout(() => {
      store.commit('setShowModal', false);
    }, 1500);
  };

  return {
    favoriteLocation,
    favoriteLocations,
    addToFavorite,
    removeCity,
    cancelRemoveCity,
    showModal,
  };
}
