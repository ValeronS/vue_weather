<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-button',
};
</script>

<style>
.btn {
  position: absolute;
  width: 198px;
  height: 56px;
  left: 89px;
  top: 575px;
  color: #47b1e6;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
</style>
