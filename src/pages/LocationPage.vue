<template>
  <div>
    <the-search-location-form
      @getLocation="getLocation"
    ></the-search-location-form>

    <the-search-history
      v-if="
        !$store.state.searchCity.isSearchInputFocused &&
        Object.keys($store.state.searchCity.searchHistory).length &&
        !Object.keys($store.state.favoriteCity.favoriteLocations).length
      "
      :searchHistory="$store.state.searchCity.searchHistory"
      class="the-search-history"
    />

    <the-search-list
      :suggestions="$store.state.searchCity.suggestions"
      @selectSearchItem="selectItem"
      class="search-list"
    />

    <the-favorite-list
      v-if="!$store.state.searchCity.suggestions.length"
      :favoriteLocations="$store.state.favoriteCity.favoriteLocations"
      class="favorite-locations-list"
      @selectFavoriteCity="selectItem"
    />

    <transition name="fade">
      <p
        v-if="
          !Object.keys($store.state.favoriteCity.favoriteLocations).length &&
          !$store.state.searchCity.isSearchInputFocused &&
          !$store.state.searchCity.suggestions.length &&
          !Object.keys($store.state.searchCity.searchHistory).length
        "
        class="empty-list text"
      >
        У вас пока нет избранных локаций
      </p>
    </transition>

    <transition name="fade">
      <p
        v-if="
          $store.state.searchCity.isSearchInputFocused &&
          !$store.state.searchCity.suggestions.length &&
          !Object.keys($store.state.favoriteCity.favoriteLocations).length
        "
        class="empty-list text"
      >
        Введите название города
      </p>
    </transition>

    <div v-if="$store.state.selectedCity.isLoading" class="spinner">
      <img src="@/assets/img/circles-loader.png" alt="" class="spinner-img" />
    </div>

    <transition name="fade">
      <app-modal v-if="$store.state.favoriteCity.deletedFavoriteCity.name"
        >Локация удалена
        <div @click="cancelRemoveCity" class="modal-cancel">Отменить</div>
      </app-modal>
    </transition>
  </div>
</template>

<script>
import TheSearchLocationForm from '@/components/TheSearchLocationForm.vue';
import TheSearchList from '@/components/TheSearchList.vue';
import TheFavoriteList from '@/components/TheFavoriteList.vue';
import TheSearchHistory from '@/components/TheSearchHistory.vue';
import useSelectSearchItem from '@/hooks/useSelectSearchItem';
import useFavoriteLocation from '@/hooks/useFavoriteLocation';
import useGeolocation from '@/hooks/useGeolocation';

export default {
  components: {
    TheSearchLocationForm,
    TheSearchList,
    TheFavoriteList,
    TheSearchHistory,
  },
  setup(props) {
    const { historyItem, selectItem } = useSelectSearchItem();
    const { cancelRemoveCity } = useFavoriteLocation();
    const { getLocation } = useGeolocation();

    return {
      historyItem,
      selectItem,
      cancelRemoveCity,
      getLocation,
    };
  },
};
</script>

<style>
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
.favorite-locations-list {
  position: absolute;
  top: 108px;
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
.modal-cancel {
  color: var(--accent-dark-color);
  padding-left: 16px;
  cursor: pointer;
}
</style>
