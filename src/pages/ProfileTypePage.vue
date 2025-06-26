<template>
  <q-page class="jobu-page profile-type-page">
    <!-- Animated background -->
    <div class="jobu-starfield">
      <div class="jobu-stars--small"></div>
      <div class="jobu-stars--medium"></div>
      <div class="jobu-stars--large"></div>
    </div>

    <!-- Floating particles -->
    <div class="jobu-particles">
      <div v-for="n in 15" :key="n" class="jobu-particle" :style="getParticleStyle(n)"></div>
    </div>

    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content jobu-container">
        <q-btn
          flat
          round
          icon="arrow_back"
          class="jobu-btn--ghost"
          @click="$router.push('/index')"
        />
        <div class="header-title">Escolha seu Perfil</div>
        <div></div>
      </div>
    </div>

    <!-- Content -->
    <div class="jobu-content page-container">
      <div class="selection-container">
        <!-- Title Section -->
        <div class="title-section jobu-text-center jobu-mb-2xl">
          <h1 class="main-title jobu-text-4xl jobu-font-bold jobu-text-accent jobu-mb-lg">
            Como você quer usar o Jobu?
          </h1>
          <p class="subtitle jobu-text-xl jobu-text-secondary">
            Selecione a opção que melhor descreve seu objetivo na plataforma
          </p>
        </div>

        <!-- Profile Options -->
        <div class="profile-options jobu-grid--2-cols jobu-gap-xl jobu-mb-2xl">
          <!-- Freelancer Option -->
          <div
            class="profile-option jobu-card jobu-card--interactive jobu-card--large jobu-text-center"
            @click="selectProfile('freelancer')"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="option-icon jobu-mb-lg">
              <q-icon name="work" size="4rem" class="jobu-text-accent" />
            </div>
            <h3 class="option-title jobu-text-2xl jobu-font-bold jobu-text-primary jobu-mb-md">
              Sou Freelancer
            </h3>
            <p class="option-description jobu-text-lg jobu-text-secondary jobu-mb-lg">
              Quero oferecer meus serviços e encontrar projetos interessantes
            </p>
            <div class="option-features jobu-mb-lg">
              <div class="feature-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-sm">
                <q-icon name="check_circle" size="20px" class="text-positive" />
                <span class="jobu-text-sm">Criar portfólio profissional</span>
              </div>
              <div class="feature-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-sm">
                <q-icon name="check_circle" size="20px" class="text-positive" />
                <span class="jobu-text-sm">Buscar e candidatar-se a projetos</span>
              </div>
              <div class="feature-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-sm">
                <q-icon name="check_circle" size="20px" class="text-positive" />
                <span class="jobu-text-sm">Receber pagamentos seguros</span>
              </div>
              <div class="feature-item jobu-flex jobu-items-center jobu-gap-sm">
                <q-icon name="check_circle" size="20px" class="text-positive" />
                <span class="jobu-text-sm">Avaliar e ser avaliado</span>
              </div>
            </div>
            <q-btn
              label="Começar como Freelancer"
              class="jobu-btn jobu-btn--primary jobu-btn--large"
              @click.stop="selectProfile('freelancer')"
            />
          </div>

          <!-- Client Option -->
          <div
            class="profile-option jobu-card jobu-card--interactive jobu-card--large jobu-text-center"
            @click="selectProfile('client')"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="option-icon jobu-mb-lg">
              <q-icon name="business" size="4rem" class="jobu-text-accent" />
            </div>
            <h3 class="option-title jobu-text-2xl jobu-font-bold jobu-text-primary jobu-mb-md">
              Sou Cliente
            </h3>
            <p class="option-description jobu-text-lg jobu-text-secondary jobu-mb-lg">
              Preciso contratar profissionais talentosos para meus projetos
            </p>
            <div class="option-features jobu-mb-lg">
              <div class="feature-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-sm">
                <q-icon name="check_circle" size="20px" class="text-positive" />
                <span class="jobu-text-sm">Postar projetos facilmente</span>
              </div>
              <div class="feature-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-sm">
                <q-icon name="check_circle" size="20px" class="text-positive" />
                <span class="jobu-text-sm">Encontrar freelancers qualificados</span>
              </div>
              <div class="feature-item jobu-flex jobu-items-center jobu-gap-sm jobu-mb-sm">
                <q-icon name="check_circle" size="20px" class="text-positive" />
                <span class="jobu-text-sm">Gerenciar projetos em tempo real</span>
              </div>
              <div class="feature-item jobu-flex jobu-items-center jobu-gap-sm">
                <q-icon name="check_circle" size="20px" class="text-positive" />
                <span class="jobu-text-sm">Pagamento seguro e protegido</span>
              </div>
            </div>
            <q-btn
              label="Começar como Cliente"
              class="jobu-btn jobu-btn--secondary jobu-btn--large"
              @click.stop="selectProfile('client')"
            />
          </div>
        </div>

        <!-- Alternative Actions -->
        <div class="alternative-actions jobu-text-center">
          <p class="jobu-text-secondary jobu-mb-md">
            Ainda não tem certeza? Explore a plataforma primeiro
          </p>
          <div class="action-buttons jobu-flex jobu-flex-center jobu-gap-md">
            <q-btn
              label="Explorar Plataforma"
              class="jobu-btn jobu-btn--outline"
              @click="$router.push('/descubra')"
            />
            <q-btn
              label="Fazer Registro"
              class="jobu-btn jobu-btn--ghost"
              @click="$router.push('/login')"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

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

const selectProfile = (type) => {
  // Navigate to the unified profile with the selected type
  router.push(`/profile/${type}`)
}
</script>

<style lang="scss" scoped>
.profile-type-page {
  .selection-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--jobu-space-2xl) var(--jobu-space-lg);
  }

  .title-section {
    .main-title {
      background: linear-gradient(135deg, var(--jobu-text-accent), var(--jobu-text-primary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .profile-options {
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--jobu-space-lg);
    }
  }

  .profile-option {
    padding: var(--jobu-space-2xl);
    transition: all var(--jobu-transition-normal);
    cursor: pointer;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-8px);
      border-color: var(--jobu-border-glass);
      box-shadow: var(--jobu-shadow-large);

      .option-icon .q-icon {
        transform: scale(1.1);
        filter: drop-shadow(0 0 10px rgba(0, 184, 148, 0.5));
      }
    }

    .option-icon {
      .q-icon {
        transition: all var(--jobu-transition-normal);
      }
    }

    .option-features {
      text-align: left;
      max-width: 280px;
      margin: 0 auto var(--jobu-space-lg);

      .feature-item {
        justify-content: flex-start;
      }
    }

    .jobu-btn {
      width: 100%;
      min-height: 48px;
    }
  }

  .alternative-actions {
    .action-buttons {
      @media (max-width: 480px) {
        flex-direction: column;
        width: 100%;

        .jobu-btn {
          width: 100%;
        }
      }
    }
  }
}

// Animations for AOS (if not loaded, they'll be ignored)
[data-aos='fade-up'] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &.aos-animate {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
