
<script setup>
import { defineProps, defineEmits } from "vue";

// Props för att ta in modallogik och råttdata
defineProps({
  isVisible: Boolean, // Styr om modalen är synlig
  selectedRat: Object, // Håller den valda råttan
});

// Emit för att signalera stängning av modalen
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
      <template v-if="selectedRat">
        <h2>{{ selectedRat.name }}</h2>
        <p>Skill: {{ selectedRat.primarySkill }}</p>
        <p>Area: {{ selectedRat.areaOfMalmo }}</p>
        <p>Price: {{ selectedRat.price }}:-</p>
        <img :src="selectedRat.imgUrl" :alt="selectedRat.name" />
      </template>
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
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Make sure it's above other elements */
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 90%; /* Max width to fit smaller screens */
  max-width: 500px; /* Don't grow beyond this size */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.close-button:hover {
  color: red;
}

.modal-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
