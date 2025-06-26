<template>
  <q-page class="jobu-page unified-profile-page">
    <!-- Animated background -->
    <div class="jobu-starfield">
      <div class="jobu-stars--small"></div>
      <div class="jobu-stars--medium"></div>
      <div class="jobu-stars--large"></div>
    </div>

    <!-- Floating particles -->
    <div class="jobu-particles">
      <div v-for="n in 20" :key="n" class="jobu-particle" :style="getParticleStyle(n)"></div>
    </div>

    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content jobu-container">
        <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="$router.back()" />
        <div class="header-title">{{ headerTitle }}</div>
        <q-btn
          flat
          round
          :icon="userType === 'freelancer' ? 'notifications' : 'more_vert'"
          class="jobu-btn--ghost"
          :badge="
            userType === 'freelancer' && notificationCount > 0 ? notificationCount : undefined
          "
          badge-color="red"
        >
          <q-menu v-if="userType === 'client'">
            <q-list dense>
              <q-item clickable @click="shareProfile">
                <q-item-section>Compartilhar Perfil</q-item-section>
              </q-item>
              <q-item clickable @click="exportData">
                <q-item-section>Exportar Dados</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>

    <!-- Content -->
    <div class="jobu-content page-container">
      <!-- Profile Card -->
      <div class="profile-card-wrapper">
        <div class="profile-card jobu-card jobu-card--highlight jobu-mb-xl">
          <div class="profile-content">
            <div class="profile-header">
              <div class="avatar-section">
                <div class="avatar-container">
                  <q-avatar size="120px" class="profile-avatar">
                    <img :src="userProfile.avatar" alt="Profile" />
                  </q-avatar>
                  <div class="avatar-status" :class="statusClass"></div>
                </div>
              </div>

              <div class="profile-info-section">
                <div class="profile-basic-info jobu-mb-lg">
                  <h3
                    class="profile-name jobu-text-2xl jobu-font-bold jobu-text-primary jobu-mb-xs"
                  >
                    {{ userProfile.nome }}
                  </h3>
                  <p class="profile-type jobu-text-lg jobu-text-secondary jobu-mb-sm">
                    {{ userTypeLabel }}
                  </p>
                  <p
                    v-if="userProfile.categoria"
                    class="profile-category jobu-text-md jobu-text-secondary jobu-mb-md"
                  >
                    {{ userProfile.categoria }}
                  </p>

                  <!-- Rating section (only for freelancers) -->
                  <div
                    v-if="userType === 'freelancer'"
                    class="rating-section jobu-flex jobu-items-center jobu-gap-xs jobu-mb-md"
                  >
                    <q-icon name="star" color="amber" size="20px" />
                    <span class="jobu-text-semibold">{{ userProfile.rating }}</span>
                    <span class="jobu-text-sm jobu-text-secondary">
                      ({{ userProfile.avaliacoes }} avaliações)
                    </span>
                  </div>
                </div>

                <div class="profile-stats">
                  <div class="stats-grid">
                    <div class="stat-item">
                      <q-icon
                        :name="userType === 'freelancer' ? 'work' : 'person'"
                        size="20px"
                        class="stat-icon"
                      />
                      <span class="stat-text">{{ userTypeLabel }}</span>
                    </div>
                    <div class="stat-item">
                      <q-icon name="assignment" size="20px" class="stat-icon" />
                      <span class="stat-text"
                        >{{ userProfile.projetos }}
                        {{ userType === 'freelancer' ? 'Projetos' : 'Projetos' }}</span
                      >
                    </div>
                    <div v-if="userType === 'freelancer'" class="stat-item">
                      <q-icon name="monetization_on" size="20px" class="stat-icon" />
                      <span class="stat-text">R$ {{ userProfile.ganhos || '0' }}</span>
                    </div>
                    <div class="stat-item stat-verified">
                      <q-icon name="verified" size="20px" class="stat-icon" />
                      <span class="stat-text">Verificado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="tabs-container jobu-mb-lg">
        <q-tabs
          v-model="activeTab"
          class="jobu-tabs"
          active-color="secondary"
          indicator-color="secondary"
          align="justify"
        >
          <q-tab name="dashboard" icon="dashboard" label="Dashboard" />
          <q-tab name="perfil" icon="person" label="Perfil" />
          <q-tab
            v-if="userType === 'freelancer'"
            name="portfolio"
            icon="collections"
            label="Portfólio"
          />
          <q-tab
            v-if="userType === 'client'"
            name="projetos"
            icon="assignment"
            label="Meus Projetos"
          />
          <q-tab name="configuracoes" icon="settings" label="Configurações" />
        </q-tabs>
      </div>

      <!-- Tab Content -->
      <div class="content-container">
        <q-tab-panels
          v-model="activeTab"
          animated
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <!-- Dashboard Tab -->
          <q-tab-panel name="dashboard" class="jobu-p-0">
            <div class="tab-content">
              <!-- Quick Actions -->
              <div class="quick-actions jobu-mb-lg">
                <h4 class="section-title jobu-text-lg jobu-font-semibold jobu-mb-md">
                  Ações Rápidas
                </h4>
                <div class="action-grid jobu-grid--auto-fit jobu-gap-md" style="--min-width: 280px">
                  <!-- Freelancer Actions -->
                  <template v-if="userType === 'freelancer'">
                    <div
                      class="action-item jobu-card jobu-card--interactive"
                      @click="createProposal"
                    >
                      <div class="jobu-flex jobu-items-center jobu-gap-md">
                        <div class="action-icon">
                          <q-icon name="add_circle" size="24px" class="text-secondary" />
                        </div>
                        <div class="action-content">
                          <div class="action-title jobu-font-semibold">Nova Proposta</div>
                          <div class="action-subtitle jobu-text-sm jobu-text-secondary">
                            Enviar proposta para projeto
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="action-item jobu-card jobu-card--interactive" @click="browseJobs">
                      <div class="jobu-flex jobu-items-center jobu-gap-md">
                        <div class="action-icon">
                          <q-icon name="search" size="24px" class="text-secondary" />
                        </div>
                        <div class="action-content">
                          <div class="action-title jobu-font-semibold">Buscar Trabalhos</div>
                          <div class="action-subtitle jobu-text-sm jobu-text-secondary">
                            Encontrar novos projetos
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="action-item jobu-card jobu-card--interactive"
                      @click="updatePortfolio"
                    >
                      <div class="jobu-flex jobu-items-center jobu-gap-md">
                        <div class="action-icon">
                          <q-icon name="collections" size="24px" class="text-secondary" />
                        </div>
                        <div class="action-content">
                          <div class="action-title jobu-font-semibold">Atualizar Portfólio</div>
                          <div class="action-subtitle jobu-text-sm jobu-text-secondary">
                            Adicionar novos trabalhos
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- Client Actions -->
                  <template v-else>
                    <div
                      class="action-item jobu-card jobu-card--interactive"
                      @click="createProject"
                    >
                      <div class="jobu-flex jobu-items-center jobu-gap-md">
                        <div class="action-icon">
                          <q-icon name="add_circle" size="24px" class="text-secondary" />
                        </div>
                        <div class="action-content">
                          <div class="action-title jobu-font-semibold">Novo Projeto</div>
                          <div class="action-subtitle jobu-text-sm jobu-text-secondary">
                            Criar novo projeto
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="action-item jobu-card jobu-card--interactive"
                      @click="findFreelancers"
                    >
                      <div class="jobu-flex jobu-items-center jobu-gap-md">
                        <div class="action-icon">
                          <q-icon name="people" size="24px" class="text-secondary" />
                        </div>
                        <div class="action-content">
                          <div class="action-title jobu-font-semibold">Encontrar Freelancers</div>
                          <div class="action-subtitle jobu-text-sm jobu-text-secondary">
                            Buscar profissionais
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="action-item jobu-card jobu-card--interactive"
                      @click="managePayments"
                    >
                      <div class="jobu-flex jobu-items-center jobu-gap-md">
                        <div class="action-icon">
                          <q-icon name="credit_card" size="24px" class="text-secondary" />
                        </div>
                        <div class="action-content">
                          <div class="action-title jobu-font-semibold">Métodos de Pagamento</div>
                          <div class="action-subtitle jobu-text-sm jobu-text-secondary">
                            Gerenciar pagamentos
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="recent-activity">
                <h4 class="section-title jobu-text-lg jobu-font-semibold jobu-mb-md">
                  Atividade Recente
                </h4>
                <div class="activity-list">
                  <div
                    v-for="activity in recentActivities"
                    :key="activity.id"
                    class="activity-item jobu-card jobu-mb-sm"
                  >
                    <div class="jobu-flex jobu-items-center jobu-gap-md">
                      <q-icon :name="activity.icon" size="24px" class="text-secondary" />
                      <div class="activity-content jobu-flex-1">
                        <div class="activity-title jobu-font-semibold">{{ activity.title }}</div>
                        <div class="activity-time jobu-text-sm jobu-text-secondary">
                          {{ activity.time }}
                        </div>
                      </div>
                      <q-btn flat round icon="arrow_forward" size="sm" class="jobu-btn--ghost" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Profile Tab -->
          <q-tab-panel name="perfil" class="jobu-p-0">
            <div class="tab-content">
              <div class="form-container">
                <h4 class="section-title jobu-text-lg jobu-font-semibold jobu-mb-lg">
                  Informações Pessoais
                </h4>
                <div class="form-grid jobu-grid--2-cols jobu-gap-lg">
                  <q-input
                    v-model="userProfile.nome"
                    label="Nome Completo"
                    outlined
                    class="jobu-input"
                  />
                  <q-input v-model="userProfile.email" label="Email" outlined class="jobu-input" />
                  <q-input
                    v-model="userProfile.telefone"
                    label="Telefone"
                    outlined
                    class="jobu-input"
                  />
                  <q-input
                    v-if="userType === 'freelancer'"
                    v-model="userProfile.categoria"
                    label="Categoria"
                    outlined
                    class="jobu-input"
                  />
                </div>
                <q-input
                  v-model="userProfile.bio"
                  label="Biografia"
                  outlined
                  type="textarea"
                  rows="4"
                  class="jobu-input jobu-mt-lg"
                />

                <div class="form-actions jobu-flex jobu-gap-md jobu-mt-lg">
                  <q-btn
                    class="jobu-btn jobu-btn--primary"
                    label="Salvar Alterações"
                    @click="saveProfile"
                  />
                  <q-btn class="jobu-btn jobu-btn--ghost" label="Cancelar" @click="resetForm" />
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Portfolio Tab (Freelancer only) -->
          <q-tab-panel v-if="userType === 'freelancer'" name="portfolio" class="jobu-p-0">
            <div class="tab-content">
              <div class="portfolio-section">
                <div class="jobu-flex jobu-justify-between jobu-items-center jobu-mb-lg">
                  <h4 class="section-title jobu-text-lg jobu-font-semibold">Meu Portfólio</h4>
                  <q-btn
                    class="jobu-btn jobu-btn--primary"
                    icon="add"
                    label="Adicionar Trabalho"
                    @click="addPortfolioItem"
                  />
                </div>

                <div
                  class="portfolio-grid jobu-grid--auto-fit jobu-gap-lg"
                  style="--min-width: 300px"
                >
                  <div
                    v-for="item in portfolioItems"
                    :key="item.id"
                    class="portfolio-item jobu-card jobu-card--interactive"
                  >
                    <div class="portfolio-image jobu-mb-md">
                      <img :src="item.image" :alt="item.title" class="portfolio-img" />
                    </div>
                    <div class="portfolio-info">
                      <h5 class="portfolio-title jobu-font-semibold jobu-mb-xs">
                        {{ item.title }}
                      </h5>
                      <p class="portfolio-description jobu-text-sm jobu-text-secondary jobu-mb-md">
                        {{ item.description }}
                      </p>
                      <div class="portfolio-tags jobu-flex jobu-gap-xs jobu-flex-wrap">
                        <q-chip v-for="tag in item.tags" :key="tag" size="sm" class="jobu-chip">{{
                          tag
                        }}</q-chip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Projects Tab (Client only) -->
          <q-tab-panel v-if="userType === 'client'" name="projetos" class="jobu-p-0">
            <div class="tab-content">
              <div class="projects-section">
                <div class="jobu-flex jobu-justify-between jobu-items-center jobu-mb-lg">
                  <h4 class="section-title jobu-text-lg jobu-font-semibold">Meus Projetos</h4>
                  <q-btn
                    class="jobu-btn jobu-btn--primary"
                    icon="add"
                    label="Novo Projeto"
                    @click="createProject"
                  />
                </div>

                <div class="projects-list">
                  <div
                    v-for="project in userProjects"
                    :key="project.id"
                    class="project-item jobu-card jobu-mb-md"
                  >
                    <div class="jobu-flex jobu-justify-between jobu-items-center">
                      <div class="project-info jobu-flex-1">
                        <h5 class="project-title jobu-font-semibold jobu-mb-xs">
                          {{ project.title }}
                        </h5>
                        <p class="project-description jobu-text-sm jobu-text-secondary jobu-mb-md">
                          {{ project.description }}
                        </p>
                        <div class="project-meta jobu-flex jobu-gap-md jobu-text-sm">
                          <span class="jobu-text-secondary"
                            >Criado em: {{ project.createdAt }}</span
                          >
                          <q-badge
                            :color="getStatusColor(project.status)"
                            :label="project.status"
                          />
                        </div>
                      </div>
                      <div class="project-actions jobu-flex jobu-gap-sm">
                        <q-btn
                          flat
                          round
                          icon="edit"
                          size="sm"
                          class="jobu-btn--ghost"
                          @click="editProject(project)"
                        />
                        <q-btn
                          flat
                          round
                          icon="visibility"
                          size="sm"
                          class="jobu-btn--ghost"
                          @click="viewProject(project)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Settings Tab -->
          <q-tab-panel name="configuracoes" class="jobu-p-0">
            <div class="tab-content">
              <div class="settings-sections">
                <div class="settings-section jobu-mb-xl">
                  <h4 class="section-title jobu-text-lg jobu-font-semibold jobu-mb-md">
                    Preferências
                  </h4>
                  <div class="settings-list">
                    <div class="setting-item jobu-flex jobu-justify-between jobu-items-center">
                      <div>
                        <div class="setting-title jobu-font-semibold">Notificações por Email</div>
                        <div class="setting-description jobu-text-sm jobu-text-secondary">
                          Receber emails sobre novos projetos
                        </div>
                      </div>
                      <q-toggle v-model="settings.emailNotifications" color="secondary" />
                    </div>

                    <div class="setting-item jobu-flex jobu-justify-between jobu-items-center">
                      <div>
                        <div class="setting-title jobu-font-semibold">Perfil Público</div>
                        <div class="setting-description jobu-text-sm jobu-text-secondary">
                          Permitir que outros vejam seu perfil
                        </div>
                      </div>
                      <q-toggle v-model="settings.publicProfile" color="secondary" />
                    </div>
                  </div>
                </div>

                <div class="settings-section">
                  <h4 class="section-title jobu-text-lg jobu-font-semibold jobu-mb-md">Conta</h4>
                  <div class="danger-zone jobu-card" style="border-color: var(--q-negative)">
                    <h5 class="jobu-text-lg jobu-font-semibold jobu-mb-md text-negative">
                      Zona de Perigo
                    </h5>
                    <div class="danger-actions jobu-flex jobu-gap-md">
                      <q-btn
                        class="jobu-btn"
                        color="negative"
                        outline
                        label="Excluir Conta"
                        @click="deleteAccount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <!-- Action Cards Section -->
      <div class="action-cards-section jobu-mt-2xl">
        <div class="section-header jobu-text-center jobu-mb-xl">
          <h3 class="jobu-text-2xl jobu-font-bold jobu-text-primary jobu-mb-md">Próximas Ações</h3>
          <p class="jobu-text-lg jobu-text-secondary">
            Continue explorando a plataforma ou faça seu registro completo
          </p>
        </div>

        <div class="action-cards jobu-grid--auto-fit jobu-gap-lg" style="--min-width: 320px">
          <!-- Change Profile Type Card -->
          <div class="action-card jobu-card jobu-card--interactive jobu-text-center">
            <div class="card-icon jobu-mb-lg">
              <q-icon name="swap_horiz" size="3rem" class="jobu-text-accent" />
            </div>
            <h4 class="card-title jobu-text-xl jobu-font-semibold jobu-mb-md">
              Alterar Tipo de Perfil
            </h4>
            <p class="card-description jobu-text-secondary jobu-mb-lg">
              Voltar à seleção inicial para escolher entre Freelancer ou Cliente
            </p>
            <q-btn
              label="Voltar à Seleção"
              class="jobu-btn jobu-btn--outline jobu-btn--large"
              @click="goToProfileSelection"
            />
          </div>

          <!-- Complete Registration Card -->
          <div class="action-card jobu-card jobu-card--interactive jobu-text-center">
            <div class="card-icon jobu-mb-lg">
              <q-icon name="person_add" size="3rem" class="jobu-text-accent" />
            </div>
            <h4 class="card-title jobu-text-xl jobu-font-semibold jobu-mb-md">
              Completar Cadastro
            </h4>
            <p class="card-description jobu-text-secondary jobu-mb-lg">
              Finalize seu registro para aproveitar todos os recursos da plataforma
            </p>
            <q-btn
              label="Fazer Registro"
              class="jobu-btn jobu-btn--primary jobu-btn--large"
              @click="goToRegistration"
            />
          </div>

          <!-- Explore Platform Card -->
          <div class="action-card jobu-card jobu-card--interactive jobu-text-center">
            <div class="card-icon jobu-mb-lg">
              <q-icon name="explore" size="3rem" class="jobu-text-accent" />
            </div>
            <h4 class="card-title jobu-text-xl jobu-font-semibold jobu-mb-md">
              Explorar Plataforma
            </h4>
            <p class="card-description jobu-text-secondary jobu-mb-lg">
              Descubra mais sobre como o Jobu funciona e suas funcionalidades
            </p>
            <q-btn
              label="Explorar Agora"
              class="jobu-btn jobu-btn--secondary jobu-btn--large"
              @click="goToDiscover"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// State
