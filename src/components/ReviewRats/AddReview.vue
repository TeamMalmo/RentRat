<script setup>
import { ref } from "vue"; // Importera 'ref' för att skapa reaktiva variabler
import { useReviews } from "@/composables/useReviews"; // Importera useReviews composable för att hantera recensioner

// Ta emot 'ratId' som en prop från föräldern. Detta ID används för att koppla recensionen till rätt råtta
const props = defineProps({
  ratId: {
    type: String,
    required: true,  // Gör ratId obligatorisk
  },
});

const showForm = ref(true); // En reaktiv variabel som styr om formuläret ska visas eller inte

// Anropa useReviews composable för att hämta recensioner och uppdatera recensioner
const { reviews, updateReviews, error, isLoading } = useReviews();

// En reaktiv variabel som håller reda på om användaren redan har lämnat en recension
const hasReviewed = ref(false);

// Funktion som körs när användaren skickar in en ny recension
const handleAddReview = async (newReview) => {
  console.log("Submitting review:", newReview); // Logga det nya betyget för att kontrollera att funktionen anropas

  // Om användaren redan har lämnat en recension, hindra att en ny recension skickas in
  if (hasReviewed.value) {
    return; // Stoppa vidare exekvering om en recension redan är skickad
  }

  try {
    // Lägg till den nya recensionen till den befintliga listan av recensioner
    const updatedReviews = [...reviews.value, { ...newReview, ratId: props.ratId }];
    console.log("Updated reviews:", updatedReviews); // Logga de uppdaterade recensionerna

    // Uppdatera recensionerna på servern genom att anropa updateReviews-funktionen från useReviews
    await updateReviews(updatedReviews);

    // Om recensionen skickades framgångsrikt, dölj formuläret och indikera att recensionen har skickats
    showForm.value = false; // Dölj formuläret
    hasReviewed.value = true; // Sätt flaggan för att indikera att recensionen har skickats
  } catch (e) {
    // Om ett fel inträffar vid uppdatering av recensioner, logga felet
    console.error("Error adding review:", e);
  }
};
</script>

<template>
  <div>
    <!-- Visa formuläret om 'showForm' är true -->
    <AddReviewForm v-if="showForm" @submit="handleAddReview" />

    <!-- Visa ett meddelande när recensionen har skickats -->
    <p v-else class="success-message">Tack för ditt betyg!</p>

    <!-- Visa ett laddningsmeddelande om recensionen håller på att skickas -->
    <p v-if="isLoading" class="loading-message">⏳ Ditt betyg skickas...</p>

    <!-- Visa ett felmeddelande om något gick fel -->
    <p v-if="error" class="error-message">❌ Något gick fel: {{ error }}</p>
  </div>
</template>

<style scoped>
/* Styla meddelanden som visas efter att användaren skickat in en recension */
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
