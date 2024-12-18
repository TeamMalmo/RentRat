<script setup>
import { ref } from 'vue';
import GeneralInfo from './GeneralInfo.vue';
import StatsInfo from './StatsInfo.vue';
import ContactInfo from './ContactInfo.vue';
import GlowButton from '../StyleComponents/GlowButton.vue';

const infoView = ref('general');

</script>

<template>
<div>
<GlowButton @click="infoView = 'general'"> Info</GlowButton>
<GlowButton @click="infoView = 'stats'">Stats</GlowButton>
<GlowButton @click="infoView = 'contact'">Contact</GlowButton>
</div>
<div class="container">
    <GeneralInfo v-if="infoView === 'general'" />
    <StatsInfo v-if="infoView === 'stats'" />
    <ContactInfo v-if="infoView === 'contact'" />
</div>
</template>

<style>
  .container {
    padding-top: 1rem;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;  
    gap: 1rem;
  }

</style>
