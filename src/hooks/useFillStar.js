import { onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';

export function useFillStar() {
  const store = useStore();
  const chosenLocation = ref(store.state.chosenLocation);

  const fillStar = watch(chosenLocation, (newChosenLocation) => {
    console.log('fill', newChosenLocation);
    for (let key in store.state.favoriteLocations) {
      if (
        store.state.favoriteLocations[key].name === store.state.chosenLocation
      ) {
        store.commit('setCityFavorite', true);
        console.log(true);
      } else {
        store.commit('setCityFavorite', false);
        console.log(false);
      }
    }
  });

  onMounted(fillStar);

  return {
    fillStar,
  };
}
