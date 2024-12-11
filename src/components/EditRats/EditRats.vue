<script setup>
import { useFetchRats } from '@/composables/useFetchRats';
import { useUpdateRat } from '@/composables/useUpdateRat';
import { useAuth } from '@/composables/useUser'; 
import { onMounted, ref, computed } from 'vue';
import RatItem from '../FindRats/RatItem.vue';
import EditRatsForm from './EditRatsForm.vue';

const { rats, fetchAllRats } = useFetchRats();
const { updateRatById, isLoading, error } = useUpdateRat();
const auth= useAuth(); // hämtar den inloggade användaren

const selectedRat = ref(null);

// filtrera råttor baserat på ägaren
const ownedRats = computed(() => rats.value.filter((rat) => rat.renter === auth.value.username));

onMounted(() => {
  fetchAllRats();
});

// hantera redigering av en specifik rått
const handleEditRat = async (ratData) => {
  try {
    // kallar på edit
    await updateRatById(ratData);

    //uppdaterar UI:n lokalt
    const ratIndex = rats.value.findIndex((rat) => rat.id === ratData.id);
    if (ratIndex !== -1) {
      rats.value[ratIndex] = { ...rats.value[ratIndex], ...ratData };
    }
  } catch (error) {
    alert('Error updating rat.');
  } finally {
    selectedRat.value = null; // nollställer
  }
};
</script>

<template>
  <div class="edit-container">
    <!-- Loading... -->
    <div v-if="isLoading" class="loading-message">
      🐭 Loading rats... Please wait! 🐭
    </div>

    <!-- Error... -->
    <div v-else-if="error" class="error-message">
      ❌ Failed to fetch rats: {{ error }} ❌
    </div>
    <ul v-else>
      <!-- List of owned rats -->
      <RatItem 
        v-for="rat in ownedRats" 
        :key="rat.id" 
        :rat="rat" 
        @click="selectedRat = rat" 
      />
    </ul>

    <div>
      <!-- Prompt to select a rat -->
      <p v-if="!selectedRat">Select a rat to edit</p>
      <!-- Form to edit the selected rat -->
      <EditRatsForm 
        v-else 
        :rat-to-edit="selectedRat" 
        @submit="handleEditRat" 
        @cancel="selectedRat = null" 
      />
    </div>
  </div>
</template>


<style scoped>
.edit-container {
  display: flex;
  align-items: start;
  gap: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loading-message {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #8a8a8a;
}

.error-message {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
  color: red;
}
</style>
