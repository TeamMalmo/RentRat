<script setup>
import { useFetchRats } from '@/composables/useFetchRats';
import { useUpdateRat } from '@/composables/useUpdateRat';
import { onMounted, ref } from 'vue';
import RatItem from '../FindRats/RatItem.vue';
import EditRatsForm from './EditRatsForm.vue';

const { rats, fetchAllRats } = useFetchRats();
const { updateRatById, isLoading, error } = useUpdateRat();

const selectedRat = ref(null);

onMounted(() => {
  fetchAllRats();
});

// kallar på vår composable
const handleEditRat = async (ratData) => {
  try {
    await updateRatById(ratData); 

    // hittar index i lokala arrayn för att updater UI:n
    const ratIndex = rats.value.findIndex((rat) => rat.id === ratData.id);
    if (ratIndex !== -1) {
      // uppdaterar lokala array med uppdaterad data
      rats.value[ratIndex] = { ...rats.value[ratIndex], ...ratData };
    }
  } catch (error) {
    alert('Error updating rat.');
  } finally {
    selectedRat.value = null; // återställer selectedRat
  }
};
</script>

<template>
  <div class="edit-container">
    <!--laddar...-->
    <div v-if="isLoading" class="loading-message">
      🐭 Loading rats... Please wait! 🐭
    </div>

    <!-- error... -->
    <div v-else-if="error" class="error-message">
      ❌ Failed to fetch rats: {{ error }} ❌
    </div>
    <ul v-else>
      <!-- LIsta av befintliga råttor -->
      <RatItem 
        v-for="rat in rats" 
        :key="rat.id" 
        :rat="rat" 
        @click="selectedRat = rat" 
      />
    </ul>

    <div>
      <!-- guidar användaren att välja en råtta -->
      <p v-if="!selectedRat">Select a rat to edit</p>
      <!-- formulär för att redigera råttan -->
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
