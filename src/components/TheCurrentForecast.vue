<template>
  <div class="forecast">
    <div class="forecast__current">
      <img :src="currentImgSrc" />

      <h1 class="forecast__current-temperature">
        {{ currentTemperature || '-' }}
      </h1>

      <h2 class="forecast__current-description">
        {{ currentDescription || '-' }}
      </h2>
    </div>

    <div v-if="forecast.length" class="forecast__conditions">
      <div class="wind">
        <img src="@/assets/img/windy.png" alt="" />
        {{ currentWind }}
      </div>

      <div class="humidity">
        <img src="@/assets/img/hum.png" alt="" />
        {{ currentHumidity }}
      </div>
    </div>
  </div>
</template>

<script setup>
import useForecastRender from '@/hooks/useForecastRender';
import { toRefs } from 'vue';

const props = defineProps({
  forecast: {
    type: Array,
    required: true,
  },
});

const { forecast } = toRefs(props);
const {
  currentImgSrc,
  currentTemperature,
  currentDescription,
  currentWeatherType,
  currentWind,
  currentHumidity,
} = useForecastRender(forecast);
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
