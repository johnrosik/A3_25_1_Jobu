<template>
  <!-- tela de login -->
  <div class="login-page">
    <!-- fundo estelar -->
    <div class="stars-background">
      <div class="stars stars-small"></div>
      <div class="stars stars-medium"></div>
      <div class="stars stars-large"></div>
    </div>

    <!-- estrelas flutuantes -->
    <div class="floating-particles">
      <div v-for="i in 15" :key="i" class="particle" :style="getParticleStyle()"></div>
    </div>

    <!-- conteudo principal -->
    <div class="flex flex-center q-pa-md login-content">
      <div style="width: 100%; max-width: 400px">
        <!-- card principal -->
        <q-card class="elevated-card q-pa-md login-card">
          <q-card-section>
            <!-- titulo dinamico -->
            <div class="text-h6 text-center" color="primary">
              {{
                currentMode === 'register'
                  ? 'Registro'
                  : currentMode === 'forgot'
                    ? 'Recuperar Senha'
                    : 'Login'
              }}
            </div>
          </q-card-section>

          <q-card-section>
            <!-- formulario dinamico -->
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <!-- campos de login -->
              <q-input
                filled
                v-model="email"
                label="E-Mail"
                hint="Email de Cadastro"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Por favor, digite seu e-mail']"
                v-if="currentMode === 'login'"
              />

              <q-input
                filled
                type="password"
                v-model="password"
                label="Senha"
                lazy-rules
                :rules="[(val) => !!val || 'Por favor, digite sua senha']"
                v-if="currentMode === 'login'"
              />

              <!-- recuperacao de senha -->
              <q-input
                filled
                type="email"
                v-model="email"
                label="E-mail para Recuperação"
                hint="Digite seu e-mail para receber uma nova senha"
                lazy-rules
                :rules="[
                  (val) => (val && val.includes('@')) || 'Por favor, digite um e-mail válido',
                ]"
                v-if="currentMode === 'forgot'"
              />

              <div v-if="currentMode === 'forgot'" class="text-caption text-grey">
                Enviaremos instruções para redefinir sua senha no e-mail informado.
              </div>

              <!-- campos de registro -->
              <q-input
                v-if="currentMode === 'register'"
                filled
                type="email"
                v-model="email"
                label="Seu E-Mail *"
                lazy-rules
                :rules="[
                  (val) => (val && val.includes('@')) || 'Por favor, digite um e-mail válido',
                ]"
              />
              <q-input
                v-if="currentMode === 'register'"
                filled
                type="password"
                v-model="password"
                label="Senha"
                lazy-rules
                :rules="[(val) => !!val || 'Por favor, digite sua senha']"
              />
              <q-input
                v-if="currentMode === 'register'"
                filled
                v-model="name"
                label="Nome Completo"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Por favor, digite seu nome']"
              />
              <q-input
                v-if="currentMode === 'register'"
                filled
                type="number"
                v-model="age"
                label="Idade"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'Por favor, digite sua idade']"
              />
              <q-toggle
                class="toggle-button"
                v-if="currentMode === 'register'"
                v-model="acceptTerms"
                label="Aceito os termos e condições"
                :rules="[(val) => val === true || 'Você precisa aceitar os termos']"
              />
              <q-toggle
                class="toggle-button"
                v-if="currentMode === 'register'"
                v-model="acceptNews"
                label="Aceito receber novidades"
              />

              <div v-if="currentMode === 'register'" class="text-caption text-grey">
                Ao se registrar, você concorda com nossos termos e condições.
              </div>

              <div class="row justify-center q-gutter-sm">
                <q-btn
                  :label="
                    currentMode === 'register'
                      ? 'Confirmar'
                      : currentMode === 'forgot'
                        ? 'Enviar Nova Senha'
                        : 'Login'
                  "
                  type="submit"
                  color="primary"
                />
              </div>
            </q-form>

            <div class="text-center q-mt-md">
              <q-btn
                flat
                color="primary"
                :label="getToggleLabel()"
                @click="toggleMode"
                class="q-mb-sm"
              />
              <br />
              <q-btn
                flat
                color="secondary"
                :label="currentMode === 'forgot' ? 'Voltar ao Login' : 'Esqueceu a senha?'"
                @click="toggleForgotMode"
                size="sm"
              />
            </div>

            <!-- Botões de demonstração -->
            <div class="demo-section q-mt-lg">
              <div class="text-center q-mb-md">
                <div class="text-subtitle2" style="color: #00b894">🎯 Demonstração do Projeto</div>
                <div class="text-caption text-grey">
                  Acesse diretamente os perfis para apresentação
                </div>
              </div>

              <div class="row q-gutter-sm">
                <q-btn
                  class="col demo-btn"
                  outline
                  color="teal"
                  label="👨‍💼 Perfil Cliente"
                  icon="person"
                  @click="goToClientProfile"
                  size="sm"
                />
                <q-btn
                  class="col demo-btn"
                  outline
                  color="teal"
                  label="💼 Perfil Freelancer"
                  icon="work"
                  @click="goToFreelancerProfile"
                  size="sm"
                />
              </div>

              <div class="row q-gutter-sm q-mt-sm">
                <q-btn
                  class="col demo-btn"
                  outline
                  color="secondary"
                  label="🔍 Descubra"
                  icon="explore"
                  @click="goToDiscover"
                  size="sm"
                />
                <q-btn
                  class="col demo-btn"
                  outline
                  color="secondary"
                  label="💳 Pagamento"
                  icon="payment"
                  @click="goToPayment"
                  size="sm"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// funcoes de login
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()

    const email = ref(null)
    const password = ref(null)
    const name = ref(null)
    const age = ref(null)
    const acceptTerms = ref(false)
    const acceptNews = ref(false)
    const currentMode = ref('login') // 'login', 'register', 'forgot'

    // funcao pras particulas
    const getParticleStyle = () => {
      const randomX = Math.random() * 100
      const randomY = Math.random() * 100
      const randomDelay = Math.random() * 10
      const randomDuration = 15 + Math.random() * 20

      return {
        left: `${randomX}%`,
        top: `${randomY}%`,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
      }
    }

    function onReset() {
      email.value = null
      password.value = null
      name.value = null
      age.value = null
      acceptTerms.value = false
      acceptNews.value = false
    }

    function toggleMode() {
      if (currentMode.value === 'forgot') {
        currentMode.value = 'login'
      } else {
        currentMode.value = currentMode.value === 'login' ? 'register' : 'login'
      }
      onReset()
    }

    function toggleForgotMode() {
      currentMode.value = currentMode.value === 'forgot' ? 'login' : 'forgot'
      onReset()
    }

    function getToggleLabel() {
      if (currentMode.value === 'forgot') {
        return 'Voltar ao Login'
      }
      return currentMode.value === 'login'
        ? 'Não tem uma conta? Registre-se'
        : 'Já tem uma conta? Faça Login'
    }

    function onSubmit() {
      if (currentMode.value === 'register' && acceptTerms.value !== true) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Você precisa aceitar os termos e condições',
        })
      } else if (currentMode.value === 'forgot') {
        $q.notify({
          color: 'blue-4',
          textColor: 'white',
          icon: 'mail',
          message: 'E-mail de recuperação enviado!',
        })
      } else {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message:
            currentMode.value === 'register' ? 'Registrado com sucesso!' : 'Login realizado!',
        })

        // Redirecionar após login/registro bem-sucedido
        setTimeout(() => {
          router.push('/index')
        }, 1000) // Aguarda 1 segundo para mostrar a notificação
      }
    }

    // Funções de navegação para demonstração
    const goToClientProfile = () => {
      router.push('/client-profile')
    }

    const goToFreelancerProfile = () => {
      router.push('/freelancer-hub')
    }

    const goToDiscover = () => {
      router.push('/descubra')
    }

    const goToPayment = () => {
      router.push('/pagamento')
    }

    return {
      email,
      password,
      name,
      age,
      acceptTerms,
      acceptNews,
      currentMode,
      toggleMode,
      toggleForgotMode,
      getToggleLabel,
      onSubmit,
      onReset,
      getParticleStyle,
      goToClientProfile,
      goToFreelancerProfile,
      goToDiscover,
      goToPayment,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

// tela de login
.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at center, $background 0%, darken($background, 8%) 100%);
}

