<template>
  <div>
    <the-search-location-form></the-search-location-form>
    <p
      v-if="favoriteLocations.length === 0 && !$store.state.onFocus"
      class="empty-list text"
    >
      У вас пока нет избранных локаций
    </p>

    <p v-if="$store.state.onFocus" class="empty-list text">
      Введите название города
    </p>
  </div>
</template>

<script>
import TheSearchLocationForm from '@/components/TheSearchLocationForm.vue';
import useSearchLocation from '@/hooks/useSearchLocation';

export default {
  components: { TheSearchLocationForm },
  setup(props) {
    const { favoriteLocations } = useSearchLocation();

    return {
      favoriteLocations,
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
</style>
