<script setup>
import { onMounted, ref, computed } from "vue";
import { useFetchRats } from "../composables/useFetchRats";


    const { rats, isLoading, error, fetchAllRats } = useFetchRats();

  onMounted(() => {
      fetchAllRats(); // Fetch rats when the component is mounted
  });

// alla refs för filtering av rats
const searchText = ref('');
const selectedFilter = ref(''); // primarySkill' eller 'areaOfMalmo'
const filterValue = ref(''); // baseras på getFilterOptions()
const sortOrder = ref(''); //  'low-to-high' eller 'high-to-low'

onMounted(async() => {
  await fetchAllRats();
});

// hämtar alla options dynamiskt baserat på datan i rats
const getFilterOptions = (filterKey) => {
  if (!filterKey) return [];
  return [...new Set(rats.value.map((rat) => rat[filterKey]))];
};


const filteredRats = computed(() => {
  // Unwrap the ref to access the array directly
  const allRats = rats.value;

  if (!Array.isArray(allRats)) return []; // Safeguard to ensure it's iterable

  // 1) Filter by search text
  let filtered = allRats.filter((rat) =>
    rat.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
    rat.primarySkill.toLowerCase().includes(searchText.value.toLowerCase()) ||
    rat.areaOfMalmo.toLowerCase().includes(searchText.value.toLowerCase())
  );

  // 2) Filter by selected filter and value
  if (selectedFilter.value && filterValue.value) {
    filtered = filtered.filter((rat) =>
      rat[selectedFilter.value] === filterValue.value
    );
  }

  // 3) Sort by price
  if (sortOrder.value === 'low-to-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === 'high-to-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
});

</script>


<template>
  <h1>Find Your Perfect Rat!</h1>
  <div class="rat-filter">
    <!-- Search -->
    <div class="search">
      <label for="search"></label>
      <input
        id="search"
        type="text"
        v-model="searchText"
        placeholder="Search..."
      />
    </div>

    <!-- Filter Dropdown: Skill/Area -->
    <div class="filter">
      <label for="filter">Filter by:</label>
      <select id="filter" v-model="selectedFilter">
        <option value="">--Select Filter--</option>
        <option value="primarySkill">Primary Skill</option>
        <option value="areaOfMalmo">Area of Malmö</option>
      </select>

      <label v-if="selectedFilter" for="filter-value">
        Select {{ selectedFilter === "primarySkill" ? "Skill" : "Area" }}:
      </label>
      <select v-if="selectedFilter" id="filter-value" v-model="filterValue">
        <option value="">--Select Value--</option>
        <option
          v-for="option in getFilterOptions(selectedFilter)"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Price Sorting -->
    <div class="sort">
      <label for="sort">Sort by Price:</label>
      <select id="sort" v-model="sortOrder">
        <option value="">--No Sorting--</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>
    </div>
  </div>

  <!-- Render Filtered Rats -->
  <ul class="rat-list" v-if="filteredRats.length > 0">
    <li v-for="rat in filteredRats" :key="rat.id" class="rat-list-item">
      <span>
        <h2>{{ rat.name }} in {{ rat.areaOfMalmo }}</h2>
        <p>Primary Skill: {{ rat.primarySkill }}</p>
        <p>Other Skills: {{ rat.skills.map((skill) => skill).join(", ") }}</p>
        <p>Available? {{ rat.availability ? "Yes" : "No" }}</p>
        <p>Renter: {{ rat.renter }}</p>
      </span>
      <span>
        <img
          :src="rat.imgUrl"
          :alt="`Image of ${rat.name}, skilled at ${rat.primarySkill}`"
          class="rat-image"
        />
        <p>Hourly Rate: {{ rat.price }}:-</p>
      </span>
    </li>
  </ul>
  <div v-else>
    <p style="text-align: center; font-size: 1.2rem; color: red; margin-top: 1rem;">
      💔 No perfect rat found. Try adjusting your filters! 💔
    </p>
  </div>
</template>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box ;
        text-transform:lowercase;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    h2{
        font-weight: 100;
    }

    .rat-filter {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .rat-list{
        height: 100%;
        width: 600px;
        overflow-y: auto; /* Enable vertical scrolling if content overflows */
        display: flex;
        flex-direction: column; 
        align-items: center;
        gap: 0.5rem;
    }

    .rat-list::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Edge */
    }

    .rat-list-item {
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        justify-content: space-between;
        border-radius: 0.5rem;
        padding: 0.5rem;
        /* margin: 0.5rem; */
        width: 500px;
        background-color: #8ACE00;
    }

    .rat-list-item:hover{
        transform: scale(1.05);
        transition: 0.2s ease-in-out;
    }

    .rat-image {
        width: 100px;
        border-radius: 100%;
    }
</style>