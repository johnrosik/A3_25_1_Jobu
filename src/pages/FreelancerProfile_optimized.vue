<template>
  <q-page class="jobu-page">
    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="$router.back()" />
        <div class="header-title">Freelancer Hub</div>
        <q-btn
          flat
          round
          icon="notifications"
          class="jobu-btn--ghost"
          :badge="notificationCount > 0 ? notificationCount : undefined"
          badge-color="red"
        />
      </div>
    </div>

    <!-- Profile Card -->
    <div class="jobu-content">
      <div class="profile-section jobu-card jobu-card--large jobu-mb-xl">
        <div class="profile-header jobu-flex jobu-items-center jobu-gap-lg jobu-mb-lg">
          <div class="avatar-container jobu-relative">
            <q-avatar size="120px" class="jobu-avatar--large">
              <img :src="freelancerProfile.avatar" alt="Profile" />
            </q-avatar>
            <div class="avatar-status jobu-status--online"></div>
          </div>

          <div class="profile-info jobu-flex-1">
            <h3 class="jobu-text-2xl jobu-font-bold jobu-text-accent jobu-mb-sm">
              {{ freelancerProfile.nome }}
            </h3>
            <p class="jobu-text-lg jobu-text-secondary jobu-mb-md">
              {{ freelancerProfile.categoria }}
            </p>

            <div class="rating-section jobu-flex jobu-items-center jobu-gap-xs jobu-mb-lg">
              <q-icon name="star" color="amber" size="20px" />
              <span class="jobu-text-semibold">{{ freelancerProfile.rating }}</span>
              <span class="jobu-text-sm jobu-text-secondary">
                ({{ freelancerProfile.avaliacoes }} avaliações)
              </span>
            </div>

            <div class="profile-stats jobu-flex jobu-gap-lg">
              <div class="stat-item jobu-text-center">
                <div class="jobu-text-xl jobu-font-bold jobu-text-accent">
                  {{ freelancerProfile.projetos }}
                </div>
                <div class="jobu-text-sm jobu-text-secondary">Projetos</div>
              </div>
              <div class="stat-item jobu-text-center">
                <div class="jobu-text-xl jobu-font-bold jobu-text-accent">
                  {{ freelancerProfile.clientes }}
                </div>
                <div class="jobu-text-sm jobu-text-secondary">Clientes</div>
              </div>
              <div class="stat-item jobu-text-center">
                <div class="jobu-text-xl jobu-font-bold jobu-text-accent">
                  R$ {{ freelancerProfile.ganhos }}
                </div>
                <div class="jobu-text-sm jobu-text-secondary">Ganhos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="tabs-section jobu-mb-lg">
        <q-tabs
          v-model="activeTab"
          class="jobu-tabs"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="categorias" icon="category" label="Categorias" class="jobu-tab" />
          <q-tab name="vagas" icon="work" label="Vagas" class="jobu-tab" />
          <q-tab name="perfil" icon="person" label="Perfil" class="jobu-tab" />
          <q-tab name="config" icon="settings" label="Config" class="jobu-tab" />
        </q-tabs>
      </div>

      <!-- Tab Panels -->
      <q-tab-panels
        v-model="activeTab"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <!-- Categorias Tab -->
        <q-tab-panel name="categorias">
          <div class="jobu-section">
            <h4 class="jobu-section-title jobu-text-accent jobu-mb-md">Explore Categorias</h4>
            <p class="jobu-text-secondary jobu-mb-lg">Encontre trabalhos na sua área</p>

            <div class="categories-grid jobu-grid--2-cols jobu-gap-md">
              <div
                v-for="(categoria, index) in categorias"
                :key="index"
                class="category-card jobu-card jobu-card--interactive jobu-flex jobu-items-center jobu-gap-md"
                @click="selectCategory(categoria)"
              >
                <div class="category-icon">
                  <q-icon :name="categoria.icon" size="32px" class="jobu-text-accent" />
                </div>
                <div class="category-info">
                  <div class="jobu-text-semibold">{{ categoria.nome }}</div>
                  <div class="jobu-text-sm jobu-text-secondary">{{ categoria.vagas }} vagas</div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <!-- Vagas Tab -->
        <q-tab-panel name="vagas">
          <div class="jobu-section">
            <h4 class="jobu-section-title jobu-text-accent jobu-mb-lg">Vagas Disponíveis</h4>

            <div v-if="loading" class="jobu-text-center jobu-p-lg">
              <q-spinner size="40px" class="jobu-text-accent" />
              <div class="jobu-text-secondary jobu-mt-md">Carregando vagas...</div>
            </div>

            <div v-else class="vagas-list jobu-space-y-md">
              <div
                v-for="vaga in vagas"
                :key="vaga.id"
                class="vaga-card jobu-card jobu-card--interactive"
                @click="selectVaga(vaga)"
              >
                <div
                  class="vaga-header jobu-flex jobu-items-center jobu-justify-between jobu-mb-md"
                >
                  <h5 class="jobu-text-lg jobu-font-semibold jobu-text-accent">
                    {{ vaga.titulo }}
                  </h5>
                  <div class="vaga-price jobu-text-xl jobu-font-bold jobu-text-success">
                    R$ {{ vaga.preco }}
                  </div>
                </div>

                <p class="jobu-text-secondary jobu-mb-md">{{ vaga.descricao }}</p>

                <div class="vaga-footer jobu-flex jobu-items-center jobu-justify-between">
                  <div class="vaga-meta jobu-flex jobu-items-center jobu-gap-sm">
                    <q-icon name="schedule" size="16px" class="jobu-text-secondary" />
                    <span class="jobu-text-sm jobu-text-secondary">{{ vaga.prazo }}</span>
                  </div>
                  <q-btn
                    label="Candidatar"
                    class="jobu-btn jobu-btn--primary jobu-btn--small"
                    @click.stop="candidatar(vaga.id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <!-- Perfil Tab -->
        <q-tab-panel name="perfil">
          <div class="jobu-section">
            <h4 class="jobu-section-title jobu-text-accent jobu-mb-lg">Meu Perfil</h4>

            <div class="profile-details jobu-space-y-lg">
              <div class="profile-field jobu-card">
                <label class="jobu-text-sm jobu-text-secondary jobu-mb-xs">Nome Completo</label>
                <q-input
                  v-model="editableProfile.nome"
                  class="jobu-input"
                  outlined
                  :readonly="!editMode"
                />
              </div>

              <div class="profile-field jobu-card">
                <label class="jobu-text-sm jobu-text-secondary jobu-mb-xs">Categoria</label>
                <q-select
                  v-model="editableProfile.categoria"
                  :options="categoriaOptions"
                  class="jobu-select"
                  outlined
                  :readonly="!editMode"
                />
              </div>

              <div class="profile-field jobu-card">
                <label class="jobu-text-sm jobu-text-secondary jobu-mb-xs">Descrição</label>
                <q-input
                  v-model="editableProfile.descricao"
                  class="jobu-textarea"
                  type="textarea"
                  outlined
                  :readonly="!editMode"
                  rows="4"
                />
              </div>

              <div class="profile-actions jobu-flex jobu-gap-md">
                <q-btn
                  v-if="!editMode"
                  label="Editar Perfil"
                  class="jobu-btn jobu-btn--primary"
                  @click="editMode = true"
                />
                <template v-else>
                  <q-btn label="Cancelar" class="jobu-btn jobu-btn--ghost" @click="cancelEdit" />
                  <q-btn label="Salvar" class="jobu-btn jobu-btn--primary" @click="saveProfile" />
                </template>
              </div>
            </div>
          </div>
        </q-tab-panel>

        <!-- Config Tab -->
        <q-tab-panel name="config">
          <div class="jobu-section">
            <h4 class="jobu-section-title jobu-text-accent jobu-mb-lg">Configurações</h4>

            <div class="config-options jobu-space-y-md">
              <div class="config-item jobu-card jobu-flex jobu-items-center jobu-justify-between">
                <div>
                  <div class="jobu-text-semibold">Notificações</div>
                  <div class="jobu-text-sm jobu-text-secondary">
                    Receber notificações de novas vagas
                  </div>
                </div>
                <q-toggle v-model="config.notifications" />
              </div>

              <div class="config-item jobu-card jobu-flex jobu-items-center jobu-justify-between">
                <div>
                  <div class="jobu-text-semibold">Perfil Público</div>
                  <div class="jobu-text-sm jobu-text-secondary">
                    Permitir que clientes encontrem seu perfil
                  </div>
                </div>
                <q-toggle v-model="config.publicProfile" />
              </div>

              <div class="config-item jobu-card jobu-flex jobu-items-center jobu-justify-between">
                <div>
                  <div class="jobu-text-semibold">Modo Escuro</div>
                  <div class="jobu-text-sm jobu-text-secondary">Usar tema escuro na interface</div>
                </div>
                <q-toggle v-model="config.darkMode" />
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const activeTab = ref('categorias')
const loading = ref(false)
const editMode = ref(false)
const notificationCount = ref(3)

