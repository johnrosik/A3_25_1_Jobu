<template>
  <q-page class="freelancer-page">
    <!-- Header moderno -->
    <div class="modern-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="back-btn" @click="$router.back()" />
        <div class="header-title">Freelancer Hub</div>
        <q-btn
          flat
          round
          icon="notifications"
          class="notification-btn"
          :badge="notificationCount > 0 ? notificationCount : undefined"
          badge-color="red"
        />
      </div>
    </div>

    <!-- Profile Card -->
    <div class="profile-card">
      <div class="profile-avatar-section">
        <div class="avatar-container">
          <q-avatar size="120px" class="profile-avatar">
            <img :src="freelancerProfile.avatar" alt="Profile" />
          </q-avatar>
          <div class="avatar-status online"></div>
        </div>

        <div class="profile-info">
          <h3 class="profile-name">{{ freelancerProfile.nome }}</h3>
          <p class="profile-category">{{ freelancerProfile.categoria }}</p>
          <div class="rating-container">
            <q-icon name="star" color="amber" />
            <span class="rating-text">{{ freelancerProfile.rating }}</span>
            <span class="rating-count">({{ freelancerProfile.avaliacoes }} avaliações)</span>
          </div>

          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-number">{{ freelancerProfile.projetos }}</span>
              <span class="stat-label">Projetos</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ freelancerProfile.clientes }}</span>
              <span class="stat-label">Clientes</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">R$ {{ freelancerProfile.ganhos }}</span>
              <span class="stat-label">Ganhos</span>
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
        <q-tab name="categorias" icon="category" label="Categorias" class="modern-tab" />
        <q-tab name="vagas" icon="work" label="Vagas" class="modern-tab" />
        <q-tab name="perfil" icon="person" label="Perfil" class="modern-tab" />
        <q-tab name="config" icon="settings" label="Config" class="modern-tab" />
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
        <!-- Aba Categorias -->
        <q-tab-panel name="categorias" class="panel-content">
          <div class="section-header">
            <h4 class="section-title">Explore Categorias</h4>
            <p class="section-subtitle">Encontre trabalhos na sua área</p>
          </div>

          <div class="categories-grid">
            <div
              v-for="(categoria, index) in categorias"
              :key="index"
              class="category-card"
              @click="selectCategory(categoria)"
            >
              <div class="category-icon">
                <q-icon :name="categoria.icon" size="32px" />
              </div>
              <div class="category-info">
                <div class="category-name">{{ categoria.nome }}</div>
                <div class="category-count">{{ categoria.vagas }} vagas</div>
              </div>
              <div class="category-arrow">
                <q-icon name="arrow_forward_ios" />
              </div>
            </div>
          </div>
        </q-tab-panel>

        <!-- Aba Vagas -->
        <q-tab-panel name="vagas" class="panel-content">
          <div class="section-header">
            <h4 class="section-title">Vagas Disponíveis</h4>
            <div class="filter-section">
              <q-select
                v-model="filtroCategoria"
                :options="categoriaOptions"
                label="Filtrar por categoria"
                filled
                dense
                class="filter-select"
              />
            </div>
          </div>

          <!-- Vaga Detalhada (quando selecionada) -->
          <div v-if="selectedJob" class="job-details-container">
            <div class="job-details-header">
              <q-btn
                flat
                round
                icon="arrow_back"
                @click="selectedJob = null"
                class="back-to-list-btn"
              />
              <h4>Detalhes da Vaga</h4>
            </div>

            <div class="job-details-card">
              <div class="job-header">
                <q-avatar size="60px">
                  <img :src="selectedJob.logo" alt="Company" />
                </q-avatar>
                <div class="job-title-section">
                  <h3 class="job-title">{{ selectedJob.titulo }}</h3>
                  <div class="company-rating">
                    <q-icon name="star" color="amber" />
                    <span>{{ selectedJob.avaliacao }}</span>
                  </div>
                </div>
              </div>

              <div class="job-content">
                <div class="job-description">
                  <h5>Descrição:</h5>
                  <p>{{ selectedJob.descricaoCompleta }}</p>
                </div>

                <div v-if="selectedJob.requisitos" class="job-requirements">
                  <h5>O que precisa ser feito:</h5>
                  <ul>
                    <li v-for="(req, index) in selectedJob.requisitos" :key="index">
                      {{ req }}
                    </li>
                  </ul>
                </div>

                <div class="job-details-grid">
                  <div class="detail-item">
                    <span class="detail-label">Prazo:</span>
                    <span class="detail-value">{{ selectedJob.prazo }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Valor:</span>
                    <span class="detail-value price">{{ selectedJob.valor }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Local:</span>
                    <span class="detail-value">{{ selectedJob.local }}</span>
                  </div>
                </div>

                <q-btn label="Candidatar-se" class="apply-btn" @click="applyToJob(selectedJob)" />
              </div>
            </div>
          </div>

          <!-- Lista de Vagas -->
          <div v-else class="jobs-list">
            <div
              v-for="vaga in vagasFiltradas"
              :key="vaga.id"
              class="job-card"
              @click="selectJob(vaga)"
            >
              <div class="job-card-header">
                <q-avatar size="48px">
                  <img :src="vaga.logo" alt="Company Logo" />
                </q-avatar>
                <div class="job-card-info">
                  <h4 class="job-card-title">{{ vaga.titulo }}</h4>
                  <div class="job-card-rating">
                    <q-icon name="star" color="amber" size="16px" />
                    <span>{{ vaga.avaliacao }}</span>
                  </div>
                </div>
                <div class="job-card-price">{{ vaga.valor }}</div>
              </div>
              <p class="job-card-description">{{ vaga.descricao }}</p>
              <div class="job-card-footer">
                <span class="job-category">{{ vaga.categoria }}</span>
                <span class="job-deadline">{{ vaga.prazo }}</span>
              </div>
            </div>

            <div v-if="vagasFiltradas.length === 0" class="no-jobs">
              <q-icon name="work_off" size="64px" />
              <h4>Nenhuma vaga encontrada</h4>
              <p>Tente ajustar os filtros ou explore outras categorias</p>
            </div>
          </div>
        </q-tab-panel>

        <!-- Aba Perfil -->
        <q-tab-panel name="perfil" class="panel-content">
          <div v-if="!editMode" class="profile-view">
            <div class="section-header">
              <h4 class="section-title">Meu Perfil Profissional</h4>
              <q-btn flat round icon="edit" @click="enableEditMode" class="edit-btn" />
            </div>

            <div class="profile-sections">
              <!-- Informações Básicas -->
              <div class="profile-section">
                <h5 class="subsection-title">Informações Básicas</h5>
                <div class="info-cards">
                  <div class="info-card">
                    <div class="info-icon">
                      <q-icon name="person" size="20px" />
                    </div>
                    <div class="info-content">
                      <div class="info-label">Nome Completo</div>
                      <div class="info-value">{{ freelancerProfile.nome }}</div>
                    </div>
                  </div>

                  <div class="info-card">
                    <div class="info-icon">
                      <q-icon name="email" size="20px" />
                    </div>
                    <div class="info-content">
                      <div class="info-label">E-mail</div>
                      <div class="info-value">{{ freelancerProfile.email }}</div>
                    </div>
                  </div>

                  <div class="info-card">
                    <div class="info-icon">
                      <q-icon name="work" size="20px" />
                    </div>
                    <div class="info-content">
                      <div class="info-label">Especialidade</div>
                      <div class="info-value">{{ freelancerProfile.categoria }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Portfolio -->
              <div class="profile-section">
                <h5 class="subsection-title">Portfolio</h5>
                <div class="portfolio-grid">
                  <div
                    v-for="(item, index) in freelancerProfile.portfolio"
                    :key="index"
                    class="portfolio-item"
                  >
                    <img :src="item.imagem" :alt="item.titulo" />
                    <div class="portfolio-overlay">
                      <h6>{{ item.titulo }}</h6>
                      <p>{{ item.categoria }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Habilidades -->
              <div class="profile-section">
                <h5 class="subsection-title">Habilidades</h5>
                <div class="skills-container">
                  <div
                    v-for="(skill, index) in freelancerProfile.habilidades"
                    :key="index"
                    class="skill-tag"
                  >
                    {{ skill }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modo de Edição -->
          <div v-else class="profile-edit">
            <div class="section-header">
              <h4 class="section-title">Editar Perfil</h4>
            </div>

            <div class="form-container">
              <div class="input-group">
                <q-input
                  v-model="editForm.nome"
                  label="Nome Completo"
                  filled
                  color="teal"
                  class="modern-input"
                />
              </div>

              <div class="input-group">
                <q-input
                  v-model="editForm.email"
                  label="E-mail"
                  type="email"
                  filled
                  color="teal"
                  class="modern-input"
                />
              </div>

              <div class="input-group">
                <q-select
                  v-model="editForm.categoria"
                  :options="categoriaOptions"
                  label="Especialidade"
                  filled
                  color="teal"
                  class="modern-input"
                />
              </div>

              <div class="input-group">
                <q-input
                  v-model="editForm.descricao"
                  label="Descrição Profissional"
                  type="textarea"
                  filled
                  color="teal"
                  class="modern-input"
                  rows="4"
                />
              </div>

              <div class="action-buttons">
                <q-btn label="Cancelar" flat class="cancel-btn" @click="cancelEdit" />
                <q-btn label="Salvar Alterações" class="save-btn" @click="saveProfile" />
              </div>
            </div>
          </div>
        </q-tab-panel>

        <!-- Aba Configurações -->
        <q-tab-panel name="config" class="panel-content">
          <div class="settings-container">
            <div class="settings-group">
              <h5 class="group-title">Preferências de Trabalho</h5>

              <div class="setting-item">
                <div class="setting-info">
                  <div class="setting-label">Disponível para trabalhos</div>
                  <div class="setting-description">Aparecer nos resultados de busca</div>
                </div>
                <q-toggle v-model="settings.disponivel" color="teal" />
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <div class="setting-label">Notificações de vagas</div>
                  <div class="setting-description">Receber alertas de novas oportunidades</div>
                </div>
                <q-toggle v-model="settings.notificacoes" color="teal" />
              </div>
            </div>

            <div class="settings-group">
              <h5 class="group-title">Perfil e Conta</h5>

              <div class="setting-item clickable" @click="shareProfile">
                <div class="setting-info">
                  <div class="setting-label">Compartilhar Perfil</div>
                  <div class="setting-description">Enviar link do seu perfil</div>
                </div>
                <q-icon name="share" />
              </div>

              <div class="setting-item clickable" @click="downloadResume">
                <div class="setting-info">
                  <div class="setting-label">Baixar Currículo</div>
                  <div class="setting-description">Download em PDF</div>
                </div>
                <q-icon name="download" />
              </div>

              <div class="setting-item clickable danger" @click="showLogoutDialog">
                <div class="setting-info">
                  <div class="setting-label">Sair da Conta</div>
                  <div class="setting-description">Fazer logout do aplicativo</div>
                </div>
                <q-icon name="logout" />
              </div>
            </div>
          </div>
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

    <!-- Bottom Navigation -->
    <div class="bottom-nav">
      <q-btn flat class="nav-btn" icon="home" @click="$router.push('/index')" />
      <q-btn flat class="nav-btn" icon="chat_bubble_outline" @click="$router.push('/chat')" />
      <q-btn flat class="nav-btn" icon="group" @click="$router.push('/descubra')" />
      <q-btn flat class="nav-btn active" icon="work" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado da aplicação
const activeTab = ref('categorias')
const editMode = ref(false)
const showLogout = ref(false)
const showConfirmation = ref(false)
const confirmationMessage = ref('')
const selectedJob = ref(null)
const filtroCategoria = ref(null)
const notificationCount = ref(3)

// Dados do freelancer
const freelancerProfile = reactive({
  nome: 'Joana da Silva',
  categoria: 'Design Gráfico',
  email: 'joana@email.com',
  telefone: '(11) 91234-5678',
  rating: 4.8,
  avaliacoes: 127,
  projetos: 84,
  clientes: 52,
  ganhos: '12.5k',
  avatar: 'https://via.placeholder.com/120',
  descricao: 'Designer gráfica especializada em identidade visual e branding.',
  portfolio: [
    {
      imagem: 'https://via.placeholder.com/200x150',
      titulo: 'Logo Moderna',
      categoria: 'Branding',
    },
    {
      imagem: 'https://via.placeholder.com/200x150',
      titulo: 'Website Design',
      categoria: 'Web Design',
    },
    {
      imagem: 'https://via.placeholder.com/200x150',
      titulo: 'Cartão Visita',
      categoria: 'Print Design',
    },
  ],
  habilidades: ['Photoshop', 'Illustrator', 'Figma', 'Branding', 'UI/UX', 'Typography'],
})

// Formulário de edição
const editForm = reactive({
  nome: '',
  email: '',
  categoria: '',
  descricao: '',
})

// Configurações
const settings = reactive({
  disponivel: true,
  notificacoes: true,
})

// Categorias
const categorias = ref([
  { nome: 'Design Gráfico', icon: 'design_services', vagas: 45 },
  { nome: 'Desenvolvimento', icon: 'code', vagas: 32 },
  { nome: 'Escrita e Tradução', icon: 'edit', vagas: 28 },
  { nome: 'Marketing Digital', icon: 'campaign', vagas: 21 },
  { nome: 'Vídeo e Animação', icon: 'videocam', vagas: 18 },
  { nome: 'Música e Áudio', icon: 'music_note', vagas: 12 },
  { nome: 'Consultoria', icon: 'business', vagas: 15 },
  { nome: 'Educação', icon: 'school', vagas: 9 },
])

// Vagas disponíveis
const vagas = ref([
  {
    id: 1,
    logo: 'https://via.placeholder.com/60',
    titulo: 'Criação de Identidade Visual',
    avaliacao: '4.2',
    descricao: 'Desenvolvimento completo de marca para empresa de cosméticos naturais.',
    descricaoCompleta:
      'Estamos procurando um(a) designer gráfico(a) talentoso(a) e comprometido(a) para desenvolver a identidade visual de uma nova marca de cosméticos naturais. O projeto busca transmitir uma estética leve, moderna e sofisticada, alinhada com os valores de sustentabilidade e bem-estar da marca.',
    categoria: 'Design Gráfico',
    valor: 'R$ 650,00',
    prazo: '7 dias',
    local: 'Remoto',
    requisitos: [
      'Criação de logotipo principal e variações',
      'Definição de paleta de cores',
      'Escolha de tipografias e combinações',
      'Criação de elementos gráficos complementares',
      'Entrega do material em PDF e imagens',
    ],
  },
  {
    id: 2,
    logo: 'https://via.placeholder.com/60',
    titulo: 'Redatora para Blog',
    avaliacao: '4.5',
    descricao: 'Criação de conteúdo para blog de lifestyle e bem-estar.',
    descricaoCompleta:
      'Buscamos redatora criativa para produzir conteúdo de qualidade para blog focado em lifestyle, bem-estar e desenvolvimento pessoal.',
    categoria: 'Escrita e Tradução',
    valor: 'R$ 300,00',
    prazo: '5 dias',
    local: 'Remoto',
    requisitos: [
      '3 artigos de 800-1000 palavras',
      'Pesquisa de palavras-chave',
      'Otimização para SEO',
      'Revisão e edição',
    ],
  },
  {
    id: 3,
    logo: 'https://via.placeholder.com/60',
    titulo: 'Desenvolvimento Landing Page',
    avaliacao: '4.7',
    descricao: 'Criação de landing page responsiva para campanha de marketing.',
    descricaoCompleta:
      'Desenvolvimento de landing page moderna e responsiva para campanha de lançamento de produto.',
    categoria: 'Desenvolvimento',
    valor: 'R$ 800,00',
    prazo: '10 dias',
    local: 'Remoto',
    requisitos: [
      'Design responsivo',
      'Integração com formulários',
      'Otimização de performance',
      'Testes em diferentes dispositivos',
    ],
  },
])

// Computed
const categoriaOptions = computed(() =>
  categorias.value.map((cat) => ({ label: cat.nome, value: cat.nome })),
)

const vagasFiltradas = computed(() => {
  if (!filtroCategoria.value) return vagas.value
  return vagas.value.filter((vaga) => vaga.categoria === filtroCategoria.value)
})

// Métodos
const selectCategory = (categoria) => {
  filtroCategoria.value = categoria.nome
  activeTab.value = 'vagas'
}

const selectJob = (job) => {
  selectedJob.value = job
}

const applyToJob = (job) => {
  confirmationMessage.value = `Candidatura enviada para "${job.titulo}" com sucesso!`
  showConfirmation.value = true
  selectedJob.value = null
}

const enableEditMode = () => {
  editMode.value = true
  editForm.nome = freelancerProfile.nome
  editForm.email = freelancerProfile.email
  editForm.categoria = freelancerProfile.categoria
  editForm.descricao = freelancerProfile.descricao
}

const cancelEdit = () => {
  editMode.value = false
  Object.assign(editForm, { nome: '', email: '', categoria: '', descricao: '' })
}

const saveProfile = () => {
  Object.assign(freelancerProfile, editForm)
  editMode.value = false
  confirmationMessage.value = 'Perfil atualizado com sucesso!'
  showConfirmation.value = true
}

const shareProfile = () => {
  confirmationMessage.value = 'Link do perfil copiado para a área de transferência!'
  showConfirmation.value = true
}

const downloadResume = () => {
  confirmationMessage.value = 'Currículo baixado com sucesso!'
  showConfirmation.value = true
}

const showLogoutDialog = () => {
  showLogout.value = true
}

const logout = () => {
  showLogout.value = false
  router.push('/login')
}
</script>

<style scoped>
@import '../css/quasar.variables.scss';

/* Layout Principal */
.freelancer-page {
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
.notification-btn {
  color: #00b894;
  transition: all 0.3s ease;
}

.back-btn:hover,
.notification-btn:hover {
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
  border: 3px solid #1a1a1a;
  border-radius: 50%;
}

.avatar-status.online {
  background: #2ecc71;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: #00b894;
  margin: 0 0 8px 0;
}

.profile-category {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 12px 0;
  font-size: 1.1rem;
}

.rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.rating-text {
  font-weight: 600;
  font-size: 1.1rem;
}

.rating-count {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.profile-stats {
  display: flex;
  gap: 32px;
  justify-content: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-number {
  font-size: 1.2rem;
  font-weight: 600;
  color: #00b894;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
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

/* Section Headers */
.section-header {
  margin-bottom: 24px;
  text-align: center;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #00b894;
  margin: 0 0 8px 0;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Categories Grid */
.categories-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(0, 184, 148, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  background: rgba(0, 184, 148, 0.1);
  border-color: rgba(0, 184, 148, 0.3);
  transform: translateY(-2px);
}

.category-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(0, 184, 148, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00b894;
  margin-right: 16px;
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.category-count {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.category-arrow {
  color: rgba(255, 255, 255, 0.4);
}

/* Jobs List */
.filter-section {
  margin-top: 12px;
}

.filter-select {
  max-width: 250px;
}

.jobs-list {
  margin-top: 20px;
}

.job-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid rgba(0, 184, 148, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.job-card:hover {
  background: rgba(0, 184, 148, 0.1);
  border-color: rgba(0, 184, 148, 0.3);
  transform: translateY(-2px);
}

.job-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.job-card-info {
  flex: 1;
  margin-left: 12px;
}

.job-card-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 4px 0;
}

.job-card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.7);
}

.job-card-price {
  font-weight: 600;
  color: #00b894;
  font-size: 1.1rem;
}

.job-card-description {
  margin: 0 0 12px 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.job-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.job-category {
  background: rgba(0, 184, 148, 0.2);
  color: #00b894;
  padding: 4px 8px;
  border-radius: 8px;
}

/* Job Details */
.job-details-container {
  margin-top: 20px;
}

.job-details-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.job-details-header h4 {
  margin: 0;
  color: #00b894;
}

.back-to-list-btn {
  color: #00b894;
}

.job-details-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 24px;
  border: 1px solid rgba(0, 184, 148, 0.1);
}

.job-header {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
}

.job-title-section {
  flex: 1;
}

.job-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.company-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.7);
}

.job-content h5 {
  color: #00b894;
  margin: 0 0 12px 0;
  font-size: 1.1rem;
}

.job-description p {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 20px 0;
}

.job-requirements ul {
  margin: 0 0 20px 0;
  padding-left: 20px;
}

.job-requirements li {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  line-height: 1.4;
}

.job-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.detail-value {
  font-weight: 500;
}

.detail-value.price {
  color: #00b894;
  font-size: 1.1rem;
  font-weight: 600;
}

.apply-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
  border-radius: 12px;
  font-weight: 500;
  margin-top: 20px;
}

/* No Jobs */
.no-jobs {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.no-jobs h4 {
  margin: 16px 0 8px 0;
}

.no-jobs p {
  margin: 0;
}

/* Profile Sections */
.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.profile-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 24px;
  border: 1px solid rgba(0, 184, 148, 0.1);
}

.subsection-title {
  color: #00b894;
  margin: 0 0 20px 0;
  font-size: 1.1rem;
  font-weight: 600;
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
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
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

/* Portfolio */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.portfolio-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.portfolio-item:hover {
  transform: scale(1.05);
}

.portfolio-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 16px;
  color: white;
}

.portfolio-overlay h6 {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.portfolio-overlay p {
  margin: 0;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Skills */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: rgba(0, 184, 148, 0.2);
  color: #00b894;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Form */
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

.edit-btn {
  color: #00b894;
}

/* Settings */
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-group {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
}

.group-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #00b894;
  margin: 0 0 16px 0;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
}

.setting-item.clickable:hover {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px 12px;
  margin: 0 -12px;
}

.setting-item.danger .setting-label {
  color: #ff3b30;
}

.setting-label {
  font-weight: 500;
  margin-bottom: 4px;
}

.setting-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
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

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 184, 148, 0.2);
  display: flex;
  justify-content: space-around;
  padding: 12px 0 max(12px, env(safe-area-inset-bottom));
}

.nav-btn {
  color: rgba(255, 255, 255, 0.6);
  flex: 1;
  transition: all 0.3s ease;
}

.nav-btn.active {
  color: #00b894;
}

.nav-btn:hover {
  color: #00b894;
  transform: scale(1.1);
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

  .profile-stats {
    gap: 20px;
  }

  .job-header {
    flex-direction: column;
    text-align: center;
  }

  .job-details-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .categories-grid .category-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .category-icon {
    margin-right: 0;
  }
}
</style>
