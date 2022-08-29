import { createStore } from 'vuex';

export default createStore({
  state: () => ({
    chosenLocation: 'Город не определен',
  }),
});
