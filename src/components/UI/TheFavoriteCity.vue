<template>
  <div
    @click="$emit('selectFavoriteCity', favoriteCity), $router.push('/')"
    class="favorite-city__container"
  >
    <div class="favorite-city">
      <div class="favorite-city__img">
        <img :src="currentImgSrc" alt="" />
      </div>

      <div
        :favoriteCity="fetchWeather(favoriteCity)"
        class="favorite-city__description"
      >
        <h2>{{ favoriteCity.name }}</h2>
        <p>{{ currentDescription }}</p>
        <h2>{{ currentTemperature }}</h2>
      </div>

      <img
        src="@/assets/img/star-fill-blue.png"
        alt=""
        class="star-fill-blue"
        @click.stop="removeCity(favoriteCity)"
      />
    </div>

    <div>
      <hr />
    </div>
  </div>
</template>

<script>
import useFetchWeather from '@/hooks/useFetchWeather';
import useFavoriteLocation from '@/hooks/useFavoriteLocation';
import useForecastRender from '@/hooks/useForecastRender';

export default {
  name: 'the-favorite-city',
  props: {
    favoriteCity: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { forecast, fetchWeather } = useFetchWeather();
    const { currentImgSrc, currentTemperature, currentDescription } =
      useForecastRender(forecast);
    const { removeCity } = useFavoriteLocation();

    return {
      fetchWeather,
      currentImgSrc,
      currentTemperature,
      currentDescription,
      removeCity,
    };
  },
};
</script>

<style>
.favorite-city {
  position: relative;
  left: 16px;
  margin-right: 32px;
  height: 111px;
  display: flex;
}
.favorite-city__img {
  display: flex;
  align-items: center;
}
.favorite-city__img img {
  width: 82px;
  height: 82px;
}
.favorite-city__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-left: 24px;
}
.star-fill-blue {
  position: relative;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
}
.favorite-city__container hr {
  border: 1px solid var(--lines-color);
}
</style>
