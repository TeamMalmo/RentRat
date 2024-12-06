<script setup>
import { ref, computed } from 'vue';
import { useRats } from '@/composables/useRats';

const { rats } = useRats();

// alla refs för filtering av rats
const searchText = ref('');
const selectedFilter = ref(''); // primarySkill' eller 'areaOfMalmo'
const filterValue = ref(''); // baseras på getFilterOptions()
const sortOrder = ref(''); //  'low-to-high' eller 'high-to-low'

// hämtar alla options dynamiskt baserat på datan i rats
const getFilterOptions = (filterKey) => {
  if (!filterKey) return [];
  return [...new Set(rats.map((rat) => rat[filterKey]))];
};


// computed property för att uppdatera 'filteredRats' vid filtering av rats
const filteredRats = computed(() => {
  // 1) filtera baserat på söktext (i lowerCase)
    let filtered = rats.filter((rat) =>
    rat.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
    rat.primarySkill.toLowerCase().includes(searchText.value.toLowerCase()) ||
    rat.areaOfMalmo.toLowerCase().includes(searchText.value.toLowerCase())
  );

  // 2) filterar baserad på område eller skill (avgörs i funktionskallet 'getFilterOptions')
  if (selectedFilter.value && filterValue.value) {
    filtered = filtered.filter((rat) =>
      rat[selectedFilter.value] === filterValue.value
    );
  }

  // #) sortera baserat på pris (två options för sortering)
  if (sortOrder.value === 'low-to-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === 'high-to-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  // returnera filtrerade rats som rederas ut i listan
  return filtered;
});
</script>


<template>
      <h1>Find Your Perfect Rat!</h1>
    <div class="rat-filter">
        <!-- sök -->
        <div class="search">
          <label for="search"></label>
          <input
            id="search"
            type="text"
            v-model="searchText"
            placeholder="Search..."
          />
        </div>
    
        <!-- filter dropdown skill/area -->
        <div class="filter">
          <label for="filter">Filter by:</label>
          <select id="filter" v-model="selectedFilter">
            <option value="">--Select Filter--</option>
            <option value="primarySkill">Primary Skill</option>
            <option value="areaOfMalmo">Area of Malmö</option>
          </select>
    
          <label v-if="selectedFilter" for="filter-value">
            Select {{ selectedFilter === 'primarySkill' ? 'Skill' : 'Area' }}:
          </label>
          <select
            v-if="selectedFilter"
            id="filter-value"
            v-model="filterValue"
          >
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
    
        <!-- sortering av pris -->
        <div class="sort">
          <label for="sort">Sort by Price:</label>
          <select id="sort" v-model="sortOrder">
            <option value="">--No Sorting--</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
    </div>
  
      <!-- redera ut filteredRats -->
      <ul class="rat-list" v-if="filteredRats.length > 0">
        <li v-for="rat in filteredRats" :key="rat.id" class="rat-list-item">
        <span>
            <h2>{{ rat.name }} in {{  rat.areaOfMalmo }}</h2>
            <p>Primary Skill: {{ rat.primarySkill }}</p>
            <p>Other Skills: {{ rat.skills.map(skill => skill).join(', ') }}</p>
            <p>Available? {{ rat.availability ? 'Yes' : 'No' }}</p>     
            <p>Renter: {{ rat.renter }}</p>
        </span>
        <span>
            <img :src="rat.imgUrl" alt="rat-image" class="rat-image">
            <p>Hourly Rate: {{ rat.price }}:-</p>
        </span>
      </li>
    </ul>
    <ul class="rat-list" v-else>
        <p>💔 No rat was perfect 💔</p>
    </ul>
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