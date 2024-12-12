<script setup>
import { useFetchRats } from '@/composables/useFetchRats';
import { useUpdateRat } from '@/composables/useUpdateRat';
import { useAuth } from '@/composables/useUser'; 
import { onMounted, ref, computed } from 'vue';
import RatItem from '../FindRats/RatItem.vue';
import EditRatsForm from './EditRatsForm.vue';

// Hämtar användardata
const {auth} = useAuth(); // hämtar den inloggade användaren

// Användning av fetch och update metoder för råttor
const { rats, fetchAllRats } = useFetchRats();
const { updateRatById, isLoading, error } = useUpdateRat();

// Vald råtta för redigering
const selectedRat = ref(null);

// Filtrera råttor baserat på ägaren
const ownedRats = computed(() => rats.value.filter((rat) => rat.renter === auth.value.username));

// Hämta alla råttor när komponenten monteras
onMounted(() => {
  fetchAllRats();
});

// Hantera redigering av en specifik råtta
const handleEditRat = async (ratData) => {
  try {
    // Kallar på update-metod
    await updateRatById(ratData);

    // Uppdaterar UI:n lokalt
    const ratIndex = rats.value.findIndex((rat) => rat.id === ratData.id);
    if (ratIndex !== -1) {
      rats.value[ratIndex] = { ...rats.value[ratIndex], ...ratData };
    }
    alert('Rat updated successfully!'); // Bekräftelse
  } catch (error) {
    alert('Fel vid uppdatering av råtta.'); // Hantera fel
  } finally {
    selectedRat.value = null; // Nollställer vald råtta
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
    
    <!-- Visa råttor -->
    <ul v-else>
      <RatItem 
        v-for="rat in ownedRats" 
        :key="rat.id" 
        :rat="rat" 
        @click="selectedRat = rat" 
      />
    </ul>

    <!-- Prompt om ingen råtta är vald -->
    <div>
      <p v-if="!selectedRat">Välj en råtta att redigera</p>
      <!-- Formulär för att redigera råttan -->
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
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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
