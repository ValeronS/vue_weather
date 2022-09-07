<template>
  <div>
    <the-search-location-form></the-search-location-form>
    <the-search-list
      :suggestions="$store.state.suggestions"
      @selectSearchItem="selectItem"
      class="search-list"
    />

    <the-favorite-list
      v-if="!$store.state.suggestions.length"
      :favoriteLocations="$store.state.favoriteLocations"
      class="favorite-locations-list"
      @selectFavoriteCity="selectItem"
    />

    <p
      v-if="
        !$store.state.favoriteLocationsLength &&
        !$store.state.onFocus &&
        !$store.state.suggestions.length
      "
      class="empty-list text"
    >
      У вас пока нет избранных локаций
    </p>

    <p
      v-if="$store.state.onFocus && !$store.state.suggestions"
      class="empty-list text"
    >
      Введите название города
    </p>

    <app-modal @cancel="cancelRemoveCity" class="app-modal"
      >Локация удалена</app-modal
    >
  </div>
</template>

<script>
import TheSearchLocationForm from '@/components/TheSearchLocationForm.vue';
import TheSearchList from '@/components/TheSearchList.vue';
import useSelectSearchItem from '@/hooks/useSelectSearchItem';
import TheFavoriteList from '@/components/TheFavoriteList.vue';
import AppModal from '@/components/UI/AppModal.vue';
import useFavoriteLocation from '@/hooks/useFavoriteLocation';

export default {
  components: {
    TheSearchLocationForm,
    TheSearchList,
    TheFavoriteList,
    AppModal,
  },
  setup(props) {
    const { selectItem } = useSelectSearchItem();
    const { cancelRemoveCity } = useFavoriteLocation();

    return {
      selectItem,
      cancelRemoveCity,
    };
  },
};
</script>

<style>
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
</style>
