import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export function useFillStar() {
  const store = useStore();
  const isStarFilled = ref(false);

  const fillStar = () => {
    console.log('fillStar');
    for (let key in store.state.favoriteLocations) {
      if (
        store.state.favoriteLocations[key].name === store.state.chosenLocation
      ) {
        store.commit('setCityFavorite', true);
        isStarFilled.value = true;
        console.log(true);
      } else {
        store.commit('setCityFavorite', false);
        isStarFilled.value = false;
        console.log(false);
      }
    }
  };

  onMounted(fillStar);

  return {
    isStarFilled,
    fillStar,
  };
}
