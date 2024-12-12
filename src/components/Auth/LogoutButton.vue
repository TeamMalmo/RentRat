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
    <!-- Logout button -->
    <button v-if="auth.isAuthenticated" @click="handleLogout" :disabled="isLoading">
      Log Out
    </button>
</template>

<style scoped>
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