import { IconsWeather } from '@/utils/constants';
import axios from 'axios';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useFetchCityWeather(firstUpperCase) {
  const store = useStore();
  const apiKey = 'a722624eaa524af8342f7a194cffad4d';
  const imgSrc = ref('');
  const iconCode = ref('');
  const temperature = ref(0);
  const description = ref('');
  const tempMin = ref(0);
  const tempMax = ref(0);

  const fetchCityWeather = async (favoriteCity) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${favoriteCity.latitude}&lon=${favoriteCity.longitude}&cnt=8&appid=${apiKey}&units=metric&lang=ru`
      );
      const forecast = response.data?.list ?? 0;
      localStorage.setItem(
        'forecastResponse',
        JSON.stringify(response.data?.list)
      );
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

  return {
    imgSrc,
    temperature,
    description,
    tempMin,
    tempMax,
    fetchCityWeather,
  };
}
