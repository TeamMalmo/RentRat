<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetchRats } from '@/composables/useFetchRats';
import { useReviews } from '@/composables/useReviews';
import AddReviewForm from '@/components/ReviewRats/AddReviewForm.vue';

const route = useRoute();
const router = useRouter();
const ratId = ref(route.params.id); // Hämta ratId från routen
const rat = ref(null); // För att hålla den valda råttans information
const error = ref(null); // För felmeddelanden
const isLoading = ref(true); // Hantera laddning

// Anropa composables för att hämta data
const { fetchAllRats, rats } = useFetchRats();
const { reviews, isLoading: isLoadingReviews, error: reviewError, updateReviews, getAverageRating } = useReviews();

// Hantera synligheten av betygsformuläret
const isRatingVisible = ref(false);

// Funktion för att ladda råttans data baserat på ratId
const loadRat = async (id) => {
  isLoading.value = true;
  try {
    if (!rats.value || rats.value.length === 0) {
      await fetchAllRats(); // Hämta alla råttor om de inte är tillgängliga
    }
    const allRats = rats.value || [];
    rat.value = allRats.find((r) => r.id === id); // Hitta rätt råtta

    if (!rat.value) {
      throw new Error(`Rat with ID ${id} not found`); // Om råttan inte finns
    }
  } catch (err) {
    error.value = err.message || 'Failed to load rat data';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadRat(ratId.value); // Ladda råttan när komponenten är monterad
});

// Lyssna på förändringar av ratId när användaren navigerar
watch(
  () => route.params.id,
  (newId) => {
    ratId.value = newId;
    loadRat(newId); // Ladda ny råtta vid ID-förändring
  }
);

// Funktion för att navigera tillbaka till föregående sida
const goBack = () => {
  router.push('/rentee');
};

// Funktion för att gå till föregående råtta
const goToPreviousRat = async () => {
  await fetchAllRats();
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);

  if (currentIndex > 0) {
    const previousRat = allRats[currentIndex - 1];
    router.push(`/rentee/rats/${previousRat.id}`);
  }
};

// Funktion för att gå till nästa råtta
const goToNextRat = async () => {
  await fetchAllRats();
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);

  if (currentIndex < allRats.length - 1) {
    const nextRat = allRats[currentIndex + 1];
    router.push(`/rentee/rats/${nextRat.id}`);
  }
};

// Kontrollera om den nuvarande råttan är första eller sista
const isFirstRat = computed(() => {
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);
  return currentIndex === 0;
});

const isLastRat = computed(() => {
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);
  return currentIndex === allRats.length - 1;
});

// Filtrera recensioner för den aktuella råttan
const ratReviews = computed(() => {
  return reviews.value.filter((review) => review.ratId === ratId.value);
});

// Beräkna genomsnittligt betyg genom composable
const averageRating = computed(() => {
  return getAverageRating(ratId.value); // Anropa getAverageRating från composablet
});

// Toggla synligheten av betygsformuläret
const toggleRatingForm = () => {
  isRatingVisible.value = !isRatingVisible.value;
};

// Funktion för att hantera när en recension skickas
const handleReviewSubmit = async (newReview) => {
  // Lägg till den nya recensionen till listan
  const updatedReviews = [...reviews.value, {
    ...newReview,
    ratId: ratId.value, // Länka recensionen till rätt råtta
  }];
  
  // Uppdatera recensioner via API
  try {
    await updateReviews(updatedReviews);
    toggleRatingForm(); // Stäng formuläret efter skickat betyg
  } catch (e) {
    console.error('Error updating reviews:', e);
  }
};
</script>


<template>
  <div v-if="isLoading" class="loading-message">🐭 Loading rat...</div>
  <div v-else-if="error" class="error-message">❌ {{ error }}</div>

  <div v-else class="rat-container">
    <div class="rat-info">
      <button class="back-button" @click="goBack">Tillbaka</button>
      <h1 class="rat-name">{{ rat.name }}</h1>
      <p><strong>Skills:</strong> {{ rat.skills.join(', ') }}</p>
      <p><strong>Price:</strong> {{ rat.price }} SEK</p>
      <p><strong>Description:</strong> {{ rat.description }}</p>
      <p><strong>Average Rating:</strong> {{ averageRating.toFixed(2) }} ★</p>
    </div>

    <div class="rat-image-and-buttons">
      <div class="rat-image-container">
        <img :src="rat.imgUrl" alt="rat image" class="rat-image" />
      </div>
      <div class="navigation-buttons">
        <button 
          @click="goToPreviousRat" 
          class="prev-button" 
          :disabled="isFirstRat"
        >
          Previous Rat
        </button>
        <button 
          @click="goToNextRat" 
          class="next-button" 
          :disabled="isLastRat"
        >
          Next Rat
        </button>
      </div>

      <div class="rate-button-container">
        <button class="rate-button" @click="toggleRatingForm">
          {{ isRatingVisible ? 'Hide Rating' : 'Rate This Rat' }}
        </button>
      </div>

      <AddReviewForm v-if="isRatingVisible" @submit="handleReviewSubmit" :ratId="String(ratId.value)" />

    </div>
  </div>
</template>

<style scoped>
/* Styling för sidan och komponenterna */
.rat-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border: 2px solid #8ACE00;
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

.rat-image-and-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.rat-image-container {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}

.rat-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navigation-buttons button,
.rate-button {
  background-color: #6c757d;
  color: white;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.rate-button-container {
  text-align: center;
  margin-top: 1rem;
}

.prev-button:disabled,
.next-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
