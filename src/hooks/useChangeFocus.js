import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useChangeFocus() {
  const store = useStore();
  const onFocus = ref(store.state.onFocus);
  const inputPlaceholder = ref('Поиск локации');

  const changeFocus = (event) => {
    // console.log(event);
    if (event.target.tagName === 'INPUT') {
      store.commit('setFocus', true);
      onFocus.value = true;
      inputPlaceholder.value = 'Поиск города';
    } else {
      store.commit('setFocus', false);
      onFocus.value = false;
      inputPlaceholder.value = 'Поиск локации';
    }
  };

  return {
    inputPlaceholder,
    onFocus,
    changeFocus,
  };
}
