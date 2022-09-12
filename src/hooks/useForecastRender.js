import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useForecastRender(forecast) {
  const store = useStore();
  const dayForecast = computed(() => {
    let newArray = [];
    for (let i = 0; i < 8; i++) {
      newArray[i] = forecast[i];
    }
    return newArray;
  });

  const tempMin = computed(() => {
    console.log(forecast.value);
    if (forecast.value.length) {
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
      return store.state.IconsWeather[forecast.value?.[index]?.weather[0].icon]
        .src;
    }
  };

  return {
    dayForecast,
    tempMin,
    tempMax,
    temp,
    time,
    imgSrc,
  };
}
