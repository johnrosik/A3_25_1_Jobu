<template>
  <q-page class="discover-page">
    <!-- banner principal -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text" data-aos="fade-up">
          <h1 class="hero-title">Jobu Freelancer</h1>
          <p class="hero-subtitle">
            A revolução digital que conecta talentos e oportunidades em todo o Brasil
          </p>
          <p class="hero-description">
            Descubra uma nova era de trabalho colaborativo, onde freelancers e clientes se encontram
            em um ecossistema seguro, inovador e repleto de possibilidades.
          </p>
        </div>
        <div class="hero-image" data-aos="zoom-in" data-aos-delay="300">
          <div class="floating-card">
            <q-icon name="handshake" size="4rem" color="secondary" />
          </div>
        </div>
      </div>
    </section>

    <!-- recursos legais -->
    <section class="features-section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Por que escolher o Jobu?</h2>
        <p class="section-subtitle">Tecnologia de ponta para uma experiência única</p>
      </div>

      <div class="features-grid">
        <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
          <div class="feature-icon">
            <q-icon name="security" size="3rem" color="secondary" />
          </div>
          <h3 class="feature-title">Pagamento Seguro</h3>
          <p class="feature-description">
            Sistema de pagamento inteligente que protege tanto freelancers quanto clientes. O valor
            só é liberado após a comprovação da entrega do serviço.
          </p>
        </div>

        <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
          <div class="feature-icon">
            <q-icon name="chat" size="3rem" color="secondary" />
          </div>
          <h3 class="feature-title">Chat Integrado</h3>
          <p class="feature-description">
            Comunicação em tempo real com sistema de mensagens avançado, compartilhamento de
            arquivos e histórico completo de conversas.
          </p>
        </div>

        <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
          <div class="feature-icon">
            <q-icon name="network_check" size="3rem" color="secondary" />
          </div>
          <h3 class="feature-title">Conexão Nacional</h3>
          <p class="feature-description">
            Alcance todo o território brasileiro. Conecte-se com profissionais e clientes de
            qualquer região do país.
          </p>
        </div>

        <div class="feature-card" data-aos="fade-up" data-aos-delay="400">
          <div class="feature-icon">
            <q-icon name="verified" size="3rem" color="secondary" />
          </div>
          <h3 class="feature-title">Verificação Inteligente</h3>
          <p class="feature-description">
            Sistema avançado de verificação de perfis e avaliações detalhadas para garantir a
            qualidade e confiabilidade dos serviços.
          </p>
        </div>

        <div class="feature-card" data-aos="fade-up" data-aos-delay="500">
          <div class="feature-icon">
            <q-icon name="analytics" size="3rem" color="secondary" />
          </div>
          <h3 class="feature-title">Dashboard Analítico</h3>
          <p class="feature-description">
            Acompanhe seu crescimento com métricas detalhadas, relatórios personalizados e insights
            para alavancar sua carreira.
          </p>
        </div>

        <div class="feature-card" data-aos="fade-up" data-aos-delay="600">
          <div class="feature-icon">
            <q-icon name="support_agent" size="3rem" color="secondary" />
          </div>
          <h3 class="feature-title">Suporte 24/7</h3>
          <p class="feature-description">
            Equipe especializada disponível a qualquer momento para resolver dúvidas e garantir a
            melhor experiência possível.
          </p>
        </div>
      </div>
    </section>

    <!-- numeros importantes -->
    <section class="stats-section">
      <div class="stats-container" data-aos="fade-up">
        <div class="stat-item">
          <div class="stat-number">+300 Trilhôes</div>
          <div class="stat-label">Freelancers Ativos</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">1+ Sistema Solar</div>
          <div class="stat-label">Projetos Concluídos</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">0%</div>
          <div class="stat-label">Satisfação do Cliente</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">200 Anos</div>
          <div class="stat-label">Tempo Médio de Resposta</div>
        </div>
      </div>
    </section>

    <!-- como funciona -->
    <section class="how-it-works-section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Como funciona?</h2>
        <p class="section-subtitle">Simples, rápido e eficiente</p>
      </div>

      <div class="steps-container">
        <div class="step-item" data-aos="fade-right" data-aos-delay="100">
          <div class="step-number">01</div>
          <div class="step-content">
            <h3 class="step-title">Cadastre-se</h3>
            <p class="step-description">
              Crie seu perfil em poucos minutos e comece a explorar oportunidades ou encontrar o
              talento ideal.
            </p>
          </div>
        </div>

        <div class="step-item" data-aos="fade-left" data-aos-delay="200">
          <div class="step-number">02</div>
          <div class="step-content">
            <h3 class="step-title">Conecte-se</h3>
            <p class="step-description">
              Use nosso sistema inteligente de matching para encontrar a combinação perfeita entre
              suas necessidades e habilidades.
            </p>
          </div>
        </div>

        <div class="step-item" data-aos="fade-right" data-aos-delay="300">
          <div class="step-number">03</div>
          <div class="step-content">
            <h3 class="step-title">Trabalhe com Segurança</h3>
            <p class="step-description">
              Execute projetos com total proteção, comunicação fluida e pagamentos garantidos para
              ambas as partes.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- call to action -->
    <section class="cta-section">
      <div class="cta-content" data-aos="zoom-in">
        <h2 class="cta-title">Pronto para transformar sua carreira?</h2>
        <p class="cta-description">
          Junte-se a milhares de profissionais que já descobriram o futuro do trabalho freelancer
        </p>
        <div class="cta-buttons">
          <q-btn class="cta-btn primary" to="/login" label="Começar Agora" size="lg" no-caps />
          <q-btn class="cta-btn secondary" flat label="Saiba Mais" size="lg" no-caps />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
