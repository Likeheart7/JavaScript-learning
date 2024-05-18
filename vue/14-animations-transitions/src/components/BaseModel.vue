<template>
  <div v-if="open" class="backdrop" @click="$emit('close')"></div>
  <dialog open v-if="open">
    <slot></slot>
  </dialog>
</template>

<script>
export default {
  props: ['open'],
  emits: ['close'],
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
}

dialog {
  position: fixed;
  top: 30vh;
  width: 30rem;
  left: calc(50% - 15rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
  animation: dialog-in 0.3s ease-out forwards;
}

@keyframes dialog-in {
  0% {
    opacity: 30%;
    transform: translateY(-20%) scale(0.75);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* dialog显示弹入效果 */
</style>