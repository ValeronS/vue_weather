import { IconsWeather, MILLISECONDS_PER_HOUR } from '@/utils/constants';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default function useFetchWeather(firstUpperCase) {
  const store = useStore();
  const responseTime = ref(0);
  const forecast = ref([]);

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

  const imgSrc = ref('');
  const currentWeatherType = ref('');
  const temperature = ref(0);
  const description = ref('');
  const tempMin = ref(0);
  const tempMax = ref(0);

  const fetchCityWeather = async (favoriteCity) => {
    try {
      const response = await store.dispatch(
        'selectedCity/fetchWeather',
        favoriteCity
      );
      const forecast = response.data?.list ?? 0;
      localStorage.setItem(
        'forecastResponse',
        JSON.stringify(response.data?.list)
      );
      console.log(forecast);

      currentWeatherType.value = forecast[0].weather[0].icon ?? 0;
      imgSrc.value =
        IconsWeather[currentWeatherType.value]?.src ??
        console.log('IconsWeatherUnknown');

      if (forecast[0]?.main?.temp?.toFixed() > 0) {
        temperature.value = '+' + forecast[0].main.temp.toFixed() + ' C';
      } else {
        temperature.value = forecast[0].main.temp.toFixed();
      }

      description.value = firstUpperCase(
        forecast[0].weather[0]?.description ?? 0
      );
      console.log('forecast', response.data);

      let min = forecast?.[0]?.main.temp;
      for (let i = 1; i < forecast.length; i++) {
        if (min > forecast?.[i]?.main.temp) {
          min = forecast?.[i]?.main.temp;
        }
      }
      if (min > 0) {
        tempMin.value = '+' + min.toFixed();
      } else {
        tempMin.value = min.toFixed();
      }

      let max = forecast?.[0]?.main.temp;
      for (let i = 1; i < forecast.length; i++) {
        if (max < forecast?.[i]?.main.temp) {
          max = forecast?.[i]?.main.temp;
        }
      }
      if (max > 0) {
        tempMax.value = '+' + max.toFixed();
      } else {
        tempMax.value = max.toFixed();
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(fetchWeather);

  return {
    forecast,
    fetchWeather,
    imgSrc,
    temperature,
    description,
    tempMin,
    tempMax,
    fetchCityWeather,
  };
}
