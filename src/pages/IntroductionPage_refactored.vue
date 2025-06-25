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
                <q-icon name="work" size="48px" class="jobu-text-accent" />
              </div>
              <h3 class="jobu-text-xl jobu-font-semibold jobu-mb-md">Sou Freelancer</h3>
              <p class="jobu-text-secondary jobu-mb-lg">
                Quero oferecer meus serviços e encontrar projetos incríveis
              </p>
              <div class="option-features">
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs jobu-mb-xs">
                  <q-icon name="check" size="16px" class="jobu-text-success" />
                  <span class="jobu-text-sm">Crie seu portfólio</span>
                </div>
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs jobu-mb-xs">
                  <q-icon name="check" size="16px" class="jobu-text-success" />
                  <span class="jobu-text-sm">Receba propostas</span>
                </div>
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs">
                  <q-icon name="check" size="16px" class="jobu-text-success" />
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
                <q-icon name="person" size="48px" class="jobu-text-accent" />
              </div>
              <h3 class="jobu-text-xl jobu-font-semibold jobu-mb-md">Sou Cliente</h3>
              <p class="jobu-text-secondary jobu-mb-lg">
                Preciso contratar profissionais para meus projetos
              </p>
              <div class="option-features">
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs jobu-mb-xs">
                  <q-icon name="check" size="16px" class="jobu-text-success" />
                  <span class="jobu-text-sm">Encontre especialistas</span>
                </div>
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs jobu-mb-xs">
                  <q-icon name="check" size="16px" class="jobu-text-success" />
                  <span class="jobu-text-sm">Compare propostas</span>
                </div>
                <div class="feature jobu-flex jobu-items-center jobu-gap-xs">
                  <q-icon name="check" size="16px" class="jobu-text-success" />
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
              @click="goToIntro"
              :disable="!group"
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
                    <q-icon name="rocket_launch" size="80px" class="jobu-text-accent" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">Liberdade para trabalhar</h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    No Jobu, você tem total flexibilidade para escolher seus projetos, definir seus
                    preços e trabalhar quando quiser.
                  </p>
                  <div class="slide-features jobu-grid--2-cols jobu-gap-md">
                    <div class="feature-item jobu-card--small jobu-text-center">
                      <q-icon name="schedule" size="32px" class="jobu-text-accent jobu-mb-xs" />
                      <div class="jobu-text-sm">Horários flexíveis</div>
                    </div>
                    <div class="feature-item jobu-card--small jobu-text-center">
                      <q-icon name="location_on" size="32px" class="jobu-text-accent jobu-mb-xs" />
                      <div class="jobu-text-sm">Trabalho remoto</div>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="portfolio" class="carousel-slide">
                <div class="slide-content jobu-text-center">
                  <div class="slide-icon jobu-mb-lg">
                    <q-icon name="collections" size="80px" class="jobu-text-accent" />
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
                    <q-icon name="payments" size="80px" class="jobu-text-accent" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">Ganhe mais</h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    Defina seus próprios preços e receba pagamentos seguros com nossa plataforma de
                    proteção.
                  </p>
                  <div class="earnings-stats jobu-grid--3-cols jobu-gap-md">
                    <div class="stat-item jobu-text-center">
                      <div class="stat-number jobu-text-2xl jobu-font-bold jobu-text-accent">
                        95%
                      </div>
                      <div class="stat-label jobu-text-xs jobu-text-secondary">Satisfação</div>
                    </div>
                    <div class="stat-item jobu-text-center">
                      <div class="stat-number jobu-text-2xl jobu-font-bold jobu-text-accent">
                        24h
                      </div>
                      <div class="stat-label jobu-text-xs jobu-text-secondary">Suporte</div>
                    </div>
                    <div class="stat-item jobu-text-center">
                      <div class="stat-number jobu-text-2xl jobu-font-bold jobu-text-accent">
                        0%
                      </div>
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
                    <q-icon name="search" size="80px" class="jobu-text-accent" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">
                    Encontre o profissional ideal
                  </h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    Acesse milhares de freelancers qualificados e encontre o especialista perfeito
                    para seu projeto.
                  </p>
                  <div class="slide-features jobu-grid--2-cols jobu-gap-md">
                    <div class="feature-item jobu-card--small jobu-text-center">
                      <q-icon
                        name="verified_user"
                        size="32px"
                        class="jobu-text-accent jobu-mb-xs"
                      />
                      <div class="jobu-text-sm">Perfis verificados</div>
                    </div>
                    <div class="feature-item jobu-card--small jobu-text-center">
                      <q-icon name="star" size="32px" class="jobu-text-accent jobu-mb-xs" />
                      <div class="jobu-text-sm">Avaliações reais</div>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="projects" class="carousel-slide">
                <div class="slide-content jobu-text-center">
                  <div class="slide-icon jobu-mb-lg">
                    <q-icon name="assignment" size="80px" class="jobu-text-accent" />
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
                    <q-icon name="security" size="80px" class="jobu-text-accent" />
                  </div>
                  <h2 class="jobu-text-2xl jobu-font-bold jobu-mb-md">Pagamento seguro</h2>
                  <p class="jobu-text-lg jobu-text-secondary jobu-mb-lg">
                    Sistema de escrow que protege seu investimento. Pague apenas quando ficar
                    satisfeito com o resultado.
                  </p>
                  <div class="security-features jobu-grid--2-cols jobu-gap-md">
                    <div class="feature-item jobu-card--small jobu-text-center">
                      <q-icon name="shield" size="32px" class="jobu-text-accent jobu-mb-xs" />
                      <div class="jobu-text-sm">Proteção total</div>
                    </div>
                    <div class="feature-item jobu-card--small jobu-text-center">
                      <q-icon name="credit_card" size="32px" class="jobu-text-accent jobu-mb-xs" />
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

