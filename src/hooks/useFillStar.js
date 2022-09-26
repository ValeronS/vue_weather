import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export function useFillStar() {
  const store = useStore();
  const isStarFilled = ref(false);
  const favoriteLocations = ref({});
  const chosenLocation = ref('');
  const favoriteLocationsLength = ref(0);

  const fillStar = () => {
    favoriteLocations.value = store.state.favoriteCity.favoriteLocations;
    chosenLocation.value = store.state.selectedCity.chosenCity.name;
    favoriteLocationsLength.value = Object.keys(
      favoriteLocations.value
    ).length;
    console.log('length', favoriteLocationsLength.value);

    if (favoriteLocationsLength.value) {
      let obj = [];
      for (let i = 0; i < favoriteLocationsLength.value; i++) {
        obj = Object.values(favoriteLocations.value)[i];
        console.log('obj', obj?.name);
        if (obj?.name === chosenLocation.value) {
          store.commit('favoriteCity/setCityFavorite', true);
          isStarFilled.value = true;
          return;
        } else {
          store.commit('favoriteCity/setCityFavorite', false);
          isStarFilled.value = false;
        }
      }
    }
  };

  onMounted(fillStar);

  return {
    isStarFilled,
    fillStar,
  };
}
