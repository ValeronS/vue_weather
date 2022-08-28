<template>
  <input :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  name: 'app-input',
  props: {
    modelValue: String,
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style></style>
