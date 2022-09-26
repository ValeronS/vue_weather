import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useChosenLocation() {
  const store = useStore();

  const chosenLocation = computed(() => {
    return store.state.selectedCity.chosenCity.name;
  });

  return {
    chosenLocation,
  };
}
