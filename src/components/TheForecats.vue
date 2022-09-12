<template>
  <div class="forecast-container">
    {{}}
    <div class="forecast-header">
      <h3>Сегодня {{ day + ' ' + month }}</h3>
      <p class="text">{{ forecast[0].main.temp }}</p>
    </div>
    <div class="forecast-slider">
      <div class="forecast-item">
        <h3>temp</h3>
        <img src="@/assets/img/cloudy.png" alt="" />
        <p>time</p>
      </div>
    </div>
  </div>
</template>

<script>
import useGetDate from '@/hooks/useGetDate';
import useForecastRender from '@/hooks/useForecastRender';
import { ref } from '@vue/reactivity';

export default {
  name: 'the-forecast',
  props: {
    forecast: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    // const receivedForecast = this.forecast;
    const { day, month } = useGetDate();
    const { tempMin } = useForecastRender(this.forecast);

    return {
      day,
      month,
      tempMin,
      // tempMax,
      // forecastRender,
    };
  },
};
</script>

<style>
.forecast-container {
  color: var(--color-primary);
  background-color: var(--white);
  position: absolute;
  bottom: 0;
  height: 220px;
  width: 100%;
  border-radius: 24px 24px 0 0;
}
.forecast-header {
  display: flex;
  justify-content: space-between;
  margin: 24px 16px 0 16px;
}
.forecast-slider {
  display: flex;
  margin-top: 12px;
}
.forecast-item {
  width: 64px;
  height: 136px;
  margin-left: 16px;
  background-color: var(--accent-light-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.forecast-item img {
  width: 40px;
  height: 40px;
}
</style>
