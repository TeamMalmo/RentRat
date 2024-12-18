<script setup>
// Import reactive references and lifecycle hooks from Vue
import { ref, onMounted, onUnmounted } from "vue";

// Reactive reference to the canvas element
const canvas = ref(null);

// Reactive reference to the effect instance, which manages particles
let effect = ref(null);

// Reactive reference to store the user's motion preference
let reduceMotion = ref(false);

// Function to check the system's reduced motion preference
const checkReduceMotion = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  reduceMotion.value = prefersReducedMotion; // Update reactive state
};

// Function to resize the canvas element to match the window dimensions
const resizeCanvas = () => {
  if (!canvas.value) return; // Exit if the canvas is not yet available

  const canvasElement = canvas.value;
  const ctx = canvasElement.getContext("2d");

  const ratio = window.devicePixelRatio || 1; // Account for high-resolution screens

  // Set the internal resolution of the canvas for sharp rendering
  canvasElement.width = window.innerWidth * ratio;
  canvasElement.height = window.innerHeight * ratio;

  // Set the CSS size of the canvas to cover the full screen
  canvasElement.style.width = "100%";
  canvasElement.style.height = "100%";

  // If an effect instance exists, update its dimensions and trigger a resize
  if (effect.value) {
    effect.value.width = canvasElement.width;
    effect.value.height = canvasElement.height;
    effect.value.resize(); // Adjust particles to the new canvas size
  }
};

// Lifecycle hook to initialize the canvas and effects when the component mounts
onMounted(() => {
  const canvasElement = canvas.value;
  const ctx = canvasElement.getContext("2d");

  // Resize the canvas to match the window size
  resizeCanvas();

  // Check the user's system settings for reduced motion
  checkReduceMotion();

  // Define the Particle class, representing individual particles on the canvas
  class Particle {
    constructor(x, y, effect) {
      this.originX = x; // Original X position
      this.originY = y; // Original Y position
      this.effect = effect; // Reference to the effect instance
      this.x = x; // Current X position
      this.y = y; // Current Y position
      this.z = 0; // Depth for scaling effects
      this.vx = 0; // Velocity in the X direction
      this.vy = 0; // Velocity in the Y direction
      this.vz = 0; // Velocity in the Z direction
      this.ease = 0.2; // Ease factor for movement
      this.friction = 0.9; // Friction factor for deceleration
      this.baseSize = Math.random() * 3 + 1; // Base size of the particle
      this.currentSize = this.baseSize; // Current size of the particle
      this.maxSize = this.baseSize * 3; // Maximum size during expansion
    }

    // Draw the particle on the canvas
    draw() {
      const scale = 1 + this.z * 0.01; // Scale factor based on depth
      this.effect.ctx.globalAlpha = 0.7; // Set transparency
      this.effect.ctx.fillStyle = "black"; // Particle color
      this.effect.ctx.beginPath();
      this.effect.ctx.arc(this.x, this.y, this.currentSize * scale, 0, Math.PI * 2);
      this.effect.ctx.fill();
    }

    // Update the particle's position and size based on proximity to the cursor
    update() {
      if (reduceMotion.value) return; // Skip animation if reduced motion is enabled

      const dx = this.effect.mouse.x - this.originX; // Distance from the cursor in X
      const dy = this.effect.mouse.y - this.originY; // Distance from the cursor in Y
      const distance = Math.sqrt(dx * dx + dy * dy); // Calculate the total distance

      // Reset size if the particle is outside the cursor radius
      if (distance >= this.effect.mouse.radius) {
        this.currentSize = this.baseSize;
      }

      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx); // Angle of the cursor's pull
        const force = (this.effect.mouse.radius - distance) / this.effect.mouse.radius;

        // Expand size and apply velocity based on proximity to the cursor
        this.currentSize = Math.min(this.maxSize, this.baseSize * (1 + force * 2));
        this.vx += Math.cos(angle) * force * 5;
        this.vy += Math.sin(angle) * force * 5;
        this.vz += force * 20;
      }

      // Apply friction and ease to the particle's movement
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vz *= this.friction;
      this.x += this.vx + (this.originX - this.x) * this.ease;
      this.y += this.vy + (this.originY - this.y) * this.ease;
      this.z += (0 - this.z) * this.ease;

      // Render the updated particle
      this.draw();
    }
  }

  // Define the Effect class to manage the entire particle system
  class Effect {
    constructor(width, height, context) {
      this.width = width; // Canvas width
      this.height = height; // Canvas height
      this.ctx = context; // Canvas rendering context
      this.particlesArray = []; // Array to hold all particles
      this.gap = Math.min(50, Math.max(20, Math.floor(Math.min(width, height) / 40))); // Particle spacing

      this.mouse = {
        x: undefined, // Mouse X position
        y: undefined, // Mouse Y position
        radius: Math.min(300, Math.max(150, Math.floor(Math.min(width, height) / 6))), // Cursor effect radius
      };

      // Listen for mouse movement to update cursor position
      window.addEventListener("mousemove", (e) => {
        const ratio = window.devicePixelRatio || 1;
        this.mouse.x = e.clientX * ratio;
        this.mouse.y = e.clientY * ratio;
      });

      this.init(); // Initialize the particle system
    }

    // Initialize the particles array
    init() {
      this.particlesArray = [];
      for (let y = 0; y < this.height; y += this.gap) {
        for (let x = 0; x < this.width; x += this.gap) {
          this.particlesArray.push(new Particle(x, y, this));
        }
      }
    }

    // Resize the particle system to match the new canvas dimensions
    resize() {
      this.gap = Math.min(50, Math.max(20, Math.floor(Math.min(this.width, this.height) / 40)));
      this.particlesArray = [];
      this.init();
    }

    // Update and redraw all particles
    update() {
      this.ctx.clearRect(0, 0, this.width, this.height); // Clear the canvas
      this.particlesArray.forEach((particle) => particle.update()); // Update each particle
    }
  }

  // Create a new Effect instance and start the animation loop
  effect.value = new Effect(canvasElement.width, canvasElement.height, ctx);

  function animate() {
    if (!reduceMotion.value && effect.value) {
      effect.value.update(); // Update the effect
      requestAnimationFrame(animate); // Schedule the next frame
    }
  }

  animate();

  // Add event listeners for resizing and motion preference changes
  window.addEventListener("resize", resizeCanvas);
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", checkReduceMotion);
});

// Cleanup event listeners when the component is unmounted
onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
  window.matchMedia("(prefers-reduced-motion: reduce)").removeEventListener("change", checkReduceMotion);
});

</script>

<template>
  <div class="canvas-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.canvas-container {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
