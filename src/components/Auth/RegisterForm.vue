<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useUser';
import { uid } from 'uid';
import { useRouter } from 'vue-router';

const { addUser, login } = useAuth();

const router = useRouter();
const id = uid(5);

// State for new user
const newUser = ref({
  id,
  username: '',
  password: '',
  role: '',
});

defineEmits(['back']);

const confirmPassword = ref('');
const errorMessage = ref('');
const isLoading = ref(false); // Added loading state


const handleRegister = async () => {
  errorMessage.value = ''; // Clear any previous error messages
  if (!newUser.value.role) {
    errorMessage.value = 'Please select a role.';
    return;
  }

  if (newUser.value.password !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  try {
    isLoading.value = true;
    const success = await addUser(newUser.value, confirmPassword.value);
    if (success) {
      const loginSuccess = await login(newUser.value.username, newUser.value.password);
      if (loginSuccess) {
        const redirectRoute = newUser.value.role === 'renter' ? '/renter' : '/rentee';
        router.push(redirectRoute); 
      } else {
        errorMessage.value = 'Login failed after registration. Please try logging in manually.';
      }
    } else {
      errorMessage.value = 'Failed to register. Please try again.';
    }
  } catch (error) {
    errorMessage.value = `An unexpected error occurred: ${error.message}`;
  } finally {
    isLoading.value = false; // Stop loading
  }
};
</script>

<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <!-- Role Selection -->
      <div class="roles">
        <label>
          <input type="radio" value="renter" v-model="newUser.role" />
          ✅🐀 I have rats - I want to rent them out
        </label>
        <label>
          <input type="radio" value="rentee" v-model="newUser.role" />
          ❌🐀 I have no rats - I want to rent!
        </label>
      </div>

      <!-- Username -->
      <div class="div">
        <label for="NewUserUsername">Username:</label>
        <input type="text" id="NewUserUsername" placeholder="ratsummer" required v-model="newUser.username" />
      </div>

      <!-- Password -->
      <div class="div">
        <label for="newUserPassword">Password:</label>
        <input type="password" id="newUserPassword" required v-model="newUser.password" />
      </div>

      <!-- Confirm Password -->
      <div class="div">
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" required v-model="confirmPassword" />
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="isLoading">Register</button>
    </form>
    <button @click="$emit('back')">Back</button>
  </div>
</template>

<style scoped>

*{
        margin: 0;
        padding: 0;
        box-sizing: border-box ;
        text-transform:lowercase;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.register-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #8ACE00;
}


form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

input{
  background-color: #8ACE00;
}

.roles {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button {
  padding: 0.5rem 1rem;
  background-color: #8ACE00;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  border: 1px solid black;
}

button:hover {
  background-color: #abff03;
}
</style>
