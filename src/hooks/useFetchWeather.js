import { MILLISECONDS_PER_HOUR } from '@/utils/constants';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export function useFetchWeather(firstUpperCase) {
  const store = useStore();
  const apiKey = 'a722624eaa524af8342f7a194cffad4d';
  const responseTime = ref(0);
  const forecast = ref([]);
  const isLoading = ref(false);

  const fetchWeather = async () => {
    responseTime.value =
      store.state.selectedCity.chosenCity.weatherResponseTime;
    if (
      store.state.selectedCity.chosenCity.latitude &&
      (responseTime.value === 0 ||
        responseTime.value > responseTime.value + MILLISECONDS_PER_HOUR)
    ) {
      try {
        store.commit('selectedCity/setLoading', true);
        const response = await store.dispatch(
          'selectedCity/fetchWeather',
          store.state.selectedCity.chosenCity
        );

        forecast.value = response.data?.list ?? 0;
        console.log(response);
        store.commit('selectedCity/setWeatherResponse', response.data.list);
        store.commit('selectedCity/setWeatherResponseTime', Date.now());

        if (store.state.selectedCity.chosenCity.name === '') {
          store.commit(
            'selectedCity/setChosenLocation',
            response.data.city.name
          );
          localStorage.chosenLocation = response.data.city.name;
        }

        if (forecast.value[0]?.main?.temp?.toFixed() > 0) {
          store.commit(
            'selectedCity/setCurrentTemperature',
            '+' + forecast.value[0].main.temp.toFixed() ?? 0
          );
        } else {
          store.commit(
            'selectedCity/setCurrentTemperature',
            forecast.value[0].main.temp.toFixed()
          );
        }

        store.commit(
          'selectedCity/setCurrentDescription',
          firstUpperCase(forecast.value[0].weather[0]?.description ?? 0)
        );

        store.commit(
          'selectedCity/setCurrentWeatherType',
          forecast.value[0].weather[0].icon ?? 0
        );

        store.commit(
          'selectedCity/setWind',
          (forecast.value[0].wind?.speed * 3.6).toFixed() + ' км/ч'
        );

        store.commit(
          'selectedCity/setHumidity',
          forecast.value[0].main.humidity + '%'
        );
      } catch (error) {
        console.log(error);
      } finally {
        store.commit('selectedCity/setLoading', false);
      }
    } else {
      forecast.value = store.state.selectedCity.chosenCity.weatherResponse;
      console.log('Нет данных для выполнения запроса');
    }
  };

  onMounted(fetchWeather);

  return {
    forecast,
    fetchWeather,
  };
}
