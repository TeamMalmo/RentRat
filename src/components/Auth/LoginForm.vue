<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useUser';
import RegisterForm from './RegisterForm.vue';
import GlowButton from '../StyleComponents/GlowButton.vue';

const { login } = useAuth();

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false); // Added loading state
const router = useRouter();
const showRegisterForm = ref(false);

const handleSubmit = async () => {
  isLoading.value = true; // Start loading

  try {
    const success = await login(username.value, password.value);
    if (success) {
      const {auth} = useAuth();
      const redirectRoute = auth.value.role === 'renter' ? '/renter' : '/rentee';
      router.push(redirectRoute); 
    } else {
      errorMessage.value = 'Invalid login credentials. Please try again.';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again later.';
  } finally {
    isLoading.value = false; // Stop loading
  }
};
</script>

<template>
  <div class="login-form" v-if="!showRegisterForm">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="inputs">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" placeholder="ratLover89" required />
      </div>
      <div class="inputs">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" placeholder="manILoveRats" required />
      </div>
      <GlowButton type="submit" :disabled="isLoading">Login</GlowButton>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <GlowButton @click="showRegisterForm = true" v-if="!showRegisterForm">Register</GlowButton>
    
  </div>
  <RegisterForm v-else @close="showRegisterForm = false" @back="showRegisterForm = false" />
</template>

<style scoped>
/* 
*{
        margin: 0;
        padding: 0;
        box-sizing: border-box ;
        text-transform:lowercase;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    
} */

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #8ACE00;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form h2 {
  text-align: center;
}

.login-form .error {
  color: red;
  margin-top: 10px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}


.inputs {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

input{
  background-color: #8ACE00;
  padding: 5px;
  border-radius: 5px;
}

</style>
