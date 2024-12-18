<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li class="user-list-item">
      <span>
        <h2>{{ user.username }}</h2>
        <p>Role: {{ user.role }}</p>
        <p v-if="user.areaOfMalmo">Area of Malmö: {{ user.areaOfMalmo }}</p>
      </span>
      <span>
        <img :src="user.profileImageUrl || '/images/default.png'" alt="user-image" class="user-image" />
      </span>
  </li>
</template>

<style scoped>
.user-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 500px;
  background-color: #8ACE00;
  border: 1px solid pink;
  margin: 0;
}

.user-list-item:hover {
  transform: scale(1.05);
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.user-image {
  width: 100px;
  border-radius: 50%;
}
</style>
