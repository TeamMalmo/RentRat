<script setup>
import RatList from '@/components/Layouts/RatList.vue';
</script>

<template>
  <div class="container">
    <h1>This is a RenterHome page</h1>
    <RatList />
  </div>

</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 80vh;
}
</style>