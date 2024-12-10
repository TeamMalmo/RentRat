<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function switchToRentee() {
  router.push('/rentee');
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/renter">Home</RouterLink>
      <RouterLink to="/renter/profile">Profile</RouterLink>
      <RouterLink to="/renter/about">About</RouterLink>
      
      <!-- Toggle Button -->
      <button @click="switchToRentee" class="toggle-btn">
        Switch to Rentee Layout
      </button>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>



<style scoped>
.toggle-btn {
  margin-left: auto;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