// animacoes da pagina
import { onMounted } from 'vue'

// Simulação do AOS (Animate On Scroll) - você pode instalar a biblioteca real depois
onMounted(() => {
  // animar elementos no scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  })

  document.querySelectorAll('[data-aos]').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

.discover-page {
  min-height: 100vh;
  background: linear-gradient(135deg, $background 0%, lighten($background, 3%) 100%);
  overflow-x: hidden;
}

// banner principal
.hero-section {
  padding: 6rem 2rem 4rem;
  min-height: 70vh;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 80%, rgba(0, 184, 148, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 184, 148, 0.05) 0%, transparent 50%);
  }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  color: $textprimary;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, $textprimary 0%, $secondary 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: $secondary;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.hero-description {
  font-size: 1.1rem;
  color: $textsecondary;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.floating-card {
  background: $primary;
  border-radius: 20px;
  padding: 4rem;
  box-shadow: 0 20px 60px rgba(0, 184, 148, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 6s ease-in-out infinite;
  border: 1px solid rgba(0, 184, 148, 0.2);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

// recursos do app
.features-section {
  padding: 6rem 2rem;
  background: rgba(0, 184, 148, 0.02);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  color: $textprimary;
  margin-bottom: 1rem;
  font-weight: 600;
}

.section-subtitle {
  font-size: 1.2rem;
  color: $textsecondary;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: $primary;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 184, 148, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(0, 184, 148, 0.15);
    border-color: $secondary;
  }
}

.feature-icon {
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.5rem;
  color: $textprimary;
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-description {
  color: $textsecondary;
  line-height: 1.6;
}

// numeros importantes
.stats-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, $secondary 0%, lighten($secondary, 10%) 100%);
}

.stats-container {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

// como funciona
.how-it-works-section {
  padding: 6rem 2rem;
}

.steps-container {
  max-width: 800px;
  margin: 0 auto;
}

.step-item {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  gap: 2rem;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    text-align: center;
  }
}

.step-number {
  font-size: 4rem;
  font-weight: 700;
  color: $secondary;
  opacity: 0.3;
  min-width: 120px;
}

.step-title {
  font-size: 1.8rem;
  color: $textprimary;
  margin-bottom: 1rem;
  font-weight: 600;
}

.step-description {
  color: $textsecondary;
  line-height: 1.6;
  font-size: 1.1rem;
}

// botao de acao
.cta-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, $primary 0%, lighten($primary, 5%) 100%);
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  color: $textprimary;
  margin-bottom: 1rem;
  font-weight: 600;
}

.cta-description {
  font-size: 1.2rem;
  color: $textsecondary;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 12px;
  min-width: 160px;

  &.primary {
    background: $secondary !important;
    color: white !important;
    box-shadow: 0 10px 30px rgba(0, 184, 148, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(0, 184, 148, 0.4);
    }
  }

  &.secondary {
    color: $secondary !important;
    border: 2px solid $secondary;

    &:hover {
      background: $secondary !important;
      color: white !important;
    }
  }
}

// animacoes gerais
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
</style>
