<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '@/composables/useUser';
import GlowButton from '../GlowButton.vue';

// Emits data to parent
const emit = defineEmits(['submit']);

const { auth } = useAuth();
const skillInput = ref('');

// Object for form data
const newRat = ref({
  id: String(Math.floor(Math.random() * 10000) + 1).padStart(5, '0'),
  name: '',
  primarySkill: '',
  skills: [],
  price: 0,
  availability: true,
  areaOfMalmo: '',
  renter: auth.value.username,
  description: ''
});

// Array of skills and associated images
const skillImages = [
  { name: 'cook', image: '/images/cook.png' },
  { name: 'clean', image: '/images/clean.png' },
  { name: 'laundry', image: '/images/laundry.png' },
  { name: 'paint', image: '/images/paint.png' },
  { name: 'custom', image: '/images/default.png' }, // Default image for custom skill
];

// Selected skill and custom input state
const primarySkillSelect = ref('');

// Watch primarySkillSelect to update newRat.primarySkill
watch(primarySkillSelect, (value) => {
  if (value === 'custom') {
    newRat.value.primarySkill = skillInput.value.trim() || 'Custom Skill';
  } else {
    newRat.value.primarySkill = value;
  }
});

// Add skill function
const addSkill = () => {
  if (skillInput.value.trim()) {
    newRat.value.skills.push(skillInput.value.trim());
    skillInput.value = '';
  }
};

// Remove skill function
const removeSkill = (index) => {
  newRat.value.skills.splice(index, 1);
};

// Submit the form
const submitForm = () => {
  if (primarySkillSelect.value === 'custom' && !newRat.value.primarySkill.trim()) {
    alert('Please enter a custom primary skill.');
    return;
  }
  emit('submit', newRat.value); // Emit data to parent
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

      <label>Primary Skill:</label>
      <div class="skill-selection">
        <!-- Loop through predefined skills and display images -->
        <div 
          v-for="(skill, index) in skillImages" 
          :key="index" 
          class="skill-item"
          :class="{ selected: primarySkillSelect === skill.name }"
          @click="primarySkillSelect = skill.name">
          <img :src="skill.image" :alt="skill.name" />
          <p>{{ skill.name }}</p>
        </div>
      </div>

      <!-- Custom skill input if "custom" is selected -->
      <div v-if="primarySkillSelect === 'custom'">
        <label>
          Custom Primary Skill:
          <input v-model="skillInput" type="text" required />
        </label>
      </div>

      <label>
        Add Skill:
        <input v-model="skillInput" type="text" placeholder="Enter a skill" />
        <button class="add" type="button" @click="addSkill">Add Skill</button>
      </label>
      <ul>
        <li v-for="(skill, index) in newRat.skills" :key="index">
          {{ skill }} <button style="padding: 8px; font-size: 8px; margin: 0; padding-left: 12px;" class="remove" type="button" @click="removeSkill(index)">❌</button>
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

      <label for="description">
        Description:
        <textarea id="description" v-model="newRat.description" type="text" rows="6" required></textarea>
      </label>

      <GlowButton type="submit">🐀Add Rat</GlowButton>
    </form>
  </div>
</template>

<style scoped>
.skill-selection {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.skill-item {
  text-align: center;
  cursor: pointer;
}


.skill-item img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: transform 0.3s;
}

.skill-item.selected img {
  transform: scale(1.2);
  border: 3px solid #42b983; /* Highlight selected skill */
}

input, select, textarea {
  background-color: #8ACE00;
  padding: 5px;
  border-radius: 5px;
}

.add:hover, .remove:hover {
  background-color: #8ACE00;
  color: black;
}

form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #8ACE00;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center ;
  list-style: none;
}
</style>
