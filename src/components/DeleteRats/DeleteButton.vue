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
    <button class="delete" @click="removeRat(rat.id)">🗑️delete rat</button>
</template>

<style scoped>
.delete {
    background-color: #d6acac;
    color: white;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
}

.delete:hover {
    background-color: #fd0d0d;
}
</style>