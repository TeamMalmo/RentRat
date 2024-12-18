<script setup>
import { ref } from "vue";
import AddReviewForm from "./AddReviewForm.vue";
import { useAddReview } from "@/composables/useAddReview";

const showForm = ref(true); // Styr om formuläret ska visas eller inte
const { addReview, error, isLoading } = useAddReview(); // Importera composable
const ratId = ref(window.location.pathname.split("/").pop()); // Extraherar råttans ID från URL

const handleAddReview = async (reviewData) => {
  try {
    await addReview(ratId.value, reviewData); // Skicka datan till composable
    showForm.value = false; // Dölj formuläret när review är skickad
  } catch (e) {
    console.error("Error adding review:", e);
  }
};
</script>

<template>
  <div>
    <AddReviewForm v-if="showForm" @submit="handleAddReview" />
    <p v-else class="success-message">Tack för ditt betyg!</p>
    <p v-if="isLoading" class="loading-message">⏳ Ditt betyg skickas...</p>
    <p v-if="error" class="error-message">❌ Något gick fel: {{ error }}</p>
  </div>
</template>

<style scoped>
.success-message {
  color: green;
  font-weight: bold;
}

.loading-message {
  color: #8a8a8a;
  font-style: italic;
}

.error-message {
  color: red;
}
</style>
