import { ref } from 'vue';
import { useStore } from 'vuex';
import suggestionsApi from '@/services/suggestions/index';

export default function useSearchLocation() {
  const store = useStore();
  const location = ref('');
  const suggestions = ref([]);

  const searchLocation = async (location) => {
    const response = await suggestionsApi.getSuggestion(location);
    suggestions.value = response.data.suggestions;
    store.commit('searchCity/setSuggestions', suggestions.value);
    console.log(response.data.suggestions);
  };

  return {
    location,
    suggestions,
    searchLocation,
  };
}
