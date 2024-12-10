<script setup>
import { onMounted, ref, computed } from "vue";
import { useFetchRats } from "@/composables/useFetchRats";
import RatFilter from "./RatFilter.vue";
import RatItem from "./RatItem.vue";
import RatSpecComponent from "../RatSpecComponent.vue";

const { rats, isLoading, error, fetchAllRats } = useFetchRats();

// Filters and sorting
const searchText = ref("");
const selectedFilter = ref("");
const filterValue = ref("");
const sortOrder = ref("");

// Fetch all rats when the component is mounted
onMounted(() => {
  fetchAllRats();
});

// Ref för den valda råttan
const selectedRat = ref(null);

// Visibility state för modalen
const isModalVisible = ref(false);

// Funktion som hanterar den valda råttan och öppnar/stänger modalen
const handleRatClick = (rat) => {
  if (isModalVisible.value && selectedRat.value?.id === rat.id) {
    // Om modalen redan är öppen för samma råtta, stäng den
    isModalVisible.value = false;
  } else {
    // Annars öppna modalen för den valda råttan
    selectedRat.value = rat;
    isModalVisible.value = true;
  }
};

// Stäng modalen
const closeModal = () => {
  isModalVisible.value = false; // Stäng modalen
};

const filteredRats = computed(() => {
  const allRats = rats.value || [];
  if (!Array.isArray(allRats)) return [];

  let filtered = allRats;

  // 1) sökfilter
  if (searchText.value) {
    filtered = filtered.filter((rat) =>
      rat.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      rat.primarySkill.toLowerCase().includes(searchText.value.toLowerCase()) ||
      rat.areaOfMalmo.toLowerCase().includes(searchText.value.toLowerCase())
    );
  }

  // 2) filter av skill/area
  if (selectedFilter.value && filterValue.value) {
    filtered = filtered.filter(
      (rat) => rat[selectedFilter.value] === filterValue.value
    );
  }

  // 3) prissortering
  if (sortOrder.value === "low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === "high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
});

// HandleFilterChange emittat från RatFilter
const handleFilterChange = (filters) => {
  searchText.value = filters.searchText;
  selectedFilter.value = filters.selectedFilter;
  filterValue.value = filters.filterValue;
  sortOrder.value = filters.sortOrder;
};
</script>

<template>
  <h1>Find Your Perfect Rat!</h1>

  <!-- verktyg för filtering av råttor -->
  <RatFilter
    :rats="rats"
    @filter-changed="handleFilterChange"
  />
  <!-- råttor som filtrerats med värden från RatFilter -->
  <ul class="rat-list" v-if="filteredRats.length > 0">
    <RatItem
      v-for="rat in filteredRats"
      :key="rat.id"
      :rat="rat"
      @click="handleRatClick(rat)"
    />
  </ul>

    <!--laddar...-->
  <div v-else-if="isLoading" class="loading-message">
    🐭 Loading rats... Please wait! 🐭
  </div>

  <!-- error... -->
  <div v-else-if="error" class="error-message">
    ❌ Failed to fetch rats: {{ error }} ❌
  </div>

  <!-- ingen råtta hittades -->
  <div v-else>
    <p style="text-align: center; font-size: 1.2rem; color: red; margin-top: 1rem;">
      💔 No perfect rat found. Try adjusting your filters! 💔
    </p>
  </div>

  <!-- Om en råtta är vald, visa den i en modal -->
  <div v-if="isModalVisible" class="modal">
    <RatSpecComponent :rat="selectedRat" />
    <button @click="closeModal">Close</button>
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-transform: lowercase;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

h2 {
  font-weight: 100;
}

.loading-message {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #8a8a8a;
}

.error-message {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
  color: red;
}

.rat-list {
  height: 100%;
  width: 600px;
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.rat-list::-webkit-scrollbar {
  display: none; 
}
</style>
