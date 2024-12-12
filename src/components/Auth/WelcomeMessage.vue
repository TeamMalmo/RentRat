<script setup>
import  {ref } from 'vue';
import { useAuth, logout } from '@/composables/useUser';
import { useRouter } from 'vue-router';

const auth = useAuth();

const isLoggedIn = auth.value.isAuthenticated; // Check if user is authenticated
const router = useRouter();

const isLoading = ref(false);

const handleLogout = async () => {
  isLoading.value = true;
  const successfulLogout = await logout(); // Log out the user
  if (successfulLogout) {
    router.push('/'); // Redirect to login page
  } else {
    console.error('Failed to log out');
  } 
    isLoading.value = false;  
  }
</script>

<template>
  <div v-if="isLoading" class="loading-message">
    🐭 Loading... Please wait! 🐭
  </div>

  <!-- If the user is logged in, show their username and role -->
   <div v-else>
     <div v-if="isLoggedIn">
       <h2>Welcome back, {{ auth.username }}!</h2>
       <p>You are logged in as a {{ auth.role }}.</p>
     </div>
   
     <!-- If the user is not logged in, show login prompt -->
     <div v-else>
       <h2>Welcome to RentRat!</h2>
       <p>Please log in to access your account.</p>
     </div>
   
     <!-- Logout button -->
     <button @click="handleLogout">Logga ut</button>
   </div>
</template>
