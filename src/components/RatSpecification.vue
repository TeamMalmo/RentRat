<script setup>
import { ref, defineProps, defineEmits } from "vue";

// Props för att visa eller dölja modalen
defineProps({
  isVisible: Boolean, // Styr om modalen visas
});

// Emit för att signalera att modalen ska stängas
const emit = defineEmits(["close"]);

// Funktion för att stänga modalen
const close = () => {
  emit("close");
};
</script>

<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-button" @click="close">×</button>
        <slot></slot>
      </div>
    </div>
  </template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>