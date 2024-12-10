<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchRats } from '@/composables/useFetchRats';

const route = useRoute();
const ratId = route.params.id; // Läs ID från URL
const rat = ref(null);
const error = ref(null);
const isLoading = ref(true);

const { fetchAllRats, rats } = useFetchRats();

onMounted(async () => {
  isLoading.value = true;

  try {
    await fetchAllRats(); // Hämta alla råttor
    const allRats = rats.value || [];
    rat.value = allRats.find((r) => r.id === ratId);

    if (!rat.value) {
      throw new Error(`Rat with ID ${ratId} not found`);
    }
  } catch (err) {
    error.value = err.message || 'Failed to load rat data';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading">Loading rat...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1>{{ rat.name }}</h1>
    <img :src="rat.imgUrl" alt="rat image" />
    <p>Skills: {{ rat.skills.join(', ') }}</p>
    <p>Price: {{ rat.price }} SEK</p>
    <p>Description: {{ rat.description }}</p>
  </div>
</template>
