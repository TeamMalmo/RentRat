<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useUser';
import { useRouter } from 'vue-router';
import GlowButton from '../StyleComponents/GlowButton.vue';
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
    <GlowButton v-if="auth.isAuthenticated" @click="handleLogout" :disabled="isLoading">
      Log Out
    </GlowButton>
</template>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>