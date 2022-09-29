import axios from 'axios';

const token = '2a5003ab085c07782a03a08c8ec8b7fad6a5d9fc';

const suggestionsService = axios.create({
  baseURL:
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token ' + token,
  },
  mode: 'cors',
});

export default {
  getSuggestions(location) {
    return suggestionsService.post('', {
      query: location,
      locations: [{ country: '*' }],
      from_bound: { value: 'city' },
      to_bound: { value: 'settlement' },
    });
  },
};
