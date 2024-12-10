<script setup>
import { useFetchRats } from '@/composables/useFetchRats';
import { onMounted } from 'vue';
import DeleteButton from './DeleteButton.vue';

const { rats, isLoading, error, fetchAllRats } = useFetchRats();

// Hämtar alla råttor för testing
onMounted(() => {
  fetchAllRats();
});

</script>

<template>
  <div>
    <ul>
      <li v-for="rat in rats" :key="rat.id">
        {{ rat.name }}
        <DeleteButton :rat="rat"/>
      </li>
    </ul>
  </div>
</template>
