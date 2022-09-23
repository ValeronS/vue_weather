import { IconsWeather } from '@/utils/constants';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useForecastRender(forecast) {
  const store = useStore();

  const tempMin = computed(() => {
    console.log(forecast.value);
    if (forecast.value.length) {
      let min = forecast.value?.[0]?.main.temp;
      for (let i = 1; i < forecast.value.length; i++) {
        if (min > forecast.value?.[i]?.main.temp) {
          min = forecast.value?.[i]?.main.temp;
        }
      }
      if (min > 0) {
        return '+' + min.toFixed();
      } else {
        return min.toFixed();
      }
    }
  });

  const tempMax = computed(() => {
    if (forecast.value.length) {
      let max = forecast.value?.[0]?.main.temp;
      for (let i = 1; i < forecast.value.length; i++) {
        if (max < forecast.value?.[i]?.main.temp) {
          max = forecast.value?.[i]?.main.temp;
        }
      }
      if (max > 0) {
        return '+' + max.toFixed();
      } else {
        return max.toFixed();
      }
    }
  });

  const temp = (index) => {
    if (forecast.value.length) {
      if (forecast.value?.[index]?.main.temp.toFixed() > 0) {
        return '+' + forecast.value?.[index]?.main.temp.toFixed();
      } else {
        return forecast.value?.[index]?.main.temp.toFixed();
      }
    }
  };

  const time = (index) => {
    if (forecast.value.length) {
      let date = new Date(forecast.value?.[index].dt * 1000);
      return date.getHours() + ':00';
    }
  };

  const imgSrc = (index) => {
    if (forecast.value.length) {
      return IconsWeather[forecast.value?.[index]?.weather[0].icon].src;
    }
  };

  return {
    tempMin,
    tempMax,
    temp,
    time,
    imgSrc,
  };
}
