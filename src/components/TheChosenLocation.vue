<template>
  <div class="location-field">
    <div @click="$router.push('/favorite')" class="location">
      <img src="@/assets/img/map.png" />
      <h3>{{ chosenLocation }}</h3>
    </div>

    <div class="star" @click="addToFavorite">
      <img
        v-if="!$store.state.favoriteCity.isCityFavorite"
        src="@/assets/img/star-line.png"
        alt=""
        @click="showModal"
      />
      <img v-else src="@/assets/img/star-fill.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import useFavoriteLocation from '@/hooks/useFavoriteLocation';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const chosenLocation = computed(() => {
  return store.state.selectedCity.chosenCity.name;
});

const { favoriteLocation, addToFavorite, showModal } = useFavoriteLocation();
</script>

<style>
.location-field {
  position: relative;
  top: 44px;
  left: 16px;
  margin-right: 32px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.location {
  display: flex;
  align-items: center;
}
.location-field h3 {
  padding-left: 8px;
  color: var(--white);
  display: inline;
  cursor: pointer;
}
.location-field img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.star {
  display: flex;
  align-items: center;
}
</style>
