<script setup>
// Router instance
import { useRouter } from "vue-router";
import LogoutButton from "../Auth/LogoutButton.vue";
import GlowButton from "../StyleComponents/GlowButton.vue";

// Init router instance
const router = useRouter();

// Nav to the renter layout funciton
function switchToRenter() {
  router.push("/renter");
}
</script>

<template>
  <header>
    <nav>
      <!-- Nav links for rentee  -->
      <RouterLink to="/rentee">Home</RouterLink>
      <RouterLink to="/rentee/profile">Profile</RouterLink>
      <RouterLink to="/rentee/inbox">Inbox</RouterLink>
      <RouterLink to="/rentee/history">History</RouterLink>
      <RouterLink to="/rentee/about">About</RouterLink>

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

<style scoped></style>
