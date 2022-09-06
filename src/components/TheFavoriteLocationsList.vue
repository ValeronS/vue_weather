<template>
  <div>
    <ul>
      <li>
        <the-favorite-city
          v-for="favoriteCity in favoriteLocations"
          :key="favoriteCity.name"
          :favoriteCity="favoriteCity"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import TheFavoriteCity from './TheFavoriteCity.vue';

export default {
  name: 'the-favorite-locations-list',
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

<style></style>
