<template>
  <div class="forecast-container" v-if="forecast.length">
    <div class="forecast-header">
      <h3>Сегодня {{ day + ' ' + month }}</h3>
      <p class="text">{{ tempMax + ' / ' + tempMin + ' °C' }}</p>
    </div>
    <div class="forecast-slider">
      <div
        v-for="(forecastItem, index) in forecast"
        :key="index"
        class="forecast-item"
      >
        <h3>{{ temp(index) }}</h3>
        <img :src="imgSrc(index)" alt="" />
        <p>{{ time(index) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import useGetDate from '@/hooks/useGetDate';
import useForecastRender from '@/hooks/useForecastRender';
import { toRefs } from 'vue';

const props = defineProps({
  forecast: {
    type: Array,
    required: true,
  },
});
const { forecast } = toRefs(props);
const { day, month } = useGetDate();
const { tempMin, tempMax, temp, time, imgSrc } = useForecastRender(forecast);
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
  width: 100%;
  overflow-x: auto;
}
@media screen and (min-width: 640px) {
  .forecast-slider {
    justify-content: center;
  }
}
.forecast-slider::-webkit-scrollbar {
  display: none;
}
.forecast-item {
  min-width: 64px;
  height: 136px;
  margin-left: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.forecast-item:hover {
  background-color: var(--accent-light-color);
}
.forecast-item img {
  width: 40px;
  height: 40px;
}
[v-cloak] {
  display: none;
}
</style>
