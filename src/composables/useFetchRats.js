import { ref } from 'vue'; // Importerar 'ref' från Vue för att skapa reaktiva referenser
import { CONFIG } from '@/constant/config'; // Importerar konfigurationen för API-nyckeln

export function useFetchRats() {
  const rats = ref([]); // Skapar en reaktiv referens för att lagra råttorna (initialt en tom array)
  const isLoading = ref(false); // Skapar en reaktiv referens för att hålla koll på laddningstillståndet
  const error = ref(null); // Skapar en reaktiv referens för att lagra eventuella felmeddelanden

  const apiKey = CONFIG.JSONBIN_API_KEY; // Hämtar API-nyckeln från konfigurationen

  // Funktion för att tilldela bild-URL baserat på primär färdighet
  const assignImgUrl = (rats) => {
    return rats.map((rat) => {
      // Kollar primär färdighet och tilldelar motsvarande bild
      switch (rat.primarySkill) {
        case "cook":
          rat.imgUrl = "/images/cook.png";
          break;
        case "clean":
          rat.imgUrl = "/images/clean.png";
          break;
        case "laundry":
          rat.imgUrl = "/images/laundry.png";
          break;
        case "paint":
          rat.imgUrl = "/images/paint.png";
          break;
        default:
          rat.imgUrl = "/images/default.png"; // Standardbild om ingen matchning
          break;
      }
      return rat;
    });
  };

  // Funktion för att hämta alla råttor från API:et
  const fetchAllRats = async () => {
    isLoading.value = true; // Sätter isLoading till true när hämtningen startar
    error.value = null; // Återställer eventuellt tidigare felmeddelande

    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/6752bc1ead19ca34f8d68e9f', {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey, // Lägger till API-nyckeln i headers
        },
      });
      const data = await response.json(); // Hämtar och omvandlar svaret till JSON

      // Tilldelar hämtade data till råttorna och tilldelar bilder
      rats.value = assignImgUrl(data.record.rats); 
    } catch (err) {
      error.value = err.message || 'Misslyckades med att hämta råttor'; // Sätter ett felmeddelande vid misslyckande
    } finally {
      isLoading.value = false; // Sätter isLoading till false när hämtningen är klar
    }
  };

  // Returnerar de reaktiva variablerna och funktionen för att hämta råttor
  return { rats, isLoading, error, fetchAllRats };
}
