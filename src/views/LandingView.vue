<script setup>
import { ref } from 'vue';

const isLogoLoaded = ref(false); 

const onLogoLoad = () => {
  isLogoLoaded.value = true;
};

const onLogoError = () => {
  isLogoLoaded.value = false;
};


</script>

<template>
  <div>
    <!-- v-bind to hide if logo loads, otherwise show -->
    <h1 :style="{ visibility: isLogoLoaded ? 'hidden' : 'visible' }">Rent a Rat</h1>
    <object
      type="image/svg+xml"
      data="/images/rent-a-rat-vector.svg"
      class="svg-object"
      @load="onLogoLoad"
      @error="onLogoError"
    ></object>
    <RouterLink to="/renter">
      <button>I am a Renter</button>
    </RouterLink>
    <RouterLink to="/rentee">
      <button>I am a Rentee</button>
    </RouterLink>
  </div>
</template>

<style>
.svg-object {
  max-width: 100%;
}
</style>
