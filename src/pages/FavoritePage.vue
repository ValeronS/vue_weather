<template>
  <div>
    <the-search-form @getLocation="getLocation">
      <input
        @click="$router.push('/search')"
        type="text"
        placeholder="Поиск локации"
        :class="{
          text: true,
          input__favorite: true,
          'none-box-shadow': Object.keys(
            $store.state.favoriteCity.favoriteLocations
          ).length,
        }"
      />
    </the-search-form>

    <the-favorite-list
      v-if="!$store.state.searchCity.suggestions.length"
      :favoriteLocations="$store.state.favoriteCity.favoriteLocations"
      class="favorite-locations-list"
      @selectFavoriteCity="selectItem"
    />

    <transition name="fade">
      <p
        v-if="!Object.keys($store.state.favoriteCity.favoriteLocations).length"
        class="empty-list text"
      >
        У вас пока нет избранных локаций
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
import TheSearchForm from '@/components/UI/TheSearchForm.vue';
import TheSearchList from '@/components/UI/TheSearchList.vue';
import TheFavoriteList from '@/components/UI/TheFavoriteList.vue';
import TheSearchHistory from '@/components/UI/TheSearchHistory.vue';
import useSearchLocation from '@/hooks/useSearchLocation';
import useFavoriteLocation from '@/hooks/useFavoriteLocation';
import useGeolocation from '@/hooks/useGeolocation';

export default {
  components: {
    TheSearchForm,
    TheSearchList,
    TheFavoriteList,
    TheSearchHistory,
  },
  setup(props) {
    const { selectItem } = useSearchLocation();
    const { cancelRemoveCity } = useFavoriteLocation();
    const { getLocation } = useGeolocation();

    return {
      selectItem,
      cancelRemoveCity,
      getLocation,
    };
  },
};
</script>

<style>
input.none-box-shadow {
  box-shadow: none;
}
.input__favorite {
  width: 100%;
  padding-left: 56px;
  height: 48px;
  border: 1px solid var(--secondary-color);
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: var(--primary-color);
}
.empty-list {
  color: var(--secondary-color);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
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
