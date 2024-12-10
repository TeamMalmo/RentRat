import { useFetchRats } from './useFetchRats';
import { useRemoveRat } from './useRemoveRatById';
import { useAddRat } from './useAddRat';
import { CONFIG } from '@/constant/config';
import { ref } from 'vue';

const apiKey = CONFIG.JSONBIN_API_KEY;

export function useUpdateRat() {
  const { rats, fetchAllRats } = useFetchRats(); 
  const { saveRatsToDatabase } = useRemoveRat();
  const { assignImgUrl} = useAddRat();

  const isLoading = ref(false); // Skapar en reaktiv referens för att hålla koll på laddningstillståndet
  const error = ref(null); // Skapar en reaktiv referens för att lagra eventuella felmeddelanden

  const updateRatById = async (updatedRat) => {
    isLoading.value = true; // Sätter isLoading till true när hämtningen startar
    error.value = null; // Återställer eventuellt tidigare felmeddelande
    try {
      // hämta alla råttor
      await fetchAllRats();

      // byter bild 
      const updatedRatWithImage = assignImgUrl(updatedRat);

      // skapa ny array och lägger till uppdaterade råttan
      const updatedRats = rats.value.map((rat) =>
        rat.id === updatedRatWithImage.id ? updatedRatWithImage : rat   
      );

      // spara uppdaterad lista (finns i useRemoveRat.js)
      await saveRatsToDatabase(updatedRats);
      console.log('Rat updated successfully.');
    } catch (err) {
        error.value = err.message || 'Failed to update rats'; // Sätter ett felmeddelande vid misslyckande
    } finally {
        isLoading.value = false; // Sätter isLoading till false när hämtningen är klar
    }
  };


  return { updateRatById, isLoading, error };
}