// Profile data
const freelancerProfile = ref({
  nome: 'João Silva',
  categoria: 'Desenvolvedor Full Stack',
  avatar: 'https://via.placeholder.com/120',
  rating: 4.8,
  avaliacoes: 42,
  projetos: 28,
  clientes: 15,
  ganhos: '12.500',
  descricao:
    'Desenvolvedor experiente com foco em aplicações web modernas usando Vue.js, Node.js e PostgreSQL.',
})

const editableProfile = ref({ ...freelancerProfile.value })

// Categories data
const categorias = ref([
  { nome: 'Desenvolvimento Web', icon: 'code', vagas: 12 },
  { nome: 'Design Gráfico', icon: 'palette', vagas: 8 },
  { nome: 'Marketing Digital', icon: 'campaign', vagas: 15 },
  { nome: 'Redação', icon: 'edit', vagas: 6 },
  { nome: 'Tradução', icon: 'translate', vagas: 4 },
  { nome: 'Consultoria', icon: 'business', vagas: 9 },
])

// Jobs data
const vagas = ref([
  {
    id: 1,
    titulo: 'Desenvolvimento de E-commerce',
    descricao: 'Criação de loja virtual completa com integração de pagamento.',
    preco: '2.500',
    prazo: '15 dias',
  },
  {
    id: 2,
    titulo: 'App Mobile React Native',
    descricao: 'Desenvolvimento de aplicativo para iOS e Android.',
    preco: '3.800',
    prazo: '30 dias',
  },
  {
    id: 3,
    titulo: 'Website Institucional',
    descricao: 'Site responsivo para empresa de consultoria.',
    preco: '1.200',
    prazo: '10 dias',
  },
])