const activeTab = ref('dashboard')
const notificationCount = ref(3)

// User type determination (can be passed via route params or stored in user session)
const userType = ref(route.params.type || 'client') // 'freelancer' or 'client'

// Computed properties
const headerTitle = computed(() => {
  return userType.value === 'freelancer' ? 'Freelancer Hub' : 'Meu Perfil'
})

const userTypeLabel = computed(() => {
  return userType.value === 'freelancer' ? 'Freelancer' : 'Cliente'
})

const statusClass = computed(() => {
  return userType.value === 'freelancer' ? 'jobu-status--online' : 'jobu-badge jobu-badge--success'
})

// Mock data
const userProfile = ref({
  nome: userType.value === 'freelancer' ? 'Ana Silva' : 'João Santos',
  email: userType.value === 'freelancer' ? 'ana@email.com' : 'joao@email.com',
  telefone: '(11) 99999-9999',
  categoria: userType.value === 'freelancer' ? 'Designer Gráfico' : null,
  bio:
    userType.value === 'freelancer'
      ? 'Designer experiente em identidade visual e UI/UX com mais de 5 anos de mercado.'
      : 'Empreendedor buscando profissionais talentosos para projetos inovadores.',
  avatar: 'https://i.pravatar.cc/300?img=' + (userType.value === 'freelancer' ? '44' : '33'),
  projetos: userType.value === 'freelancer' ? 28 : 5,
  rating: userType.value === 'freelancer' ? 4.9 : null,
  avaliacoes: userType.value === 'freelancer' ? 47 : null,
  ganhos: userType.value === 'freelancer' ? '25000' : null,
  id: userType.value === 'freelancer' ? 'FL001' : 'CL001',
})

