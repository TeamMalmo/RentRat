import { ref } from 'vue';
import { CONFIG } from '@/constant/config';

export function useRemoveAllRats() {
  const message = ref('');
  const apiKey = CONFIG.JSONBIN_API_KEY;

  const removeAllRats = async () => {
    message.value = ''; // Clear previous messages

    try {
      // Send a PUT request with an empty `rats` array
      const response = await fetch('https://api.jsonbin.io/v3/b/6752bc1ead19ca34f8d68e9f', {
        method: 'PUT', // Overwrites the entire data in the database
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey,
        },
        body: JSON.stringify({ rats: [] }), // Replace `rats` array with an empty one
      });

      if (!response.ok) {
        throw new Error('Failed to remove all rats. Please try again.');
      }

      message.value = 'All rats successfully removed!';
    } catch (err) {
      message.value = err.message || 'An error occurred while removing all rats.';
    }
  };

  return { removeAllRats, removeMessage: message };
}
