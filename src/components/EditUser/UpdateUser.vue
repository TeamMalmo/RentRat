<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@/composables/useUser';
import UpdateUserForm from './UpdateUserForm.vue';

const { auth, editUser } = useAuth();
const showEditForm = ref(false);
const isLoading = ref(false);

const currentUser = computed(() => auth.value);

const handleFormSubmit = async (updatedUser) => {
  isLoading.value = true; // Show loading state while the form is being submitted
  const success = await editUser(updatedUser);
  if (success) {
    showEditForm.value = false; // Hide the form after successful submission
  } else {
    alert('There was an issue updating your profile.');
  }
  isLoading.value = false; // Hide loading state after submission
};
</script>


<template>
  <main>
      <h1>This is an UpdateUser page</h1>
  <div v-show="!showEditForm">
    <div v-if="currentUser.isAuthenticated">
      <h2>User Information</h2>
      <img v-if="currentUser.profileImageUrl" :src="currentUser.profileImageUrl" alt="Profile" width="150" />
      <span v-else>No profile image</span>
      <ul>
        <li><strong>Username:</strong> {{ currentUser.username }}</li>
        <li><strong>Description:</strong>
          <span v-if="currentUser.description">{{ currentUser.description }}</span>
          <span v-else>No description added</span>
          </li>
        <li><strong>Area of Malmo:</strong>
          <span v-if="currentUser.areaOfMalmo">{{ currentUser.areaOfMalmo }}</span>
          <span v-else>No area of Malmö provided</span>
        </li>
        <li><strong>Role:</strong> {{ currentUser.role }}</li>
      </ul>
    </div>
    <div v-else>
      <p>No user is currently signed in.</p>
    </div>
    <button @click="showEditForm = !showEditForm">Edit Profile</button>
</div>
    <!-- Edit form will be shown only if showEditForm is true -->
    <div v-if="showEditForm">
      <div v-if="!isLoading">
        <h3>We want to know more about you!</h3>
        <UpdateUserForm :user="currentUser" @submit="handleFormSubmit" />
      </div>
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
