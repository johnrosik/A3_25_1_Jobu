<template>
  <q-page class="profile-page">
    <!-- Header moderno -->
    <div class="modern-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="back-btn" @click="$router.back()" />
        <div class="header-title">Meu Perfil</div>
        <q-btn flat round icon="more_vert" class="menu-btn" />
      </div>
    </div>

    <!-- Profile Card -->
    <div class="profile-card">
      <div class="profile-avatar-section">
        <div class="avatar-container">
          <q-avatar size="120px" class="profile-avatar">
            <img :src="userProfile.avatar" alt="Profile" />
          </q-avatar>
          <div class="avatar-status"></div>
        </div>

        <div class="profile-info">
          <h3 class="profile-name">{{ userProfile.nome }}</h3>
          <p class="profile-id">ID: {{ userProfile.id }}</p>

          <div class="profile-stats">
            <div class="stat-item">
              <q-icon name="person" size="20px" />
              <span>Cliente</span>
            </div>
            <div class="stat-item">
              <q-icon name="groups" size="20px" />
              <span>Projetos</span>
            </div>
            <div class="stat-item">
              <q-icon name="badge" size="20px" />
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navegação moderna por abas -->
    <div class="tabs-container">
      <q-tabs
        v-model="activeTab"
        class="modern-tabs"
        active-color="white"
        indicator-color="transparent"
        align="justify"
      >
        <q-tab name="perfil" icon="person" label="Perfil" class="modern-tab" />
        <q-tab name="editar" icon="edit" label="Editar" class="modern-tab" />
        <q-tab name="servicos" icon="work_outline" label="Serviços" class="modern-tab" />
        <q-tab name="configuracoes" icon="settings" label="Config" class="modern-tab" />
      </q-tabs>
    </div>

    <!-- Conteúdo das abas -->
    <div class="content-container">
      <q-tab-panels
        v-model="activeTab"
        class="modern-panels"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <!-- Aba Perfil -->
        <q-tab-panel name="perfil" class="panel-content">
          <div class="menu-grid">
            <div class="menu-item" @click="showPaymentMethods">
              <div class="menu-icon">
                <q-icon name="credit_card" size="24px" />
              </div>
              <div class="menu-text">
                <div class="menu-title">Métodos de Pagamento</div>
                <div class="menu-subtitle">Gerenciar cartões</div>
              </div>
              <q-icon name="chevron_right" class="menu-arrow" />
            </div>

            <div class="menu-item" @click="showNotifications">
              <div class="menu-icon">
                <q-icon name="notifications" size="24px" />
              </div>
              <div class="menu-text">
                <div class="menu-title">Notificações</div>
                <div class="menu-subtitle">2 novas</div>
              </div>
              <q-icon name="chevron_right" class="menu-arrow" />
            </div>

            <div class="menu-item" @click="activeTab = 'configuracoes'">
              <div class="menu-icon">
                <q-icon name="settings" size="24px" />
              </div>
              <div class="menu-text">
                <div class="menu-title">Configurações</div>
                <div class="menu-subtitle">Preferências</div>
              </div>
              <q-icon name="chevron_right" class="menu-arrow" />
            </div>

            <div class="menu-item logout-item" @click="showLogoutDialog">
              <div class="menu-icon">
                <q-icon name="logout" size="24px" />
              </div>
              <div class="menu-text">
                <div class="menu-title">Sair</div>
                <div class="menu-subtitle">Fazer logout</div>
              </div>
              <q-icon name="chevron_right" class="menu-arrow" />
            </div>
          </div>
        </q-tab-panel>

        <!-- Aba Editar -->
        <q-tab-panel name="editar" class="q-pa-md">
          <div v-if="!editMode" class="profile-info">
            <div class="row items-center justify-between q-mb-lg">
              <div class="text-h6 text-weight-bold text-teal">Informações Pessoais</div>
              <q-btn flat round icon="edit" @click="enableEditMode" class="text-teal" />
            </div>

            <div class="info-item q-mb-md">
              <q-icon name="person" class="q-mr-sm text-teal" />
              {{ userProfile.nome }}
            </div>
            <div class="info-item q-mb-md">
              <q-icon name="email" class="q-mr-sm text-teal" />
              {{ userProfile.email }}
            </div>
            <div class="info-item q-mb-md">
              <q-icon name="phone" class="q-mr-sm text-teal" />
              {{ userProfile.telefone }}
            </div>
          </div>

          <div v-else class="edit-form">
            <div class="text-h6 text-weight-bold text-teal q-mb-md">Editar Informações</div>

            <q-input
              v-model="editForm.nome"
              label="Nome Completo"
              filled
              dense
              color="teal"
              rounded
              class="q-mb-md"
            />
            <q-input
              v-model="editForm.email"
              label="E-mail"
              filled
              dense
              color="teal"
              rounded
              class="q-mb-md"
            />
            <q-input
              v-model="editForm.telefone"
              label="Telefone"
              filled
              dense
              color="teal"
              rounded
              class="q-mb-md"
              placeholder="(11) 91234-5678"
            />

            <div class="row q-gutter-md">
              <q-btn label="Cancelar" flat class="col" @click="cancelEdit" />
              <q-btn
                label="Salvar"
                class="col bg-teal text-white"
                rounded
                no-caps
                @click="saveProfile"
              />
            </div>
          </div>
        </q-tab-panel>

        <!-- Aba Serviços -->
        <q-tab-panel name="servicos" class="q-pa-md">
          <!-- Perfil do Freelancer selecionado -->
          <div v-if="selectedFreelancer" class="freelancer-profile q-mb-lg">
            <div class="text-center q-mb-md">
              <q-avatar size="80px">
                <q-icon name="person" size="80px" />
              </q-avatar>
              <div class="text-h6 text-bold q-mt-sm">{{ selectedFreelancer.nome }}</div>
              <div class="text-subtitle2">{{ selectedFreelancer.categoria }}</div>
              <div class="row items-center justify-center q-my-sm">
                <q-icon name="star" color="yellow" />
                <span class="q-ml-xs text-bold">{{ selectedFreelancer.rating }}</span>
              </div>
              <div class="text-center text-grey-7 q-mb-md">
                {{ selectedFreelancer.descricao }}
              </div>
            </div>

            <!-- Comentários -->
            <div class="text-bold text-teal text-subtitle1 q-mb-sm">Comentários</div>
            <div
              v-for="(comentario, index) in selectedFreelancer.comentarios"
              :key="index"
              class="comment q-mb-md"
            >
              <div class="row items-center q-gutter-sm q-mb-xs">
                <q-avatar size="24px" icon="person" />
                <div class="text-bold">{{ comentario.autor }}</div>
              </div>
              <q-rating v-model="comentario.rating" max="5" color="yellow" readonly size="16px" />
              <div class="text-caption">{{ comentario.texto }}</div>
            </div>

            <!-- Seleção de Serviços -->
            <div class="text-subtitle2 text-bold text-teal q-mb-sm">Selecionar Serviços</div>
            <q-option-group
              v-model="selectedService"
              :options="selectedFreelancer.servicos"
              type="radio"
              color="teal"
              class="q-mb-md"
            />

            <q-btn
              label="Finalizar Contratação"
              color="teal"
              class="full-width"
              rounded
              no-caps
              @click="finalizarContratacao"
            />
          </div>

          <div v-else class="no-freelancer text-center q-pa-lg">
            <q-icon name="work_off" size="64px" class="text-grey-6" />
            <div class="text-h6 text-grey-6 q-mt-md">Nenhum freelancer selecionado</div>
          </div>
        </q-tab-panel>

        <!-- Aba Configurações -->
        <q-tab-panel name="configuracoes" class="q-pa-md">
          <q-list bordered class="bg-black text-white">
            <q-item>
              <q-item-section>
                <q-item-label>Notificações Push</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="settings.notifications" color="teal" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>Modo Escuro</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="settings.darkMode" color="teal" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="showLanguageDialog">
              <q-item-section>
                <q-item-label>Idioma</q-item-label>
                <q-item-label caption>{{ settings.language }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="arrow_forward_ios" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="showLogoutDialog">
              <q-item-section>
                <q-item-label class="text-red">Sair da Conta</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="logout" class="text-red" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- Diálogos -->
    <q-dialog v-model="showLogout">
      <q-card class="logout-dialog">
        <q-card-section>
          <h4>Confirmar Saída</h4>
          <p>Você tem certeza que deseja sair da sua conta?</p>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Cancelar" flat @click="showLogout = false" />
          <q-btn label="Sair" color="teal" @click="logout" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showConfirmation">
      <q-card class="confirmation-dialog">
        <q-card-section>
          <h4>{{ confirmationMessage }}</h4>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="OK" color="teal" @click="showConfirmation = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado da aplicação
const activeTab = ref('perfil')
const editMode = ref(false)
const showLogout = ref(false)
const showConfirmation = ref(false)
const confirmationMessage = ref('')
const selectedService = ref('')

// Dados do usuário
const userProfile = reactive({
  nome: 'Empresa Company',
  id: '782310273–323',
  email: 'empresa@email.com',
  telefone: '(11) 91234-5678',
  avatar:
    'https://img.freepik.com/vetores-gratis/logo-search-engine_1071-76.jpg?semt=ais_hybrid&w=740',
})

// Formulário de edição
const editForm = reactive({
  nome: '',
  email: '',
  telefone: '',
})

// Configurações
const settings = reactive({
  notifications: true,
  darkMode: true,
  language: 'Português',
})

// Freelancer selecionado (exemplo)
const selectedFreelancer = ref({
  nome: 'Joana Rodrigues',
  categoria: 'Design Gráfico',
  rating: 4.8,
  descricao:
    'Trabalho com criação de logotipos, paleta de cores, tipografia e toda a identidade visual da sua empresa ou projeto.',
  comentarios: [
    {
      autor: 'Lucas M.',
      rating: 5,
      texto: 'Muito profissional! Entregou antes do prazo e o resultado ficou incrível.',
    },
    {
      autor: 'Camila S.',
      rating: 5,
      texto: 'Joana entendeu exatamente o que eu queria. Super recomendo!',
    },
  ],
  servicos: [
    {
      label: 'Criação de Logotipos',
      value: 'logo1',
      caption: 'R$ 85,00',
    },
    {
      label: 'Design de Identidade Visual',
      value: 'identidade',
      caption: 'R$ 150,00',
    },
    {
      label: 'Material Gráfico',
      value: 'material',
      caption: 'R$ 75,00',
    },
  ],
})

// Funções
const enableEditMode = () => {
  editMode.value = true
  // Copia os dados atuais para o formulário
  editForm.nome = userProfile.nome
  editForm.email = userProfile.email
  editForm.telefone = userProfile.telefone
}

const cancelEdit = () => {
  editMode.value = false
  // Reset do formulário
  editForm.nome = ''
  editForm.email = ''
  editForm.telefone = ''
}

const saveProfile = () => {
  // Atualiza os dados do perfil
  userProfile.nome = editForm.nome
  userProfile.email = editForm.email
  userProfile.telefone = editForm.telefone

  editMode.value = false
  confirmationMessage.value = 'Informações atualizadas com sucesso!'
  showConfirmation.value = true
}

const showLogoutDialog = () => {
  showLogout.value = true
}

const logout = () => {
  showLogout.value = false
  // Implementar lógica de logout
  router.push('/login')
}

const showPaymentMethods = () => {
  confirmationMessage.value = 'Funcionalidade em desenvolvimento'
  showConfirmation.value = true
}

const showNotifications = () => {
  confirmationMessage.value = 'Nenhuma notificação nova'
  showConfirmation.value = true
}

const showLanguageDialog = () => {
  confirmationMessage.value = 'Funcionalidade de idioma em desenvolvimento'
  showConfirmation.value = true
}

const finalizarContratacao = () => {
  if (!selectedService.value) {
    confirmationMessage.value = 'Por favor, selecione um serviço'
    showConfirmation.value = true
    return
  }

  confirmationMessage.value = 'Contratação finalizada com sucesso!'
  showConfirmation.value = true
}
</script>

<style scoped>
@import '../css/quasar.variables.scss';

/* Layout Principal */
.profile-page {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  min-height: 100vh;
  color: white;
  padding-bottom: 80px;
}

/* Header Moderno */
.modern-header {
  background: linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 184, 148, 0.05) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 184, 148, 0.2);
  padding: 16px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #00b894;
}

