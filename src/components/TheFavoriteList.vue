<template>
  <TransitionGroup name="list" tag="ul">
    <the-favorite-city
      v-for="favoriteCity in favoriteLocations"
      :key="favoriteCity.name"
      :favoriteCity="favoriteCity"
      @selectFavoriteCity="$emit('selectFavoriteCity', favoriteCity)"
    />
  </TransitionGroup>
</template>

<script>
import TheFavoriteCity from './TheFavoriteCity.vue';

export default {
  name: 'the-favorite-list',
  components: {
    TheFavoriteCity,
  },
  props: {
    favoriteLocations: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