const settings = ref({
  emailNotifications: true,
  publicProfile: true,
})

const recentActivities = ref([
  {
    id: 1,
    title: userType.value === 'freelancer' ? 'Nova proposta enviada' : 'Projeto criado com sucesso',
    time: 'Há 2 horas',
    icon: userType.value === 'freelancer' ? 'send' : 'add_circle',
  },
  {
    id: 2,
    title: userType.value === 'freelancer' ? 'Projeto concluído' : 'Proposta recebida',
    time: 'Ontem',
    icon: userType.value === 'freelancer' ? 'check_circle' : 'inbox',
  },
  {
    id: 3,
    title: 'Perfil atualizado',
    time: 'Há 3 dias',
    icon: 'person',
  },
])

const portfolioItems = ref(
  userType.value === 'freelancer'
    ? [
        {
          id: 1,
          title: 'Logo Empresa Tech',
          description: 'Identidade visual completa para startup de tecnologia',
          image: 'https://picsum.photos/300/200?random=1',
          tags: ['Logo', 'Branding', 'Tech'],
        },
        {
          id: 2,
          title: 'App Design',
          description: 'Interface de aplicativo mobile para delivery',
          image: 'https://picsum.photos/300/200?random=2',
          tags: ['UI/UX', 'Mobile', 'App'],
        },
      ]
    : [],
)

