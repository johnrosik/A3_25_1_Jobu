<template>
  <q-page class="jobu-page">
    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="$router.back()" />
        <div class="header-title">Seus Interesses</div>
        <q-btn
          flat
          round
          icon="favorite"
          class="jobu-btn--ghost"
          :class="{ 'text-red': favoriteCount > 0 }"
        >
          <q-badge v-if="favoriteCount > 0" color="red" floating>{{ favoriteCount }}</q-badge>
        </q-btn>
      </div>
    </div>

    <!-- Content -->
    <div class="jobu-content">
      <!-- Stats Section -->
      <div class="stats-section jobu-grid--3-cols jobu-gap-md jobu-mb-xl">
        <div class="stat-card jobu-card jobu-text-center">
          <div class="stat-number jobu-text-2xl jobu-font-bold jobu-text-accent">
            {{ interests.length }}
          </div>
          <div class="stat-label jobu-text-sm jobu-text-secondary">Perfis Salvos</div>
        </div>
        <div class="stat-card jobu-card jobu-text-center">
          <div class="stat-number jobu-text-2xl jobu-font-bold jobu-text-accent">
            {{ appliedCount }}
          </div>
          <div class="stat-label jobu-text-sm jobu-text-secondary">Candidaturas</div>
        </div>
        <div class="stat-card jobu-card jobu-text-center">
          <div class="stat-number jobu-text-2xl jobu-font-bold jobu-text-accent">
            {{ watchingCount }}
          </div>
          <div class="stat-label jobu-text-sm jobu-text-secondary">Acompanhando</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-section jobu-mb-lg">
        <q-btn-toggle
          v-model="currentFilter"
          :options="filterOptions"
          color="teal"
          class="filter-toggle"
        />
      </div>

      <!-- Interests List -->
      <div class="interests-list">
        <div
          v-for="interest in filteredInterests"
          :key="interest.id"
          class="interest-card jobu-card jobu-card--interactive jobu-mb-md"
        >
          <!-- Header -->
          <div class="interest-header jobu-flex jobu-items-center jobu-gap-md jobu-mb-md">
            <q-avatar size="60px">
              <img :src="interest.avatar" :alt="interest.nome" />
            </q-avatar>

            <div class="interest-info jobu-flex-1">
              <h4 class="interest-name jobu-font-semibold jobu-text-primary jobu-mb-xs">
                {{ interest.nome }}
              </h4>
              <p class="interest-specialty jobu-text-secondary jobu-mb-xs">
                {{ interest.especialidade }}
              </p>
              <div class="interest-rating jobu-flex jobu-items-center jobu-gap-xs">
                <q-icon name="star" color="amber" size="16px" />
                <span class="jobu-text-sm">{{ interest.rating }}</span>
                <span class="rating-count jobu-text-xs jobu-text-secondary">
                  ({{ interest.avaliacoes }})
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="interest-actions jobu-flex jobu-gap-xs">
              <q-btn
                flat
                round
                :icon="interest.favorito ? 'favorite' : 'favorite_border'"
                :color="interest.favorito ? 'red' : 'grey'"
                @click="toggleFavorite(interest)"
                size="sm"
                class="jobu-btn--ghost"
              />
              <q-btn flat round icon="more_vert" color="grey" size="sm" class="jobu-btn--ghost">
                <q-menu>
                  <q-list dense>
                    <q-item clickable @click="viewProfile(interest)">
                      <q-item-section>Ver Perfil</q-item-section>
                    </q-item>
                    <q-item clickable @click="sendMessage(interest)">
                      <q-item-section>Enviar Mensagem</q-item-section>
                    </q-item>
                    <q-item clickable @click="removeInterest(interest)">
                      <q-item-section>Remover</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>

          <!-- Description -->
          <p class="interest-description jobu-text-secondary jobu-mb-md">
            {{ interest.descricao }}
          </p>

          <!-- Tags -->
          <div class="interest-tags jobu-flex jobu-gap-xs jobu-mb-md">
            <q-chip
              v-for="(tag, index) in interest.habilidades.slice(0, 3)"
              :key="index"
              color="teal"
              text-color="white"
              size="sm"
              class="jobu-chip"
            >
              {{ tag }}
            </q-chip>
            <q-chip
              v-if="interest.habilidades.length > 3"
              color="grey-3"
              text-color="grey-8"
              size="sm"
              class="jobu-chip"
            >
              +{{ interest.habilidades.length - 3 }}
            </q-chip>
          </div>

          <!-- Status -->
          <div class="interest-status jobu-flex jobu-items-center jobu-justify-between">
            <div class="status-info jobu-flex jobu-items-center jobu-gap-sm">
              <q-icon
                :name="getStatusIcon(interest.status)"
                :color="getStatusColor(interest.status)"
                size="16px"
              />
              <span
                class="status-text jobu-text-sm"
                :class="`text-${getStatusColor(interest.status)}`"
              >
                {{ getStatusLabel(interest.status) }}
              </span>
            </div>

            <div class="action-buttons jobu-flex jobu-gap-sm">
              <q-btn
                v-if="interest.status === 'saved'"
                label="Candidatar-se"
                class="jobu-btn jobu-btn--primary jobu-btn--small"
                @click="applyToProject(interest)"
              />
              <q-btn
                v-if="interest.status === 'applied'"
                label="Ver Status"
                class="jobu-btn jobu-btn--outline jobu-btn--small"
                @click="viewApplication(interest)"
              />
              <q-btn
                label="Ver Perfil"
                class="jobu-btn jobu-btn--secondary jobu-btn--small"
                @click="viewProfile(interest)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredInterests.length === 0" class="empty-state jobu-text-center">
        <div class="jobu-card jobu-card--highlight">
          <div class="jobu-card-content">
            <q-icon name="bookmark_border" size="4rem" class="jobu-text-secondary jobu-mb-md" />
            <h4 class="jobu-text-xl jobu-font-semibold jobu-mb-md">Nenhum interesse encontrado</h4>
            <p class="jobu-text-secondary jobu-mb-lg">
              {{ getEmptyStateMessage() }}
            </p>
            <q-btn
              label="Explorar Perfis"
              class="jobu-btn jobu-btn--primary"
              @click="$router.push('/descubra')"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Filter state
