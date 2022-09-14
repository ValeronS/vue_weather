<template>
  <div class="search-item__container">
    <p class="search-item__country">
      {{ searchItem.data.country }}
    </p>
    <h3
      class="search-item"
      @click.prevent="$emit('selectSearchItem', searchItem), $router.push('/')"
    >
      {{
        searchItem.data.city ||
        searchItem.data.city_with_type ||
        searchItem.data.settlement ||
        searchItem.value
      }}
    </h3>
    <hr class="search-item__hr" />
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
.search-item__country {
  height: 24px;
  margin-left: 16px;
  color: var(--secondary-color);
}
.search-item {
  height: 56px;
  padding-left: 56px;
  display: flex;
  align-items: center;
}
.search-item__hr {
  border: 1px solid var(--lines-color);
}
</style>
