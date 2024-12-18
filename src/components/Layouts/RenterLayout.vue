<script setup>
// Router instance
import { useRouter } from 'vue-router';
import LogoutButton from '../Auth/LogoutButton.vue';
import GlowButton from '../StyleComponents/GlowButton.vue';

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
      
      <!-- Toggle Button -->
      <GlowButton @click="switchToRentee" class="toggle-btn">

        Switch to Rentee Layout
      </GlowButton>
      <LogoutButton />
    </nav>

  </header>

  <main>
    <RouterView />
  </main>
</template>



<style scoped>
</style>
