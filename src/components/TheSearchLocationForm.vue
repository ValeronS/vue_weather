<template>
  <form action="">
    <app-input
      v-model="location"
      type="text"
      class="search__input text"
      placeholder="Поиск локации"
    />
  </form>
</template>

<script>
export default {
  name: 'the-search-location-form',
  data() {
    return {
      location: '',
    };
  },
};
</script>

<style>
.search__input {
  position: absolute;
  width: 343px;
  height: 48px;
  left: 16px;
  top: 44px;
  border: 1px solid var(--secondary-color);
  border-radius: 15px;
  padding-left: 16px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: var(--primary-color);
}
.search__input::placeholder {
  color: var(--secondary-color);
}
</style>
