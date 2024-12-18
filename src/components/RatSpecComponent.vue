<script setup>
// Import reactive refs and lifecycle hook 
import { ref, onMounted } from "vue";
// Import Vue router composable to get routers params
import { useRoute } from "vue-router";
// Import our custom composable for fetching rat data
import { useFetchRats } from "@/composables/useFetchRats";
// Import form for booking component 
import BookForm from "@/components/BookForm.vue";

// Extract route object to access route params = rat id
const route = useRoute();
const ratId = route.params.id; // Läs ID från URL

// Reactive state to hold the selected rats details 
const rat = ref(null);
// Reactive state to handle potential errors when fetching data
const error = ref(null);
// Reactive state to toggle booking modal
const isBooking = ref(false);
// Reactive state to show loading message while data is fetching
const isLoading = ref(true);

// Destruct the function to fetch all rats and the reactive rats from the composable
const { fetchAllRats, rats } = useFetchRats();

// Set the value to false to close modal function
const closeModal = () => {
  isBooking.value = false;
};

// Lifecycle hook that runs whe component is mounted in the DOM
onMounted(async () => {
  // Data is loading so show loading message 
  isLoading.value = true;

  try {
    // Fetch all rats using our awesuume composable
    await fetchAllRats(); 
    // Extract the list of rats or empty array if no rats
    const allRats = rats.value || [];
    // Fin the rat with the matching id
    rat.value = allRats.find((r) => r.id === ratId);

    // If rat match not found- throw error 
    if (!rat.value) {
      throw new Error(`Rat with ID ${ratId} not found`);
    }
  } catch (err) {
    error.value = err.message || "Failed to load rat data";
  } finally {
    // Remove loading message wether fail or success
    isLoading.value = false;
  }
});
</script>

<template>
  <BookForm
    v-if="isBooking && rat"
    :rat="rat"
    @closeModal="closeModal"
    :renterId="ratId" />
  <div v-if="isLoading" class="loading-message">🐭 Loading rat...</div>
  <div v-else-if="error" class="error-message">❌ {{ error }}</div>
  <div v-else class="rat-container">
    <div class="rat-info">
      <h1 class="rat-name">{{ rat.name }}</h1>
      <p><strong>Skills:</strong> {{ rat.skills.join(", ") }}</p>
      <p><strong>Price:</strong> {{ rat.price }} SEK</p>
      <button @click="() => (isBooking = !isBooking)">Book this rat!</button>
      <p><strong>Description:</strong> {{ rat.description }}</p>
    </div>
    <div class="rat-image-container">
      <img :src="rat.imgUrl" alt="rat image" class="rat-image" />
    </div>
  </div>

  <!-- <BookingForm :rat="rat" /> -->
  <!-- TODO: SPARA BOOKINGS I EN ARRAY -> I EN JSONBIN 
    eva.bjorling@chasacademy.se || rentarat2024
    använd url från din skapade bin
    -->
</template>

<style scoped>
.rat-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 2px solid #8ace00;
  border-radius: 10px;
  background-color: rgba(128, 128, 128, 0.534);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.rat-info {
  flex: 1;
  padding-right: 20px;
}

.rat-name {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.rat-image-container {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 0; /* Fyrkantig från början */
  animation: circleAnimation 1.5s ease-out forwards; /* Animering vid laddning */
}

.rat-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes circleAnimation {
  0% {
    border-radius: 0%; /* Fyrkantig */
  }
  100% {
    border-radius: 50%; /* Cirkulär */
  }
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #666;
}
</style>
