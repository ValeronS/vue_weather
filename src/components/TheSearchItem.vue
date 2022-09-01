<template>
  <div>
    <p v-if="searchItem.data.country != 'Россия'">
      {{ searchItem.data.country }}
    </p>
    <h3 class="search-item">
      {{
        searchItem.data.city ||
        searchItem.data.city_with_type ||
        searchItem.data.settlement ||
        searchItem.value
      }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'the-search-item',
  props: {
    searchItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.search-item {
  height: 56px;
  padding-left: 56px;
}
</style>
