<template>
  <div>
    <ul>
      <li>
        <the-search-item
          v-for="searchItem in suggestions"
          :searchItem="searchItem"
          :key="searchItem.data.fias_id"
        />
      </li>
    </ul>
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
