import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useChangeFocus(location) {
  const store = useStore();
  const isSearchInputFocused = ref(store.state.isSearchInputFocused);
  const inputPlaceholder = ref('Поиск локации');

  const changeFocus = (event) => {
    // console.log(event);
    if (event.target.tagName === 'INPUT') {
      console.log(event.target.tagName);
      store.commit('setFocus', true);
      isSearchInputFocused.value = true;
      inputPlaceholder.value = 'Поиск города';
    } else {
      store.commit('setFocus', false);
      isSearchInputFocused.value = false;
      inputPlaceholder.value = 'Поиск локации';
    }
  };

  const dismiss = () => {
    location.value = '';
    store.commit('setSuggestions', []);
  };

  return {
    inputPlaceholder,
    isSearchInputFocused,
    changeFocus,
    dismiss,
  };
}
