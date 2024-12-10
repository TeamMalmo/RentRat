<script setup>
import { useFetchRats } from '@/composables/useFetchRats';
import { useRemoveRat } from '@/composables/useRemoveRatById';
import { onMounted } from 'vue';

const { rats, isLoading, error, fetchAllRats } = useFetchRats();
const { removeRatById } = useRemoveRat();

// Fetch all rats when the component is mounted
onMounted(() => {
  fetchAllRats();
});

// Function to remove rat and update the list
const removeRat = async (ratId) => {
  // Ask for confirmation before removing
  const isConfirmed = window.confirm('Are you sure you want to remove this rat?');
  
  // If the user clicks 'Cancel', stop the removal process
  if (!isConfirmed) return;

  // Proceed with removal if confirmed
  await removeRatById(ratId);
  
  // Remove the rat locally from the reactive list after the database is updated
  const updatedRats = rats.value.filter(rat => rat.id !== ratId);
  rats.value = updatedRats; // Update the reactive 'rats' array
};
</script>

<template>
  <div>
    <ul>
      <li v-for="rat in rats" :key="rat.id">
        {{ rat.name }}
        <button @click="removeRat(rat.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>
