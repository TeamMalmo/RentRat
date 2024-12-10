import { useFetchRats } from './useFetchRats'; 
import { CONFIG } from '@/constant/config';

const apiKey = CONFIG.JSONBIN_API_KEY;

export function useRemoveRat() {
  const { rats, fetchAllRats } = useFetchRats(); 

  const removeRatById = async (ratId) => {
    // hämtar befintliga råttor
    await fetchAllRats(); 

    //  filtrera bort råttan med id
    const updatedRats = rats.value.filter(rat => rat.id !== ratId);

    // kallar på funktion för att spara uppdaterad lista
    await saveRatsToDatabase(updatedRats); 
  };

  // sparar uppdaterad lista
  const saveRatsToDatabase = async (updatedRats) => {
    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/6752bc1ead19ca34f8d68e9f', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey, 
        },
        // Skickar uppdaterad lista
        body: JSON.stringify({ rats: updatedRats }), 
      });

      if (!response.ok) {
        throw new Error('Failed to remove rat from the database.');
      }
      console.log('Rat removed successfully.');
    } catch (error) {
      console.error('Error removing rat:', error);
    }
  };

  return { removeRatById };
}
