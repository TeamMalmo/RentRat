<script setup>
import { ref, watch } from 'vue';
import { useAddRat } from '@/composables/useAddRat';
import RatItem from '../FindRats/RatItem.vue';

// Get the addRat function from the composable
const { addRat, error, isLoading } = useAddRat();

const showForm = ref(true); // Controls the visibility of the form

// Generate a random number between 1 and 10000
const randomNumber = Math.floor(Math.random() * 10000) + 1;

// Format it with leading zeroes
const formattedNumber = String(randomNumber).padStart(5, '0');

// Initial newRat data
const getNewRat = () => ({
  id: String(Math.floor(Math.random() * 10000) + 1).padStart(5, '0'),
  name: '',
  primarySkill: '',
  skills: [],
  price: 0,
  availability: true, // Automatically set to true
  areaOfMalmo: '',
  renter: '',
  description: ''
});

const newRat = ref(getNewRat());

const primarySkillSelect = ref(''); // Handles the dropdown selection
const skillInput = ref('');

// Watch primarySkillSelect to update newRat.primarySkill
watch(primarySkillSelect, (value) => {
  if (value !== 'custom') {
    newRat.value.primarySkill = value;
  }
});

const addSkill = () => {
  if (skillInput.value.trim()) {
    newRat.value.skills.push(skillInput.value.trim());
    skillInput.value = '';
  }
};

const removeSkill = (index) => {
  newRat.value.skills.splice(index, 1);
};

const submitForm = async () => {
  if (primarySkillSelect.value === 'custom' && !newRat.value.primarySkill.trim()) {
    alert('Please enter a custom primary skill.');
    return;
  }

  try {
    await addRat(newRat.value); // Save the new rat
    showForm.value = false; // Hide the form after submission
  } catch (e) {
    console.error('Error adding rat:', e);
  }
};

const resetForm = () => {
  newRat.value = getNewRat(); // Reset the form data
  primarySkillSelect.value = ''; // Reset the skill selection
  skillInput.value = ''; // Clear the skill input
  showForm.value = true; // Show the form again
};
</script>

<template>
  <div>
    <h2 v-if="showForm">Add a New Rat</h2>
    
    <form v-if="showForm" @submit.prevent="submitForm">
      <!-- Name -->
      <label>
        Name:
        <input v-model="newRat.name" type="text" required />
      </label>

      <!-- Primary Skill -->
      <label>
        Primary Skill:
        <select v-model="primarySkillSelect">
          <option disabled value="">Select a skill</option>
          <option value="cook">Cook</option>
          <option value="clean">Clean</option>
          <option value="laundry">Laundry</option>
          <option value="paint">Paint</option>
          <option value="custom">Other (Add your own)</option>
        </select>
      </label>

      <div v-if="primarySkillSelect === 'custom'">
        <label>
          Custom Primary Skill:
          <input v-model="newRat.primarySkill" type="text" required />
        </label>
      </div>
      <div v-else>
        <p v-if="primarySkillSelect">Selected: {{ primarySkillSelect }}</p>
      </div>

      <!-- Skills -->
      <label>
        Add Skill:
        <input v-model="skillInput" type="text" placeholder="Enter a skill" />
        <button type="button" @click="addSkill">Add Skill</button>
      </label>
      <ul>
        <li v-for="(skill, index) in newRat.skills" :key="index">
          {{ skill }} <button type="button" @click="removeSkill(index)">Remove</button>
        </li>
      </ul>

      <!-- Price -->
      <label>
        Price:
        <input v-model="newRat.price" type="number" required />
      </label>

      <!-- Area of Malmö -->
      <label>
        Area of Malmö:
        <input v-model="newRat.areaOfMalmo" type="text" required />
      </label>

      <label for="renter">
        Renter:
        <input id="renter" v-model="newRat.renter" type="text" required />
      </label>

      <label for="description">
        Description:
        <textarea id="description" v-model="newRat.description" type="text" required></textarea>
      </label>

      <button type="submit">Add Rat</button>
    </form>

    <div v-else>
      <RatItem :rat="newRat" />
      <button @click="resetForm">Add Another Rat</button>
    </div>

    <!-- <p v-if="isLoading">Your rat is being created...</p>
    <p v-else-if="error">Failed to create rat: {{ error }}</p> -->
  </div>
</template>

<style scoped>
form {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 1rem;
}
</style>
