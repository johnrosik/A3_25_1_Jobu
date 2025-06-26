<template>
  <q-page class="intro-page">
    <!-- Background com partículas -->
    <div class="particles-bg">
      <div v-for="n in 50" :key="n" class="particle" :style="getParticleStyle(n)"></div>
    </div>

    <!-- Conteúdo principal -->
    <div class="intro-content">
      <!-- Etapa 1: Escolher perfil -->
      <div v-if="step === 1" class="profile-selection">
        <div class="intro-header">
          <div class="logo-section">
            <div class="logo-circle">
              <q-icon name="handshake" size="48px" color="white" />
            </div>
            <h1 class="intro-title">Bem-vindo ao Jobu!</h1>
            <p class="intro-subtitle">Conectando talentos e oportunidades</p>
          </div>
        </div>

        <div class="selection-container">
          <h2 class="selection-title">Como você quer usar nossa plataforma?</h2>

          <div class="profile-options">
            <div class="profile-option" :class="{ active: group === 'op1' }" @click="group = 'op1'">
              <div class="option-icon">
                <q-icon name="work" size="48px" />
              </div>
              <h3>Sou Freelancer</h3>
              <p>Quero oferecer meus serviços e encontrar projetos incríveis</p>
              <div class="option-features">
                <div class="feature"><q-icon name="check" /> Crie seu portfólio</div>
                <div class="feature"><q-icon name="check" /> Receba propostas</div>
                <div class="feature"><q-icon name="check" /> Trabalhe de qualquer lugar</div>
              </div>
            </div>

            <div class="profile-option" :class="{ active: group === 'op2' }" @click="group = 'op2'">
              <div class="option-icon">
                <q-icon name="person" size="48px" />
              </div>
              <h3>Sou Cliente</h3>
              <p>Preciso contratar profissionais para meus projetos</p>
              <div class="option-features">
                <div class="feature"><q-icon name="check" /> Encontre especialistas</div>
                <div class="feature"><q-icon name="check" /> Compare propostas</div>
                <div class="feature"><q-icon name="check" /> Pagamento seguro</div>
              </div>
            </div>
          </div>

          <div class="action-section">
            <q-btn
              class="continue-btn"
              color="teal"
              size="lg"
              label="Continuar"
              icon-right="arrow_forward"
              @click="goToIntro"
              :disable="!group"
            />
          </div>
        </div>
      </div>

      <!-- Etapa 2: Onboarding por tipo -->
      <div v-else-if="step === 2" class="onboarding-section">
        <!-- Header do onboarding -->
        <div class="onboarding-header">
          <q-btn flat round icon="arrow_back" color="white" @click="step = 1" class="back-btn" />
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
          </div>
          <div class="step-indicator">{{ currentSlideIndex + 1 }} / {{ totalSlides }}</div>
        </div>

        <!-- Carousel de introdução -->
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
            <!-- Slides para Freelancer -->
            <template v-if="group === 'op1'">
              <q-carousel-slide name="welcome" class="carousel-slide">
                <div class="slide-content">
                  <div class="slide-icon">
                    <q-icon name="rocket_launch" size="80px" color="teal" />
                  </div>
                  <h2>Liberdade para trabalhar</h2>
                  <p>
                    Trabalhe de onde quiser, quando quiser, com os projetos que mais combinam com
                    você.
                  </p>
                  <div class="slide-image">
                    <img
                      src="https://via.placeholder.com/400x300/1a1a1a/00b894?text=Freelancer+Freedom"
                      alt="Liberdade"
                    />
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="portfolio" class="carousel-slide">
                <div class="slide-content">
                  <div class="slide-icon">
                    <q-icon name="folder_open" size="80px" color="teal" />
                  </div>
                  <h2>Mostre seu talento</h2>
                  <p>Crie um portfólio impressionante e deixe seus trabalhos falarem por você.</p>
                  <div class="slide-image">
                    <img
                      src="https://via.placeholder.com/400x300/1a1a1a/00b894?text=Portfolio+Showcase"
                      alt="Portfolio"
                    />
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="earnings" class="carousel-slide">
                <div class="slide-content">
                  <div class="slide-icon">
                    <q-icon name="paid" size="80px" color="teal" />
                  </div>
                  <h2>Ganhe mais</h2>
                  <p>Defina seus preços, negocie diretamente com clientes e aumente sua renda.</p>
                  <div class="slide-image">
                    <img
                      src="https://via.placeholder.com/400x300/1a1a1a/00b894?text=Increase+Earnings"
                      alt="Ganhos"
                    />
                  </div>
                </div>
              </q-carousel-slide>
            </template>

            <!-- Slides para Cliente -->
            <template v-else>
              <q-carousel-slide name="welcome" class="carousel-slide">
                <div class="slide-content">
                  <div class="slide-icon">
                    <q-icon name="search" size="80px" color="teal" />
                  </div>
                  <h2>Encontre o profissional ideal</h2>
                  <p>
                    Precisa de ajuda com um projeto? Aqui você encontra especialistas qualificados.
                  </p>
                  <div class="slide-image">
                    <img
                      src="https://via.placeholder.com/400x300/1a1a1a/00b894?text=Find+Professionals"
                      alt="Busca"
                    />
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="publish" class="carousel-slide">
                <div class="slide-content">
                  <div class="slide-icon">
                    <q-icon name="campaign" size="80px" color="teal" />
                  </div>
                  <h2>Publique sua demanda</h2>
                  <p>
                    Conte o que você precisa e receba propostas de quem realmente entende do
                    assunto.
                  </p>
                  <div class="slide-image">
                    <img
                      src="https://via.placeholder.com/400x300/1a1a1a/00b894?text=Post+Project"
                      alt="Publicar"
                    />
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="hire" class="carousel-slide">
                <div class="slide-content">
                  <div class="slide-icon">
                    <q-icon name="handshake" size="80px" color="teal" />
                  </div>
                  <h2>Contrate com segurança</h2>
                  <p>Converse, avalie perfis e feche negócio com total confiança e praticidade.</p>
                  <div class="slide-image">
                    <img
                      src="https://via.placeholder.com/400x300/1a1a1a/00b894?text=Secure+Hiring"
                      alt="Contratar"
                    />
                  </div>
                </div>
              </q-carousel-slide>
            </template>

            <!-- Slide final -->
            <q-carousel-slide name="final" class="carousel-slide final-slide">
              <div class="slide-content">
                <div class="success-animation">
                  <q-icon name="check_circle" size="100px" color="teal" class="success-icon" />
                </div>
                <h2>Pronto para começar!</h2>
                <p>
                  {{
                    group === 'op1'
                      ? 'Acesse seu painel de freelancer e comece a receber propostas.'
                      : 'Explore nossos profissionais e encontre o ideal para seu projeto.'
                  }}
                </p>

                <div class="final-actions">
                  <q-btn
                    class="primary-action"
                    color="teal"
                    size="xl"
                    :label="group === 'op1' ? 'Criar Perfil Freelancer' : 'Explorar Profissionais'"
                    icon-right="arrow_forward"
                    @click="goToProfile"
                  />

                  <q-btn
                    flat
                    color="white"
                    label="Explorar mais"
                    icon="explore"
                    @click="goToDiscover"
                    class="secondary-action"
                  />
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>

        <!-- Controles inferiores -->
        <div class="carousel-controls">
          <q-btn
            v-if="!isLastSlide"
            flat
            color="white"
            label="Pular introdução"
            @click="goToFinalSlide"
            size="sm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado da aplicação
