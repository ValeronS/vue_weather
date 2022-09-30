import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default function useFavoriteLocation() {
  const store = useStore();
  const favoriteLocations = ref({});
  const favoriteLocationsLength = ref(0);
  const chosenLocation = ref('');
  const favoriteLocation = ref({});
  const objKey = ref(0);

  const addToFavorite = () => {
    favoriteLocationsLength.value = Object.keys(
      store.state.favoriteCity.favoriteLocations
    ).length;

    chosenLocation.value = store.state.selectedCity.chosenCity.name;
    favoriteLocations.value = store.state.favoriteCity.favoriteLocations;
    let obj = {};
    if (chosenLocation.value !== 'Город не определен') {
      if (!checkFavoriteCity(chosenLocation.value)) {
        favoriteLocation.value = { ...store.state.selectedCity.chosenCity };
        store.commit(
          'favoriteCity/setFavoriteLocation',
          favoriteLocation.value
        );
        fillStar();
      } else {
        removeCity(store.state.selectedCity.chosenCity);
        store.commit('favoriteCity/setCityFavorite', false);
        fillStar();
      }
      console.log('localStorage');
      localStorage.setItem(
        'favoriteLocations',
        JSON.stringify(store.state.favoriteCity.favoriteLocations)
      );
    }
  };

  const checkFavoriteCity = (city) => {
    favoriteLocationsLength.value = Object.keys(
      store.state.favoriteCity.favoriteLocations
    ).length;
    favoriteLocations.value = store.state.favoriteCity.favoriteLocations;
    console.log('city', city);
    for (let i = 0; i < favoriteLocationsLength.value; i++) {
      let obj = Object.values(favoriteLocations.value)[i];
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
    favoriteLocations.value = store.state.favoriteCity.favoriteLocations;
    chosenLocation.value = store.state.selectedCity.chosenCity.name;
    console.log('removeCity');

    if (checkFavoriteCity(favoriteCity.name)) {
      delete favoriteLocations.value[objKey.value];
      store.commit('favoriteCity/setShowModal', favoriteLocations.value);
      store.commit('favoriteCity/setDeletedFavoriteCity', favoriteCity);
      setTimeout(() => {
        store.commit('favoriteCity/setDeletedFavoriteCity', '');
      }, 2000);
      if (chosenLocation.value === favoriteCity.name) {
        store.commit('favoriteCity/setCityFavorite', false);
      }
      console.log('localStorage2');
      localStorage.setItem(
        'favoriteLocations',
        JSON.stringify(store.state.favoriteCity.favoriteLocations)
      );
    }
  };

  const cancelRemoveCity = () => {
    if (store.state.favoriteCity.deletedFavoriteCity) {
      store.commit(
        'favoriteCity/setFavoriteLocation',
        store.state.favoriteCity.deletedFavoriteCity
      );

      console.log('localStorage3');
      localStorage.setItem(
        'favoriteLocations',
        JSON.stringify(store.state.favoriteCity.favoriteLocations)
      );
      store.commit('favoriteCity/setDeletedFavoriteCity', '');
    }
  };

  const showModal = () => {
    console.log('showModal');
    store.commit('favoriteCity/setShowModal', true);
    setTimeout(() => {
      store.commit('favoriteCity/setShowModal', false);
    }, 1500);
  };

  const fillStar = () => {
    favoriteLocations.value = store.state.favoriteCity.favoriteLocations;
    chosenLocation.value = store.state.selectedCity.chosenCity.name;
    favoriteLocationsLength.value = Object.keys(
      favoriteLocations.value
    ).length;

    if (favoriteLocationsLength.value) {
      let obj = [];
      for (let i = 0; i < favoriteLocationsLength.value; i++) {
        obj = Object.values(favoriteLocations.value)[i];
        if (obj?.name === chosenLocation.value) {
          store.commit('favoriteCity/setCityFavorite', true);
          return;
        } else {
          store.commit('favoriteCity/setCityFavorite', false);
        }
      }
    }
  };

  onMounted(fillStar);

  return {
    favoriteLocation,
    favoriteLocations,
    addToFavorite,
    removeCity,
    cancelRemoveCity,
    showModal,
  };
}
