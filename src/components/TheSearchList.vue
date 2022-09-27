<template>
  <div>
    <the-search-item
      v-for="searchItem in suggestions"
      :searchItem="searchItem"
      :key="searchItem.data.fias_id"
      @selectSearchItem="$emit('selectSearchItem', searchItem)"
    />
  </div>
</template>

<script>
import TheSearchItem from '@/components/TheSearchItem.vue';

export default {
  name: 'the-search-list',
  components: {
    TheSearchItem,
  },
  props: {
    suggestions: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
