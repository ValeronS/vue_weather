<template>
  <div class="home">
    <chosen-location></chosen-location>
    <app-button @click="$router.push('/location')"
      ><h3>Выбрать локацию</h3></app-button
    >
  </div>
</template>

<script>
import ChosenLocation from '@/components/ChosenLocation.vue';
export default { components: { ChosenLocation } };
</script>

<style>
.home {
  background: #47b1e6;
  width: 100%;
  height: 100vh;
}
</style>
