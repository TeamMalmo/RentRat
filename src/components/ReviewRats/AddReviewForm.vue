<!-- AddReviewForm.vue // Formulär för att lägga till en ny recension -->
<script setup>
import { ref } from "vue";

// Emiterar data till föräldern
const emit = defineEmits(["submit"]);

// Data för recensionen
const review = ref({
  email: "",
  stars: 0,
});

// Skickar formulärets data
const submitForm = () => {
  if (!review.value.email || review.value.stars === 0) {
    alert("Vänligen fyll i alla fält.");
    return;
  }
  emit("submit", review.value);
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <label>
      E-post:
      <input type="email" v-model="review.email" required placeholder="Ange din e-post" />
    </label>

    <label>
      Antal stjärnor:
      <div class="stars">
        <span 
          v-for="star in 5" 
          :key="star" 
          class="star" 
          :class="{ 'selected': review.stars >= star }" 
          @click="review.stars = star"
        >
          ★
        </span>
      </div>
    </label>

    <button type="submit">Skicka betyg</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
}

.stars {
  font-size: 2rem;
  cursor: pointer;
}

.star {
  color: #ccc;
}

.star.selected {
  color: gold;
}

button {
  background-color: #8ace00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #7bb300;
}
</style>
