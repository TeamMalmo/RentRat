<script setup>
import { useRats } from '@/composables/useRats';

const {rats} = useRats();

</script>

<template>
  <main>
    <h1>This is a RenteeHome page</h1>
    <ul>
      <li v-for="rat in rats" :key="rat.id">
        <h2>{{ rat.name }}</h2>
        <p>Price: {{ rat.price }}</p>
        <p>Skills: {{ rat.skills }}</p>
        <p>Availability: {{ rat.availability }}</p>
        <p>Area of Malmo: {{ rat.areaOfMalmo }}</p>
        <img :src="rat.imgUrl" alt="rat-image">
      </li>
    </ul>
  </main>
</template>

