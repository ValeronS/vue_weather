<template>
  <div>
    <the-search-location-form></the-search-location-form>
    <the-search-list
      :suggestions="$store.state.suggestions"
      class="search-list"
    />

    <p
      v-if="
        favoriteLocations.length === 0 &&
        !$store.state.onFocus &&
        !$store.state.suggestions
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
  </div>
</template>

<script>
import TheSearchLocationForm from '@/components/TheSearchLocationForm.vue';
import TheSearchList from '@/components/TheSearchList.vue';
import useSearchLocation from '@/hooks/useSearchLocation';

export default {
  components: {
    TheSearchLocationForm,
    TheSearchList,
  },
  setup(props) {
    const { favoriteLocations, suggestions, searchLocation } =
      useSearchLocation();

    return {
      favoriteLocations,
      suggestions,
      searchLocation,
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
}
</style>
