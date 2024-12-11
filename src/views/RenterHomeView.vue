<script setup>
import AddRats from '@/components/AddRats/AddRats.vue';
import WelcomeMessage from '@/components/Auth/WelcomeMessage.vue';
</script>

<template>
  <div class="container">
    <WelcomeMessage />
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