<script setup>
import { useAuth } from '@/composables/useUser';
import { useFetchRats } from '@/composables/useFetchRats';
import { onMounted, ref, computed } from 'vue';
import GlowButton from '../StyleComponents/GlowButton.vue';
import RatItem from '../FindRats/RatItem.vue';
import UserCard from './UserCard.vue';

const { fetchAllUsers } = useAuth(); // Import fetchAllUsers
const { rats, fetchAllRats } = useFetchRats();
const users = ref([]); // Create a reactive list of users
const listContent = ref('rats'); // Default content is rats

onMounted(async () => {
  users.value = await fetchAllUsers(); // Fetch and assign users
  await fetchAllRats(); // Fetch and assign rats
});

// Compute the renter with the most rats
const ratQueen = computed(() => {
  const renterRatCount = users.value
    .filter(user => user.role === 'renter') // Only include renters
    .map(renter => ({
      name: renter.username, // Assuming `username` is the name field
      ratCount: rats.value.filter(rat => rat.renter === renter.username).length, // Count their rats
      profileImageUrl: renter.profileImageUrl // Assuming `profileImageUrl` exists for each user
    }))
    .sort((a, b) => b.ratCount - a.ratCount); // Sort by rat count in descending order

  return renterRatCount.length > 0 ? renterRatCount[0] : null; // Return the top renter or null if none
});
</script>

<template>
  <div class="scoreboard">
    <div class="general-stats">
      <h3>Stats</h3>
      <p><span>Total Users:</span> {{ users.length }}</p>
      <p><span>Total Rats:</span> {{ rats.length }}</p>
      <p><span>Total Renters:</span> {{ users.filter(user => user.role === 'renter').length }}</p>
      <p><span>Total Rentees:</span> {{ users.filter(user => user.role === 'rentee').length }}</p>
    </div>
    <div class="rat-queen" v-if="ratQueen">
      <h3>Current Rat Queen</h3>
      <img v-if="ratQueen.profileImageUrl" :src="ratQueen.profileImageUrl" alt="Rat Queen's Profile Image" />
      <img v-else src="/images/default.png" alt="Rat Queen's Profile Image">
      <p>{{ ratQueen.name }} 🐀👑 with {{ ratQueen.ratCount }} rats</p>
    </div>
    <p v-else>
      No Rat Queen yet! Get renting!
    </p>
  </div>
  <h3>Select a list:</h3>

  <div class="list">
    <GlowButton @click="listContent = 'rats'">Rats</GlowButton>
    <GlowButton @click="listContent = 'renters'">Renters</GlowButton>
    <GlowButton @click="listContent = 'rentees'">Rentees</GlowButton>
  </div>

  <!-- List of Rats -->
  <ul v-if="listContent === 'rats'">
    <RatItem
      v-for="rat in rats"
      :key="rat.id"
      :rat="rat"
      @click="$router.push(`/rentee/rats/${rat.id}`)"
    />
  </ul>

  <!-- List of Renters -->
  <ul v-if="listContent === 'renters'">
    <UserCard v-for="renter in users.filter(user => user.role === 'renter')" :key="renter.id" :user="renter"/>
  </ul>

  <!-- List of Rentees -->
  <ul v-if="listContent === 'rentees'">
    <UserCard v-for="rentee in users.filter(user => user.role === 'rentee')" :key="rentee.id" :user="rentee"/>
  </ul>
</template>

<style>
.scoreboard {
  width: 100%;
  display: flex;
  gap: 2rem;
}

.rat-queen {
  width: 50%;
  font-size: 1.5rem;
  text-align: center;
}

.general-stats {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
}

.general-stats > p {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.rat-queen img {
  margin-top: 1rem;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}

.list {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.profile-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}
</style>
