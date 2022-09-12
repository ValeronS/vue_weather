import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export function useFetchWeather(firstUpperCase) {
  const store = useStore();
  const latitude = store.state.chosenLocationLatitude;
  const longitude = store.state.chosenLocationLongitude;
  const apiKey = 'a722624eaa524af8342f7a194cffad4d';
  const forecast = ref([]);

  const fetchWeather = async () => {
    if (latitude) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`
        );
        forecast.value = response.data?.list ?? 0;
        console.log(forecast.value);

        if (forecast.value[0]?.main?.temp?.toFixed() > 0) {
          store.commit(
            'setCurrentTemperature',
            '+' + forecast.value[0].main.temp.toFixed() ?? 0
          );
        } else {
          store.commit(
            'setCurrentTemperature',
            forecast.value[0].main.temp.toFixed()
          );
        }

        store.commit(
          'setCurrentDescription',
          firstUpperCase(forecast.value[0].weather[0]?.description ?? 0)
        );

        store.commit('setIconCode', forecast.value[0].weather[0].icon ?? 0);

        store.commit(
          'setWind',
          (forecast.value[0].wind?.speed * 3.6).toFixed() + ' км/ч'
        );

        store.commit('setHumidity', forecast.value[0].main.humidity + '%');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Нет данных для выполнения запроса');
    }
  };

  onMounted(fetchWeather);

  return {
    forecast,
    fetchWeather,
  };
}
