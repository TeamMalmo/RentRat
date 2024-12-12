<script setup>
import { useRouter } from 'vue-router';
import LogoutButton from '../Auth/LogoutButton.vue';

const router = useRouter();

function switchToRenter() {
  router.push('/renter');
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/rentee">Home</RouterLink>
      <RouterLink to="/rentee/rats">Your Rats</RouterLink>
      <RouterLink to="/rentee/profile">Profile</RouterLink>
      <RouterLink to="/rentee/inbox">Inbox</RouterLink>
      
      <!-- Toggle Button -->
      <button @click="switchToRenter" class="toggle-btn">
        Switch to Renter Layout
      </button>
    </nav>
    <LogoutButton />
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
