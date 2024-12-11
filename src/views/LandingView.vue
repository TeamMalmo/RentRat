
<script setup>
import LoginForm from '@/components/Auth/LoginForm.vue';
</script>

<template>
<div>
  <h1>Welcome</h1>
  <RouterLink to="/renter">
    <button>I am a Renter</button>
  </RouterLink>
  <RouterLink to="/rentee">
    <button>I am a Rentee</button>
  </RouterLink>

</div>
<LoginForm/>
</template>