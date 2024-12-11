<script setup>
import { useAuth } from '@/composables/useUser';

const auth = useAuth();
const isLoggedIn = auth.value.isAuthenticated;

</script>


<template>
  <div v-if="isLoggedIn">
    <h2>Welcome back, {{ auth.username }}!</h2>
    <p>You are logged in as a {{ auth.role }}.</p>
  </div>
  <div v-else>
    <h2>Welcome to RentRat!</h2>
    <p>Please log in to access your account.</p>
  </div>
</template>