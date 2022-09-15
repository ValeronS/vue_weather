<template>
  <div class="home">
    <the-chosen-location />

    <the-current-forecast />

    <the-forecast :forecast="forecast" />

    <app-button
      @click="$router.push('/location')"
      class="btn-position"
      v-if="!forecast.length"
    >
      <h3>Выбрать локацию</h3>
    </app-button>

    <transition name="fade">
      <app-modal v-if="$store.state.showModal" class="app-modal"
        >Локация добалена в избранное</app-modal
      >
    </transition>
  </div>
</template>

<script setup>
import TheChosenLocation from '@/components/TheChosenLocation.vue';
import { useFetchWeather } from '@/hooks/useFetchWeather';
import TheCurrentForecast from '@/components/TheCurrentForecast.vue';
import TheForecast from '@/components/TheForecats.vue';
import useFirstUpperCase from '@/hooks/useFirstUpperCase';

const { firstUpperCase } = useFirstUpperCase();
const { forecast, fetchWeather } = useFetchWeather(firstUpperCase);
</script>

<style>
.home {
  background: var(--accent-dark-color);
  width: 100%;
  height: 100vh;
}

.btn-position {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translate(-50%, 0);
}
.app-modal {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, 0);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
