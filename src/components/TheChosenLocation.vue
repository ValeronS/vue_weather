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
import useChosenLocation from '@/hooks/useChosenLocation';
import useFavoriteLocation from '@/hooks/useFavoriteLocation';
import { watch, toRefs } from 'vue';

// const props = defineProps({
//   chosenLocation: {
//     type: String,
//     required: true,
//   },
// });
// const { chosenLocation } = toRefs(props);

const { chosenLocation } = useChosenLocation();
const { favoriteLocation, addToFavorite, showModal } = useFavoriteLocation();

// watch(
//   () => chosenLocation,
//   async () => fillStar
// );
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
