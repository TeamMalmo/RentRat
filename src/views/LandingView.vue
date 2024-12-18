<script setup>
// Import reactive refs and onMounted lifecycle hook
import { ref, onMounted } from "vue";
// Child component imports 
import HeroOverlayEffect from "@/components/StyleComponents/HeroOverlayEffect.vue";
import GlowButton from "@/components/StyleComponents/GlowButton.vue";
import LoginForm from '@/components/Auth/LoginForm.vue';

// Reactive tracking ig logo loaded successfully 
const isLogoLoaded = ref(false);

// Reactive states for hover on buttons
const isHoverRenter = ref(false);
const isHoverRentee = ref(false);

// Reactive state to see if device is touch screen
const isTouchScreen = ref(false);

// Reactive states for toggling info and login modals show/hide 
const showInfo = ref(false);
const showLogin = ref(false);

// Event handler to set logo load state on success
const onLogoLoad = () => {
  isLogoLoaded.value = true;
};

// Event handler for errors in logo loading
const onLogoError = () => {
  isLogoLoaded.value = false;
};

// Event handlers for when hover over renter/rentee btns
const onHoverRenter = () => {
  isHoverRenter.value = true;
};
const onHoverRentee = () => {
  isHoverRentee.value = true;
};

// Event handler for when leaving hover on renter/rentee btns 
const onHoverLeave = () => {
  isHoverRenter.value = false;
  isHoverRentee.value = false;
};

// Lifecycle hook that runs after component is mounted to DOM
onMounted(() => {
  // Check if the device has a coarse pointer (likely a touchscreen)
  isTouchScreen.value = window.matchMedia("(pointer: coarse)").matches;
});


// button glow 
// Anon function to dynamically set glow effect radius with class .glow-effect
(function setGlowEffectRx() {
  const glowEffects = document.querySelectorAll(".glow-effect");

  // Select all rect elements 
  glowEffects.forEach((glowEffect) => {
    const glowLines = glowEffect.querySelectorAll("rect");
    // Compute border radius
    const rx = getComputedStyle(glowEffect).borderRadius;

    glowLines.forEach((line) => {
      // Apply border radius to each line as rx attribute 
      line.setAttribute("rx", rx);
    });
  });
})();

</script>

<template>
  <main>
    <div class="hero-container">
      <!-- Component for decoration  -->
      <HeroOverlayEffect />

      <!-- Logo and title section  -->
      <header>
        <!-- h1 for semantics and SEO, also fallback if logo doesnt load  -->
        <h1 v-show="!isLogoLoaded">Rent a Rat</h1>
        <!-- SVG logo with load and error handlers  -->
        <object
          type="image/svg+xml"
          data="/images/rent-a-rat-vector.svg"
          class="svg-object"
          @load="onLogoLoad"
          @error="onLogoError"
        ></object>
      </header>

      <!-- Login button to toggle login form visibility  -->
      <GlowButton class="login" @click="showLogin = !showLogin">Login🐀</GlowButton>
      <div v-if="showLogin">
        <LoginForm />
      </div>

      <!-- Help button alt. for hover info if on touch screen  -->
      <div
        v-if="isTouchScreen"
        @touchstart="showInfo = true"
        class="touch-help-container"
      >
        <GlowButton>?</GlowButton>
      </div>

      <!-- Nav buttons to be renter or rentee  -->
      <nav class="hero-nav">
        <RouterLink to="/rentee">
          <GlowButton @mouseover="onHoverRenter" @mouseleave="onHoverLeave">
            I want rats
          </GlowButton>
        </RouterLink>
        <RouterLink to="/renter">
          <GlowButton @click="showLogin = !showLogin" @mouseover="onHoverRentee" @mouseleave="onHoverLeave">
            I have rats
          </GlowButton>
        </RouterLink>
      </nav>

      <!-- Info sections on hover  -->
      <div class="hover-info-container">
        <div v-show="isHoverRenter" class="hover-info-renter">
          <p>I'm looking for helpful rats!</p>
        </div>
        <div v-show="isHoverRentee" class="hover-info-rentee">
          <p>I have rats- at your service!</p>
        </div>
      </div>

      <!-- The info from pressing help button on touch screen  -->
      <div v-show="showInfo" class="touch-info-container">
        <div class="touch-renter-info">
          <p>
            If you're looking to rent a rat- simply click "I want rats" to
            explore available options.
          </p>
        </div>
        <div class="touch-rentee-info">
          <p>
            If you have rats that you'd like to rent out to others, click "I
            have rats" to list your rats.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero-container {
  overflow: hidden;
}

nav {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20%;
  gap: 10%;
}

nav > * {
  width: fit-content;
  display: flex;
  justify-content: center;
}

/* button {
  padding: 1rem;
  text-transform: uppercase;
  background-color: black;
  color: #8ace00;
  border: 2px solid;
  border-radius: 1rem;
  letter-spacing: 0.2rem;
  font-weight: 800;
} */

.svg-object {
  margin-top: calc(1rem);
  /* margin: 10rem 0 0; */
  width: calc(50%);
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

.hover-info-container {
  color: #8ace00;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}

.hover-info-container > * {
  background-color: black;
  align-self: flex-start;
  border-radius: 1rem;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  margin-top: -2.5%;
  padding: 2%;
}

.hover-info-rentee {
  text-align: end;
  align-self: flex-end;
}

.login {
  position: absolute;
  top: 5px;
  left: 5px;
  width: fit-content;
  padding: 0.5rem;
  font-size: 1.5rem;
  border: 5px solid black;
  color: black;
  background-color: transparent;
}

.login:hover {
  background-color: black;
  color: #8ace00;
}

/* mobile  */
@media (max-width: 600px) {
  .svg-object {
    width: calc(100%);
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

  nav {
    margin-top: 10%;
  }

  button {
    padding: 3rem;
    font-size: 1.5rem;
  }

  .hover-info-container {
    width: 80%;
  }

  .hover-info-container > * {
    margin-top: -3%;
  }
}

/* desktop  */
@media (min-width: 1441px) {
  .svg-object {
    margin-top: 2.5rem;
    max-width: 65%;
  }

  .hover-info-container {
    width: 60%;
  }

  .hover-info-container > * {
    margin-top: -5%;
  }

  button {
    padding: 5rem;
    font-size: 1.8rem;
  }

  nav {
    padding: 5% 20% 0;
    margin-top: 0;
  }
}



</style>

