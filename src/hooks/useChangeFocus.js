import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useChangeFocus(location) {
  const store = useStore();
  const isSearchInputFocused = ref(
    store.state.searchCity.isSearchInputFocused
  );
  const inputPlaceholder = ref('Поиск локации');

  const changeFocus = (event) => {
    // console.log(event);
    if (event.target.tagName === 'INPUT') {
      console.log(event.target.tagName);
      store.commit('searchCity/setSearchInputFocused', true);
      isSearchInputFocused.value = true;
      inputPlaceholder.value = 'Поиск города';
    } else {
      store.commit('searchCity/setSearchInputFocused', false);
      isSearchInputFocused.value = false;
      inputPlaceholder.value = 'Поиск локации';
    }
  };

  const dismiss = () => {
    location.value = '';
    store.commit('searchCity/setSuggestions', []);
  };

  return {
    inputPlaceholder,
    isSearchInputFocused,
    changeFocus,
    dismiss,
  };
}
