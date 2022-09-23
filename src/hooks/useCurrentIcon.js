import { IconsWeather } from '@/utils/constants';
import { computed } from 'vue';
import { useStore } from 'vuex';

export function useCurrentIcon() {
  const store = useStore();
  // const IconsWeather = store.state.IconsWeather;
  const imgSrc = computed(
    () =>
      (IconsWeather[store.state.currentWeatherType]?.src ??
        console.log('IconsWeatherUnknown')) ||
      IconsWeather['03d'].src
  );

  return {
    imgSrc,
  };
}
