<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from '@/composables/useUser';
import { useRouter } from 'vue-router';
import { useFetchRats } from '@/composables/useFetchRats.js';

const { rats, fetchAllRats } = useFetchRats();

const { auth } = useAuth();

const isLoading = ref(false); // Laddning tillstånd för utloggning

onMounted(async () => {
  await fetchAllRats();
});

</script>

<template>
  <!-- Loading... -->
  <div v-if="isLoading" class="loading-message">
    🐭 Loading... Please wait! 🐭
  </div>

  <!-- If the user is logged in, show their username and role -->
  <div v-else>
    <div class="user-info" v-if="auth.isAuthenticated">
      <div >
        <h2>Welcome back, {{ auth.username }}!</h2>
        <p>You are logged in as a {{ auth.role }}.</p>
        <p>You have {{ rats.filter(rat => rat.renter === auth.username).length }} rats.</p>
      </div>
      <img v-if="auth.profileImageUrl" :src="auth.profileImageUrl" alt="Profile Picture">
      <img v-else src="/images/default.png" alt="Profile Picture">
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

.user-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.user-info img {
  width: 120px;
  border-radius: 50%;
}

</style>
