<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useUser";

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/675ab4e2ad19ca34f8d9e088';
const apiKey = CONFIG.JSONBIN_API_KEY;

// Get the logged in user's data
const { auth } = useAuth();

// Reactive fields for data 
// First current username
const updatedUsername = ref(auth.value.username);
const updatedPassword = ref('');

// Handle update user data 
const saveProfile = async () => {
    
}
</script>

<template>
  <h1>{{ auth.username }}'s Profile</h1>
</template>