const userProjects = ref(
  userType.value === 'client'
    ? [
        {
          id: 1,
          title: 'Desenvolvimento de Website',
          description: 'Site institucional para minha empresa',
          status: 'Em Andamento',
          createdAt: '15/06/2025',
        },
        {
          id: 2,
          title: 'Design de Logo',
          description: 'Criação de identidade visual',
          status: 'Concluído',
          createdAt: '10/06/2025',
        },
      ]
    : [],
)

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

const saveProfile = () => {
  // Save profile logic
  console.log('Salvando perfil...')
}

const resetForm = () => {
  // Reset form logic
  console.log('Resetando formulário...')
}

const shareProfile = () => {
  console.log('Compartilhando perfil...')
}

const exportData = () => {
  console.log('Exportando dados...')
}

const createProject = () => {
  router.push('/create-project')
}

const createProposal = () => {
  console.log('Criando nova proposta...')
}

const browseJobs = () => {
  router.push('/descubra')
}

const updatePortfolio = () => {
  console.log('Atualizando portfólio...')
}

const findFreelancers = () => {
  router.push('/descubra')
}

const managePayments = () => {
  console.log('Gerenciando pagamentos...')
}

// New action methods
const goToProfileSelection = () => {
  router.push('/profile')
}

const goToRegistration = () => {
  router.push('/login')
}

