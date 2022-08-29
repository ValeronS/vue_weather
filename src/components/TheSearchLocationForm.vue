<template>
  <form action="" class="search-container">
    <img
      src="@/assets/img/arrow.png"
      class="img-left"
      @click="$router.push('/')"
    />
    <app-input
      v-model="location"
      type="text"
      class="text"
      placeholder="Поиск локации"
    />
    <img
      src="@/assets/img/focus.png"
      class="img-right"
      @click="$router.push('/')"
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
.search-container {
  position: relative;
  top: 44px;
  left: 16px;
  margin-right: 32px;
}
.search-container > .img-left {
  position: absolute;
  width: 24px;
  top: 12px;
  left: 16px;
  cursor: pointer;
}
.search-container > .img-right {
  position: absolute;
  width: 24px;
  top: 12px;
  right: 16px;
  cursor: pointer;
}
.search-container > input {
  width: 100%;
  padding-left: 56px;
  height: 48px;
  border: 1px solid var(--secondary-color);
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: var(--primary-color);
}
.search-container > input::placeholder {
  color: var(--secondary-color);
}
</style>
