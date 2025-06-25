<template>
  <q-page class="jobu-page">
    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="$router.back()" />
        <div class="header-title">Meu Perfil</div>
        <q-btn flat round icon="more_vert" class="jobu-btn--ghost">
          <q-menu>
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
    <div class="jobu-content">
      <!-- Profile Card -->
      <div class="profile-card jobu-card jobu-card--highlight jobu-mb-xl">
        <div class="profile-content jobu-flex jobu-items-center jobu-gap-lg">
          <div class="avatar-container">
            <q-avatar size="120px" class="profile-avatar">
              <img :src="userProfile.avatar" alt="Profile" />
            </q-avatar>
            <div class="avatar-status jobu-badge jobu-badge--success"></div>
          </div>

          <div class="profile-info jobu-flex-1">
            <h3 class="profile-name jobu-text-2xl jobu-font-bold jobu-text-primary jobu-mb-xs">
              {{ userProfile.nome }}
            </h3>
            <p class="profile-id jobu-text-sm jobu-text-secondary jobu-mb-md">
              ID: {{ userProfile.id }}
            </p>

            <div class="profile-stats jobu-flex jobu-gap-md">
              <div class="stat-item jobu-flex jobu-items-center jobu-gap-xs">
                <q-icon name="person" size="20px" class="jobu-text-accent" />
                <span class="jobu-text-sm">Cliente</span>
              </div>
              <div class="stat-item jobu-flex jobu-items-center jobu-gap-xs">
                <q-icon name="work" size="20px" class="jobu-text-accent" />
                <span class="jobu-text-sm">{{ userProfile.projetos }} Projetos</span>
              </div>
              <div class="stat-item jobu-flex jobu-items-center jobu-gap-xs">
                <q-icon name="verified" size="20px" class="jobu-text-success" />
                <span class="jobu-text-sm">Verificado</span>
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
          active-color="teal"
          indicator-color="teal"
          align="justify"
        >
          <q-tab name="perfil" icon="person" label="Perfil" />
          <q-tab name="editar" icon="edit" label="Editar" />
          <q-tab name="servicos" icon="work_outline" label="Serviços" />
          <q-tab name="configuracoes" icon="settings" label="Config" />
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
          <!-- Profile Tab -->
          <q-tab-panel name="perfil" class="jobu-p-0">
            <div class="menu-grid jobu-grid--1-cols jobu-gap-md">
              <div class="menu-item jobu-card jobu-card--interactive" @click="showPaymentMethods">
                <div class="jobu-flex jobu-items-center jobu-gap-md">
                  <div class="menu-icon">
                    <q-icon name="credit_card" size="24px" class="jobu-text-accent" />
                  </div>
                  <div class="menu-text jobu-flex-1">
                    <div class="menu-title jobu-font-semibold jobu-text-primary">
                      Métodos de Pagamento
                    </div>
                    <div class="menu-subtitle jobu-text-sm jobu-text-secondary">
                      Gerenciar cartões e formas de pagamento
                    </div>
                  </div>
                  <q-icon name="chevron_right" class="jobu-text-secondary" />
                </div>
              </div>

              <div class="menu-item jobu-card jobu-card--interactive" @click="showNotifications">
                <div class="jobu-flex jobu-items-center jobu-gap-md">
                  <div class="menu-icon">
                    <q-icon name="notifications" size="24px" class="jobu-text-accent" />
                  </div>
                  <div class="menu-text jobu-flex-1">
                    <div class="menu-title jobu-font-semibold jobu-text-primary">Notificações</div>
                    <div class="menu-subtitle jobu-text-sm jobu-text-secondary">
                      2 novas notificações
                    </div>
                  </div>
                  <q-badge v-if="notificationCount > 0" color="red" floating>
                    {{ notificationCount }}
                  </q-badge>
                  <q-icon name="chevron_right" class="jobu-text-secondary" />
                </div>
              </div>

              <div class="menu-item jobu-card jobu-card--interactive" @click="showProjects">
                <div class="jobu-flex jobu-items-center jobu-gap-md">
                  <div class="menu-icon">
                    <q-icon name="folder" size="24px" class="jobu-text-accent" />
                  </div>
                  <div class="menu-text jobu-flex-1">
                    <div class="menu-title jobu-font-semibold jobu-text-primary">Meus Projetos</div>
                    <div class="menu-subtitle jobu-text-sm jobu-text-secondary">
                      {{ userProfile.projetos }} projetos ativos
                    </div>
                  </div>
                  <q-icon name="chevron_right" class="jobu-text-secondary" />
                </div>
              </div>

              <div class="menu-item jobu-card jobu-card--interactive" @click="showHistory">
                <div class="jobu-flex jobu-items-center jobu-gap-md">
                  <div class="menu-icon">
                    <q-icon name="history" size="24px" class="jobu-text-accent" />
                  </div>
                  <div class="menu-text jobu-flex-1">
                    <div class="menu-title jobu-font-semibold jobu-text-primary">Histórico</div>
                    <div class="menu-subtitle jobu-text-sm jobu-text-secondary">
                      Transações e atividades
                    </div>
                  </div>
                  <q-icon name="chevron_right" class="jobu-text-secondary" />
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Edit Tab -->
          <q-tab-panel name="editar" class="jobu-p-0">
            <div class="edit-form">
              <div class="jobu-card">
                <div class="jobu-card-header">
                  <h4 class="card-title">Informações Pessoais</h4>
                </div>
                <div class="jobu-card-content">
                  <q-form class="form-grid">
                    <div class="form-group jobu-mb-md">
                      <q-input
                        v-model="editProfile.nome"
                        label="Nome Completo"
                        filled
                        class="jobu-input"
                      />
                    </div>

                    <div class="form-group jobu-mb-md">
                      <q-input
                        v-model="editProfile.email"
                        label="E-mail"
                        type="email"
                        filled
                        class="jobu-input"
                      />
                    </div>

                    <div class="form-group jobu-mb-md">
                      <q-input
                        v-model="editProfile.telefone"
                        label="Telefone"
                        mask="(##) #####-####"
                        filled
                        class="jobu-input"
                      />
                    </div>

                    <div class="form-group jobu-mb-md">
                      <q-input
                        v-model="editProfile.empresa"
                        label="Empresa"
                        filled
                        class="jobu-input"
                      />
                    </div>

                    <div class="form-group jobu-mb-lg">
                      <q-input
                        v-model="editProfile.descricao"
                        label="Descrição"
                        type="textarea"
                        rows="3"
                        filled
                        class="jobu-input"
                      />
                    </div>

                    <div class="form-actions jobu-flex jobu-gap-md">
                      <q-btn
                        label="Cancelar"
                        class="jobu-btn jobu-btn--outline jobu-flex-1"
                        @click="cancelEdit"
                      />
                      <q-btn
                        label="Salvar"
                        class="jobu-btn jobu-btn--primary jobu-flex-1"
                        @click="saveProfile"
                        :loading="saving"
                      />
                    </div>
                  </q-form>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Services Tab -->
          <q-tab-panel name="servicos" class="jobu-p-0">
            <div class="services-section">
              <div class="jobu-card">
                <div class="jobu-card-header">
                  <h4 class="card-title">Serviços Contratados</h4>
                  <q-btn
                    label="Novo Projeto"
                    class="jobu-btn jobu-btn--primary jobu-btn--small"
                    @click="createProject"
                  />
                </div>
                <div class="jobu-card-content">
                  <div v-if="services.length === 0" class="empty-state jobu-text-center">
                    <q-icon
                      name="work_outline"
                      size="3rem"
                      class="jobu-text-secondary jobu-mb-md"
                    />
                    <p class="jobu-text-secondary">Nenhum serviço contratado ainda</p>
                    <q-btn
                      label="Explorar Freelancers"
                      class="jobu-btn jobu-btn--outline jobu-mt-md"
                      @click="$router.push('/descubra')"
                    />
                  </div>

                  <div v-else class="services-list jobu-grid--1-cols jobu-gap-md">
                    <div
                      v-for="service in services"
                      :key="service.id"
                      class="service-item jobu-card--small"
                    >
                      <div class="jobu-flex jobu-justify-between jobu-items-start jobu-mb-md">
                        <div>
                          <h5 class="jobu-font-semibold jobu-text-primary">{{ service.title }}</h5>
                          <p class="jobu-text-sm jobu-text-secondary">{{ service.freelancer }}</p>
                        </div>
                        <q-badge
                          :color="getServiceStatusColor(service.status)"
                          :label="service.status"
                        />
                      </div>
                      <p class="jobu-text-sm jobu-text-secondary jobu-mb-md">
                        {{ service.description }}
                      </p>
                      <div class="jobu-flex jobu-justify-between jobu-items-center">
                        <span class="jobu-font-semibold jobu-text-accent">
                          R$ {{ service.price }}
                        </span>
                        <q-btn
                          label="Ver Detalhes"
                          class="jobu-btn jobu-btn--secondary jobu-btn--small"
                          @click="viewService(service)"
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
            <div class="settings-section">
              <div class="jobu-card jobu-mb-lg">
                <div class="jobu-card-header">
                  <h4 class="card-title">Preferências</h4>
                </div>
                <div class="jobu-card-content">
                  <div class="settings-list">
                    <div
                      class="setting-item jobu-flex jobu-justify-between jobu-items-center jobu-mb-md"
                    >
                      <div>
                        <div class="jobu-font-semibold">Notificações por E-mail</div>
                        <div class="jobu-text-sm jobu-text-secondary">
                          Receber updates sobre projetos
                        </div>
                      </div>
                      <q-toggle v-model="settings.emailNotifications" color="teal" />
                    </div>

                    <div
                      class="setting-item jobu-flex jobu-justify-between jobu-items-center jobu-mb-md"
                    >
                      <div>
                        <div class="jobu-font-semibold">Notificações Push</div>
                        <div class="jobu-text-sm jobu-text-secondary">
                          Alertas instantâneos no dispositivo
                        </div>
                      </div>
                      <q-toggle v-model="settings.pushNotifications" color="teal" />
                    </div>

                    <div
                      class="setting-item jobu-flex jobu-justify-between jobu-items-center jobu-mb-md"
                    >
                      <div>
                        <div class="jobu-font-semibold">Perfil Público</div>
                        <div class="jobu-text-sm jobu-text-secondary">
                          Permitir que freelancers vejam seu perfil
                        </div>
                      </div>
                      <q-toggle v-model="settings.publicProfile" color="teal" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Danger Zone -->
              <div class="jobu-card jobu-card--danger">
                <div class="jobu-card-header">
                  <h4 class="card-title">Zona de Perigo</h4>
                </div>
                <div class="jobu-card-content">
                  <div class="danger-actions jobu-flex jobu-gap-md">
                    <q-btn
                      label="Excluir Conta"
                      class="jobu-btn jobu-btn--danger"
                      @click="confirmDeleteAccount"
                    />
                    <q-btn
                      label="Exportar Dados"
                      class="jobu-btn jobu-btn--outline"
                      @click="exportData"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// State
