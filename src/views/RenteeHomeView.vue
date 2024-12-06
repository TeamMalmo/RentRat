<script setup>
import RatList from '@/components/RatList.vue';
</script>

<template>
  <div class="container">
    <h1>Rats For Rent</h1>
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
  width: 100%;
}
</style>