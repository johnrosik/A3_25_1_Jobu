<template>
  <q-page class="jobu-page intro-page">
    <!-- Animated background -->
    <div class="jobu-starfield">
      <div class="jobu-stars--small"></div>
      <div class="jobu-stars--medium"></div>
      <div class="jobu-stars--large"></div>
    </div>

    <!-- Floating particles -->
    <div class="jobu-particles">
      <div v-for="n in 30" :key="n" class="jobu-particle" :style="getParticleStyle(n)"></div>
    </div>

    <!-- Content -->
    <div class="intro-content jobu-flex jobu-flex-center jobu-items-center">
      <!-- Step 1: Profile Selection -->
      <div v-if="step === 1" class="profile-selection">
        <div class="intro-header jobu-text-center jobu-mb-xl">
          <div class="logo-section jobu-mb-lg">
            <div class="logo-circle jobu-mb-lg">
              <q-icon name="handshake" size="48px" class="jobu-text-white" />
            </div>
            <h1 class="intro-title jobu-text-4xl jobu-font-bold jobu-text-accent jobu-mb-md">
              Bem-vindo ao Jobu!
            </h1>
            <p class="intro-subtitle jobu-text-xl jobu-text-secondary">
              Conectando talentos e oportunidades
            </p>
          </div>
        </div>

        <div class="selection-container">
          <h2 class="selection-title jobu-text-2xl jobu-font-semibold jobu-text-center jobu-mb-xl">
            Como você quer usar nossa plataforma?
          </h2>

          <div class="profile-options jobu-grid--2-cols jobu-gap-lg jobu-mb-xl">
            <div
              class="profile-option jobu-card jobu-card--interactive jobu-text-center"
              :class="{ 'option-active': group === 'freelancer' }"
              @click="group = 'freelancer'"
            >
              <div class="option-icon jobu-mb-lg">
                <q-icon name="work" size="48px" class="jobu-text-secondary" />
              </div>
              <h3 class="jobu-text-xl jobu-font-semibold jobu-mb-md">Sou Freelancer</h3>
              <p class="jobu-text-secondary jobu-mb-lg">
                Quero oferecer meus serviços e encontrar projetos incríveis
              </p>
              <div class="option-features">
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs jobu-mb-xs">
                  <q-icon name="check" size="16px" class="text-positive" />
                  <span class="jobu-text-sm">Crie seu portfólio</span>
                </div>
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs jobu-mb-xs">
                  <q-icon name="check" size="16px" class="text-positive" />
                  <span class="jobu-text-sm">Receba propostas</span>
                </div>
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs">
                  <q-icon name="check" size="16px" class="text-positive" />
                  <span class="jobu-text-sm">Trabalhe de qualquer lugar</span>
                </div>
              </div>
            </div>

            <div
              class="profile-option jobu-card jobu-card--interactive jobu-text-center"
              :class="{ 'option-active': group === 'client' }"
              @click="group = 'client'"
            >
              <div class="option-icon jobu-mb-lg">
                <q-icon name="person" size="48px" class="jobu-text-secondary" />
              </div>
              <h3 class="jobu-text-xl jobu-font-semibold jobu-mb-md">Sou Cliente</h3>
              <p class="jobu-text-secondary jobu-mb-lg">
                Preciso contratar profissionais para meus projetos
              </p>
              <div class="option-features">
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs jobu-mb-xs">
                  <q-icon name="check" size="16px" class="text-positive" />
                  <span class="jobu-text-sm">Encontre especialistas</span>
                </div>
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs jobu-mb-xs">
                  <q-icon name="check" size="16px" class="text-positive" />
                  <span class="jobu-text-sm">Compare propostas</span>
                </div>
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs">
                  <q-icon name="check" size="16px" class="text-positive" />
                  <span class="jobu-text-sm">Pagamento seguro</span>
                </div>
              </div>
            </div>
          </div>

          <div class="action-section jobu-text-center">
            <q-btn
              class="jobu-btn jobu-btn--primary jobu-btn--large"
              label="Continuar"
              icon-right="arrow_forward"
              :disable="!group"
              @click="nextStep"
            />
          </div>
        </div>
      </div>

      <!-- Step 2: Onboarding -->
      <div v-else-if="step === 2" class="onboarding-section">
        <!-- Header -->
        <div class="onboarding-header jobu-flex jobu-items-center jobu-justify-between jobu-mb-xl">
          <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="step = 1" />
          <div class="progress-container jobu-flex-1 jobu-mx-lg">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
            </div>
          </div>
          <div class="step-indicator jobu-text-sm jobu-text-secondary">
            {{ currentSlideIndex + 1 }} / {{ totalSlides }}
          </div>
        </div>

        <!-- Carousel -->
        <div class="onboarding-carousel">
          <q-carousel
            v-model="slide"
            @update:model-value="updateProgress"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="teal"
            navigation
            arrows
            height="100%"
            class="intro-carousel"
          >
            <!-- Freelancer Slides -->
            <template v-if="group === 'freelancer'">
              <q-carousel-slide name="welcome" class="carousel-slide">
                <div class="slide-content jobu-text-center">
                  <div class="slide-icon jobu-mb-lg">
                    <q-icon name="rocket_launch" size="80px" class="text-secondary" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">Liberdade para trabalhar</h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    No Jobu, você tem total flexibilidade para escolher seus projetos, definir seus
                    preços e trabalhar quando quiser.
                  </p>
                  <div class="slide-features jobu-grid--2-cols jobu-gap-md">
                    <div class="feature-item jobu-text-center">
                      <q-icon name="schedule" size="32px" class="text-secondary jobu-mb-xs" />
                      <div class="jobu-text-sm">Horários flexíveis</div>
                    </div>
                    <div class="feature-item jobu-text-center">
                      <q-icon name="location_on" size="32px" class="text-secondary jobu-mb-xs" />
                      <div class="jobu-text-sm">Trabalho remoto</div>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="portfolio" class="carousel-slide">
                <div class="slide-content jobu-text-center">
                  <div class="slide-icon jobu-mb-lg">
                    <q-icon name="collections" size="80px" class="text-secondary" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">Mostre seu talento</h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    Crie um portfólio impressionante que destaque suas habilidades e conquiste mais
                    clientes.
                  </p>
                  <div class="slide-preview jobu-card jobu-card--highlight">
                    <div class="jobu-card-content">
                      <div class="preview-items jobu-flex jobu-gap-sm jobu-justify-center">
                        <div class="preview-item"></div>
                        <div class="preview-item"></div>
                        <div class="preview-item"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="earnings" class="carousel-slide">
                <div class="slide-content jobu-text-center">
                  <div class="slide-icon jobu-mb-lg">
                    <q-icon name="payments" size="80px" class="text-secondary" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">Ganhe mais</h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    Defina seus próprios preços e receba pagamentos seguros com nossa plataforma de
                    proteção.
                  </p>
                  <div class="earnings-stats jobu-grid--3-cols jobu-gap-md">
                    <div class="stat-item jobu-text-center">
                      <div class="stat-number jobu-text-2xl jobu-font-bold text-secondary">95%</div>
                      <div class="stat-label jobu-text-xs jobu-text-secondary">Satisfação</div>
                    </div>
                    <div class="stat-item jobu-text-center">
                      <div class="stat-number jobu-text-2xl jobu-font-bold text-secondary">24h</div>
                      <div class="stat-label jobu-text-xs jobu-text-secondary">Suporte</div>
                    </div>
                    <div class="stat-item jobu-text-center">
                      <div class="stat-number jobu-text-2xl jobu-font-bold text-secondary">0%</div>
                      <div class="stat-label jobu-text-xs jobu-text-secondary">Taxa inicial</div>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>
            </template>

            <!-- Client Slides -->
            <template v-else-if="group === 'client'">
              <q-carousel-slide name="welcome" class="carousel-slide">
                <div class="slide-content jobu-text-center">
                  <div class="slide-icon jobu-mb-lg">
                    <q-icon name="search" size="80px" class="text-secondary" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">
                    Encontre o profissional ideal
                  </h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    Acesse milhares de freelancers qualificados e encontre o especialista perfeito
                    para seu projeto.
                  </p>
                  <div class="slide-features jobu-grid--2-cols jobu-gap-md">
                    <div class="feature-item jobu-text-center">
                      <q-icon name="verified_user" size="32px" class="text-secondary jobu-mb-xs" />
                      <div class="jobu-text-sm">Perfis verificados</div>
                    </div>
                    <div class="feature-item jobu-text-center">
                      <q-icon name="star" size="32px" class="text-secondary jobu-mb-xs" />
                      <div class="jobu-text-sm">Avaliações reais</div>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="projects" class="carousel-slide">
                <div class="slide-content jobu-text-center">
                  <div class="slide-icon jobu-mb-lg">
                    <q-icon name="assignment" size="80px" class="text-secondary" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">Gerencie projetos</h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    Acompanhe o progresso, comunique-se com freelancers e mantenha tudo organizado
                    em um só lugar.
                  </p>
                  <div class="project-preview jobu-card jobu-card--highlight">
                    <div class="jobu-card-content">
                      <div class="jobu-flex jobu-justify-between jobu-items-center jobu-mb-xs">
                        <span class="jobu-text-sm jobu-font-semibold">Website Design</span>
                        <q-badge color="green" label="Em andamento" />
                      </div>
                      <div class="progress-mini">
                        <div class="progress-mini-fill" style="width: 65%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="security" class="carousel-slide">
                <div class="slide-content jobu-text-center">
                  <div class="slide-icon jobu-mb-lg">
                    <q-icon name="security" size="80px" class="text-secondary" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">Pagamento seguro</h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    Sistema de escrow que protege seu investimento. Pague apenas quando ficar
                    satisfeito com o resultado.
                  </p>
                  <div class="security-features jobu-grid--2-cols jobu-gap-md">
                    <div class="feature-item jobu-text-center">
                      <q-icon name="shield" size="32px" class="text-secondary jobu-mb-xs" />
                      <div class="jobu-text-sm">Proteção total</div>
                    </div>
                    <div class="feature-item jobu-text-center">
                      <q-icon name="credit_card" size="32px" class="text-secondary jobu-mb-xs" />
                      <div class="jobu-text-sm">Múltiplos métodos</div>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>
            </template>
          </q-carousel>
        </div>

        <!-- Actions -->
        <div class="onboarding-actions jobu-flex jobu-justify-between jobu-mt-xl">
          <q-btn flat label="Pular" class="jobu-btn--ghost" @click="finishOnboarding" />
          <q-btn
            :label="isLastSlide ? 'Começar' : 'Próximo'"
            class="jobu-btn jobu-btn--primary"
            @click="nextSlideOrFinish"
            :icon-right="isLastSlide ? 'rocket_launch' : 'arrow_forward'"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const step = ref(1)
