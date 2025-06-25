<template>
  <q-page class="jobu-page index-page">
    <!-- Animated background -->
    <div class="jobu-starfield">
      <div class="jobu-stars--small"></div>
      <div class="jobu-stars--medium"></div>
      <div class="jobu-stars--large"></div>
    </div>

    <!-- Floating particles -->
    <div class="jobu-particles">
      <div v-for="i in 20" :key="i" class="jobu-particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- Main content -->
    <div class="main-content jobu-flex jobu-flex-center jobu-items-center">
      <!-- Logo section -->
      <div class="logo-section jobu-text-center" :class="{ 'animate-in': animateIn }">
        <div class="logo-container">
          <div class="logo-glow">
            <img src="../assets/jobu-logo.png" alt="Jobu" class="logo-image" />
          </div>
          <p class="app-subtitle jobu-text-lg jobu-text-secondary jobu-mt-md">
            O futuro do trabalho freelancer
          </p>
        </div>

        <!-- Start button -->
        <div class="button-container jobu-mt-xl" :class="{ 'animate-in': animateIn }">
          <div class="button-glow-effect"></div>
          <q-btn
            class="start-button jobu-btn jobu-btn--primary jobu-btn--large"
            to="/intro"
            label="Começar"
            @mouseover="onButtonHover"
            @mouseleave="onButtonLeave"
          />
          <div class="button-ripple" :class="{ active: rippleActive }"></div>
        </div>
      </div>
    </div>

    <!-- Energy waves on hover -->
    <div class="energy-waves" :class="{ active: rippleActive }">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const rippleActive = ref(false)
const animateIn = ref(false)

const onButtonHover = () => {
  rippleActive.value = true
}

const onButtonLeave = () => {
  setTimeout(() => {
    rippleActive.value = false
  }, 500)
}

const getParticleStyle = () => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDelay = Math.random() * 10
  const randomDuration = 10 + Math.random() * 20

  return {
    left: `${randomX}%`,
    top: `${randomY}%`,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`,
  }
}

onMounted(() => {
  // Trigger entrance animations
  setTimeout(() => {
    animateIn.value = true
  }, 300)
})
</script>

<style lang="scss" scoped>
.index-page {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
}

.main-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding: var(--jobu-space-xl);
}

// Logo section
.logo-section {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-container {
  .logo-glow {
    position: relative;
    display: inline-block;

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      background: radial-gradient(circle, rgba(0, 184, 148, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      animation: logoGlow 4s ease-in-out infinite;
      z-index: -1;
    }
  }

  .logo-image {
    max-width: 200px;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 0 20px rgba(0, 184, 148, 0.5));
    animation: logoFloat 6s ease-in-out infinite;
  }
}

@keyframes logoGlow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(1deg);
  }
  75% {
    transform: translateY(-5px) rotate(-1deg);
  }
}

// Button section
.button-container {
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out 0.3s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.button-glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(0, 184, 148, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
  z-index: -1;
}

.start-button {
  position: relative;
  overflow: hidden;
  min-width: 200px;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 184, 148, 0.4);
  }

  &:hover + .button-ripple {
    width: 300px;
    height: 300px;
    opacity: 0.1;
  }
}

.button-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, var(--jobu-accent) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
  pointer-events: none;
  z-index: -1;

  &.active {
    width: 400px;
    height: 400px;
    opacity: 0.2;
  }
}

// Energy waves
.energy-waves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.active {
    opacity: 1;
  }

  .wave {
    position: absolute;
    border: 2px solid var(--jobu-accent);
    border-radius: 50%;
    animation: waveExpand 2s ease-out infinite;
  }

  .wave-1 {
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    animation-delay: 0s;
  }

  .wave-2 {
    width: 200px;
    height: 200px;
    margin: -100px 0 0 -100px;
    animation-delay: 0.3s;
  }

  .wave-3 {
    width: 300px;
    height: 300px;
    margin: -150px 0 0 -150px;
    animation-delay: 0.6s;
  }
}

@keyframes waveExpand {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .main-content {
    padding: var(--jobu-space-lg);
  }

  .logo-container .logo-image {
    max-width: 150px;
  }

  .start-button {
    min-width: 180px;
    font-size: 1.1rem;
  }

  .energy-waves {
    .wave-1 {
      width: 80px;
      height: 80px;
      margin: -40px 0 0 -40px;
    }
    .wave-2 {
      width: 150px;
      height: 150px;
      margin: -75px 0 0 -75px;
    }
    .wave-3 {
      width: 220px;
      height: 220px;
      margin: -110px 0 0 -110px;
    }
  }
}
</style>
