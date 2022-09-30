<template>
  <div>
    <the-search-form @getLocation="getLocation" @click="changeFocus">
      <input
        v-model="location"
        @input="searchLocation(location)"
        type="text"
        placeholder="Поиск города"
        :class="{
          text: true,
          input__search: true,
          'none-box-shadow': Object.keys(
            $store.state.favoriteCity.favoriteLocations
          ).length,
        }"
      />
    </the-search-form>

    <transition name="fade">
      <the-search-history
        v-if="
          !location &&
          Object.keys($store.state.searchCity.searchHistory).length &&
          !$store.state.searchCity.isSearchInputFocused
        "
        :searchHistory="$store.state.searchCity.searchHistory"
        class="the-search-history"
      />
    </transition>

    <the-search-list
      :suggestions="$store.state.searchCity.suggestions"
      @selectSearchItem="selectItem"
      class="search-list"
    />

    <transition name="fade">
      <p
        v-if="
          $store.state.searchCity.isSearchInputFocused &&
          !$store.state.searchCity.suggestions.length
        "
        class="empty-list text"
      >
        Введите название города
      </p>
    </transition>

    <div v-if="$store.state.selectedCity.isLoading" class="spinner">
      <img src="@/assets/img/circles-loader.png" alt="" class="spinner-img" />
    </div>
  </div>
</template>

<script>
import TheSearchForm from '@/components/UI/TheSearchForm.vue';
import TheSearchList from '@/components/UI/TheSearchList.vue';
import TheFavoriteList from '@/components/UI/TheFavoriteList.vue';
import TheSearchHistory from '@/components/UI/TheSearchHistory.vue';
import useFavoriteLocation from '@/hooks/useFavoriteLocation';
import useGeolocation from '@/hooks/useGeolocation';
import useSearchLocation from '@/hooks/useSearchLocation';

export default {
  components: {
    TheSearchForm,
    TheSearchList,
    TheFavoriteList,
    TheSearchHistory,
  },
  setup(props) {
    const { cancelRemoveCity } = useFavoriteLocation();
    const { getLocation } = useGeolocation();
    const {
      historyItem,
      selectItem,
      location,
      suggestions,
      searchLocation,
      isSearchInputFocused,
      changeFocus,
    } = useSearchLocation();

    return {
      historyItem,
      selectItem,
      cancelRemoveCity,
      getLocation,
      isSearchInputFocused,
      changeFocus,
      location,
      suggestions,
      searchLocation,
    };
  },
};
</script>

<style>
.input__search {
  border: none;
  border-bottom: 1px solid var(--lines-color);
  border-radius: 0;
  box-shadow: none;
  outline: none;
  caret-color: var(--accent-dark-color);
  width: 100%;
  height: 48px;
  padding-left: 56px;
}
.the-search-history {
  position: absolute;
  top: 92px;
  width: 100vw;
}
.empty-list {
  color: var(--secondary-color);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.search-list {
  position: absolute;
  top: 132px;
  width: 100vw;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.spinner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  display: flex;
}
.spinner-img {
  width: 36px;
  height: 36px;
  margin: auto;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
