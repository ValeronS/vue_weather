import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default function useGeolocation(fetchWeather) {
  const store = useStore();
  const router = useRouter();
  const isSupported = 'navigator' in window && 'geolocation' in navigator;
  const coords = ref({});

  const getLocation = async () => {
    if (isSupported) {
      store.commit('setLoading', true);
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      };

      const succsess = async (pos) => {
        coords.value = pos.coords;
        console.log(coords.value);
        store.commit('setLatitude', pos.coords.latitude);
        store.commit('setLongitude', pos.coords.longitude);
        store.commit('setChosenLocation', '');
        router.push('/');
      };

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(succsess, error, options);
    }
  };

  return {
    getLocation,
    coords,
  };
}
