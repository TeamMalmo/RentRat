<script setup>
import { ref } from 'vue';

defineProps({
  rat: Object, // Data för en specifik råtta
});

// State för att hantera modalens synlighet
const isModalVisible = ref(true);

// Funktion för att stänga modalen
const closeModal = () => {
  isModalVisible.value = false;
};
</script>

<template>
  <!-- Modal-overlay -->
  <div v-if="isModalVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- Stängknapp -->
      <button class="close-button" @click="closeModal">×</button>

      <!-- Visar information om råttan -->
      <span>
        <h2>{{ rat.name }} in {{ rat.areaOfMalmo }}</h2>
        <p>Primary Skill: {{ rat.primarySkill }}</p>
        <p>Other Skills: {{ rat.skills.join(', ') }}</p>
        <p>Available? {{ rat.availability ? 'Yes' : 'No' }}</p>
        <p>Renter: {{ rat.renter }}</p>
      </span>
      <span>
        <img :src="rat.imgUrl" alt="rat-image" class="rat-image" />
        <p>Hourly Rate: {{ rat.price }}:-</p>
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Modal-overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal-content */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.close-button:hover {
  color: red;
}

.rat-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
