<template>
  <div class="forecast__current">
    <img :src="imgSrc" />
    <h1 class="forecast__current-temperature">
      {{ $store.state.currentTemperature }}
    </h1>
    <h2 class="forecast__current-description">
      {{ $store.state.currentDescription }}
    </h2>
  </div>
</template>

<script>
import { useCurrentIcon } from '@/hooks/useCurrentIcon';

export default {
  name: 'the-current-forecast',
  data() {
    return {
      iconCode: '',
    };
  },

  setup(props) {
    const { imgSrc } = useCurrentIcon();

    return {
      imgSrc,
    };
  },
};
</script>

<style>
.forecast__current {
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.forecast__current > img {
  width: 148px;
}
.forecast__current-temperature {
  color: var(--white);
}
.forecast__current-description {
  color: var(--white);
  text-transform: capitalize;
}
</style>
