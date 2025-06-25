<template>
  <q-page class="jobu-page discover-page">
    <!-- Hero Section -->
    <section class="hero-section jobu-section">
      <div class="jobu-container">
        <div class="hero-content jobu-grid--2-cols jobu-items-center jobu-gap-xl">
          <div class="hero-text" data-aos="fade-up">
            <h1 class="hero-title jobu-text-4xl jobu-font-bold jobu-text-accent jobu-mb-lg">
              Jobu Freelancer
            </h1>
            <p class="hero-subtitle jobu-text-xl jobu-text-primary jobu-mb-md">
              A revolução digital que conecta talentos e oportunidades em todo o Brasil
            </p>
            <p class="hero-description jobu-text-lg jobu-text-secondary">
              Descubra uma nova era de trabalho colaborativo, onde freelancers e clientes se
              encontram em um ecossistema seguro, inovador e repleto de possibilidades.
            </p>
          </div>
          <div class="hero-image" data-aos="zoom-in" data-aos-delay="300">
            <div class="floating-card jobu-card jobu-card--highlight jobu-text-center">
              <q-icon name="handshake" size="4rem" class="jobu-text-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section jobu-section jobu-section--alt">
      <div class="jobu-container">
        <div class="jobu-section-header" data-aos="fade-up">
          <h2 class="jobu-section-title">Por que escolher o Jobu?</h2>
          <p class="jobu-section-subtitle">Tecnologia de ponta para uma experiência única</p>
        </div>

        <div class="features-grid jobu-grid--3-cols jobu-gap-lg">
          <div class="feature-card jobu-card" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-icon jobu-mb-lg">
              <q-icon name="security" size="3rem" class="jobu-text-accent" />
            </div>
            <h3 class="feature-title jobu-text-xl jobu-font-semibold jobu-mb-md">
              Pagamento Seguro
            </h3>
            <p class="feature-description jobu-text-secondary">
              Sistema de pagamento inteligente que protege tanto freelancers quanto clientes. O
              valor só é liberado após a comprovação da entrega do serviço.
            </p>
          </div>

          <div class="feature-card jobu-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-icon jobu-mb-lg">
              <q-icon name="chat" size="3rem" class="jobu-text-accent" />
            </div>
            <h3 class="feature-title jobu-text-xl jobu-font-semibold jobu-mb-md">Chat Integrado</h3>
            <p class="feature-description jobu-text-secondary">
              Comunicação em tempo real com sistema de mensagens avançado, compartilhamento de
              arquivos e histórico completo de conversas.
            </p>
          </div>

          <div class="feature-card jobu-card" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-icon jobu-mb-lg">
              <q-icon name="verified" size="3rem" class="jobu-text-accent" />
            </div>
            <h3 class="feature-title jobu-text-xl jobu-font-semibold jobu-mb-md">
              Perfis Verificados
            </h3>
            <p class="feature-description jobu-text-secondary">
              Todos os profissionais passam por verificação rigorosa de identidade e competências,
              garantindo qualidade e confiabilidade.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section jobu-section">
      <div class="jobu-container">
        <div class="stats-grid jobu-grid--4-cols jobu-gap-lg jobu-text-center">
          <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
            <div class="stat-number jobu-text-3xl jobu-font-bold jobu-text-accent">10K+</div>
            <div class="stat-label jobu-text-lg jobu-text-secondary">Freelancers</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
            <div class="stat-number jobu-text-3xl jobu-font-bold jobu-text-accent">5K+</div>
            <div class="stat-label jobu-text-lg jobu-text-secondary">Projetos</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
            <div class="stat-number jobu-text-3xl jobu-font-bold jobu-text-accent">98%</div>
            <div class="stat-label jobu-text-lg jobu-text-secondary">Satisfação</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="400">
            <div class="stat-number jobu-text-3xl jobu-font-bold jobu-text-accent">24/7</div>
            <div class="stat-label jobu-text-lg jobu-text-secondary">Suporte</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="steps-section jobu-section jobu-section--alt">
      <div class="jobu-container">
        <div class="jobu-section-header" data-aos="fade-up">
          <h2 class="jobu-section-title">Como funciona?</h2>
          <p class="jobu-section-subtitle">Processo simples e eficiente</p>
        </div>

        <div class="steps-container">
          <div class="step-item" data-aos="fade-up" data-aos-delay="100">
            <div class="step-content jobu-flex jobu-items-center jobu-gap-xl">
              <div
                class="step-number jobu-text-6xl jobu-font-bold jobu-text-accent jobu-opacity-30"
              >
                01
              </div>
              <div class="step-info">
                <h3 class="step-title jobu-text-2xl jobu-font-semibold jobu-mb-md">
                  Crie seu Perfil
                </h3>
                <p class="step-description jobu-text-lg jobu-text-secondary">
                  Monte um perfil profissional completo com suas habilidades, experiências e
                  portfólio. Destaque-se no mercado digital.
                </p>
              </div>
            </div>
          </div>

          <div class="step-item" data-aos="fade-up" data-aos-delay="200">
            <div class="step-content jobu-flex jobu-items-center jobu-gap-xl">
              <div
                class="step-number jobu-text-6xl jobu-font-bold jobu-text-accent jobu-opacity-30"
              >
                02
              </div>
              <div class="step-info">
                <h3 class="step-title jobu-text-2xl jobu-font-semibold jobu-mb-md">
                  Encontre Projetos
                </h3>
                <p class="step-description jobu-text-lg jobu-text-secondary">
                  Explore oportunidades que combinam com seu perfil. Use filtros inteligentes para
                  encontrar projetos ideais.
                </p>
              </div>
            </div>
          </div>

          <div class="step-item" data-aos="fade-up" data-aos-delay="300">
            <div class="step-content jobu-flex jobu-items-center jobu-gap-xl">
              <div
                class="step-number jobu-text-6xl jobu-font-bold jobu-text-accent jobu-opacity-30"
              >
                03
              </div>
              <div class="step-info">
                <h3 class="step-title jobu-text-2xl jobu-font-semibold jobu-mb-md">
                  Trabalhe e Ganhe
                </h3>
                <p class="step-description jobu-text-lg jobu-text-secondary">
                  Execute projetos com segurança total. Receba pagamentos garantidos através do
                  nosso sistema de proteção.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section jobu-section jobu-section--highlight">
      <div class="jobu-container">
        <div class="cta-content jobu-text-center">
          <h2 class="cta-title jobu-text-3xl jobu-font-bold jobu-text-primary jobu-mb-md">
            Pronto para começar sua jornada?
          </h2>
          <p class="cta-description jobu-text-xl jobu-text-secondary jobu-mb-xl">
            Junte-se a milhares de profissionais que já transformaram suas carreiras com o Jobu
          </p>
          <div class="cta-buttons jobu-flex jobu-flex-center jobu-gap-lg">
            <q-btn
              label="Começar Agora"
              class="jobu-btn jobu-btn--primary jobu-btn--large"
              @click="$router.push('/profile')"
            />
            <q-btn
              label="Fazer Login"
              class="jobu-btn jobu-btn--outline jobu-btn--large"
              @click="$router.push('/login')"
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'