const currentFilter = ref('all')

const filterOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Salvos', value: 'saved' },
  { label: 'Candidaturas', value: 'applied' },
  { label: 'Contratados', value: 'hired' },
]

// Sample data
const interests = ref([
  {
    id: 1,
    nome: 'Ana Silva',
    especialidade: 'Desenvolvedora Full Stack',
    rating: 4.9,
    avaliacoes: 127,
    favorito: true,
    status: 'applied',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    descricao: 'Especialista em Vue.js, Node.js e desenvolvimento de aplicações web modernas.',
    habilidades: ['Vue.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    dataAdicionado: '2024-01-15',
  },
  {
    id: 2,
    nome: 'Carlos Mendes',
    especialidade: 'Designer UX/UI',
    rating: 4.8,
    avaliacoes: 89,
    favorito: false,
    status: 'saved',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    descricao: 'Designer com foco em experiência do usuário e interfaces modernas.',
    habilidades: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    dataAdicionado: '2024-01-10',
  },
  {
    id: 3,
    nome: 'Maria Santos',
    especialidade: 'Redatora de Conteúdo',
    rating: 4.7,
    avaliacoes: 156,
    favorito: true,
    status: 'hired',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    descricao: 'Especialista em copywriting e marketing de conteúdo para diversas indústrias.',
    habilidades: ['Copywriting', 'SEO', 'Marketing Digital', 'Blog Posts'],
    dataAdicionado: '2024-01-05',
  },
])

// Computed properties
const filteredInterests = computed(() => {
  if (currentFilter.value === 'all') return interests.value
  return interests.value.filter((interest) => interest.status === currentFilter.value)
})

const favoriteCount = computed(() => {
  return interests.value.filter((interest) => interest.favorito).length
})

const appliedCount = computed(() => {
  return interests.value.filter((interest) => interest.status === 'applied').length
})

const watchingCount = computed(() => {
  return interests.value.filter((interest) => interest.status === 'saved').length
})

// Status helpers
const getStatusIcon = (status) => {
  switch (status) {
    case 'saved':
      return 'bookmark'
    case 'applied':
      return 'send'
    case 'hired':
      return 'check_circle'
    default:
      return 'help'
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'saved':
      return 'blue'
    case 'applied':
      return 'orange'
    case 'hired':
      return 'green'
    default:
      return 'grey'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'saved':
      return 'Salvo'
    case 'applied':
      return 'Candidatura Enviada'
    case 'hired':
      return 'Contratado'
    default:
      return 'Desconhecido'
  }
}

const getEmptyStateMessage = () => {
  switch (currentFilter.value) {
    case 'saved':
      return 'Você ainda não salvou nenhum perfil de interesse.'
    case 'applied':
      return 'Você ainda não se candidatou a nenhum projeto.'
    case 'hired':
      return 'Você ainda não foi contratado para nenhum projeto.'
    default:
      return 'Comece explorando perfis e salvando seus favoritos.'
  }
}

// Actions
const toggleFavorite = (interest) => {
  interest.favorito = !interest.favorito
  $q.notify({
    color: interest.favorito ? 'positive' : 'info',
    message: interest.favorito ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
    icon: interest.favorito ? 'favorite' : 'favorite_border',
  })
}

const viewProfile = (interest) => {
  router.push(`/freelancer/${interest.id}`)
}

const sendMessage = (interest) => {
  $q.notify({
    color: 'info',
    message: `Enviando mensagem para ${interest.nome}`,
    icon: 'message',
  })
}

const removeInterest = (interest) => {
  $q.dialog({
    title: 'Confirmar',
    message: `Deseja remover ${interest.nome} dos seus interesses?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    const index = interests.value.findIndex((i) => i.id === interest.id)
    if (index > -1) {
      interests.value.splice(index, 1)
      $q.notify({
        color: 'positive',
        message: 'Interesse removido com sucesso',
        icon: 'delete',
      })
    }
  })
}

const applyToProject = (interest) => {
  interest.status = 'applied'
  $q.notify({
    color: 'positive',
    message: `Candidatura enviada para ${interest.nome}`,
    icon: 'send',
  })
}

const viewApplication = (interest) => {
  $q.notify({
    color: 'info',
    message: `Visualizando candidatura para ${interest.nome}`,
    icon: 'visibility',
  })
}
</script>

<style lang="scss" scoped>
.stats-section {
  margin-bottom: var(--jobu-space-xl);

  .stat-card {
    padding: var(--jobu-space-lg);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
}

.filter-section {
  display: flex;
  justify-content: center;

  .filter-toggle {
    border-radius: 12px;
    overflow: hidden;
  }
}

.interests-list {
  .interest-card {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 184, 148, 0.15);
    }
  }
}

.interest-tags {
  flex-wrap: wrap;
}

.empty-state {
  margin-top: var(--jobu-space-xl);
}

// Mobile responsiveness
@media (max-width: 768px) {
  .stats-section {
    grid-template-columns: 1fr;
  }

  .interest-header {
    flex-direction: column;
    text-align: center;
  }

  .interest-actions,
  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .interest-status {
    flex-direction: column;
    gap: var(--jobu-space-md);
    align-items: stretch;
  }
}
</style>
