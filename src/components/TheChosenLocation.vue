<template>
  <div class="location-field">
    <img src="@/assets/img/map.png" class="img__map" />
    <h3>{{ chosenLocation }}</h3>
  </div>
</template>

<script>
export default {
  name: 'the-chosen-location',
  props: {
    chosenLocation: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.location-field {
  position: relative;
  top: 44px;
  left: 16px;
  margin-right: 32px;
  height: 48px;
  display: flex;
  align-items: center;
}
.img__map {
  width: 24px;
  height: 24px;
}
.location-field > h3 {
  padding-left: 8px;
  color: var(--white);
}
</style>
