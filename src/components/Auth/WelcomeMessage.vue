<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useUser';
import { useRouter } from 'vue-router';

const { logout, auth } = useAuth();

const isLoading = ref(false); // Laddning tillstånd för utloggning
const router = useRouter();

const handleLogout = async () => {
  isLoading.value = true;

  // Pass the userId to logout
  const successfulLogout = await logout(auth.value.userId);

  if (successfulLogout) {
    router.push('/'); // Redirect to landing page
  } else {
    console.error('Failed to log out');
  }
  isLoading.value = false;
};
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
    
    <!-- Logout button -->
    <button v-if="auth.isAuthenticated" @click="handleLogout" :disabled="isLoading">
      Logga ut
    </button>
  </div>
</template>

<style scoped>
.loading-message {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #8a8a8a;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
