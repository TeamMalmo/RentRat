<!-- This is the first home page for those who have rats for rent -->
<script setup>
import AddRats from '@/components/AddRats/AddRats.vue';
import WelcomeMessage from '@/components/Auth/WelcomeMessage.vue';
</script>

<template>
  <div class="container">
    <WelcomeMessage />
    <!-- The component with the form to add a new rat displays on home for renters -->
    <AddRats/>
  </div>

</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>