import { ref } from 'vue';

export default function useForecastRender() {
  const tempMin = ref(0);
  const tempMax = ref(0);

  const forecastRender = (forecast) => {
    forecast[0].main.temp_max.toFixed() +
      ' / ' +
      forecast[0].main.temp_min.toFixed() +
      '° C';
  };
}
