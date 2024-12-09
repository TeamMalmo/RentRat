<script setup>
import { ref, watch } from "vue";

// tar emot rats för att filtera
defineProps({
  rats: Array, 
});

// emit till handleFilterChange i FindRats.vue
const emit = defineEmits(["filter-changed"]); 

// refs för att hämta alla filtervärden
const searchText = ref("");
const selectedFilter = ref("");
const filterValue = ref("");
const sortOrder = ref("");

// genererar unika filterval (baserat på array)
const getFilterOptions = (rats, filterKey) => {
  if (!filterKey) return [];
  return [...new Set(rats.map((rat) => rat[filterKey]))];
};

// emit filtervärden som ett objekt
const emitFilter = () => {
  emit("filter-changed", {
    searchText: searchText.value,
    selectedFilter: selectedFilter.value,
    filterValue: filterValue.value,
    sortOrder: sortOrder.value,
  });
};

// watchar för ändringar i filtervärden och emitar
watch([searchText, selectedFilter, filterValue, sortOrder], emitFilter);

// återställer alla filtervärden
const resetFilters = () => {
  searchText.value = "";
  selectedFilter.value = "";
  filterValue.value = "";
  sortOrder.value = "";
  emitFilter(); // emitar ändringar efter återställning
};
</script>

<template>
  <div class="rat-filter">
    <!-- sökfält -->
    <input
      id="search"
      type="text"
      v-model="searchText"
      placeholder="Search..."
    />

    <!-- filter av skill/area -->
    <select id="filter" v-model="selectedFilter">
      <option value="">--Select Filter--</option>
      <option value="primarySkill">Primary Skill</option>
      <option value="areaOfMalmo">Area of Malmö</option>
    </select>

    <!-- filtervärdfe baserat på getFilterOptions -->
    <select v-if="selectedFilter" id="filter-value" v-model="filterValue">
      <option value="">--Select Value--</option>
      <option
        v-for="option in getFilterOptions(rats, selectedFilter)"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>

    <!-- prissortering -->
    <select id="sort" v-model="sortOrder">
      <option value="">--No Sorting--</option>
      <option value="low-to-high">Low to High</option>
      <option value="high-to-low">High to Low</option>
    </select>

    <!-- Reset Filters Button -->
    <button class="reset-button" @click="resetFilters">Reset Filters</button>
  </div>
</template>

<style scoped>
.rat-filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.reset-button {
  padding: 0.5rem 1rem;
  background-color: #d6acac;
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 1rem;
}

.reset-button:hover {
  background-color: #f47f7f;
}
</style>
