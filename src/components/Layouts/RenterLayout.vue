<script setup>
// Router instance
import { useRouter } from 'vue-router';
import LogoutButton from '../Auth/LogoutButton.vue';

// Init the router instance 
const router = useRouter();

// Switch the layout to rentee by navigating to the /rentee route
function switchToRentee() {
  router.push('/rentee');
}
</script>

<template>
  <header>
    <nav>
      <!-- Nav links to the renter pages  -->
      <RouterLink to="/renter">Home</RouterLink>
      <RouterLink to="/renter/profile">Profile</RouterLink>
      <RouterLink to="/renter/about">About</RouterLink>
      
      <!-- Toggle Button to change layout-->
      <button @click="switchToRentee" class="toggle-btn">
        Switch to Rentee Layout
      </button>
      <LogoutButton />
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
