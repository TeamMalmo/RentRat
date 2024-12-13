<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '@/composables/useUser';

// emitar data till parenten
const emit = defineEmits(['submit']);

const {auth} = useAuth();
const primarySkillSelect = ref('');
const skillInput = ref('');

// objektet som skickas till parenten
const newRat = ref({
  // skapar ett id 00001 - 10000  
  id: String(Math.floor(Math.random() * 10000) + 1).padStart(5, '0'),
  name: '',
  primarySkill: '',
  skills: [],
  price: 0,
  availability: true,
  areaOfMalmo: '',
  renter: auth.value.username, // hämtar användarens namn
  description: ''
});

// Watch primarySkillSelect för att uppdatera newRat.primarySkill
watch(primarySkillSelect, (value) => {
  if (value !== 'custom') {
    newRat.value.primarySkill = value;
  }
});

// Lägger till skill
const addSkill = () => {
  if (skillInput.value.trim()) {
    newRat.value.skills.push(skillInput.value.trim());
    skillInput.value = '';
  }
};

// Tar bort skill
const removeSkill = (index) => {
  newRat.value.skills.splice(index, 1);
};

// Skickar data till parenten
const submitForm = () => {
  // Kontrollerar att custom skill är vald och skillInput är giltig
  if (primarySkillSelect.value === 'custom' && !newRat.value.primarySkill.trim()) {
    alert('Please enter a custom primary skill.');
    return;
  }

  emit('submit', newRat.value); // emittar till AddRats.vue
};
</script>


<template>
    <div>
      <h2>Add a New Rat</h2>
  
      <form @submit.prevent="submitForm">
        <label>
          Name:
          <input v-model="newRat.name" type="text" required />
        </label>
  
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
  
        <label>
          Price:
          <input v-model="newRat.price" type="number" required />
        </label>

        <label>
          Area of Malmö:
          <input v-model="newRat.areaOfMalmo" type="text" required />
        </label>
<!--   
        <label for="renter">
          Renter:
          <input id="renter" v-model="newRat.renter" type="text" required />
        </label> -->
  
        <label for="description">
          Description:
          <textarea id="description" v-model="newRat.description" type="text" required></textarea>
        </label>
  
        <button type="submit">Add Rat</button>
      </form>
    </div>
  </template>
  
  <style scoped>

*{
        margin: 0;
        padding: 0;
        box-sizing: border-box ;
        text-transform:lowercase;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        gap: 0.5rem;
    
}

  form {
  min-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #8ACE00;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  }

  label{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  button {
  padding: 0.5rem 1rem;
  background-color: #8ACE00;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  border: 1px solid black;
}

button:hover {
  background-color: #abff03;
}

input, select, textarea{
  background-color: #8ACE00;
}

  </style>
  