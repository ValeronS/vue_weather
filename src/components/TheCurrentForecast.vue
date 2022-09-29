<template>
  <div class="forecast">
    <div class="forecast__current">
      <img :src="imgSrc" />

      <h1 class="forecast__current-temperature">
        {{ $store.state.selectedCity.currentTemperature }}
      </h1>

      <h2 class="forecast__current-description">
        {{ $store.state.selectedCity.currentDescription }}
      </h2>
    </div>

    <div
      v-if="$store.state.selectedCity.currentWind"
      class="forecast__conditions"
    >
      <div class="wind">
        <img src="@/assets/img/windy.png" alt="" />
        {{ $store.state.selectedCity.currentWind }}
      </div>

      <div class="humidity">
        <img src="@/assets/img/hum.png" alt="" />
        {{ $store.state.selectedCity.currentHumidity }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconsWeather } from '@/utils/constants';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const imgSrc = computed(
  () =>
    (IconsWeather[store.state.selectedCity.currentWeatherType]?.src ??
      console.log('IconsWeatherUnknown')) ||
    IconsWeather['03d'].src
);
</script>

<style>
.forecast {
  color: var(--white);
}
.forecast__current {
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.forecast__current > img {
  width: 148px;
  height: 148px;
}
.forecast__conditions {
  position: relative;
  top: 107px;
  left: 16px;
  margin-right: 32px;
  display: flex;
  justify-content: space-between;
}
.forecast__conditions img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.wind {
  display: flex;
  align-items: center;
}
.humidity {
  display: flex;
  align-items: center;
}
</style>
