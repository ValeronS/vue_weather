import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export function useFetchWeather(firstUpperCase) {
  const store = useStore();
  const latitude = store.state.chosenLocationLatitude;
  const longitude = store.state.chosenLocationLongitude;
  const apiKey = 'a722624eaa524af8342f7a194cffad4d';

  const fetchWeather = async () => {
    if (latitude) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`
        );
        const forecast = response.data.list;
        console.log(forecast);

        if (forecast[0].main.temp.toFixed() > 0) {
          store.commit(
            'setCurrentTemperature',
            '+' + forecast[0].main.temp.toFixed()
          );
        } else {
          store.commit(
            'setCurrentTemperature',
            forecast[0].main.temp.toFixed()
          );
        }

        store.commit(
          'setCurrentDescription',
          firstUpperCase(forecast[0].weather[0].description)
        );

        store.commit('setIconCode', forecast[0].weather[0].icon);
      } catch (error) {
        console.log(error);
      }
    }
  };

  onMounted(fetchWeather);

  return {
    fetchWeather,
  };
}
