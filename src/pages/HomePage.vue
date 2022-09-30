<template>
  <div class="home">
    <div class="cloud"></div>
    <div class="cloud_2"></div>
    <the-chosen-location />

    <the-current-forecast :forecast="forecast" />

    <the-forecast :forecast="forecast" />

    <app-button
      @click="$router.push('/favorite')"
      class="btn-position"
      v-if="!forecast.length"
    >
      <h3>Выбрать локацию</h3>
    </app-button>

    <transition name="fade">
      <app-modal v-if="$store.state.favoriteCity.showModal" class="app-modal"
        >Локация добалена в избранное</app-modal
      >
    </transition>
  </div>
</template>

<script setup>
import TheChosenLocation from '@/components/TheChosenLocation.vue';
import useFetchWeather from '@/hooks/useFetchWeather';
import TheCurrentForecast from '@/components/TheCurrentForecast.vue';
import TheForecast from '@/components/TheForecats.vue';

const { forecast } = useFetchWeather();
</script>

<style>
.cloud {
  position: absolute;
  top: 92px;
  width: 65px;
  height: 85px;
  border-top: 1px dashed var(--accent-light-color);
  border-right: 1px dashed var(--accent-light-color);
  border-top-left-radius: 30px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 47px;
}
.cloud::before {
  position: absolute;
  content: '';
  top: 80px;
  width: 60px;
  height: 60px;
  border-left: 1px dashed var(--accent-light-color);
  border-top-left-radius: 50px;
}
.cloud_2 {
  position: absolute;
  right: 40px;
  width: 50px;
  height: 65px;
  border-left: 1px dashed var(--accent-light-color);
  border-top-left-radius: 50px;
}
.cloud_2::before {
  position: absolute;
  content: '';
  top: 65px;
  right: -1px;
  height: 50px;
  width: 50px;
  border-left: 1px dashed var(--accent-light-color);
  border-bottom-left-radius: 50px;
}
.cloud_2::after {
  position: absolute;
  content: '';
  top: 115px;
  right: -40px;
  height: 50px;
  width: 50px;
  border-right: 1px dashed var(--accent-light-color);
  border-top-right-radius: 50px;
}
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
