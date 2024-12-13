<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useUser';

const { auth, editUser } = useAuth();

// Local state for the form
const description = ref('');
const areaOfMalmo = ref('');
const profileImageUrl = ref('');

// Check if the user's info is complete
const isUserInfoComplete = () => {
  return auth.description && auth.areaOfMalmo && auth.profileImageUrl;
};

const handleFormSubmit = async () => {
  // Accessing the actual values inside the `auth` ref
  const updatedUser = {
    ...auth.value, // Use `.value` to get the actual object
    description: description.value,
    areaOfMalmo: areaOfMalmo.value,
    profileImageUrl: profileImageUrl.value,
  };

  console.log('Updated User:', updatedUser); // Check if the updated user object has the right properties

  const success = await editUser(updatedUser);
  if (success) {
    alert('Your profile has been updated!');
  } else {
    alert('There was an issue updating your profile.');
  }
};



</script>

<template>
  <div>
    <h2>Your profile as a rat-renter. Welcome, {{ auth.username }}!</h2>
    <div class="info-container">
      <p>Your username is: {{ auth.username }}</p>
      <p>You are a {{ auth.role }} of rats!</p>
    </div>

    <!-- Check if the user's profile is complete -->
    <div v-if="!isUserInfoComplete()">
      <h3>we want to know more about you!</h3>
      <form @submit.prevent="handleFormSubmit">
        <label for="description">Description:</label>
        <input 
          v-model="description" 
          type="text" 
          id="description" 
          placeholder="Write a short description about yourself"
          required
        />

        <label for="areaOfMalmo">Area of Malmö:</label>
        <input 
          v-model="areaOfMalmo" 
          type="text" 
          id="areaOfMalmo" 
          placeholder="Which area of Malmö do you live in?" 
          required
        />

        <label for="profileImageUrl">Profile Image URL:</label>
        <input 
          v-model="profileImageUrl" 
          type="url" 
          id="profileImageUrl" 
          placeholder="URL of your profile image" 
          required
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
    <div v-else>
        <p>{{ auth.description }}</p>
        <p>{{ auth.areaOfMalmo }}</p>
        <img :src="auth.profileImageUrl" alt="profile-image" />

    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-transform: lowercase;
}

form {
  margin-top: 20px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

form button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

form button:hover {
  background-color: #45a049;
}
</style>
