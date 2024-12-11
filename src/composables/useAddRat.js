import { ref } from 'vue';
import { useFetchRats } from './useFetchRats';
import { CONFIG } from '@/constant/config'; // Import the JSONBIN_API_KEY from the config

export function useAddRat() {
  const { rats, fetchAllRats } = useFetchRats(); // Use rats from useFetchRats
  const isLoading = ref(false); // Reactive reference for loading state
  const error = ref(null); // Reactive reference for error messages
  const successMessage = ref(null); // Reactive reference for success messages
  const apiKey = CONFIG.JSONBIN_API_KEY;

  // Assign image URL based on the primary skill
  const assignImgUrl = (rat) => {
    switch (rat.primarySkill) {
      case 'cook':
        rat.imgUrl = '/images/cook.png';
        break;
      case 'clean':
        rat.imgUrl = '/images/clean.png';
        break;
      case 'laundry':
        rat.imgUrl = '/images/laundry.png';
        break;
      case 'paint':
        rat.imgUrl = '/images/paint.png';
        break;
      default:
        rat.imgUrl = '/images/default.png'; // Default image
        break;
    }
    return rat;
  };

  // Add a new rat to the database
  const addRat = async (newRat) => {
    isLoading.value = true; // Set loading state to true
    error.value = null; // Reset error state
    successMessage.value = null; // Reset success message

    try {
      // Ensure the rats list is up-to-date
      if (rats.value.length === 0) {
        await fetchAllRats(); // Fetch rats if the list is empty
      }

      // Assign image URL to the new rat
      const ratWithImage = assignImgUrl(newRat);

      // Add the new rat to the existing list
      const updatedRats = [...rats.value, ratWithImage];

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

      // Update success message
      successMessage.value = 'Rat successfully added!';
    } catch (err) {
      // Set error message
      error.value = err.message || 'An error occurred while adding the rat.';
    } finally {
      // Reset loading state
      isLoading.value = false;
    }
  };

  // Return the necessary methods and reactive data
  return { addRat, error, isLoading, successMessage, assignImgUrl };
}
