import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default function useSearchLocation() {
  const store = useStore();
  const favoriteLocations = ref(store.state.favoriteLocations);
  const token = '2a5003ab085c07782a03a08c8ec8b7fad6a5d9fc';
  const location = ref('');
  const suggestions = ref([]);

  const searchLocation = async () => {
    try {
      const response = await axios.post(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        {
          query: location.value,
          locations: [{ country: '*' }],
          from_bound: { value: 'city' },
          to_bound: { value: 'settlement' },
        },
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + token,
          },
        }
      );
      suggestions.value = response.data.suggestions;
      store.commit('setSuggestions', response.data.suggestions);
      // console.log(suggestions.value);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    favoriteLocations,
    token,
    location,
    suggestions,
    searchLocation,
  };
}
