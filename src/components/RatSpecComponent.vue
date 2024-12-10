<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchRats } from '@/composables/useFetchRats';

const route = useRoute();
const ratId = route.params.id; // Hämtar ID från routen

const { fetchAllRats } = useFetchRats();
const rat = ref(null);
const error = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const data = await fetchAllRats(); // Hämtar alla råttor
    rat.value = data.find((r) => r.id === ratId); // Filtrera baserat på ID
    if (!rat.value) {
      throw new Error('Rat not found');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="rat-spec">
    <div v-if="isLoading" class="loading-message">🐭 Loading rat details...</div>
    <div v-else-if="error" class="error-message">❌ {{ error }}</div>
    <div v-else-if="rat" class="rat-details">
      <h1>{{ rat.name }}</h1>
      <img :src="rat.imgUrl" :alt="rat.name" class="rat-image" />
      <p><strong>Primary Skill:</strong> {{ rat.primarySkill }}</p>
      <p><strong>Skills:</strong> {{ rat.skills.join(', ') }}</p>
      <p><strong>Price:</strong> {{ rat.price }} SEK</p>
      <p><strong>Available in:</strong> {{ rat.areaOfMalmo }}</p>
      <p><strong>Description:</strong></p>
      <p>{{ rat.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.rat-spec {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.rat-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.rat-image {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

.loading-message,
.error-message {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
}
</style>
