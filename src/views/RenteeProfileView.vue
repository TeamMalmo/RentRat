<!-- This is the profile page for users who are renting rats and their services  -->
<script setup>
import UpdateUser from '@/components/EditUser/UpdateUser.vue';
import FavoriteRats from '@/components/FavoriteRats.vue';
</script>

<template>
  <main>
    <!-- The component to edit user information  -->
    <UpdateUser />
    <FavoriteRats />
  </main>
</template>
