<!-- This is the home page for users who want to rent rats and their servces 
 Logged in, as well as guests -->

<script setup>
import WelcomeMessage from '@/components/Auth/WelcomeMessage.vue';
import FindRats from '@/components/FindRats/FindRats.vue';
</script>

<template>
  <div class="container">
    <!-- The component to display messages depending on user login status  -->
    <WelcomeMessage />
    <!-- The component to fetching, filtering and displaying the list of rats  -->
    <FindRats  />
  </div>

</template>

<style scoped>
.container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>