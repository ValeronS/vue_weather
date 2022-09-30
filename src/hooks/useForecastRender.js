import { IconsWeather } from '@/utils/constants';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default function useForecastRender(forecast) {
  const store = useStore();

  const firstUpperCase = (str) => {
    return str[0]?.toUpperCase() + str.slice(1);
  };

  const currentImgSrc = computed(() => {
    if (forecast.value.length) {
      return (
        (IconsWeather[forecast.value?.[0]?.weather[0].icon]?.src ??
          console.log('IconsWeatherUnknown')) ||
        IconsWeather['03d'].src
      );
    }
  });

  const currentTemperature = computed(() => {
    if (forecast.value.length) {
      if (forecast.value[0]?.main?.temp?.toFixed() > 0) {
        return '+' + forecast.value[0]?.main.temp.toFixed() ?? 0;
      } else {
        return forecast.value[0]?.main.temp.toFixed();
      }
    }
  });

  const currentDescription = computed(() => {
    if (forecast.value.length) {
      return firstUpperCase(forecast.value[0]?.weather[0]?.description ?? 0);
    }
  });

  const currentWeatherType = computed(() => {
    if (forecast.value.length) {
      return forecast.value[0]?.weather[0].icon ?? 0;
    }
  });

  const currentWind = computed(() => {
    if (forecast.value.length) {
      return (forecast.value[0]?.wind?.speed * 3.6).toFixed() + ' км/ч';
    }
  });

  const currentHumidity = computed(() => {
    if (forecast.value.length) {
      return forecast.value[0]?.main.humidity + '%';
    }
  });

  const tempMin = computed(() => {
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

  const month = ref('');
  const date = new Date();
  const day = date.getDate();

  switch (date.getMonth()) {
    case 0:
      month.value = 'янв';
      break;
    case 1:
      month.value = 'фвр';
      break;
    case 2:
      month.value = 'мрт';
      break;
    case 3:
      month.value = 'апр';
      break;
    case 4:
      month.value = 'мая';
      break;
    case 5:
      month.value = 'июн';
      break;
    case 6:
      month.value = 'июл';
      break;
    case 7:
      month.value = 'авг';
      break;
    case 8:
      month.value = 'снт';
      break;
    case 9:
      month.value = 'окт';
      break;
    case 10:
      month.value = 'нбр';
      break;
    case 11:
      month.value = 'дкб';
      break;
  }

  return {
    currentImgSrc,
    currentTemperature,
    currentDescription,
    currentWeatherType,
    currentWind,
    currentHumidity,
    tempMin,
    tempMax,
    temp,
    time,
    imgSrc,
    day,
    month,
  };
}
