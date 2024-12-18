<!-- This is the profile page for people who have rats that they're renting out  -->
<script setup>
import { ref } from 'vue';
import EditRats from '@/components/EditRats/EditRats.vue';
import UpdateUser from '@/components/EditUser/UpdateUser.vue';
import GlowButton from '@/components/StyleComponents/GlowButton.vue';

// bestämmer vilken view som visas
const editView = ref('');
</script>

<template>
  <main>
    <div class="btns">
      <GlowButton @click="editView = 'editRats'">Edit Rats🐀</GlowButton>
      <GlowButton @click="editView = 'updateUser'">Edit Profile✨</GlowButton>
    </div>
    <EditRats v-if="editView === 'editRats'" />
    <UpdateUser v-if="editView === 'updateUser'" />
  </main>
</template>
