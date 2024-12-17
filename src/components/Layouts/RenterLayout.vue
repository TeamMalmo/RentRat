<script setup>
import { useRouter } from 'vue-router';
import LogoutButton from '../Auth/LogoutButton.vue';
import GlowButton from '../GlowButton.vue';

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
