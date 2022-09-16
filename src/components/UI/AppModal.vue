<template>
  <div class="modal-container">
    <div class="modal">
      <div class="modal-img-slot">
        <img src="@/assets/img/checkbox-circle-line.png" alt="" />
        <slot class="modal-slot text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-modal',
};
</script>

<style>
.modal-container {
  position: relative;
  bottom: 71px;
  width: 283px;
  margin-left: auto;
  margin-right: auto;
}
.modal {
  height: 56px;
  border: 1px solid var(--lines-color);
  border-radius: 5px;
  box-shadow: 2px 2px 4px 0 rgba(11, 26, 34, 0.12);
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.modal-img-slot {
  display: flex;
  align-items: center;
}
.modal img {
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-right: 8px;
}
.modal-slot {
  color: var(--color-primary);
}
</style>
