import { computed } from 'vue';
import { useStore } from 'vuex';

export function useCurrentIcon() {
  const store = useStore();
  const IconsWeather = store.state.IconsWeather;
  const imgSrc = computed(
    () =>
      IconsWeather[store.state.iconCode]?.src ??
      console.log('IconsWeatherUnknown')
  );

  return {
    imgSrc,
  };
}
