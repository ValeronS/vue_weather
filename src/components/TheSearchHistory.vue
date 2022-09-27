<template>
  <div>
    <div class="history__header">
      <p class="history__secondary text">История поиска</p>
      <p class="history__accent-dark" @click="clearSearchHistory">Очистить</p>
    </div>

    <the-search-history-item
      v-for="historyItem in searchHistory"
      :key="historyItem.name"
      :historyItem="historyItem"
      @selectedHistoryItem="selectItem"
    />
  </div>
</template>

<script setup>
import TheSearchHistoryItem from '@/components/TheSearchHistoryItem.vue';
import useSelectSearchItem from '@/hooks/useSelectSearchItem';
import { toRefs } from 'vue';

const props = defineProps({
  searchHistory: {
    type: Object,
    required: true,
  },
});
const { searchHistory } = toRefs(props);
const { selectItem, clearSearchHistory } = useSelectSearchItem();
</script>

<style>
.history__header {
  height: 56px;
  position: relative;
  left: 16px;
  margin-right: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.history__secondary {
  color: var(--secondary-color);
}
.history__accent-dark {
  color: var(--accent-dark-color);
}
</style>