// Simple AOS-like animation observer
onMounted(() => {
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
.discover-page {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 80%, rgba(0, 184, 148, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(176, 190, 197, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .hero-section {
    padding: var(--jobu-space-3xl) 0;

    .floating-card {
      padding: var(--jobu-space-xl);
      animation: float 6s ease-in-out infinite;
      background: linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(176, 190, 197, 0.1) 100%);
      border: 2px solid rgba(0, 184, 148, 0.3);
      backdrop-filter: blur(10px);
    }
  }

  .features-section {
    padding: var(--jobu-space-3xl) 0;

    .feature-card {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(0, 184, 148, 0.2);
      text-align: center;
      transition: transform 0.3s ease;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 184, 148, 0.1), transparent);
        transition: left 0.5s ease;
      }

      &:hover::before {
        left: 100%;
      }

      &:hover {
        transform: translateY(-8px);
        border-color: rgba(0, 184, 148, 0.4);
        box-shadow: 0 10px 30px rgba(0, 184, 148, 0.2);
      }
    }
  }

  .stats-section {
    padding: var(--jobu-space-2xl) 0;

    .stat-number {
      background: linear-gradient(135deg, var(--jobu-accent) 0%, var(--jobu-secondary) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 4px rgba(0, 184, 148, 0.3));
    }
  }

  .steps-section {
    padding: var(--jobu-space-3xl) 0;

    .steps-container {
      max-width: 800px;
      margin: 0 auto;

      .step-item {
        margin-bottom: var(--jobu-space-xl);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .cta-section {
    padding: var(--jobu-space-3xl) 0;
    background: linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(176, 190, 197, 0.1) 100%);
    border-radius: 30px 30px 0 0;

    .cta-content {
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .quick-nav-section {
    padding: var(--jobu-space-2xl) 0;
  }
}

// Animations
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(1deg);
  }
  50% {
    transform: translateY(-5px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-1deg);
  }
}

// AOS-like animations
[data-aos] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

[data-aos='fade-right'] {
  transform: translateX(-30px);

  &.animate-in {
    transform: translateX(0);
  }
}

[data-aos='fade-left'] {
  transform: translateX(30px);

  &.animate-in {
    transform: translateX(0);
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
  .discover-page {
    .hero-content {
      text-align: center;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .nav-grid {
      grid-template-columns: 1fr;
    }

    .step-content {
      text-align: center;
      flex-direction: column;
    }

    .cta-buttons {
      flex-direction: column;
    }
  }
}
</style>
