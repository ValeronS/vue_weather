<template>
  <div class="background-container" @click="changeFocus">
    <form
      action=""
      :class="{
        'search-container': true,
        'search-container__focused': onFocus,
      }"
    >
      <img
        src="@/assets/img/arrow.png"
        class="img-left"
        @click="$router.push('/')"
      />
      <input
        v-model="location"
        @input="searchLocation"
        type="text"
        :placeholder="inputPlaceholder"
        :class="{
          text: true,
          inputOnFocus: onFocus,
        }"
      />
      <img
        src="@/assets/img/focus.png"
        class="img-right"
        @click="$router.push('/')"
      />
    </form>
  </div>
</template>

<script>
import useChangeFocus from '@/hooks/useChangeFocus';
import useSearchLocation from '@/hooks/useSearchLocation';

export default {
  name: 'the-search-location-form',
  setup(props) {
    const { inputPlaceholder, onFocus, changeFocus } = useChangeFocus();
    const { location, suggestions, searchLocation } = useSearchLocation();

    return {
      inputPlaceholder,
      onFocus,
      changeFocus,
      location,
      suggestions,
      searchLocation,
    };
  },
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
}
.search-container__focused {
  left: 0;
  margin-right: 0;
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
.search-container > input.inputOnFocus {
  border: none;
  border-bottom: 1px solid var(--lines-color);
  border-radius: 0;
  box-shadow: none;
  outline: none;
}
.search-container > input::placeholder {
  color: var(--secondary-color);
}
</style>