const goToIntro = () => {
  step.value = 2
  slide.value = 'welcome'
  currentSlideIndex.value = 0
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
  // Redirect based on user type
  if (group.value === 'freelancer') {
    router.push('/freelancer-hub')
  } else {
    router.push('/client-profile')
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
  background: linear-gradient(135deg, var(--jobu-accent) 0%, lighten(var(--jobu-accent), 10%) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(0, 184, 148, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 184, 148, 0.6);
  }
}

// Profile options
.profile-options {
  max-width: 800px;
  margin: 0 auto;

  .profile-option {
    padding: var(--jobu-space-xl);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-5px);
      border-color: rgba(0, 184, 148, 0.3);
    }

    &.option-active {
      border-color: var(--jobu-accent);
      background: rgba(0, 184, 148, 0.1);
    }
  }

  .option-features {
    text-align: left;
  }
}

// Onboarding
.progress-container {
  .progress-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: var(--jobu-accent);
      transition: width 0.3s ease;
    }
  }
}

.onboarding-carousel {
  height: 500px;

  .carousel-slide {
    padding: var(--jobu-space-xl);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slide-content {
    max-width: 600px;
    width: 100%;
  }
}

// Slide elements
.slide-features,
.earnings-stats,
.security-features {
  max-width: 400px;
  margin: 0 auto;
}

.feature-item {
  padding: var(--jobu-space-md);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.preview-items {
  .preview-item {
    width: 60px;
    height: 40px;
    background: linear-gradient(
      135deg,
      var(--jobu-accent) 0%,
      lighten(var(--jobu-accent), 20%) 100%
    );
    border-radius: 4px;
  }
}

.project-preview {
  max-width: 300px;
  margin: 0 auto;

  .progress-mini {
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;

    .progress-mini-fill {
      height: 100%;
      background: var(--jobu-accent);
    }
  }
}

// Animations
.profile-option,
.intro-header {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
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
