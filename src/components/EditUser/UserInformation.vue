<script setup>
defineProps({
  currentUser: {
    type: Object,
    required: true,
  },
});
</script>

<!-- fyller artcle med information om användaren -->
<template>
    <article>
    <h2>User Information</h2>
    <div class="basic-info">
    <span class="greeting">
        <h3>Hello, {{ currentUser.username }}</h3>
        <p>Welcome to your profile page!</p>
        <p>You can edit your profile information here and share your love of rats with others.</p>
    </span>
      <img v-if="currentUser.profileImageUrl" :src="currentUser.profileImageUrl" alt="Profile" width="150" />
      <img v-else src="/images/default.png" alt="Profile" width="150" />
    </div>
      <ul class="specific-info">
        <li><strong>About You</strong>
          <span v-if="currentUser.description">{{ currentUser.description }}</span>
          <span v-else>No description added</span>
          </li>
          <span class="basic-info">
              <li><strong>Area of Malmö</strong>
                <span v-if="currentUser.areaOfMalmo">{{ currentUser.areaOfMalmo }}</span>
                <span v-else>No area of Malmö provided</span>
              </li>
              <li><strong>you are a </strong> {{ currentUser.role }}</li>
          </span>
      </ul>
    </article>
</template>

<style scoped>
article{
    min-width: 300px;
    max-width: 400px;
    margin-bottom: 2rem;
}


.basic-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.greeting {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

li {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center ;
}

img {
  height: 200px;
  width: 200px;
}
</style>