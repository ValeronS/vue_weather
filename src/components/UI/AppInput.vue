<template>
  <input v-model="modelValue" />
</template>

<script>
export default {
  name: 'app-input',
  props: {
    modelValue: String,
  },
};
</script>

<style></style>
