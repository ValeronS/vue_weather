<template>
  <div class="background-container">
    <form
      action=""
      :class="{
        'search-container': true,
        'search-container__focused': $route.path === '/search',
      }"
    >
      <img
        src="@/assets/img/arrow.png"
        class="img-left"
        @click="$router.push('/')"
      />

      <slot></slot>

      <img
        v-if="!$store.state.searchCity.isSearchInputFocused"
        src="@/assets/img/focus.png"
        class="img-location"
        @click="$emit('getLocation')"
      />
      <img
        v-else
        src="@/assets/img/dismiss.png"
        alt=""
        class="img-dismiss"
        @click="dismiss"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'the-search-form',
};
</script>

<style>
.background-container {
  height: 100vh;
}

.search-container {
  position: relative;
  top: 44px;
  left: 16px;
  margin-right: 32px;
  transition: all 500ms;
}
.search-container__focused {
  left: 0;
  margin-right: 0;
}
.search-container > .img-left {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 12px;
  left: 16px;
  cursor: pointer;
}
.img-location {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 12px;
  right: 16px;
  cursor: pointer;
}
.img-dismiss {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  width: 16px;
  height: 16px;
}
.search-container > input::placeholder {
  color: var(--secondary-color);
}
</style>
