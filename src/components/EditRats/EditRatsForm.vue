<script setup>
import { ref, watch } from 'vue';
import DeleteButton from '../DeleteRats/DeleteButton.vue';
import GlowButton from '../GlowButton.vue';

// Emits data to parent
const emit = defineEmits(['submit', 'cancel']);

// Receiving rat to edit
const props = defineProps({
  ratToEdit: {
    type: Object,
    required: true,
  },
});

// Make a reactive copy of the rat to avoid direct modification of prop
const editedRat = ref({ ...props.ratToEdit });

// Selected primary skill
const primarySkillSelect = ref(editedRat.value.primarySkill || '');

// Watch for changes in the prop ratToEdit to update the form
watch(
  () => props.ratToEdit,
  (newRat) => {
    editedRat.value = { ...newRat }; 
    primarySkillSelect.value = editedRat.value.primarySkill || ''; 
  },
  { immediate: true } // Trigger watcher immediately on mount
);

// Watch primarySkillSelect to update editedRat.primarySkill
watch(primarySkillSelect, (value) => {
  if (value !== 'custom') {
    editedRat.value.primarySkill = value;
  }
});

// Add skill
const skillInput = ref('');
const addSkill = () => {
  if (skillInput.value.trim()) {
    editedRat.value.skills.push(skillInput.value.trim());
    skillInput.value = '';
  }
};

// Remove skill
const removeSkill = (index) => {
  editedRat.value.skills.splice(index, 1);
};

// Submit form data
const submitForm = () => {
  if (primarySkillSelect.value === 'custom' && !editedRat.value.primarySkill.trim()) {
    alert('Please enter a custom primary skill.');
    return;
  }
  emit('submit', editedRat.value);
};

// Cancel editing
const cancelEdit = () => {
  emit('cancel');
};

// Array of skill options with corresponding images
const skillImages = [
  { name: 'cook', image: '/images/cook.png' },
  { name: 'clean', image: '/images/clean.png' },
  { name: 'laundry', image: '/images/laundry.png' },
  { name: 'paint', image: '/images/paint.png' },
  { name: 'custom', image: '/images/default.png' }, // Default image for custom skill
];
</script>

<template>
  <div>
    <h2>Edit {{ ratToEdit.name }}</h2>

    <form @submit.prevent="submitForm">
      <label>
        Name:
        <input v-model="editedRat.name" type="text" required />
      </label>

      <label><h3>Primary Skill</h3></label>
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
          <input v-model="editedRat.primarySkill" type="text" required />
        </label>
      </div>
      <div v-else>
        <p v-if="primarySkillSelect">Selected: {{ primarySkillSelect }}</p>
      </div>

      <label>
        <input v-model="skillInput" type="text" placeholder="Enter a skill" />
        <button type="button" @click="addSkill">Add Skill</button>
      </label>
      <ul>
        <h3>Skills</h3>
        <li v-for="(skill, index) in editedRat.skills" :key="index">
          {{ skill }} <button style="padding: 8px; font-size: 8px; margin: 0; padding-left: 12px;" type="button" @click="removeSkill(index)">❌</button>
        </li>
      </ul>

      <label>
        Price:
        <input v-model="editedRat.price" type="number" required />
      </label>

      <label>
        Area of Malmö:
        <input v-model="editedRat.areaOfMalmo" type="text" required />
      </label>

      <label for="renter">
        Renter:
        <input id="renter" v-model="editedRat.renter" type="text" required />
      </label>

      <label for="description">
        Description:
        <textarea rows="6" id="description" v-model="editedRat.description" required></textarea>
      </label>

      <GlowButton type="submit">Save Changes</GlowButton>
      <GlowButton type="button" @click="cancelEdit">Cancel</GlowButton>
      <DeleteButton :rat="editedRat" />
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #8ACE00;
  color: black;
}


ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  list-style: none;
}

form {
  max-width: 500px;
  min-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #89ce00b3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
</style>
