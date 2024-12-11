<script setup>
import { ref } from "vue";
import HeroOverlayEffect from "@/components/HeroOverlayEffect.vue";

const isLogoLoaded = ref(false);

const onLogoLoad = () => {
  isLogoLoaded.value = true;
};

const onLogoError = () => {
  isLogoLoaded.value = false;
};
</script>

<template>
  <div class="hero-container">
    <HeroOverlayEffect />

    <header>
      <h1 v-show="!isLogoLoaded">Rent a Rat</h1>
      <object
        type="image/svg+xml"
        data="/images/rent-a-rat-vector.svg"
        class="svg-object"
        @load="onLogoLoad"
        @error="onLogoError"
      ></object>
    </header>
    <nav class="hero-nav">
      <RouterLink to="/renter">
        <button>I am a Renter</button>
      </RouterLink>
      <RouterLink to="/rentee">
        <button>I am a Rentee</button>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.hero-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
nav {
  border: 1px solid blue;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding: 0 20% 0;
}

button {
  padding: 1rem;
}

.svg-object {
  border: 1px solid black;
  margin: 10rem 0 0;
  max-width: 100%;
  object-fit: contain;
  z-index: -2;
}

/* mobile  */
@media (max-width: 600px) {
  .svg-object {
    max-width: 160%;
  }
}

/* tablet  */
@media (min-width: 601px) and (max-width: 1024px) {
  /* Styles for tablets and small screens */
}

/* laptop */
@media (min-width: 1025px) and (max-width: 1440px) {
  /* Styles for laptops and small desktops */
}

/* desktop  */
@media (min-width: 1441px) {
  .svg-object {
    margin-top: 5rem;
    max-width: 65%;
  }
}
</style>
