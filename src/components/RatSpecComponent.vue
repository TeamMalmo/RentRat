<script setup>
import { ref, onMounted } from "vue";
import { useRats } from "../composables/useRats";

// State för modalen
const isModalVisible = ref(false);
const selectedRat = ref(null);

// Hämta råttorna med composable
const { rats, isLoading, fetchRats } = useRats();

// Hämta råttor när komponenten mountas
onMounted(() => {
  fetchRats();
});

// Funktion för att öppna modalen med vald råtta
const openModal = (rat) => {
  selectedRat.value = rat;
  isModalVisible.value = true;
};

// Funktion för att stänga modalen
const closeModal = () => {
  isModalVisible.value = false;
  selectedRat.value = null;
};
</script>

<template>
  <div>
    <!-- Lista med råttor -->
    <ul class="rat-list" v-if="!isLoading">
      <li
        v-for="rat in rats"
        :key="rat.id"
        class="rat-list-item"
        @click="openModal(rat)"
      >
        <h2>{{ rat.name }}</h2>
        <p>{{ rat.primarySkill }}</p>
      </li>
    </ul>
    <p v-else>Loading rats...</p>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">×</button>
        <template v-if="selectedRat">
          <h2>{{ selectedRat.name }}</h2>
          <p>Skill: {{ selectedRat.primarySkill }}</p>
          <p>Area: {{ selectedRat.areaOfMalmo }}</p>
          <p>Hourly rate: {{ selectedRat.price }}:-</p>
          <img :src="selectedRat.imgUrl" :alt="selectedRat.name" />
        </template>
      </div>
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

.rat-list {
  list-style: none;
  padding: 0;
}

.rat-list-item {
  cursor: pointer;
  background: #f0f0f0;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
}

.rat-list-item:hover {
  background: #e0e0e0;
}

.modal-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
