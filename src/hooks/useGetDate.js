import { ref } from 'vue';

export default function useGetDate() {
  const month = ref('');
  const date = new Date();

  const day = date.getDate();

  switch (date.getMonth()) {
    case 0:
      month.value = 'янв';
      break; // без него будет проваливание - fallthrough
    case 1:
      month.value = 'фвр';
      break;
    case 2:
      month.value = 'мрт';
      break; // без него будет проваливание - fallthrough
    case 3:
      month.value = 'апр';
      break;
    case 4:
      month.value = 'мая';
      break; // без него будет проваливание - fallthrough
    case 5:
      month.value = 'июн';
      break;
    case 6:
      month.value = 'июл';
      break; // без него будет проваливание - fallthrough
    case 7:
      month.value = 'авг';
      break;
    case 8:
      month.value = 'снт';
      break; // без него будет проваливание - fallthrough
    case 9:
      month.value = 'окт';
      break;
    case 10:
      month.value = 'нбр';
      break; // без него будет проваливание - fallthrough
    case 11:
      month.value = 'дкб';
      break;
  }

  return {
    day,
    month,
  };
}
