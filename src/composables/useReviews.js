import { ref, computed, onMounted } from "vue"; // Importera nödvändiga Vue-funktioner
import { CONFIG } from "@/constant/config"; // Importera API-konfigurationen

// Definiera en composable som hanterar recensioner för råttor
export function useReviews() {
  // Reaktiva variabler för recensioner, laddningstillstånd och felmeddelanden
  const reviews = ref([]); // Här lagras alla recensioner
  const isLoading = ref(false); // Här lagras om data är under laddning
  const error = ref(null); // Här lagras eventuella felmeddelanden

  // Funktion för att hämta recensioner från API
  const fetchReviews = async () => {
    isLoading.value = true; // Sätt isLoading till true när hämtningen startar
    try {
      // Gör en förfrågan till JSONBin API för att hämta recensioner
      const response = await fetch('https://api.jsonbin.io/v3/b/675960dee41b4d34e46387c2', {
        headers: {
          "Content-Type": "application/json", // Ange att vi skickar och förväntar oss JSON
          "X-Master-Key": CONFIG.JSONBIN_API_KEY, // Skicka med API-nyckeln från konfigurationen
        },
      });
      
      // Konvertera svaret till JSON-format
      const data = await response.json();
      
      // Om recensioner finns, lagra dem i 'reviews', annars sätt den till en tom array
      reviews.value = data.record.reviewRats || [];
    } catch (err) {
      // Om ett fel inträffar, sätt 'error' till felmeddelandet
      error.value = err.message;
    } finally {
      // Sätt 'isLoading' till false när vi är klara med förfrågan, oavsett om det lyckades eller inte
      isLoading.value = false;
    }
  };

  // Funktion för att uppdatera recensioner via API
  const updateReviews = async (updatedReviews) => {
    isLoading.value = true; // Sätt isLoading till true när uppdateringen startar
    try {
      // Gör en PUT-förfrågan för att uppdatera recensionerna på JSONBin
      const response = await fetch('https://api.jsonbin.io/v3/b/675960dee41b4d34e46387c2', {
        method: 'PUT', // Vi använder PUT för att uppdatera existerande data
        headers: {
          "Content-Type": "application/json", // Skicka JSON i både request och response
          "X-Master-Key": CONFIG.JSONBIN_API_KEY, // Skicka API-nyckeln för autentisering
        },
        body: JSON.stringify({
          reviewRats: updatedReviews, // Skicka de uppdaterade recensionerna i request body
        }),
      });

      // Om PUT-förfrågan lyckas, konvertera svaret till JSON
      const responseData = await response.json();
      console.log("Response from PUT request:", responseData); // Logga svaret från API:et för felsökning

      // Om svarskoden inte är OK, skicka error
      if (!response.ok) {
        throw new Error("Failed to update reviews: " + responseData.message);
      }

      // Uppdatera lokal state med de nya recensionerna om PUT-förfrågan lyckades
      reviews.value = updatedReviews;
    } catch (err) {
      // Om något går fel, sätt 'error' till felmeddelandet
      error.value = err.message;
      console.error("Error while updating reviews:", err); // Logga felet för felsökning
    } finally {
      // Sätt 'isLoading' till false när vi är klara med uppdateringen
      isLoading.value = false;
    }
  };

  // Beräknar det genomsnittliga betyget för recensioner baserat på ratId
  const getAverageRating = (ratId) => {
    const ratReviews = reviews.value.filter((review) => review.ratId === ratId);
    if (ratReviews.length === 0) return 0; // Om inga recensioner finns, returnera 0

    const totalStars = ratReviews.reduce((sum, review) => sum + review.stars, 0); // Summera stjärnor
    return totalStars / ratReviews.length; // Returnera genomsnittet
  };

  // När composablen monteras (komponenten som använder denna composable), hämta recensionerna
  onMounted(fetchReviews);

  // Returera alla funktioner och reaktiva variabler som ska användas i komponenten
  return { reviews, isLoading, error, updateReviews, getAverageRating };
}
