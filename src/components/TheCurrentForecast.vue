<template>
  <div class="forecast">
    <div class="forecast__current">
      <img :src="imgSrc" />

      <h1 class="forecast__current-temperature">
        {{ $store.state.currentTemperature }}
      </h1>

      <h2 class="forecast__current-description">
        {{ $store.state.currentDescription }}
      </h2>
    </div>

    <div v-if="$store.state.currentWind" class="forecast__conditions">
      <div class="wind">
        <img src="@/assets/img/windy.png" alt="" />
        {{ $store.state.currentWind }}
      </div>

      <div class="humidity">
        <img src="@/assets/img/hum.png" alt="" />
        {{ $store.state.currentHumidity }}
      </div>
    </div>
  </div>
</template>

<script>
import { useCurrentIcon } from '@/hooks/useCurrentIcon';

export default {
  name: 'the-current-forecast',
  data() {
    return {
      currentWeatherType: '',
    };
  },

  setup(props) {
    const { imgSrc } = useCurrentIcon();

    return {
      imgSrc,
    };
  },
};
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