const activeTab = ref('perfil')
const saving = ref(false)
const notificationCount = ref(2)

// User profile data
const userProfile = reactive({
  id: 'CL001',
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  telefone: '(11) 99999-9999',
  empresa: 'Tech Solutions Ltda.',
  avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
  projetos: 5,
  descricao: 'Empresário focado em inovação tecnológica e soluções digitais.',
})

// Edit profile data
const editProfile = reactive({
  nome: userProfile.nome,
  email: userProfile.email,
  telefone: userProfile.telefone,
  empresa: userProfile.empresa,
  descricao: userProfile.descricao,
})

// Settings
const settings = reactive({
  emailNotifications: true,
  pushNotifications: true,
  publicProfile: false,
})

// Services data
const services = ref([
  {
    id: 1,
    title: 'Desenvolvimento de Website',
    freelancer: 'Ana Silva',
    description: 'Criação de website corporativo responsivo',
    price: '2.500,00',
    status: 'Em Andamento',
  },
  {
    id: 2,
    title: 'Design de Logo',
    freelancer: 'Carlos Mendes',
    description: 'Criação de identidade visual completa',
    price: '800,00',
    status: 'Concluído',
  },
])

// Methods
const showPaymentMethods = () => {
  router.push('/pagamento')
}

const showNotifications = () => {
  $q.notify({
    color: 'info',
    message: 'Abrindo notificações...',
    icon: 'notifications',
  })
}

