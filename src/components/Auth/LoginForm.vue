  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { login, useAuth } from '@/composables/useUser';
  import RegisterForm from './RegisterForm.vue';
  
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();
      const showRegisterForm = ref(false);


  
      const handleSubmit = async () => {
        // testar att login fungerar
        const success = await login(username.value, password.value);
        if (success) {
          // fyller auth med användarens data från auth ref (i useUser.js)
          const auth = useAuth();
          // baserat på role navigeras användaren rätt
          const redirectRoute = auth.value.role === 'renter' ? '/renter' : '/rentee';
          router.push(redirectRoute); 
        } else {
          errorMessage.value = 'Invalid login credentials. Please try again.';
        }
      };
  
  </script>

<template>
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Login</button> 
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <button @click="showRegisterForm = true">Register</button>
    </div>
    <RegisterForm v-show="showRegisterForm" @close="showRegisterForm = false" />
  </template>
  
  
  <style scoped>
  .login-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .login-form h2 {
    text-align: center;
  }
  .login-form .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  