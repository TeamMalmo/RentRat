import { useFetchRats } from './useFetchRats'; // Import this function from where you're fetching rats
import { CONFIG } from '@/constant/config';

const apiKey = CONFIG.JSONBIN_API_KEY;

export function useRemoveRat() {
  const { rats, fetchAllRats } = useFetchRats(); // Use the rats list from the composable

  const removeRatById = async (ratId) => {
    // Fetch the latest rats from the database (in case the list has changed elsewhere)
    await fetchAllRats(); 

    // Filter out the rat with the given ID
    const updatedRats = rats.value.filter(rat => rat.id !== ratId);

    // Now save the updated list back to the database
    await saveRatsToDatabase(updatedRats); 
  };

  // Function to save the updated rats list to the database
  const saveRatsToDatabase = async (updatedRats) => {
    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/6752bc1ead19ca34f8d68e9f', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey, // Replace this with your actual API key
        },
        body: JSON.stringify({ rats: updatedRats }), // Send the updated rats list to the database
      });

      if (!response.ok) {
        throw new Error('Failed to remove rat from the database.');
      }

      // Successfully removed rat from the database
      console.log('Rat removed successfully.');
    } catch (error) {
      console.error('Error removing rat:', error);
    }
  };

  return { removeRatById };
}
