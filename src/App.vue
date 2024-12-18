<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginForm from './components/Auth/LoginForm.vue';
import { authMessage } from './router';
</script>

<template>
  <div v-if="authMessage.message" class="login-prompt-div">
    <h3>{{ authMessage.message }}</h3>
    <LoginForm />
  </div>
  <RouterView />
</template>

<style scoped>
.login-prompt-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
