<script setup>
import {ref} from "vue";
defineProps({
  rat: Object, // Data för en specifik råtta
});

const isFavorite = ref(false);

const toggleFavorite = (event) => {
  // Stop from opening the rat details
  event.stopPropagation();
  isFavorite.value = !isFavorite.value;
};
</script>

<template>
  <li class="rat-list-item">
    <span>
      <h2>{{ rat.name }} in {{ rat.areaOfMalmo }}</h2>
      <p>Primary Skill: {{ rat.primarySkill }}</p>
      <p>Other Skills: {{ rat.skills.join(", ") }}</p>
      <p>Available? {{ rat.availability ? "Yes" : "No" }}</p>
      <p>Renter: {{ rat.renter }}</p>
    </span>
    <span>
      <img :src="rat.imgUrl" alt="rat-image" class="rat-image" />
      <p>Hourly Rate: {{ rat.price }}:-</p>
    </span>
    <button class="favorite-btn" @click="toggleFavorite">
      {{ isFavorite ? '💔' : '❤️' }}
    </button>
  </li>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-transform: lowercase;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
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
  background-color: #8ace00;
}

.rat-list-item:hover {
  transform: scale(1.05);
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.rat-image {
  width: 100px;
  border-radius: 100%;
}

.favorite-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: gray;
  color: pink;
  font-size: 1rem;
  cursor: pointer;
}

.favorite-btn:hover {
  background-color: red;
}

</style>
