<template>
  <div class="home">
    <the-chosen-location :chosenLocation="chosenLocation" />

    <the-current-forecast />

    <app-button @click="$router.push('/location')" class="btn-position">
      <h3>Выбрать локацию</h3>
    </app-button>
  </div>
</template>

<script>
import TheChosenLocation from '@/components/TheChosenLocation.vue';
import { useFetchWeather } from '@/hooks/useFetchWeather';
import useSelectSearchItem from '@/hooks/useSelectSearchItem';
import TheCurrentForecast from '@/components/TheCurrentForecast.vue';
export default {
  components: {
    TheChosenLocation,
    TheCurrentForecast,
  },
  setup(props) {
    const { chosenLocation } = useSelectSearchItem();
    const { fetchWeater } = useFetchWeather();

    return {
      chosenLocation,
      fetchWeater,
    };
  },
};
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
</style>
