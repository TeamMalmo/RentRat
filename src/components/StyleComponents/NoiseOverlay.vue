<script setup></script>

<template>
  <div class="container">
    <div class="content">
      <slot></slot>
    </div>
    <div class="noise-overlay"></div>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.content {
  height: 100vh;
  display: grid;
  place-items: center;
  z-index: -1;
  position: relative;
}

.noise-overlay {
  position: absolute;
  inset: -200%;
  background-image: url("/images/noisy-background.jpg");
  opacity: 0.2;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: overlay;

  animation: shift 0.2s linear infinite both;
}

@keyframes shift {
  0% {
    transform: translateX(10%) translateY(10%);
  }

  100% {
    transform: translateX(-10%) translateY(-10%);
  }
}
</style>
