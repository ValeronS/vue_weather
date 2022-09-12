import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useForecastRender(forecast) {
  const store = useStore();

  const tempMin = computed(() => {
    if (forecast.value.length) {
      console.log('forecast', forecast.value);
      if (forecast.value?.[0]?.main.temp_min.toFixed() > 0) {
        return '+' + forecast.value?.[0]?.main.temp_min.toFixed();
      } else {
        return forecast.value?.[0]?.main.temp_min.toFixed();
      }
    }
  });

  const tempMax = computed(() => {
    if (forecast.value.length) {
      if (forecast.value?.[0]?.main.temp_max.toFixed() > 0) {
        return '+' + forecast.value?.[0]?.main.temp_max.toFixed();
      } else {
        return forecast.value?.[0]?.main.temp_max.toFixed();
      }
    }
  });

  const temp = computed(() => {
    if (forecast.value.length) {
      if (forecast.value?.[0]?.main.temp.toFixed() > 0) {
        return '+' + forecast.value?.[0]?.main.temp.toFixed();
      } else {
        return forecast.value?.[0]?.main.temp.toFixed();
      }
    }
  });

  const time = computed(() => {
    if (forecast.value.length) {
      let date = new Date(forecast.value?.[0].dt * 1000);
      console.log(date.getHours());
      return date.getHours() + ':00';
    }
  });

  const imgSrc = computed(() => {
    if (forecast.value.length) {
      console.log(forecast.value?.[0]?.weather[0].icon);
      return store.state.IconsWeather[forecast.value?.[0]?.weather[0].icon]
        .src;
    }
  });

  return {
    tempMin,
    tempMax,
    temp,
    time,
    imgSrc,
  };
}
