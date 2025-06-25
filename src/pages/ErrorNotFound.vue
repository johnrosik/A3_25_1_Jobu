<template>
  <q-page class="jobu-page error-page">
    <!-- Animated background -->
    <div class="jobu-starfield">
      <div class="jobu-stars--small"></div>
      <div class="jobu-stars--medium"></div>
      <div class="jobu-stars--large"></div>
    </div>

    <!-- Floating particles -->
    <div class="jobu-particles">
      <div v-for="i in 10" :key="i" class="jobu-particle" :style="getParticleStyle()"></div>
    </div>

    <!-- Content -->
    <div class="error-content jobu-flex jobu-flex-center jobu-items-center jobu-text-center">
      <div class="error-container">
        <!-- 404 Number -->
        <div class="error-number" data-aos="zoom-in">404</div>

        <!-- Error Message -->
        <div class="error-message" data-aos="fade-up" data-aos-delay="300">
          <h2 class="error-title jobu-text-2xl jobu-font-bold jobu-text-primary jobu-mb-md">
            Ops! Página não encontrada
          </h2>
          <p class="error-subtitle jobu-text-lg jobu-text-secondary jobu-mb-xl">
            A página que você está procurando pode ter sido movida, deletada ou não existe.
          </p>
        </div>

        <!-- Suggestions -->
        <div
          class="error-suggestions jobu-card jobu-card--highlight jobu-mb-xl"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div class="jobu-card-content">
            <h4 class="jobu-font-semibold jobu-mb-md">O que você pode fazer:</h4>
            <div class="suggestions-list jobu-text-left">
              <div class="suggestion-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-xs">
                <q-icon name="home" size="16px" class="jobu-text-accent" />
                <span class="jobu-text-sm">Voltar para a página inicial</span>
              </div>
              <div class="suggestion-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-xs">
                <q-icon name="search" size="16px" class="jobu-text-accent" />
                <span class="jobu-text-sm">Explorar freelancers disponíveis</span>
              </div>
              <div class="suggestion-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-xs">
                <q-icon name="person" size="16px" class="jobu-text-accent" />
                <span class="jobu-text-sm">Acessar seu perfil</span>
              </div>
              <div class="suggestion-item jobu-flex jobu-items-center jobu-gap-sm">
                <q-icon name="help" size="16px" class="jobu-text-accent" />
                <span class="jobu-text-sm">Entrar em contato com o suporte</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="error-actions" data-aos="fade-up" data-aos-delay="900">
          <div class="jobu-flex jobu-gap-md jobu-justify-center">
            <q-btn
              label="Página Inicial"
              icon="home"
              class="jobu-btn jobu-btn--primary"
              @click="goHome"
            />
            <q-btn
              label="Explorar"
              icon="search"
              class="jobu-btn jobu-btn--outline"
              @click="goExplore"
            />
            <q-btn
              label="Voltar"
              icon="arrow_back"
              class="jobu-btn jobu-btn--secondary"
              @click="goBack"
            />
          </div>
        </div>

        <!-- Easter Egg -->
        <div class="easter-egg jobu-mt-xl" data-aos="fade-up" data-aos-delay="1200">
          <q-btn
            flat
            dense
            icon="sentiment_very_satisfied"
            class="jobu-btn--ghost jobu-text-xs"
            @click="showEasterEgg"
          >
            Encontrou um erro? Que tal um desconto!
          </q-btn>
        </div>
      </div>
    </div>

    <!-- Floating Elements -->
    <div class="floating-elements">
      <div class="floating-icon floating-icon-1">
        <q-icon name="code" size="24px" class="jobu-text-accent" />
      </div>
      <div class="floating-icon floating-icon-2">
        <q-icon name="palette" size="20px" class="jobu-text-accent" />
      </div>
      <div class="floating-icon floating-icon-3">
        <q-icon name="lightbulb" size="28px" class="jobu-text-accent" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Generate particle styles
const getParticleStyle = () => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDelay = Math.random() * 10
  const randomDuration = 15 + Math.random() * 25

  return {
    left: `${randomX}%`,
    top: `${randomY}%`,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`,
  }
}

// Navigation methods
const goHome = () => {
  router.push('/index')
}

const goExplore = () => {
  router.push('/descubra')
}

const goBack = () => {
  router.back()
}

const showEasterEgg = () => {
  $q.notify({
    color: 'positive',
    message: '🎉 Código de desconto: ERROR404 - 10% off no primeiro projeto!',
    icon: 'celebration',
    timeout: 5000,
    actions: [
      {
        label: 'Copiar',
        color: 'white',
        handler: () => {
          navigator.clipboard?.writeText('ERROR404')
          $q.notify({
            color: 'info',
            message: 'Código copiado!',
            icon: 'content_copy',
          })
        },
      },
    ],
  })
}

// Animations
onMounted(() => {
  // Simple AOS-like animation observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  // Observe all elements with data-aos attribute
  const elements = document.querySelectorAll('[data-aos]')
  elements.forEach((el) => observer.observe(el))
})
</script>

<style lang="scss" scoped>
.error-page {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
}

.error-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding: var(--jobu-space-xl);
}

.error-container {
  max-width: 600px;
  width: 100%;
}

// 404 Number Animation
.error-number {
  font-size: clamp(8rem, 25vw, 20rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--jobu-accent) 0%, lighten(var(--jobu-accent), 20%) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 184, 148, 0.3);
  margin-bottom: var(--jobu-space-lg);
  animation: errorPulse 3s ease-in-out infinite;
}

@keyframes errorPulse {
  0%,
  100% {
    transform: scale(1);
    text-shadow: 0 0 30px rgba(0, 184, 148, 0.3);
  }
  50% {
    transform: scale(1.05);
    text-shadow: 0 0 50px rgba(0, 184, 148, 0.5);
  }
}

// Suggestions
.suggestions-list {
  .suggestion-item {
    transition: all 0.3s ease;
    padding: var(--jobu-space-xs);
    border-radius: 6px;

    &:hover {
      background: rgba(0, 184, 148, 0.1);
      transform: translateX(4px);
    }
  }
}

// Floating Elements
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.floating-icon {
  position: absolute;
  opacity: 0.3;
  animation: floatAround 20s linear infinite;

  &.floating-icon-1 {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &.floating-icon-2 {
    top: 60%;
    right: 15%;
    animation-delay: 7s;
    animation-duration: 25s;
  }

  &.floating-icon-3 {
    bottom: 30%;
    left: 20%;
    animation-delay: 14s;
    animation-duration: 30s;
  }
}

@keyframes floatAround {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(30px, -20px) rotate(90deg);
  }
  50% {
    transform: translate(-20px, -40px) rotate(180deg);
  }
  75% {
    transform: translate(-30px, 20px) rotate(270deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

// AOS-like animations
[data-aos] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

[data-aos='zoom-in'] {
  transform: scale(0.8);

  &.animate-in {
    transform: scale(1);
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .error-content {
    padding: var(--jobu-space-lg);
  }

  .error-number {
    font-size: clamp(6rem, 20vw, 12rem);
  }

  .error-actions {
    .jobu-flex {
      flex-direction: column;
    }
  }

  .floating-elements {
    display: none; // Hide floating elements on mobile for performance
  }
}
</style>
