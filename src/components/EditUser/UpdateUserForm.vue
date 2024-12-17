<script setup>
import { ref } from 'vue';

// Props: Receive the `user` object from the parent
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// Emits: Send the updated user data to the parent component
const emit = defineEmits(['submit']);

// Directly use a shallow copy of the user prop
const formData = ref({ ...props.user });

// Predefined list of profile images
const profileImages = [
  '/images/user1.webp',
  '/images/user3.webp',
  '/images/user4.webp',
  '/images/user5.webp',
  '/images/user6.webp',
];

// Handle profile image selection
const selectProfileImage = (imageSrc) => {
  formData.value.profileImageUrl = imageSrc;
};

// Submit form data to the parent
const submitForm = () => {
  console.log('Form data:', formData.value);
  emit('submit', formData.value); // Emit the updated user object
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="description">Description:</label>
    <textarea
      id="description"
      name="description"
      placeholder="Write a short description about yourself"
      rows="4"
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
      <!-- Loop through profile images -->
      <img
        v-for="(image, index) in profileImages"
        :key="index"
        :src="image"
        :class="{ selected: formData.profileImageUrl === image }"
        @click="selectProfileImage(image)"
        alt="Profile Image"
      />
    </div>

    <button type="submit">Submit</button>
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
  border: 3px solid #42b983; /* Highlight selected image */
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
