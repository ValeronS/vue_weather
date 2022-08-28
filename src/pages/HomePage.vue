<template>
  <div class="home">
    <the-chosen-location></the-chosen-location>
    <app-button @click="$router.push('/location')"
      ><h3>Выбрать локацию</h3></app-button
    >
  </div>
</template>

<script>
import TheChosenLocation from '@/components/TheChosenLocation.vue';
export default { components: { TheChosenLocation } };
</script>

<style>
.home {
  background: var(--accent-dark-color);
  width: 100%;
  height: 100vh;
}
</style>
