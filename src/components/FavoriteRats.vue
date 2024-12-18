<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useFetchRats } from "@/composables/useFetchRats";
import { useAuth } from "@/composables/useUser";
import RatItem from "./FindRats/RatItem.vue";

// Get users auth state 
const { auth } = useAuth();
// Import list of fetched rats
const { rats } = useFetchRats();

// Ref to store favorite rats
const favoriteRats = ref([]);

// Debugging logs
console.log('Auth Favorites:', auth.value.favorites);
console.log('Rats:', rats.value);

// Watch for changes in rats and favorites
watch(
  [rats, auth],
  () => {
    if (rats.value && auth.value?.favorites) {
      favoriteRats.value = rats.value.filter((rat) =>
        auth.value.favorites.includes(rat.id)
      );
    } else {
      favoriteRats.value = [];
    }
  },
  { immediate: true, deep: true } // Ensure reactivity and run on initial load
);



// // Computed property to dynamically filter rats based on favorites
// const favoriteRats = computed(() => {
//     // Only if rats and favorites are loaded
//     if (rats.value && auth.value.favorites) {
//         return rats.value.filter(rat => auth.value.favorites.includes(rat.id));
//     };
//     return [];
// })

// // Do when component is mounted to DOM
// onMounted(() => {
//     // Check if the authenticated user has favorites and if rats are loaded
//   if (rats.value && auth.value.favorites) {
//     // Filter so only rats with ids in favorites are included
//     favoriteRats.value = rats.value.filter((rat) =>
//       auth.value.favorites.includes(rat.id)
//     );
//   }
// });

</script>

<template>
  <div class="favorite-container">
    <h2>Favorite rats</h2>
    <ul v-if="favoriteRats.length" class="fave-rat-list">
      <RatItem
        v-for="rat in favoriteRats"
        :key="rat.id"
        :rat="rat"
        @click="$router.push(`/rentee/rats/${rat.id}`)"
      />
    </ul>
    <p v-else>You have no favorite rats yet.</p>
  </div>
</template>
