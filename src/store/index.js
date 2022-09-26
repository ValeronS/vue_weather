import { createStore } from 'vuex';
import { selectedCityModule } from '@/store/selectedCityModule';
import { searchCityModule } from '@/store/searchCityModule';
import { favoriteCityModule } from '@/store/favoriteCityModule';

export default createStore({
  modules: {
    selectedCity: selectedCityModule,
    searchCity: searchCityModule,
    favoriteCity: favoriteCityModule,
  },
});
