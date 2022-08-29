<template>
  <div class="home">
    <the-chosen-location :chosenLocation="chosenLocation" />

    <div class="weather__current">
      <img src="@/assets/img/cloudy.png" />
      <h1 class="weather__current-temperature">-</h1>
      <h2 class="weather__current-description">-</h2>
    </div>

    <app-button @click="$router.push('/location')" class="btn-position">
      <h3>Выбрать локацию</h3>
    </app-button>
  </div>
</template>

<script>
import TheChosenLocation from '@/components/TheChosenLocation.vue';
import useSearchLocation from '@/hooks/useSearchLocation';
export default {
  components: { TheChosenLocation },
  setup(props) {
    const { chosenLocation } = useSearchLocation();

    return {
      chosenLocation,
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

.weather__current {
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather__current > img {
  width: 148px;
}
.weather__current-temperature {
  color: var(--white);
}
.weather__current-description {
  color: var(--white);
}

.btn-position {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
