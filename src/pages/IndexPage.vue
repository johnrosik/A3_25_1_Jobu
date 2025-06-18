<template>
  <q-page class="index-page">
    <!-- fundo estelar -->
    <div class="stars-background">
      <div class="stars stars-small"></div>
      <div class="stars stars-medium"></div>
      <div class="stars stars-large"></div>
    </div>

    <!-- Estrelas Voando -->
    <div class="floating-particles">
      <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <div class="main-content">
      <!-- Logo Dançando -->
      <div class="logo-container">
        <div class="logo-glow">
          <img src="../assets/jobu-logo.png" alt="Jobu" class="logo-image" />
        </div>
        <p class="app-subtitle">O futuro do trabalho freelancer</p>
      </div>

      <!-- botao começar -->
      <div class="button-container">
        <div class="button-glow-effect"></div>
        <q-btn
          class="ghost-button-start epic-start-btn"
          to="/introductionPage"
          label="Começar"
          flat
          @mouseover="onButtonHover"
          @mouseleave="onButtonLeave"
        />
        <div class="button-ripple" :class="{ active: rippleActive }"></div>
      </div>
    </div>

    <!-- ondas do hover -->
    <div class="energy-waves">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>
  </q-page>
</template>

<script setup>
// funcoes da pagina
import { ref, onMounted } from 'vue'

const rippleActive = ref(false)

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
    document.querySelector('.logo-container').classList.add('animate-in')
    document.querySelector('.button-container').classList.add('animate-in')
  }, 500)
})
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

// pagina principal
.index-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at center, $background 0%, darken($background, 10%) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

// fundo com estrelas
.stars-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

.stars-small {
  background-image:
    radial-gradient(1px 1px at 20px 30px, $secondary, transparent),
    radial-gradient(1px 1px at 40px 70px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, $secondary, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(1px 1px at 160px 30px, $secondary, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: moveStars 20s linear infinite;
}

.stars-medium {
  background-image:
    radial-gradient(2px 2px at 30px 50px, $secondary, transparent),
    radial-gradient(2px 2px at 80px 90px, rgba(255, 255, 255, 0.7), transparent),
    radial-gradient(1px 1px at 110px 20px, $secondary, transparent);
  background-repeat: repeat;
  background-size: 300px 150px;
  animation: moveStars 35s linear infinite;
}

.stars-large {
  background-image:
    radial-gradient(3px 3px at 50px 60px, $secondary, transparent),
    radial-gradient(2px 2px at 120px 30px, rgba(255, 255, 255, 0.9), transparent);
  background-repeat: repeat;
  background-size: 400px 200px;
  animation: moveStars 50s linear infinite;
}

@keyframes moveStars {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-400px);
  }
}

// estrelas flutuantes
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: $secondary;
  border-radius: 50%;
  opacity: 0.7;
  animation: floatParticle 15s linear infinite;
}

@keyframes floatParticle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

// conteudo central
.main-content {
  text-align: center;
  z-index: 10;
  position: relative;
}

// logo animado
.logo-container {
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-glow {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(circle, rgba(0, 184, 148, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: logoGlow 3s ease-in-out infinite alternate;
  }
}

.logo-image {
  width: 200px;
  height: 200px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 0 20px rgba(0, 184, 148, 0.5));
  animation: logoFloat 4s ease-in-out infinite;
}

@keyframes logoGlow {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.6;
  }
}

@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.app-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, $textprimary 0%, $secondary 50%, $textprimary 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleShimmer 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
}

@keyframes titleShimmer {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.app-subtitle {
  font-size: 1.5rem;
  color: $textsecondary;
  margin: 0;
  animation: subtitlePulse 2s ease-in-out infinite alternate;
}

@keyframes subtitlePulse {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

// botao epico
.button-container {
  position: relative;
  margin-bottom: 3rem;
  opacity: 0;
  transform: scale(0.8);
  transition: all 1s ease 0.5s;

  &.animate-in {
    opacity: 1;
    transform: scale(1);
  }
}

.button-glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 184, 148, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: buttonGlowPulse 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes buttonGlowPulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.4;
  }
}

.epic-start-btn {
  width: 200px !important;
  height: 80px !important;
  font-size: 1.8rem !important;
  font-weight: 600 !important;
  border-radius: 40px !important;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;

  &:hover {
    transform: translateY(-5px) scale(1.05) !important;
  }

  @media (max-width: 768px) {
    width: 180px !important;
    height: 70px !important;
    font-size: 1.5rem !important;
  }
}

.button-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(0, 184, 148, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
  pointer-events: none;

  &.active {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}

// ondas de energia
.energy-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 184, 148, 0.1) 25%,
    rgba(0, 184, 148, 0.2) 50%,
    rgba(0, 184, 148, 0.1) 75%,
    transparent 100%
  );
}

.wave-1 {
  animation: waveMove 8s ease-in-out infinite;
  opacity: 0.3;
}

.wave-2 {
  animation: waveMove 12s ease-in-out infinite reverse;
  opacity: 0.2;
  animation-delay: -2s;
}

.wave-3 {
  animation: waveMove 16s ease-in-out infinite;
  opacity: 0.1;
  animation-delay: -4s;
}

@keyframes waveMove {
  0%,
  100% {
    transform: translateX(-50%);
  }
  50% {
    transform: translateX(-25%);
  }
}

// mobile responsivo
@media (max-width: 768px) {
  .stars-small {
    background-size: 150px 75px;
  }
  .stars-medium {
    background-size: 200px 100px;
  }
  .stars-large {
    background-size: 250px 125px;
  }

  .logo-image {
    width: 160px;
    height: 160px;
  }
}
</style>
