<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@/composables/useUser';
import UpdateUserForm from './UpdateUserForm.vue';
import LoginForm from '../Auth/LoginForm.vue';
import GlowButton from '../StyleComponents/GlowButton.vue';
import UserInformation from './UserInformation.vue';

const { auth, editUser } = useAuth();
const showEditForm = ref(false);
const showLoginForm = ref(false);
const isLoading = ref(false);

// hämtar den inloggade anvädaren för att kunna redigera
const currentUser = computed(() => auth.value);

// funktionen som anropas när användaren trycker på knappen "Submit" i UpdateUserForm.vue
const handleFormSubmit = async (updatedUser) => {
  isLoading.value = true; // laddar under awaiting
  const success = await editUser(updatedUser); // tar in användarens uppdaterade information
  if (success) {
    showEditForm.value = false; // döljer UpdateUserForm.vue
  } else {
    alert('There was an issue updating your profile.');
  }
  isLoading.value = false; 
};
</script>


<template>
  <main>
  <div v-show="!showEditForm">
    <!-- Om användaren är inloggad visas denna sektion -->
    <div v-if="currentUser.isAuthenticated">
      <UserInformation :currentUser="currentUser" />
      <GlowButton @click="showEditForm = !showEditForm">✏️Edit Profile</GlowButton>
    </div>
    <!-- Om användaren inte är inloggad visas denna sektion -->
    <div v-else>
      <p>No user is currently signed in.</p>
      <GlowButton @click="showLoginForm = !showLoginForm">Login🐀</GlowButton>
      <LoginForm v-if="showLoginForm" @submit="handleLogin" />
    </div>
</div>
    <!-- detta visas bara om showEditForm är true -->
    <div v-if="showEditForm">
      <!-- innan laddning -->
      <div v-if="!isLoading">
        <h3>We want to know more about you, {{ currentUser.username }}!</h3>
        <UpdateUserForm :user="currentUser" @submit="handleFormSubmit" />
        <GlowButton @click="showEditForm = !showEditForm">❌Back</GlowButton>
      </div>
      <!-- under laddning -->
      <div v-else>
        <p>Loading rat info 🐀🐀🐀...</p>
      </div>

    </div>
  </main>
</template>

<style>
main {
  width: 100%;
  margin-top: 2rem;  
  padding: 0;
  box-sizing: border-box;
  text-transform: lowercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  margin-top: 1rem;
  border: 2px solid #ccc;
  border-radius: 50%;
}

li {
  list-style-type: none;
}
</style>
