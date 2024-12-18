<script setup>
import { ref } from 'vue';
import GlowButton from '../StyleComponents/GlowButton.vue';

// tar emot användaren som objection från UpdateUser.vue
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// skickar emitter till UpdateUser.vue
const emit = defineEmits(['submit']);

// gör en spread/kopia av användarens data direkt
const formData = ref({ ...props.user });

// lista med profilbilder
const profileImages = [
  '/images/user1.webp',
  '/images/user2.png',
  '/images/user3.webp',
  '/images/user4.webp',
  '/images/user5.webp',
  '/images/user6.webp',
];

// hanterar val av profilbild
const selectProfileImage = (imageSrc) => {
  formData.value.profileImageUrl = imageSrc;
};

// skickar in uppdaterade data till UpdateUser.vue
const submitForm = () => {
  console.log('Form data:', formData.value);
  emit('submit', formData.value); 
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="description">Description:</label>
    <textarea
      id="description"
      name="description"
      placeholder="Write a short description about yourself"
      rows="6"
      v-model="formData.description"
    ></textarea>

    <label for="areaOfMalmo">Area of Malmö:</label>
    <input
      id="areaOfMalmo"
      name="areaOfMalmo"
      placeholder="Which area of Malmö do you live in?"
      v-model="formData.areaOfMalmo"
    />

    <label>Choose a profile image:</label>
    <div class="img-container">
      <!-- loopar igenom profilebilderna -->
      <img
        v-for="(image, index) in profileImages"
        :key="index"
        :src="image"
        :class="{ selected: formData.profileImageUrl === image }"
        @click="selectProfileImage(image)"
        alt="Profile Image"
      />
    </div>
    
    <GlowButton type="submit">🐀Save</GlowButton>
</form>
</template>

<style scoped>
img {
  width: 120px;
  height: 120px;
  border-radius: 100%;
  margin: 5px;
  cursor: pointer;
  transition: border 0.3s;
}

img.selected {
  border: 10px solid #42b983; /* Highlight selected image */
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

label{
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;

}

input, textarea{
    background-color: #8ACE00;
    border: 1px solid black;
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;
    resize: none;
    font-size: 1rem;

}
</style>