const step = ref(1) // 1 = escolha, 2 = introdução
const group = ref('')
const slide = ref('welcome')

// Slides por tipo
const freelancerSlides = ['welcome', 'portfolio', 'earnings', 'final']
const clientSlides = ['welcome', 'publish', 'hire', 'final']

// Computed properties
const currentSlides = computed(() => {
  return group.value === 'op1' ? freelancerSlides : clientSlides
})

const totalSlides = computed(() => currentSlides.value.length)

const currentSlideIndex = computed(() => {
  return currentSlides.value.indexOf(slide.value)
})

const progressWidth = computed(() => {
  return ((currentSlideIndex.value + 1) / totalSlides.value) * 100
})

const isLastSlide = computed(() => {
  return slide.value === 'final'
})

// Métodos
function goToIntro() {
  step.value = 2
  slide.value = 'welcome'
}

function updateProgress() {
  // Atualiza automaticamente via computed
}

function goToFinalSlide() {
  slide.value = 'final'
}

function goToProfile() {
  if (group.value === 'op1') {
    router.push('/freelancer-profile')
  } else {
    router.push('/client-basic')
  }
}

function goToDiscover() {
  router.push('/descubra')
}

function getParticleStyle() {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const animationDuration = Math.random() * 20 + 10
  const animationDelay = Math.random() * 20

  return {
    left: left + '%',
    width: size + 'px',
    height: size + 'px',
    animationDuration: animationDuration + 's',
    animationDelay: animationDelay + 's',
  }
}
</script>

