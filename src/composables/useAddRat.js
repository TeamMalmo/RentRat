import { ref } from 'vue';
import { useFetchRats } from './useFetchRats';
import { CONFIG } from '@/constant/config'; // Import the JSONBIN_API_KEY from the config

export function useAddRat() {
  const { rats, fetchAllRats } = useFetchRats(); // Use rats from useFetchRats
  const message = ref('');
  const apiKey = CONFIG.JSONBIN_API_KEY;

  const addRat = async (newRat) => {
    message.value = ''; // Clear previous messages

    try {
      // Ensure the rats list is up-to-date
      if (rats.value.length === 0) {
        await fetchAllRats(); // Fetch rats if the list is empty
      }

      // Add the new rat to the existing list
      const updatedRats = [...rats.value, newRat];

      // Save the updated list back to the database
      const response = await fetch('https://api.jsonbin.io/v3/b/6752bc1ead19ca34f8d68e9f', {
        method: 'PUT', // Use PUT to replace the entire database
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey,
        },
        body: JSON.stringify({ rats: updatedRats }), // Save the updated list
      });

      if (!response.ok) {
        throw new Error('Failed to add the rat. Please try again.');
      }

      message.value = 'Rat successfully added!';
    } catch (err) {
      message.value = err.message || 'An error occurred while adding the rat.';
    }
  };

  return { addRat, message };
}

