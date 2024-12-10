<script setup>
import { useRemoveRat } from '@/composables/useRemoveRatById';
const { removeRatById } = useRemoveRat();

//tar emot en specifik råtta
defineProps({
    rat: Object
})

const removeRat = async (ratId) => {
  // felhantering - säkerhetsnät
  const isConfirmed = window.confirm('Are you sure you want to remove this rat?');
  
  // avbryter radering trycker på cancel
  if (!isConfirmed) return;

  // kallar på funktionen i vår composable
  await removeRatById(ratId);
};
</script>

<template>
    <button @click="removeRat(rat.id)">🗑️</button>
</template>

<style scoped>
button {
    background-color: #d6acac;
    color: white;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
}

button:hover {
    background-color: #f47f7f;
}
</style>