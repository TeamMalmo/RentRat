<!-- RatSpecificationView.vue // Sida för specifikation av råtta -->

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetchRats } from '@/composables/useFetchRats';
import AddReviewForm from '@/components/ReviewRats/AddReviewForm.vue';

const route = useRoute();
const router = useRouter();
const ratId = ref(route.params.id);
const rat = ref(null);
const error = ref(null);
const isLoading = ref(true);

const { fetchAllRats, rats } = useFetchRats();

const isRatingVisible = ref(false); // Hanterar synligheten för betygsformuläret

// Här lagras alla recensioner för råttan
const reviews = ref([]);

// Ladda råttans specifikation
const loadRat = async (id) => {
  isLoading.value = true;

  try {
    if (!rats.value || rats.value.length === 0) {
      await fetchAllRats();
    }

    const allRats = rats.value || [];
    rat.value = allRats.find((r) => r.id === id);

    if (!rat.value) {
      throw new Error(`Rat with ID ${id} not found`);
    }
  } catch (err) {
    error.value = err.message || 'Failed to load rat data';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadRat(ratId.value);
});

watch(
  () => route.params.id,
  (newId) => {
    ratId.value = newId;
    loadRat(newId);
  }
);

const goBack = () => {
  router.push('/rentee');
};

const goToPreviousRat = async () => {
  await fetchAllRats();
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);

  if (currentIndex > 0) {
    const previousRat = allRats[currentIndex - 1];
    router.push(`/rentee/rats/${previousRat.id}`);
  }
};

const goToNextRat = async () => {
  await fetchAllRats();
  const allRats = rats.value || [];
  const currentIndex = allRats.findIndex((r) => r.id === ratId.value);

  if (currentIndex < allRats.length - 1) {
    const nextRat = allRats[currentIndex + 1];
    router.push(`/rentee/rats/${nextRat.id}`);
  }
};

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

// Toggla betygsformuläret
const toggleRatingForm = () => {
  isRatingVisible.value = !isRatingVisible.value;
};

// Funktion för att hantera när en recension skickas
const handleReviewSubmit = (newReview) => {
  reviews.value.push(newReview); // Lägg till recensionen i arrayen
};

// Beräkna snittbetyget
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const totalStars = reviews.value.reduce((sum, review) => sum + review.stars, 0);
  return totalStars / reviews.value.length;
});

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
      <p><strong>Average Rating:</strong> {{ averageRating.toFixed(2) }} ★</p> <!-- Visar snittbetyget -->
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

      <!-- Knapp för att visa/dölja formuläret -->
      <div class="rate-button-container">
        <button class="rate-button" @click="toggleRatingForm">
          {{ isRatingVisible ? 'Hide Rating' : 'Rate This Rat' }}
        </button>
      </div>

      <!-- Visa AddReviewForm om isRatingVisible är sant -->
      <AddReviewForm v-if="isRatingVisible" @submit="handleReviewSubmit" />
    </div>
  </div>
</template>

<style scoped>

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