const goToDiscover = () => {
  router.push('/descubra')
}

const addPortfolioItem = () => {
  console.log('Adicionando item ao portfólio...')
}

const editProject = (project) => {
  console.log('Editando projeto:', project.title)
}

const viewProject = (project) => {
  console.log('Visualizando projeto:', project.title)
}

const getStatusColor = (status) => {
  const colors = {
    'Em Andamento': 'orange',
    Concluído: 'green',
    Pausado: 'grey',
    Cancelado: 'red',
  }
  return colors[status] || 'grey'
}

const deleteAccount = () => {
  console.log('Excluindo conta...')
}

onMounted(() => {
  // Initialize component
  console.log('Perfil unificado carregado para:', userType.value)
})
</script>

<style lang="scss" scoped>
.jobu-page {
  background: var(--jobu-bg-dark);
  min-height: 100vh;
  color: var(--jobu-text-primary);
  position: relative;
  overflow-x: hidden;
}

.jobu-header {
  background: var(--jobu-bg-glass);
  border-bottom: 1px solid var(--jobu-border-subtle);
  backdrop-filter: blur(10px);
  padding: var(--jobu-space-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--jobu-space-lg);
  }
}

.jobu-content {
  padding: var(--jobu-space-lg);
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.profile-card-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: var(--jobu-space-xl);
}

