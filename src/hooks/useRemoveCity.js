import { useStore } from 'vuex';
import { ref } from 'vue';

export default function useRemoveCity() {
  const store = useStore();
  const favoriteLocations = ref(store.state.favoriteLocations);

  const removeCity = (favoriteCity) => {
    console.log(favoriteLocations.value);
    for (let key in favoriteLocations.value) {
      if (favoriteLocations.value[key].name === favoriteCity.name) {
        delete favoriteLocations.value[key];
        store.commit('setFavoriteLocations', favoriteLocations.value);
        console.log(favoriteLocations.value);
      }
    }
  };
  return {
    removeCity,
  };
}
