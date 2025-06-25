<template>
  <q-page class="jobu-page login-page">
    <!-- Animated background -->
    <div class="jobu-starfield">
      <div class="jobu-stars--small"></div>
      <div class="jobu-stars--medium"></div>
      <div class="jobu-stars--large"></div>
    </div>

    <!-- Floating particles -->
    <div class="jobu-particles">
      <div v-for="i in 15" :key="i" class="jobu-particle" :style="getParticleStyle()"></div>
    </div>

    <!-- Main content -->
    <div class="jobu-content jobu-flex jobu-flex-center">
      <div class="login-container">
        <!-- Login card -->
        <div class="jobu-card jobu-card--glass login-card">
          <div class="jobu-card-header jobu-text-center">
            <h2 class="card-title">
              {{
                currentMode === 'register'
                  ? 'Registro'
                  : currentMode === 'forgot'
                    ? 'Recuperar Senha'
                    : 'Login'
              }}
            </h2>
          </div>

          <div class="jobu-card-content">
            <!-- Dynamic form -->
            <q-form @submit="onSubmit" @reset="onReset" class="login-form">
              <!-- Login fields -->
              <template v-if="currentMode === 'login'">
                <q-input
                  v-model="email"
                  type="email"
                  label="E-Mail"
                  hint="Email de cadastro"
                  class="jobu-input jobu-mb-md"
                  filled
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Por favor, digite seu e-mail']"
                />

                <q-input
                  v-model="password"
                  type="password"
                  label="Senha"
                  class="jobu-input jobu-mb-lg"
                  filled
                  lazy-rules
                  :rules="[(val) => !!val || 'Por favor, digite sua senha']"
                />
              </template>

              <!-- Forgot password fields -->
              <template v-if="currentMode === 'forgot'">
                <q-input
                  v-model="email"
                  type="email"
                  label="E-mail para Recuperação"
                  hint="Digite seu e-mail para receber uma nova senha"
                  class="jobu-input jobu-mb-md"
                  filled
                  lazy-rules
                  :rules="[
                    (val) => (val && val.includes('@')) || 'Por favor, digite um e-mail válido',
                  ]"
                />

                <div class="jobu-text-sm jobu-text-secondary jobu-mb-lg">
                  Enviaremos instruções para redefinir sua senha no e-mail informado.
                </div>
              </template>

              <!-- Register fields -->
              <template v-if="currentMode === 'register'">
                <q-input
                  v-model="email"
                  type="email"
                  label="Seu E-Mail *"
                  class="jobu-input jobu-mb-md"
                  filled
                  lazy-rules
                  :rules="[
                    (val) => (val && val.includes('@')) || 'Por favor, digite um e-mail válido',
                  ]"
                />

                <q-input
                  v-model="password"
                  type="password"
                  label="Senha"
                  class="jobu-input jobu-mb-md"
                  filled
                  lazy-rules
                  :rules="[(val) => !!val || 'Por favor, digite sua senha']"
                />

                <q-input
                  v-model="name"
                  label="Nome Completo"
                  class="jobu-input jobu-mb-md"
                  filled
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Por favor, digite seu nome']"
                />

                <q-input
                  v-model="age"
                  type="number"
                  label="Idade"
                  class="jobu-input jobu-mb-md"
                  filled
                  lazy-rules
                  :rules="[(val) => (val && val > 0) || 'Por favor, digite sua idade']"
                />

                <q-toggle
                  v-model="acceptTerms"
                  label="Aceito os termos e condições"
                  class="jobu-mb-md"
                  color="teal"
                  :rules="[(val) => val === true || 'Você precisa aceitar os termos']"
                />

                <q-toggle
                  v-model="acceptNews"
                  label="Aceito receber novidades"
                  class="jobu-mb-md"
                  color="teal"
                />

                <div class="jobu-text-sm jobu-text-secondary jobu-mb-lg">
                  Ao se registrar, você concorda com nossos termos e condições.
                </div>
              </template>

              <!-- Submit button -->
              <div class="jobu-text-center jobu-mb-lg">
                <q-btn
                  :label="getSubmitLabel()"
                  type="submit"
                  class="jobu-btn jobu-btn--primary jobu-btn--large"
                />
              </div>
            </q-form>

            <!-- Mode toggle -->
            <div class="jobu-text-center jobu-mb-lg">
              <q-btn
                flat
                :label="getToggleLabel()"
                class="jobu-btn--secondary"
                @click="toggleMode"
              />
            </div>

            <!-- Forgot password link -->
            <div class="jobu-text-center" v-if="currentMode !== 'forgot'">
              <q-btn
                flat
                label="Esqueci minha senha"
                class="jobu-btn--ghost jobu-text-sm"
                @click="toggleForgotMode"
              />
            </div>
          </div>
        </div>

        <!-- Demo section -->
        <div class="jobu-card jobu-card--highlight jobu-mt-lg demo-section">
          <div class="jobu-card-header">
            <h4 class="card-title jobu-text-center">🚀 Demonstração Rápida</h4>
          </div>

          <div class="jobu-card-content">
            <div class="demo-buttons">
              <q-btn
                label="🧑‍💼 Perfil Cliente"
                class="jobu-btn jobu-btn--outline demo-btn"
                @click="goToClientProfile"
              />
              <q-btn
                label="👨‍💻 Perfil Freelancer"
                class="jobu-btn jobu-btn--outline demo-btn"
                @click="goToFreelancerProfile"
              />
              <q-btn
                label="🔍 Descobrir"
                class="jobu-btn jobu-btn--outline demo-btn"
                @click="goToDiscover"
              />
              <q-btn
                label="💳 Pagamento"
                class="jobu-btn jobu-btn--outline demo-btn"
                @click="goToPayment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Form state
