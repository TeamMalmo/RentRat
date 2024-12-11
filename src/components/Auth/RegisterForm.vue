<script setup>
import { ref } from 'vue';
import { addUser, login } from '@/composables/useUser';
import { uid } from 'uid';
import { useRouter } from 'vue-router';

const router = useRouter();

const id = uid(5);

//state för ny användare
const newUser = ref({
  id,
  username: '',
  password: '',
  role: '',
});

const confirmPassword = ref('');
const errorMessage = ref('');

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
    const success = await addUser(newUser.value, confirmPassword.value);
    if (success) {
      alert('Registration successful!');
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
          <input
            type="radio"
            value="renter"
            v-model="newUser.role"
            aria-label="I want to rent out rats"
          />
          ✅🐀 I have rats - I want to rent them out
        </label>
        <label>
          <input
            type="radio"
            value="rentee"
            v-model="newUser.role"
            aria-label="I want to rent rats"
          />
          ❌🐀 I have no rats - I want to rent!
        </label>
      </div>

      <!-- Username -->
      <div class="div">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          required
          v-model="newUser.username"
        />
      </div>

      <!-- Password -->
      <div class="div">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          v-model="newUser.password"
        />
      </div>

      <!-- Confirm Password -->
      <div class="div">
        <label for="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          required
          v-model="confirmPassword"
        />
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Submit Button -->
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.register-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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

button[type="submit"] {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
