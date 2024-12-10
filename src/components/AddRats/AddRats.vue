<script setup>
import { ref } from 'vue';
import AddRatsForm from './AddRatsForm.vue'; 
import RatItem from '../FindRats/RatItem.vue'; 
import { useAddRat } from '@/composables/useAddRat'; 


const showForm = ref(true); //visa/dölja formuläret
const newRat = ref(null); // den nya råtten

// hämtar nödvändig data från composable
const { addRat, error, isLoading } = useAddRat();

// skickar data till composable
const handleAddRat = async (ratData) => {
  try {
    await addRat(ratData); 
    newRat.value = ratData; // ger värdet av datan till newRat
    showForm.value = false; // döljer formuläret
  } catch (e) {
    console.error('Error adding rat:', e);
  }
};

// nollställer formuläret
const resetForm = () => {
  showForm.value = true; 
  newRat.value = null; 
};
</script>

<template>
    <div>
      <!-- formuläret som skickar ratData till handleAddRat -->
      <AddRatsForm v-if="showForm" @submit="handleAddRat" />
  
      <div v-else>
        <!--döljer formläret, visar den nya råttan -->
        <RatItem :rat="newRat" />
        <button @click="resetForm">Add Another Rat</button>
      </div>
  
      <!-- litta error hantering -->
      <p v-if="isLoading" class="loading-message">🐀 Your rat is being created...</p>
      <p v-else-if="error" class="error-message">❌ Failed to create rat: {{ error }}</p>
    </div>
  </template>
  
<style scoped>
form {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: left;
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
