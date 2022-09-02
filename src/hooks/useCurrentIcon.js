import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export function useCurrentIcon() {
  const store = useStore();
  const weatherIcons = store.state.weatherIcons;
  const imgSrc = ref(weatherIcons[store.state.imgSrcIdx].src);

  const currentIcon = async () => {
    setTimeout(() => {
      for (let i = 0; i < weatherIcons.length; i++) {
        if (store.state.iconCode === weatherIcons[i].icon) {
          imgSrc.value = weatherIcons[i].src;
          store.commit('setImgSrcIdx', i);
        }
      }
      console.log(store.state.imgSrcIdx);
    }, 500);
  };

  onMounted(currentIcon);

  return {
    imgSrc,
    currentIcon,
  };
}
