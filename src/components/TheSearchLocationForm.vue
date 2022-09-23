<template>
  <div class="background-container" @click="changeFocus">
    <form
      action=""
      :class="{
        'search-container': true,
        'search-container__focused': isSearchInputFocused,
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
          searchInputFocused: isSearchInputFocused,
          'none-box-shadow': Object.keys($store.state.favoriteLocations)
            .length,
        }"
      />
      <img
        v-if="!location"
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
import useChangeFocus from '@/hooks/useChangeFocus';
import useSearchLocation from '@/hooks/useSearchLocation';

export default {
  name: 'the-search-location-form',
  setup(props) {
    const { location, suggestions, searchLocation } = useSearchLocation();
    const { inputPlaceholder, isSearchInputFocused, changeFocus, dismiss } =
      useChangeFocus(location);

    return {
      inputPlaceholder,
      isSearchInputFocused,
      changeFocus,
      location,
      suggestions,
      searchLocation,
      dismiss,
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
.search-container > input {
  width: 100%;
  padding-left: 56px;
  height: 48px;
  border: 1px solid var(--secondary-color);
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: var(--primary-color);
}
.search-container > input.searchInputFocused {
  border: none;
  border-bottom: 1px solid var(--lines-color);
  border-radius: 0;
  box-shadow: none;
  outline: none;
  caret-color: var(--accent-dark-color);
}
.search-container > input.none-box-shadow {
  box-shadow: none;
}
.search-container > input::placeholder {
  color: var(--secondary-color);
}
</style>
