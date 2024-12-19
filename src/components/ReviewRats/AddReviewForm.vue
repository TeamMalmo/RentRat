<script setup>
import { ref } from "vue"; // Importera 'ref' för att skapa reaktiva variabler

// Emiterar data till föräldern (för att skicka tillbaka recensionen)
const emit = defineEmits(["submit"]);

// Data för recensionen
const review = ref({
  email: "", // E-postadress för användaren som lämnar recensionen
  stars: 0,  // Antal stjärnor (betyg) som användaren ger
});

// Identifiera råttans ID (får via prop istället för URL)
const ratId = ref("");

// Kontrollera om ratId finns som prop, annars hämta från URL
const props = defineProps({
  ratId: {
    type: String,
    required: true,  // Gör ratId obligatorisk
  },
});

// Tilldela värdet på ratId från föräldern
ratId.value = props.ratId; // Använd den inkommande ratId-propen

// Funktion som anropas när formuläret skickas
const submitForm = () => {
  // Kontrollera om e-post eller betyg inte är ifyllda
  if (!review.value.email || review.value.stars === 0) {
    alert("Vänligen fyll i alla fält."); // Visa en alert om fälten inte är ifyllda
    return;
  }

  // Skapa reviewData objekt med ratId, email och stjärnor
  const reviewData = {
    ratId: ratId.value, // Länka recensionen till rätt råtta
    reviewerEmail: review.value.email, // Användarens e-postadress
    stars: review.value.stars, // Antalet stjärnor
  };

  // Emiterar 'submit' händelsen och skickar data tillbaka till föräldern
  emit("submit", reviewData);
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <!-- E-postfält för användaren -->
    <label>
      E-post:
      <input
        type="email"
        v-model="review.email"  
        required
        placeholder="Ange din e-post"
      />
    </label>

    <!-- Stjärnval för betyg -->
    <label>
      Antal stjärnor:
      <div class="stars">
        <!-- Generera 5 stjärnor som användaren kan klicka på för att ge ett betyg -->
        <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ selected: review.stars >= star }" 
          @click="review.stars = star"  
        >
          ★
        </span>
      </div>
    </label>

    <!-- Skicka betyg-knapp -->
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