// Configuration
const config = ref({
  notifications: true,
  publicProfile: true,
  darkMode: false,
})

// Options
const categoriaOptions = [
  'Desenvolvedor Full Stack',
  'Desenvolvedor Frontend',
  'Desenvolvedor Backend',
  'Designer UI/UX',
  'Designer Gráfico',
  'Copywriter',
  'Tradutor',
  'Consultor',
]

// Methods
const selectCategory = (categoria) => {
  console.log('Categoria selecionada:', categoria)
  // Navegar para lista de vagas da categoria
}

const selectVaga = (vaga) => {
  console.log('Vaga selecionada:', vaga)
  // Navegar para detalhes da vaga
}

const candidatar = (vagaId) => {
  console.log('Candidatar para vaga:', vagaId)
  // Lógica para candidatar-se à vaga
}

const cancelEdit = () => {
  editMode.value = false
  editableProfile.value = { ...freelancerProfile.value }
}

const saveProfile = () => {
  freelancerProfile.value = { ...editableProfile.value }
  editMode.value = false
  // Aqui você salvaria no backend
  console.log('Perfil salvo:', freelancerProfile.value)
}

onMounted(() => {
  // Carregar dados do perfil
  console.log('FreelancerProfile montado')
})
</script>

<style scoped>
/* Estilos específicos para esta página */
.avatar-container {
  position: relative;
}

.avatar-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid var(--jobu-bg-primary);
}

.jobu-status--online {
  background-color: var(--jobu-success);
}

.profile-stats {
  border-top: 1px solid var(--jobu-border-divider);
  padding-top: var(--jobu-space-md);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--jobu-space-md);
}

.vaga-card:hover {
  transform: translateY(-2px);
}

.config-item {
  padding: var(--jobu-space-lg);
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-stats {
    justify-content: center;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
