import { ref } from "vue";
import { CONFIG } from "@/constant/config";

export function useAddReview() {
  const isLoading = ref(false); // Laddningsindikator
  const error = ref(null); // Felhantering
  const apiKey = CONFIG.JSONBIN_API_KEY; // API-nyckel

  const addReview = async (ratId, reviewData) => {
    isLoading.value = true;
    error.value = null;

    try {
      // Hämta befintliga recensioner
      const response = await fetch(CONFIG.REVIEW_API_URL, {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
      });
      const data = await response.json();
      const reviews = data.record.reviewRats;

      // Kontrollera om samma e-post redan har gett ett betyg för råttan
      const emailExists = reviews.some(
        (review) => review.ratId === ratId && review.reviewerEmail === reviewData.email
      );
      if (emailExists) throw new Error("Den här e-posten har redan gett ett betyg.");

      // Lägg till ny recension
      const updatedReviews = [...reviews, { ratId, ...reviewData }];

      // Uppdatera JSONbin
      const putResponse = await fetch(CONFIG.REVIEW_API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify({ reviewRats: updatedReviews }),
      });

      if (!putResponse.ok) throw new Error("Misslyckades med att spara betyget.");
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return { addReview, isLoading, error };
}