<style scoped>
.intro-page {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  min-height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
}

/* Background com partículas */
.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: rgba(0, 184, 148, 0.3);
  border-radius: 50%;
  animation: float infinite linear;
}

@keyframes float {
  from {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Conteúdo principal */
.intro-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Etapa 1: Seleção de perfil */
.profile-selection {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.intro-header {
  margin-bottom: 60px;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.logo-circle {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 184, 148, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.intro-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #00b894 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.selection-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 48px;
  border: 1px solid rgba(0, 184, 148, 0.2);
  backdrop-filter: blur(20px);
}

.selection-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 48px 0;
  color: #00b894;
}

.profile-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 48px;
}

.profile-option {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 32px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.profile-option:hover {
  background: rgba(0, 184, 148, 0.1);
  border-color: rgba(0, 184, 148, 0.3);
  transform: translateY(-4px);
}

.profile-option.active {
  background: rgba(0, 184, 148, 0.15);
  border-color: #00b894;
  box-shadow: 0 8px 32px rgba(0, 184, 148, 0.3);
}

.option-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px auto;
  color: white;
}

.profile-option h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.profile-option p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.option-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.feature .q-icon {
  color: #00b894;
}

.action-section {
  text-align: center;
}

.continue-btn {
  height: 56px;
  border-radius: 28px;
  padding: 0 48px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(0, 184, 148, 0.3);
  transition: all 0.3s ease;
}

.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 184, 148, 0.4);
}

/* Etapa 2: Onboarding */
.onboarding-section {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.onboarding-header {
  display: flex;
  align-items: center;
  padding: 24px 32px;
  gap: 24px;
}

.back-btn {
  flex-shrink: 0;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00b894 0%, #00a085 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.step-indicator {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
}

.onboarding-carousel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-carousel {
  width: 100%;
  max-width: 800px;
}

.carousel-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.slide-content {
  text-align: center;
  max-width: 600px;
}

.slide-icon {
  margin-bottom: 32px;
}

.slide-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #00b894;
}

.slide-content p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0 0 32px 0;
}

.slide-image {
  margin-top: 32px;
}

.slide-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Slide final */
.final-slide {
  background: radial-gradient(circle at center, rgba(0, 184, 148, 0.1) 0%, transparent 70%);
}

.success-animation {
  margin-bottom: 32px;
}

.success-icon {
  animation: successPulse 2s infinite;
}

@keyframes successPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.final-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
}

.primary-action {
  height: 64px;
  border-radius: 32px;
  padding: 0 48px;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(0, 184, 148, 0.3);
}

.secondary-action {
  font-size: 1rem;
}

/* Controles do carousel */
.carousel-controls {
  text-align: center;
  padding: 24px;
}

/* Responsivo */
@media (max-width: 768px) {
  .intro-title {
    font-size: 2rem;
  }

  .intro-subtitle {
    font-size: 1rem;
  }

  .selection-container {
    padding: 24px;
  }

  .profile-options {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .profile-option {
    padding: 24px;
  }

  .slide-content h2 {
    font-size: 1.8rem;
  }

  .slide-content p {
    font-size: 1rem;
  }

  .onboarding-header {
    padding: 16px 20px;
  }
}
</style>
