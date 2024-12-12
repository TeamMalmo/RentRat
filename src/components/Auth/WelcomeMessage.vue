<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useUser';
import { useRouter } from 'vue-router';

const { auth } = useAuth();

const isLoading = ref(false); // Laddning tillstånd för utloggning

</script>

<template>
  <!-- Loading... -->
  <div v-if="isLoading" class="loading-message">
    🐭 Loading... Please wait! 🐭
  </div>

  <!-- If the user is logged in, show their username and role -->
  <div v-else>
    <div v-if="auth.isAuthenticated">
      <h2>Welcome back, {{ auth.username }}!</h2>
      <p>You are logged in as a {{ auth.role }}.</p>
    </div>
    
    <!-- If the user is not logged in, show login prompt -->
    <div v-else>
      <h2>Welcome to RentRat!</h2>
      <p>Please log in to access your account.</p>
    </div>
    
  </div>
</template>

<style scoped>
.loading-message {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #8a8a8a;
}

</style>
