<script setup>
import { useRouter } from 'vue-router';
import LogoutButton from '../Auth/LogoutButton.vue';
import GlowButton from '../GlowButton.vue';

const router = useRouter();

function switchToRenter() {
  router.push('/renter');
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/rentee">Home</RouterLink>
      <RouterLink to="/rentee/profile">Profile</RouterLink>
      <RouterLink to="/rentee/inbox">Inbox</RouterLink>
      
      <!-- Toggle Button -->
      <GlowButton @click="switchToRenter" class="toggle-btn">
        Switch to Renter Layout
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