.back-btn,
.menu-btn {
  color: #00b894;
  transition: all 0.3s ease;
}

.back-btn:hover,
.menu-btn:hover {
  color: white;
  transform: scale(1.1);
}

/* Profile Card */
.profile-card {
  max-width: 600px;
  margin: 20px auto;
  padding: 30px 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 20px;
  border: 1px solid rgba(0, 184, 148, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.profile-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-container {
  position: relative;
  margin-bottom: 20px;
}

.profile-avatar {
  border: 3px solid #00b894;
  box-shadow: 0 0 20px rgba(0, 184, 148, 0.3);
}

.avatar-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: #00b894;
  border: 3px solid #1a1a1a;
  border-radius: 50%;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: #00b894;
  margin: 0 0 8px 0;
}

.profile-id {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px 0;
}

.profile-stats {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

/* Tabs Modernos */
.tabs-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 0 20px;
}

.modern-tabs {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 8px;
}

.modern-tab {
  border-radius: 10px;
  transition: all 0.3s ease;
  min-height: 50px;
}

.modern-tab.q-tab--active {
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
}

/* Content Container */
.content-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.modern-panels {
  background: transparent;
}

.panel-content {
  padding: 20px 0;
}

/* Menu Grid */
.menu-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(0, 184, 148, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(0, 184, 148, 0.1);
  border-color: rgba(0, 184, 148, 0.3);
  transform: translateY(-2px);
}

.menu-item.logout-item:hover {
  background: rgba(255, 59, 48, 0.1);
  border-color: rgba(255, 59, 48, 0.3);
}

.menu-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(0, 184, 148, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00b894;
  margin-right: 16px;
}

.menu-text {
  flex: 1;
}

.menu-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.menu-subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.menu-arrow {
  color: rgba(255, 255, 255, 0.4);
}

/* Info Cards */
.info-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border-left: 4px solid #00b894;
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 184, 148, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00b894;
  margin-right: 16px;
}

.info-content {
  flex: 1;
}

.info-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
}

/* Formulário */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  margin-bottom: 16px;
}

.modern-input .q-field__control {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn {
  flex: 1;
  height: 48px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.save-btn {
  flex: 2;
  height: 48px;
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
  border-radius: 12px;
  font-weight: 500;
}

/* Seções */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #00b894;
  margin: 0;
}

.edit-btn {
  color: #00b894;
}

/* Dialogs */
.logout-dialog,
.confirmation-dialog {
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 184, 148, 0.2);
  border-radius: 20px;
  color: white;
  min-width: 300px;
}

.logout-dialog h4,
.confirmation-dialog h4 {
  color: #00b894;
  margin: 0 0 12px 0;
}

.logout-dialog p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-card,
  .tabs-container,
  .content-container {
    margin-left: 16px;
    margin-right: 16px;
    max-width: none;
  }

  .header-content {
    padding: 0 16px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .cancel-btn,
  .save-btn {
    flex: none;
  }
}
</style>
