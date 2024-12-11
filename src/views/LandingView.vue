<script setup>
import { ref, onMounted } from "vue";
import HeroOverlayEffect from "@/components/HeroOverlayEffect.vue";

const isLogoLoaded = ref(false);
const isHover = ref(false);
const isTouchScreen = ref(false);
const showInfo = ref(false);

const onLogoLoad = () => {
  isLogoLoaded.value = true;
};

const onLogoError = () => {
  isLogoLoaded.value = false;
};

const onHover = () => {
  isHover.value = true;
};

const onHoverLeave = () => {
  isHover.value = false;
};

onMounted(() => {
  // Check if the device has a coarse pointer (likely a touchscreen)
  isTouchScreen.value = window.matchMedia("(pointer: coarse)").matches;
});
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
    <div
      v-if="isTouchScreen"
      @touchstart="showInfo = true"
      class="touch-help-container"
    >
      <button>?</button>
    </div>
    <nav class="hero-nav">
      <RouterLink to="/renter">
        <button @mouseover="onHover" @mouseleave="onHoverLeave">
          I want rats
        </button>
      </RouterLink>
      <RouterLink to="/rentee">
        <button @mouseover="onHover" @mouseleave="onHoverLeave">
          I have rats
        </button>
      </RouterLink>
    </nav>
    <div v-show="isHover" class="hover-info">
      <p>bajs</p>
    </div>
    <div v-show="showInfo" class="touch-info-container">
      <div class="touch-renter-info">
        <p>
          If you're looking to rent a rat-simply click "I want rats" to explore
          available options.
        </p>
      </div>
      <div class="touch-rentee-info">
        <p>
          If you have rats that you'd like to rent out to others, click "I have
          rats" to list your rats.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  overflow: hidden;
}

nav {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

nav > * {
  width: 100%;
  display: flex;
  justify-content: center;
}

button {
  padding: 1rem;
  text-transform: uppercase;
  background-color: black;
  color: #8ace00;
  border: 2px solid;
  border-radius: 1rem;
  letter-spacing: 0.2rem;
  font-weight: 800;
}

.svg-object {
  margin: 10rem 0 0;
  max-width: 100%;
  object-fit: contain;
  z-index: -2;
}

.touch-info-container {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-around;
  gap: 2rem; */
}

.touch-info-container > * {
  width: 100%;
  background-color: black;
  color: #8ace00;
  border-radius: 1rem;
  padding: 0.5rem;
  letter-spacing: 0.1rem;
  line-height: 1.5;
  font-size: small;
}

.touch-help-container {
  margin-top: 10%;
  display: flex;
  justify-content: center;
}

.touch-help-container button {
  padding: 0;
  margin: 0 auto;
  width: 2rem;
  height: 2rem;
  text-align: center;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

/* mobile  */
@media (max-width: 600px) {
  .svg-object {
    max-width: 160%;
  }
}

/* tablet  */
@media (min-width: 601px) and (max-width: 1024px) {
  button {
    padding: 2rem;
    font-size: 1.2rem;
  }
}

/* laptop */
@media (min-width: 1025px) and (max-width: 1440px) {
  .svg-object {
    margin-top: 2rem;
  }

  button {
    padding: 3rem;
    font-size: 1.5rem;
  }
}

/* desktop  */
@media (min-width: 1441px) {
  .svg-object {
    margin-top: 2.5rem;
    max-width: 65%;
  }

  button {
    padding: 4rem;
    font-size: 1.8rem;
  }

  nav {
    padding: 5% 20% 0;
  }
}
</style>
