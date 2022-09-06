import axios from 'axios';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useFetchCityWeather(firstUpperCase) {
  const store = useStore();
  const apiKey = 'a722624eaa524af8342f7a194cffad4d';
  const IconsWeather = store.state.IconsWeather;
  const imgSrc = ref('');
  const iconCode = ref('');
  const temperature = ref(0);
  const description = ref('');

  const fetchCityWeather = async (favoriteCity) => {
    console.log(favoriteCity);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${favoriteCity.latitude}&lon=${favoriteCity.longitude}&appid=${apiKey}&units=metric&lang=ru`
      );
      const forecast = response.data?.list ?? 0;
      console.log(forecast);

      iconCode.value = forecast[0].weather[0].icon ?? 0;
      imgSrc.value =
        IconsWeather[iconCode.value]?.src ??
        console.log('IconsWeatherUnknown');

      if (forecast[0]?.main?.temp?.toFixed() > 0) {
        temperature.value = '+' + forecast[0].main.temp.toFixed() + ' C';
      } else {
        temperature.value = forecast[0].main.temp.toFixed();
      }

      description.value = firstUpperCase(
        forecast[0].weather[0]?.description ?? 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    imgSrc,
    temperature,
    description,
    fetchCityWeather,
  };
}
