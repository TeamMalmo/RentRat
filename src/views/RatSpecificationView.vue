<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFetchRats } from "@/composables/useFetchRats";
import BookForm from "../components/BookForm/BookForm.vue";

const route = useRoute();
const router = useRouter(); // Adderar router för att kunna gå tillbaka då useRoute endast kan läsa befintlig route, inte ändra den.
const ratId = ref(route.params.id); // Gör ratId reaktiv för att lyssna på förändringar
const rat = ref(null);
const error = ref(null);
const isLoading = ref(true);
const isBooking = ref(false);

const { fetchAllRats, rats } = useFetchRats(); // Tar in info från vår composable

// Togglar booking modalen
const toggleModal = () => {
  isBooking.value = !isBooking.value;
};

// Funktion för att ladda en råtta baserat på ID
const loadRat = async (id) => {
  isLoading.value = true;

  try {
    // Om råttorna inte har hämtats än, hämta dem
    if (!rats.value || rats.value.length === 0) {
      await fetchAllRats();
    }

    const allRats = rats.value || [];
    rat.value = allRats.find((r) => r.id === id);

    if (!rat.value) {
      throw new Error(`Rat with ID ${id} not found`);
    }
  } catch (err) {
    error.value = err.message || "Failed to load rat data";
  } finally {
    isLoading.value = false;
  }
};

// Ladda råttan vid start
onMounted(() => {
  loadRat(ratId.value);
});

// Watch för att lyssna på ändring av URL-parametern och ladda ny råtta
watch(
  () => route.params.id,
  (newId) => {
    ratId.value = newId; // Uppdatera ratId
    loadRat(newId); // Ladda ny råtta
  }
);

// Navigera tillbaka till råttornas sida
const goBack = () => {
  router.push("/rentee");
};

// Navigera till föregående råtta
const goToPreviousRat = async () => {
  await fetchAllRats(); // Säkerställ att alla råttor är laddade
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);

  if (currentIndex > 0) {
    const previousRat = allRats[currentIndex - 1];
    router.push(`/rentee/rats/${previousRat.id}`);
  }
};

// Navigera till nästa råtta
const goToNextRat = async () => {
  await fetchAllRats(); // Säkerställ att alla råttor är laddade
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);

  if (currentIndex < allRats.length - 1) {
    const nextRat = allRats[currentIndex + 1];
    router.push(`/rentee/rats/${nextRat.id}`);
  }
};

// Computed property för att kontrollera om vi är på första råttan
const isFirstRat = computed(() => {
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);
  return currentIndex === 0;
});

// Computed property för att kontrollera om vi är på sista råttan
const isLastRat = computed(() => {
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);
  return currentIndex === allRats.length - 1;
});
</script>

<template>
  <div v-if="isLoading" class="loading-message">🐭 Loading rat...</div>
  <div v-else-if="error" class="error-message">❌ {{ error }}</div>

  <div v-else class="rat-container">
    <BookForm v-if="isBooking" :rat="rat" @closeModal="toggleModal" />
    <div class="rat-info">
      <button class="back-button" @click="goBack">Tillbaka</button>
      <h1 class="rat-name">{{ rat.name }}</h1>
      <button @click="toggleModal">Rent this rat</button>
      <p><strong>Skills:</strong> {{ rat.skills.join(", ") }}</p>
      <p><strong>Price:</strong> {{ rat.price }} SEK</p>
      <p><strong>Description:</strong> {{ rat.description }}</p>
    </div>

    <div class="rat-image-and-buttons">
      <div class="rat-image-container">
        <img :src="rat.imgUrl" alt="rat image" class="rat-image" />
      </div>
      <div class="navigation-buttons">
        <button
          @click="goToPreviousRat"
          class="prev-button"
          :disabled="isFirstRat">
          Föregående råtta
        </button>
        <button @click="goToNextRat" class="next-button" :disabled="isLastRat">
          Nästa råtta
        </button>
      </div>
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
  align-items: flex-start;
  padding: 20px;
  border: 2px solid #8ace00;
  border-radius: 10px;
  background-color: rgba(128, 128, 128, 0.534);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
}

.rat-info {
  flex: 2;
  padding-right: 20px;
}

.rat-name {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.rat-image-and-buttons {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrerar knappar och bild vertikalt */
  flex: 1;
}

.rat-image-container {
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

.navigation-buttons {
  margin-top: 1rem;
  display: flex;
  flex-direction: column; /* Staplar knapparna vertikalt */
  gap: 0.5rem; /* Mellanrum mellan knappar */
}

.prev-button,
.next-button,
.back-button {
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.prev-button:hover,
.next-button:hover,
.back-button:hover {
  background-color: #5a6268;
}

.prev-button:focus,
.next-button:focus,
.back-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(108, 117, 125, 0.5);
}

.prev-button:disabled,
.next-button:disabled,
.back-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@keyframes circleAnimation {
  0% {
    border-radius: 0%; /* Fyrkantig */
  }
  100% {
    border-radius: 50%; /* Cirkulär */
  }
}
</style>
