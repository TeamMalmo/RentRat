<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('mounted, bitch')
})
</script>

<template>
  <div>
    <h1 class="">Rent a Rat</h1>
    <object
      type="image/svg+xml"
      data="/images/rent-a-rat-vector.svg"
      class="svg-object"
    ></object>
    <RouterLink to="/renter">
      <button>I am a Renter</button>
    </RouterLink>
    <RouterLink to="/rentee">
      <button>I am a Rentee</button>
    </RouterLink>
  </div>
</template>

<style>

.svg-object {
  max-width: 100%;
}
</style>
