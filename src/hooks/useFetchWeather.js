import { IconsWeather, MILLISECONDS_PER_HOUR } from '@/utils/constants';
import { onMounted, ref } from 'vue';
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
          console.log('isCityInHistory');
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
        console.log(
          'store.state.searchCity.searchHistory',
          store.state.searchCity.searchHistory
        );
        return true;
      }
    }
    return false;
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

  const firstUpperCase = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

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
