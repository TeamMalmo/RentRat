// Composable för useReviews 

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
      // Hämta den aktuella listan av råttor
      const response = await fetch(CONFIG.ITEMS_API_URL, {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
      });
      const data = await response.json();
      const rats = data.record.rats;

      // Hitta rätt råtta och lägg till review
      const updatedRats = rats.map((rat) => {
        if (rat.id === ratId) {
          rat.reviews = rat.reviews || []; // Skapa reviews om det inte finns
          const emailExists = rat.reviews.some((r) => r.email === reviewData.email);
          if (emailExists) throw new Error("Den här e-posten har redan gett ett betyg.");
          rat.reviews.push(reviewData);
        }
        return rat;
      });

      // Uppdatera JSONbin med de nya reviews
      const putResponse = await fetch(CONFIG.ITEMS_API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify({ rats: updatedRats }),
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