// fundo com estrelas
.stars-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
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
  animation: moveStars 25s linear infinite;
}

.stars-medium {
  background-image:
    radial-gradient(2px 2px at 30px 50px, $secondary, transparent),
    radial-gradient(2px 2px at 80px 90px, rgba(255, 255, 255, 0.7), transparent),
    radial-gradient(1px 1px at 110px 20px, $secondary, transparent);
  background-repeat: repeat;
  background-size: 300px 150px;
  animation: moveStars 40s linear infinite;
}

.stars-large {
  background-image:
    radial-gradient(3px 3px at 50px 60px, $secondary, transparent),
    radial-gradient(2px 2px at 120px 30px, rgba(255, 255, 255, 0.9), transparent);
  background-repeat: repeat;
  background-size: 400px 200px;
  animation: moveStars 60s linear infinite;
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
  z-index: 2;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: $secondary;
  border-radius: 50%;
  opacity: 0.6;
  animation: floatParticle 20s linear infinite;
}

@keyframes floatParticle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

// conteudo do login
.login-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}

// card de login
.login-card {
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 184, 148, 0.2);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(0, 184, 148, 0.1);
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

// Seção de demonstração
.demo-section {
  background: rgba(0, 184, 148, 0.05);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(0, 184, 148, 0.2);
}

.demo-btn {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 184, 148, 0.3);
}

// responsivo mobile
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

  .particle {
    width: 2px;
    height: 2px;
  }
}
</style>