const email = ref('')
const password = ref('')
const name = ref('')
const age = ref('')
const acceptTerms = ref(false)
const acceptNews = ref(false)
const currentMode = ref('login') // 'login', 'register', 'forgot'

// Generate particle styles
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

// Mode toggles
const toggleMode = () => {
  currentMode.value = currentMode.value === 'login' ? 'register' : 'login'
  resetForm()
}

const toggleForgotMode = () => {
  currentMode.value = 'forgot'
  resetForm()
}

// Labels
const getToggleLabel = () => {
  return currentMode.value === 'login' ? 'Não tem conta? Registre-se' : 'Já tem conta? Faça login'
}

const getSubmitLabel = () => {
  switch (currentMode.value) {
    case 'register':
      return 'Confirmar'
    case 'forgot':
      return 'Enviar Nova Senha'
    default:
      return 'Login'
  }
}

// Form handlers
const onSubmit = () => {
  if (currentMode.value === 'forgot') {
    $q.notify({
      color: 'teal-4',
      textColor: 'white',
      icon: 'mail',
      message: 'E-mail de recuperação enviado!',
    })
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: currentMode.value === 'register' ? 'Registrado com sucesso!' : 'Login realizado!',
    })

    setTimeout(() => {
      router.push('/index')
    }, 1000)
  }
}

const onReset = () => {
  resetForm()
}

const resetForm = () => {
  email.value = ''
  password.value = ''
  name.value = ''
  age.value = ''
  acceptTerms.value = false
  acceptNews.value = false
}

// Navigation functions
const goToClientProfile = () => router.push('/client-profile')
const goToFreelancerProfile = () => router.push('/freelancer-hub')
const goToDiscover = () => router.push('/descubra')
const goToPayment = () => router.push('/pagamento')
</script>

<style lang="scss" scoped>
.login-page {
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 10;
}

.login-card {
  animation: cardFloat 6s ease-in-out infinite;
}

@keyframes cardFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.login-form {
  .jobu-input {
    margin-bottom: var(--jobu-space-md);
  }
}

.demo-section {
  .demo-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--jobu-space-md);

    .demo-btn {
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 184, 148, 0.3);
      }
    }
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .login-container {
    padding: var(--jobu-space-md);
  }

  .demo-section .demo-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
