<script setup>
import { ref, watch } from 'vue';
import DeleteButton from '../DeleteRats/DeleteButton.vue';

// emittar uppdaterad data || avbryter redigering
const emit = defineEmits(['submit', 'cancel']);

// taer emot råttan som ska redigeras
const props = defineProps({
  ratToEdit: {
    type: Object,
    required: true,
  },
});

// gör en reaktiv kopia av råttan för att undvika direkt modifiering av prop
const editedRat = ref({ ...props.ratToEdit });


const primarySkillSelect = ref(editedRat.value.primarySkill || '');

// watch för ändringar i ratToEdit
watch(
  () => props.ratToEdit,
  (newRat) => {
    editedRat.value = { ...newRat }; 
    primarySkillSelect.value = editedRat.value.primarySkill || ''; 
  },
  { immediate: true } // watcher köra på mount
);

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

// skickar uppdaterad data till parenten
const submitForm = () => {
  if (primarySkillSelect.value === 'custom' && !editedRat.value.primarySkill.trim()) {
    alert('Please enter a custom primary skill.');
    return;
  }

  emit('submit', editedRat.value); 
};

// avbryter redigering
const cancelEdit = () => {
  emit('cancel'); 
};
</script>

<template>
  <div>
    <h2>Edit {{ ratToEdit.name }}</h2>

    <form @submit.prevent="submitForm">
      <label>
        Name:
        <input v-model="editedRat.name" type="text" required />
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
          <input v-model="editedRat.primarySkill" type="text" required />
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
        <li v-for="(skill, index) in editedRat.skills" :key="index">
          {{ skill }} <button type="button" @click="removeSkill(index)">Remove</button>
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
        <textarea id="description" v-model="editedRat.description"  required></textarea>
      </label>

      <button type="submit">Save Changes</button>
      <button type="button" @click="cancelEdit">Cancel</button>
      <DeleteButton :rat="editedRat" />
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
}

form {
  min-width: 400px;
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #8ACE00;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
}

label {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

input{
  background-color: #8ACE00;
  border: 1px solid;
}


button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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

textarea{
  background-color: #8ACE00;
  height: 80px;
}

select{
  background-color: #8ACE00;
}
</style>