.profile-card {
  background: rgba(26, 26, 26, 0.85) !important;
  border: 1px solid var(--jobu-border-subtle);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 900px;

  .profile-content {
    padding: var(--jobu-space-2xl);
  }

  .profile-header {
    display: flex;
    align-items: flex-start;
    gap: var(--jobu-space-xl);
  }

  .avatar-section {
    display: flex;
    justify-content: center;
    flex-shrink: 0;
  }

  .avatar-container {
    position: relative;

    .profile-avatar {
      border: 3px solid var(--jobu-border-glass);
      box-shadow: var(--jobu-shadow-medium);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .avatar-status {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid var(--jobu-bg-dark);
    }

    .jobu-status--online {
      background: var(--jobu-secondary);
      box-shadow: 0 0 10px rgba(0, 184, 148, 0.5);
    }
  }

  .profile-info-section {
    flex: 1;
    min-width: 0;

    .profile-basic-info {
      .profile-name {
        line-height: 1.2;
        word-break: break-word;
      }

      .profile-type {
        font-weight: 500;
        opacity: 0.9;
      }

      .profile-category {
        font-style: italic;
        opacity: 0.8;
      }

      .rating-section {
        align-items: center;
      }
    }

    .profile-stats {
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--jobu-space-sm);
        margin-top: var(--jobu-space-md);
      }

      .stat-item {
        background: rgba(26, 26, 26, 0.6) !important;
        border: 1px solid var(--jobu-border-subtle);
        border-radius: var(--jobu-radius-sm);
        padding: var(--jobu-space-sm) var(--jobu-space-md);
        display: flex;
        align-items: center;
        gap: var(--jobu-space-xs);
        backdrop-filter: blur(5px);
        transition: all var(--jobu-transition-normal);

        &:hover {
          background: rgba(26, 26, 26, 0.8) !important;
          border-color: var(--jobu-border-glass);
        }

        .stat-icon {
          color: var(--jobu-text-secondary);
          flex-shrink: 0;
        }

        .stat-text {
          font-size: 0.875rem;
          color: var(--jobu-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &.stat-verified {
          .stat-icon {
            color: var(--jobu-secondary);
          }
        }
      }
    }
  }
}

.tabs-container {
  margin-top: var(--jobu-space-xl);

  .jobu-tabs {
    background: var(--jobu-bg-glass);
    border: 1px solid var(--jobu-border-subtle);
    border-radius: var(--jobu-radius-lg);
    padding: var(--jobu-space-xs);
    backdrop-filter: blur(10px);
  }
}

.tab-content {
  background: var(--jobu-bg-glass);
  border: 1px solid var(--jobu-border-subtle);
  border-radius: var(--jobu-radius-lg);
  padding: var(--jobu-space-lg);
  margin-top: var(--jobu-space-md);
  backdrop-filter: blur(10px);
}

.quick-actions,
.recent-activity,
.portfolio-section,
.projects-section,
.settings-sections {
  .section-title {
    color: var(--jobu-text-primary);
    border-bottom: 2px solid var(--jobu-secondary);
    padding-bottom: var(--jobu-space-xs);
    margin-bottom: var(--jobu-space-lg);
    text-align: left;
  }
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--jobu-space-md);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.action-item,
.activity-item,
.portfolio-item,
.project-item,
.config-item {
  background: var(--jobu-bg-glass);
  border: 1px solid var(--jobu-border-subtle);
  border-radius: var(--jobu-radius-md);
  padding: var(--jobu-space-lg);
  transition: all var(--jobu-transition-normal);
  backdrop-filter: blur(5px);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--jobu-border-glass);
    background: var(--jobu-bg-glass-hover);
    box-shadow: var(--jobu-shadow-medium);
  }

  .action-icon {
    width: 48px;
    height: 48px;
    background: var(--jobu-bg-glass);
    border: 1px solid var(--jobu-border-glass);
    border-radius: var(--jobu-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .action-content {
    flex: 1;
    min-width: 0;

    .action-title {
      color: var(--jobu-text-primary);
      font-size: 1rem;
      line-height: 1.2;
      margin-bottom: var(--jobu-space-xs);
    }

    .action-subtitle {
      color: var(--jobu-text-secondary);
      font-size: 0.875rem;
      line-height: 1.3;
    }
  }
}

.portfolio-item {
  .portfolio-image {
    position: relative;
    overflow: hidden;
    border-radius: var(--jobu-radius-sm);

    .portfolio-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform var(--jobu-transition-normal);
    }

    &:hover .portfolio-img {
      transform: scale(1.05);
    }
  }
}