const group = ref('')
const slide = ref('welcome')
const currentSlideIndex = ref(0)

// Computed
const totalSlides = computed(() => 3)

const progressWidth = computed(() => {
  return ((currentSlideIndex.value + 1) / totalSlides.value) * 100
})

const isLastSlide = computed(() => {
  return currentSlideIndex.value === totalSlides.value - 1
})

// Methods
const getParticleStyle = (index) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDelay = (index % 10) * 0.5
  const randomDuration = 15 + Math.random() * 10

  return {
    left: `${randomX}%`,
    top: `${randomY}%`,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`,
  }
}

const nextStep = () => {
  if (group.value) {
    step.value = 2
    slide.value = 'welcome'
    currentSlideIndex.value = 0
  }
}

const updateProgress = (newSlide) => {
  const slides =
    group.value === 'freelancer'
      ? ['welcome', 'portfolio', 'earnings']
      : ['welcome', 'projects', 'security']

  currentSlideIndex.value = slides.indexOf(newSlide)
}

const nextSlideOrFinish = () => {
  if (isLastSlide.value) {
    finishOnboarding()
  } else {
    const slides =
      group.value === 'freelancer'
        ? ['welcome', 'portfolio', 'earnings']
        : ['welcome', 'projects', 'security']

    const nextIndex = currentSlideIndex.value + 1
    if (nextIndex < slides.length) {
      slide.value = slides[nextIndex]
    }
  }
}

const finishOnboarding = () => {
  // Redirect based on user type to unified profile
  if (group.value === 'freelancer') {
    router.push('/profile/freelancer')
  } else {
    router.push('/profile/client')
  }
}

onMounted(() => {
  // Add entrance animations
  setTimeout(() => {
    const elements = document.querySelectorAll('.profile-option, .intro-header')
    elements.forEach((el) => el.classList.add('animate-in'))
  }, 300)
})
</script>

<style lang="scss" scoped>
.intro-page {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  background: var(--jobu-bg-dark);
  color: var(--jobu-text-primary);
}

.intro-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding: var(--jobu-space-xl);
}

// Logo section
.logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--jobu-bg-glass);
  border: 2px solid var(--jobu-border-glass);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {
  0%,
  100% {
    box-shadow: 0 0 20px var(--jobu-shadow-glow);
  }
  50% {
    box-shadow:
      0 0 30px var(--jobu-shadow-glow),
      0 0 40px rgba(0, 184, 148, 0.4);
  }
}

// Profile options
.profile-options {
  max-width: 800px;
  margin: 0 auto;

  .profile-option {
    padding: var(--jobu-space-xl);
    cursor: pointer;
    transition: all var(--jobu-transition-normal);
    border: 2px solid var(--jobu-border-subtle);
    background: var(--jobu-bg-glass);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    visibility: visible !important;
    opacity: 1;
    display: block !important;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, transparent 0%, rgba(0, 184, 148, 0.05) 100%);
      opacity: 0;
      transition: opacity var(--jobu-transition-normal);
    }

    &:hover {
      transform: translateY(-5px);
      border-color: var(--jobu-border-glass);
      box-shadow: var(--jobu-shadow-medium);

      &::before {
        opacity: 1;
      }
    }

    &.option-active {
      border-color: var(--jobu-secondary);
      background: var(--jobu-bg-glass-active);
      box-shadow: var(--jobu-shadow-glow);

      &::before {
        opacity: 1;
        background: linear-gradient(
          135deg,
          rgba(0, 184, 148, 0.1) 0%,
          rgba(0, 184, 148, 0.05) 100%
        );
      }
    }
  }

  .option-features {
    text-align: left;
  }

  .option-icon {
    transition: all var(--jobu-transition-normal);
  }
}

// Onboarding
.onboarding-section {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.progress-container {
  .progress-bar {
    height: 4px;
    background: var(--jobu-border-subtle);
    border-radius: 2px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: var(--jobu-secondary);
      transition: width var(--jobu-transition-normal);
      box-shadow: 0 0 10px rgba(0, 184, 148, 0.5);
    }
  }
}

.onboarding-carousel {
  height: 500px;
  background: rgba(26, 26, 26, 0.85) !important;
  border: 1px solid var(--jobu-border-subtle);
  border-radius: var(--jobu-radius-lg);
  backdrop-filter: blur(10px);

  .carousel-slide {
    padding: var(--jobu-space-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent !important;
  }

  .slide-content {
    max-width: 600px;
    width: 100%;
    color: var(--jobu-text-primary) !important;

    h2 {
      color: var(--jobu-text-primary) !important;
    }

    p {
      color: var(--jobu-text-secondary) !important;
    }

    .stat-number {
      color: var(--jobu-secondary) !important;
    }

    .stat-label {
      color: var(--jobu-text-secondary) !important;
    }
  }

  // Forçar background dos elementos Quasar
  .q-carousel__slide {
    background: transparent !important;
  }

  .q-carousel {
    background: transparent !important;
  }
}

// Forçar estilos escuros para todos os elementos do carousel
.intro-carousel {
  background: rgba(26, 26, 26, 0.85) !important;

  .q-carousel__slide,
  .q-carousel__slide > div,
  .q-panel,
  .q-tab-panel {
    background: transparent !important;
  }

  // Forçar background escuro específico para feature items
  .feature-item,
  .stat-item {
    background: rgba(26, 26, 26, 0.85) !important;

    * {
      color: var(--jobu-text-primary) !important;
    }
  }
}

// Slide elements
.slide-features,
.earnings-stats,
.security-features {
  max-width: 400px;
  margin: 0 auto;

  .stat-item {
    padding: var(--jobu-space-sm);
    background: rgba(26, 26, 26, 0.85) !important;
    border: 1px solid var(--jobu-border-subtle);
    border-radius: var(--jobu-radius-sm);
    backdrop-filter: blur(10px) !important;
    transition: all var(--jobu-transition-normal);
    color: var(--jobu-text-primary) !important;

    &:hover {
      background: rgba(0, 184, 148, 0.15) !important;
      transform: translateY(-2px);
    }
  }
}

.feature-item {
  padding: var(--jobu-space-md) !important;
  background: rgba(26, 26, 26, 0.85) !important;
  border: 1px solid var(--jobu-border-subtle) !important;
  border-radius: var(--jobu-radius-sm) !important;
  backdrop-filter: blur(10px) !important;
  transition: all var(--jobu-transition-normal) !important;
  color: var(--jobu-text-primary) !important;

  &:hover {
    background: rgba(0, 184, 148, 0.15) !important;
    border-color: var(--jobu-border-glass) !important;
    transform: translateY(-2px) !important;
    box-shadow: var(--jobu-shadow-glow) !important;
  }

  .q-icon {
    color: var(--jobu-secondary) !important;
  }

  .jobu-text-sm,
  div {
    color: var(--jobu-text-primary) !important;
  }
}

.preview-items {
  .preview-item {
    width: 60px;
    height: 40px;
    background: linear-gradient(135deg, var(--jobu-secondary) 0%, var(--jobu-accent) 100%);
    border-radius: 4px;
    box-shadow: var(--jobu-shadow-small);
  }
}

.project-preview {
  max-width: 300px;
  margin: 0 auto;
  background: var(--jobu-bg-glass) !important;
  border: 1px solid var(--jobu-border-subtle);
  border-radius: var(--jobu-radius-sm);
  backdrop-filter: blur(10px) !important;
  color: var(--jobu-text-primary) !important;

  .progress-mini {
    height: 4px;
    background: var(--jobu-border-subtle);
    border-radius: 2px;
    overflow: hidden;

    .progress-mini-fill {
      height: 100%;
      background: var(--jobu-secondary);
      box-shadow: 0 0 8px rgba(0, 184, 148, 0.4);
    }
  }
}

// Animations
.profile-selection {
  transition: all var(--jobu-transition-normal);
  opacity: 1;
}

.profile-option {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.intro-header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.selection-container {
  transition: all var(--jobu-transition-normal);
}

// Mobile responsiveness
@media (max-width: 768px) {
  .intro-content {
    padding: var(--jobu-space-lg);
  }

  .profile-options {
    grid-template-columns: 1fr;
  }

  .slide-features,
  .earnings-stats,
  .security-features {
    grid-template-columns: 1fr;
  }

  .onboarding-actions {
    flex-direction: column;
    gap: var(--jobu-space-md);
  }
}
</style>
