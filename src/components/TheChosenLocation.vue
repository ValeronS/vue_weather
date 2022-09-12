<template>
  <div class="location-field">
    <div class="location">
      <img src="@/assets/img/map.png" />
      <h3 @click="$router.push('/location')">{{ chosenLocation }}</h3>
    </div>

    <div class="star" @click="addToFavorite">
      <img
        v-if="!$store.state.isCityFavorite"
        src="@/assets/img/star-line.png"
        alt=""
      />
      <img v-else src="@/assets/img/star-fill.png" alt="" />
    </div>
  </div>
</template>

<script>
import useFavoriteLocation from '@/hooks/useFavoriteLocation';
import { useFillStar } from '@/hooks/useFillStar';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'the-chosen-location',
  props: {
    chosenLocation: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { isStarFilled, fillStar } = useFillStar();
    const { favoriteLocation, addToFavorite } = useFavoriteLocation(fillStar);
    const store = useStore();
    const chosenLocation = ref(store.state.chosenLocation);
    watch(
      () => chosenLocation,
      async () => fillStar
    );

    return {
      favoriteLocation,
      addToFavorite,
      isStarFilled,
      fillStar,
    };
  },
};
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