.form-container {
  background: var(--jobu-bg-glass);
  border: 1px solid var(--jobu-border-subtle);
  border-radius: var(--jobu-radius-lg);
  padding: var(--jobu-space-xl);
  backdrop-filter: blur(10px);

  .form-actions {
    padding-top: var(--jobu-space-lg);
    border-top: 1px solid var(--jobu-border-subtle);
    margin-top: var(--jobu-space-lg);
  }
}

.settings-list {
  .setting-item {
    padding: var(--jobu-space-md) 0;
    border-bottom: 1px solid var(--jobu-border-subtle);

    &:last-child {
      border-bottom: none;
    }
  }
}

.danger-zone {
  background: rgba(244, 67, 54, 0.05);
  border: 1px solid rgba(244, 67, 54, 0.2) !important;
}

// Mobile responsiveness
@media (max-width: 768px) {
  .jobu-content {
    padding: var(--jobu-space-md);
  }

  .profile-card-wrapper {
    margin-bottom: var(--jobu-space-lg);
  }

  .profile-card {
    max-width: 100%;

    .profile-content {
      padding: var(--jobu-space-lg);
    }

    .profile-header {
      flex-direction: column;
      align-items: center;
      gap: var(--jobu-space-lg);
      text-align: center;
    }

    .avatar-section {
      width: 100%;
      justify-content: center;
    }

    .profile-info-section {
      width: 100%;

      .profile-basic-info {
        text-align: center;
        margin-bottom: var(--jobu-space-md);

        .profile-name {
          font-size: 1.75rem;
        }
      }

      .profile-stats {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: var(--jobu-space-xs);
        }

        .stat-item {
          padding: var(--jobu-space-xs) var(--jobu-space-sm);

          .stat-text {
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .action-grid,
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .jobu-tabs {
    .q-tab {
      font-size: 0.8rem;
    }
  }

  .tabs-container {
    margin-top: var(--jobu-space-lg);
  }
}

// Action Cards Section Styles
.action-cards-section {
  .section-header {
    h3 {
      background: linear-gradient(135deg, var(--jobu-text-accent), var(--jobu-text-primary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .action-cards {
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      --min-width: 100%;
    }
  }

  .action-card {
    padding: var(--jobu-space-2xl);
    transition: all var(--jobu-transition-normal);
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-8px);
      border-color: var(--jobu-border-glass);
      box-shadow: var(--jobu-shadow-large);

      .card-icon .q-icon {
        transform: scale(1.1);
        filter: drop-shadow(0 0 10px rgba(0, 184, 148, 0.5));
      }
    }

    .card-icon {
      .q-icon {
        transition: all var(--jobu-transition-normal);
      }
    }

    .jobu-btn {
      width: 100%;
      min-height: 48px;
    }
  }
}
</style>
