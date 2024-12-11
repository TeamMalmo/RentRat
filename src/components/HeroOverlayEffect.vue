<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let effect = ref(null);
let reduceMotion = ref(false); // to store the user's motion preference

// Check system's motion preference
const checkReduceMotion = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  reduceMotion.value = prefersReducedMotion;
};

const resizeCanvas = () => {
  if (!canvas.value) return;

  const canvasElement = canvas.value;
  const ctx = canvasElement.getContext("2d");

  const ratio = window.devicePixelRatio || 1;

  // Set canvas internal resolution
  canvasElement.width = window.innerWidth * ratio;
  canvasElement.height = window.innerHeight * ratio;

  // Set canvas CSS size (to ensure full screen)
  canvasElement.style.width = "100%";
  canvasElement.style.height = "100%";
  
  if (effect.value) {
    effect.value.width = canvasElement.width;
    effect.value.height = canvasElement.height;
    effect.value.resize(); // Call resize to adjust particles
  }
};

onMounted(() => {
  const canvasElement = canvas.value;
  const ctx = canvasElement.getContext("2d");

  // Set initial canvas size
  resizeCanvas();

  // Check if reduce motion is enabled
  checkReduceMotion();

  class Particle {
    constructor(x, y, effect) {
      this.originX = x;
      this.originY = y;
      this.effect = effect;
      this.x = x;
      this.y = y;
      this.z = 0;
      this.vx = 0;
      this.vy = 0;
      this.vz = 0;
      this.ease = 0.2;
      this.friction = 0.9;
      this.baseSize = Math.random() * 3 + 1;
      this.currentSize = this.baseSize;
      this.maxSize = this.baseSize * 3; // Allow significant expansion
    }

    draw() {
      const scale = 1 + this.z * 0.01;
      this.effect.ctx.globalAlpha = 0.7;
      this.effect.ctx.fillStyle = "black";
      this.effect.ctx.beginPath();
      this.effect.ctx.arc(this.x, this.y, this.currentSize * scale, 0, Math.PI * 2);
      this.effect.ctx.fill();
    }

    update() {
      if (reduceMotion.value) return; // Skip animation if reduced motion is enabled

      const dx = this.effect.mouse.x - this.originX;
      const dy = this.effect.mouse.y - this.originY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Reset size when far from cursor
      if (distance >= this.effect.mouse.radius) {
        this.currentSize = this.baseSize;
      }

      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force =
          (this.effect.mouse.radius - distance) / this.effect.mouse.radius;

        // Increase size based on proximity to cursor
        this.currentSize = Math.min(this.maxSize, this.baseSize * (1 + force * 2));

        this.vx += Math.cos(angle) * force * 5;
        this.vy += Math.sin(angle) * force * 5;
        this.vz += force * 20;
      }

      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vz *= this.friction;
      this.x += this.vx + (this.originX - this.x) * this.ease;
      this.y += this.vy + (this.originY - this.y) * this.ease;
      this.z += (0 - this.z) * this.ease;
      this.draw();
    }
  }

  class Effect {
    constructor(width, height, context) {
      this.width = width;
      this.height = height;
      this.ctx = context;
      this.particlesArray = [];

      // Dynamically adjust gap based on screen size
      this.gap = Math.min(50, Math.max(20, Math.floor(Math.min(width, height) / 40)));

      this.mouse = {
        x: undefined,
        y: undefined,
        radius: Math.min(300, Math.max(150, Math.floor(Math.min(width, height) / 6))),
      };

      window.addEventListener("mousemove", (e) => {
        const ratio = window.devicePixelRatio || 1;
        this.mouse.x = e.clientX * ratio;
        this.mouse.y = e.clientY * ratio;
      });

      this.init();
    }

    init() {
      this.particlesArray = [];
      for (let y = 0; y < this.height; y += this.gap) {
        for (let x = 0; x < this.width; x += this.gap) {
          this.particlesArray.push(new Particle(x, y, this));
        }
      }
    }

    resize() {
      this.gap = Math.min(50, Math.max(20, Math.floor(Math.min(this.width, this.height) / 40)));
      this.particlesArray = []; // Reset particles array
      this.init(); // Reinitialize the particles with new gap size
    }

    update() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.particlesArray.forEach((particle) => particle.update());
    }
  }

  effect.value = new Effect(canvasElement.width, canvasElement.height, ctx);

  function animate() {
    if (!reduceMotion.value && effect.value) {
      effect.value.update();
      requestAnimationFrame(animate);
    }
  }

  animate();

  // Add resize event listener
  window.addEventListener("resize", resizeCanvas);

  // Listen for changes in the motion preference
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener('change', checkReduceMotion);
});

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  window.matchMedia("(prefers-reduced-motion: reduce)").removeEventListener('change', checkReduceMotion);
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
