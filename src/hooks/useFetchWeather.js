import { MILLISECONDS_PER_HOUR } from '@/utils/constants';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useFetchWeather() {
  const store = useStore();
  const responseTime = ref(0);
  const forecast = ref([]);

  const fetchWeather = async (city) => {
    responseTime.value = city.weatherResponseTime;
    if (
      city.latitude &&
      (responseTime.value === 0 ||
        responseTime.value > responseTime.value + MILLISECONDS_PER_HOUR)
    ) {
      try {
        store.commit('selectedCity/setLoading', true);
        const response = await store.dispatch(
          'selectedCity/fetchWeather',
          city
        );
        store.commit('selectedCity/setWeatherResponse', response.data.list);
        store.commit('selectedCity/setWeatherResponseTime', Date.now());
        if (!isCityInHistory(city)) {
          store.commit('searchCity/setHistoryItem', { ...city });
          localStorage.setItem(
            'searchHistory',
            JSON.stringify(store.state.searchCity.searchHistory)
          );
        }
        forecast.value = response.data?.list ?? 0;
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        store.commit('selectedCity/setLoading', false);
      }
    } else {
      forecast.value = city.weatherResponse;
    }
  };

  const isCityInHistory = (city) => {
    let historyLength = Object.keys(
      store.state.searchCity.searchHistory
    ).length;
    for (let i = 0; i < historyLength; i++) {
      let obj = Object.values(store.state.searchCity.searchHistory)[i];
      if (obj?.name === city.name) {
        return true;
      }
    }
    return false;
  };

  return {
    forecast,
    fetchWeather,
  };
}
