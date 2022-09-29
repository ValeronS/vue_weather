<template>
  <div
    class="history-item__container"
    @click="$emit('selectedHistoryItem', historyItem), $router.push('/')"
  >
    <div class="history-item" :historyItem="fetchCityWeather(historyItem)">
      <div class="history-item__city">
        <img :src="imgSrc" alt="" />
        <h3>{{ historyItem.name }}</h3>
      </div>
      <p class="text">{{ tempMax + ' / ' + tempMin + '°' }}</p>
    </div>
    <hr />
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
import useFetchWeather from '@/hooks/useFetchWeather';
import useFirstUpperCase from '@/hooks/useFirstUpperCase';

const props = defineProps({
  historyItem: {
    type: Object,
    required: true,
  },
});

const { historyItem } = toRefs(props);
const { firstUpperCase } = useFirstUpperCase();
const { imgSrc, tempMin, tempMax, fetchCityWeather } =
  useFetchWeather(firstUpperCase);
</script>

<style>
.history-item__container {
  cursor: pointer;
}
.history-item {
  height: 56px;
  position: relative;
  left: 16px;
  margin-right: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.history-item img {
  width: 24px;
  height: 24px;
}
.history-item h3 {
  padding-left: 16px;
}
.history-item__city {
  display: flex;
}
</style>
