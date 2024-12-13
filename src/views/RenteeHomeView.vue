<script setup>
import WelcomeMessage from '@/components/Auth/WelcomeMessage.vue';
import FindRats from '@/components/FindRats/FindRats.vue';
</script>

<template>
  <div class="container">
    <WelcomeMessage />
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