const showProjects = () => {
  $q.notify({
    color: 'info',
    message: 'Carregando projetos...',
    icon: 'folder',
  })
}

const showHistory = () => {
  $q.notify({
    color: 'info',
    message: 'Carregando histórico...',
    icon: 'history',
  })
}

const saveProfile = async () => {
  saving.value = true
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update profile
    Object.assign(userProfile, editProfile)

    $q.notify({
      color: 'positive',
      message: 'Perfil atualizado com sucesso!',
      icon: 'check_circle',
    })
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Erro ao salvar perfil',
      icon: 'error',
    })
  } finally {
    saving.value = false
  }
}

const cancelEdit = () => {
  // Reset edit data
  Object.assign(editProfile, {
    nome: userProfile.nome,
    email: userProfile.email,
    telefone: userProfile.telefone,
    empresa: userProfile.empresa,
    descricao: userProfile.descricao,
  })

  activeTab.value = 'perfil'
}

const createProject = () => {
  router.push('/descubra')
}

const viewService = (service) => {
  $q.notify({
    color: 'info',
    message: `Visualizando serviço: ${service.title}`,
    icon: 'visibility',
  })
}

const getServiceStatusColor = (status) => {
  switch (status) {
    case 'Em Andamento':
      return 'orange'
    case 'Concluído':
      return 'green'
    case 'Cancelado':
      return 'red'
    default:
      return 'grey'
  }
}

const shareProfile = () => {
  $q.notify({
    color: 'info',
    message: 'Link do perfil copiado!',
    icon: 'share',
  })
}

const exportData = () => {
  $q.notify({
    color: 'info',
    message: 'Exportando dados...',
    icon: 'download',
  })
}

const confirmDeleteAccount = () => {
  $q.dialog({
    title: 'Confirmar Exclusão',
    message: 'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
    cancel: true,
    persistent: true,
    color: 'negative',
  }).onOk(() => {
    $q.notify({
      color: 'negative',
      message: 'Conta excluída com sucesso',
      icon: 'delete',
    })
  })
}
</script>

<style lang="scss" scoped>
.profile-card {
  .avatar-container {
    position: relative;

    .avatar-status {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      border: 3px solid white;
      border-radius: 50%;
    }
  }
}

.tabs-container {
  .jobu-tabs {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 4px;
  }
}

.menu-item {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.services-list {
  .service-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: var(--jobu-space-md);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(0, 184, 148, 0.3);
    }
  }
}

.settings-list {
  .setting-item {
    padding: var(--jobu-space-md) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }
}

.empty-state {
  padding: var(--jobu-space-xl);
}

// Mobile responsiveness
@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    text-align: center;
  }

  .profile-stats {
    justify-content: center;
  }

  .form-actions,
  .danger-actions {
    flex-direction: column;
  }
}
</style>
