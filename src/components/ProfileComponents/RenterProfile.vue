<script setup>
import { ref } from "vue";
import ProfileInfo from "./ProfileInfo.vue";
import EditRats from "../EditRats/EditRats.vue";

// Open on my rats, track active tab
const activeTab = ref("Rats");

// Set tabs to their components
const tabs = {
  Rats: EditRats,
  Profile: ProfileInfo,
};
</script>

<template>
  <main>
    <h1>Welcome bajs</h1>
    <nav>
      <div>
        <!-- Loop through the tabs in tabs object -->
        <!-- Key is name of tab  -->
        <!-- Conditionally apply active class if active tab is current tab  -->
        <button
          v-for="(component, tab) in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          <!-- Show tab name  -->
          {{ tab }}
        </button>
      </div>
    </nav>
    <component :is="tabs[activeTab]" />
  </main>
</template>
