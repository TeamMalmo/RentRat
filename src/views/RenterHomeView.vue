<!-- This is the first home page for those who have rats for rent -->
<script setup>
import AddRats from '@/components/AddRats/AddRats.vue';
import WelcomeMessage from '@/components/Auth/WelcomeMessage.vue';
</script>

<template>
    <WelcomeMessage />
    <!-- The component with the form to add a new rat displays on home for renters -->
    <AddRats/>
</template>

<style scoped>

</style>