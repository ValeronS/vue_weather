import axios from 'axios';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default function suggestionsApi() {
  const store = useStore();
  const token = '2a5003ab085c07782a03a08c8ec8b7fad6a5d9fc';
  const baseUrl =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  const suggestions = ref([]);

  const searchLocation = async (location) => {
    try {
      const response = await axios.post(
        baseUrl,
        {
          query: location,
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
      store.commit('searchCity/setSuggestions', response.data.suggestions);
      // console.log(suggestions.value);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    searchLocation,
  };
}
