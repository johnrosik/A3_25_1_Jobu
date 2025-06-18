<template>
  <q-page class="interest-page">
    <!-- Header -->
    <div class="interest-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="back-btn" @click="$router.back()" />
        <div class="header-title">Seus Interesses</div>
        <q-btn
          flat
          round
          icon="favorite"
          class="fav-btn"
          :badge="favoriteCount"
          badge-color="red"
        />
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="interest-content">
      <!-- Estatísticas -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-number">{{ interests.length }}</div>
          <div class="stat-label">Perfis Salvos</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ appliedCount }}</div>
          <div class="stat-label">Candidaturas</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ watchingCount }}</div>
          <div class="stat-label">Acompanhando</div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="filter-section">
        <q-btn-toggle
          v-model="currentFilter"
          :options="filterOptions"
          color="teal"
          class="filter-toggle"
        />
      </div>

      <!-- Lista de interesses -->
      <div class="interests-list">
        <div v-for="interest in filteredInterests" :key="interest.id" class="interest-card">
          <div class="interest-header">
            <q-avatar size="60px" class="interest-avatar">
              <img :src="interest.avatar" :alt="interest.nome" />
            </q-avatar>

            <div class="interest-info">
              <h4 class="interest-name">{{ interest.nome }}</h4>
              <p class="interest-specialty">{{ interest.especialidade }}</p>
              <div class="interest-rating">
                <q-icon name="star" color="amber" />
                <span>{{ interest.rating }}</span>
                <span class="rating-count">({{ interest.avaliacoes }})</span>
              </div>
            </div>

            <div class="interest-actions">
              <q-btn
                flat
                round
                :icon="interest.favorito ? 'favorite' : 'favorite_border'"
                :color="interest.favorito ? 'red' : 'grey'"
                @click="toggleFavorite(interest)"
                size="sm"
              />
              <q-btn flat round icon="more_vert" color="grey" size="sm">
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

          <p class="interest-description">{{ interest.descricao }}</p>

          <div class="interest-tags">
            <q-chip
              v-for="(tag, index) in interest.habilidades.slice(0, 3)"
              :key="index"
              color="teal"
              text-color="white"
              size="sm"
            >
              {{ tag }}
            </q-chip>
            <span v-if="interest.habilidades.length > 3" class="more-tags">
              +{{ interest.habilidades.length - 3 }} mais
            </span>
          </div>

          <div class="interest-footer">
            <div class="price-info">
              <span class="price">A partir de R$ {{ interest.precoMinimo }}</span>
              <span class="time">{{ interest.tempoResposta }}</span>
            </div>

            <div class="action-buttons">
              <q-btn
                flat
                color="teal"
                label="Ver Portfolio"
                icon="work"
                @click="viewPortfolio(interest)"
                size="sm"
              />
              <q-btn
                color="teal"
                label="Contratar"
                icon="handshake"
                @click="hireFreelancer(interest)"
                size="sm"
              />
            </div>
          </div>

          <!-- Status da interação -->
          <div v-if="interest.status" class="interaction-status">
            <q-icon
              :name="getStatusIcon(interest.status)"
              :color="getStatusColor(interest.status)"
            />
            <span>{{ getStatusText(interest.status) }}</span>
          </div>
        </div>

        <!-- Estado vazio -->
        <div v-if="filteredInterests.length === 0" class="empty-state">
          <q-icon name="favorite_border" size="64px" color="grey" />
          <h4>Nenhum interesse encontrado</h4>
          <p>Explore freelancers e adicione aos seus favoritos</p>
          <q-btn
            color="teal"
            label="Explorar Freelancers"
            icon="search"
            @click="$router.push('/freelancer-hub')"
          />
        </div>
      </div>

      <!-- Navegação de demonstração -->
      <div class="demo-navigation">
        <q-btn
          flat
          color="teal"
          label="Ver Freelancers"
          icon="work"
          @click="$router.push('/freelancer-hub')"
          size="sm"
        />
        <q-btn
          flat
          color="teal"
          label="Meu Perfil"
          icon="person"
          @click="$router.push('/client-profile')"
          size="sm"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado
const currentFilter = ref('todos')
const favoriteCount = ref(3)
const appliedCount = ref(5)
const watchingCount = ref(8)

// Opções de filtro
const filterOptions = [
  { label: 'Todos', value: 'todos' },
  { label: 'Favoritos', value: 'favoritos' },
  { label: 'Candidaturas', value: 'candidaturas' },
  { label: 'Acompanhando', value: 'acompanhando' },
]

// Dados de exemplo
const interests = ref([
  {
    id: 1,
    nome: 'Marina Silva',
    especialidade: 'Design Gráfico & Branding',
    avatar: 'https://via.placeholder.com/60',
    rating: 4.9,
    avaliacoes: 127,
    descricao:
      'Especialista em identidade visual e branding. Crio logos únicos e memoráveis que conectam marcas aos seus públicos.',
    habilidades: ['Illustrator', 'Photoshop', 'Branding', 'Logo Design', 'Typography'],
    precoMinimo: 350,
    tempoResposta: 'Responde em 2h',
    favorito: true,
    status: 'favorito',
  },
  {
    id: 2,
    nome: 'Carlos Mendes',
    especialidade: 'Desenvolvimento Web',
    avatar: 'https://via.placeholder.com/60',
    rating: 4.8,
    avaliacoes: 89,
    descricao:
      'Desenvolvedor full-stack especializado em React e Node.js. Crio aplicações web modernas e responsivas.',
    habilidades: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'API Rest'],
    precoMinimo: 800,
    tempoResposta: 'Responde em 1h',
    favorito: false,
    status: 'candidatura',
  },
  {
    id: 3,
    nome: 'Ana Costa',
    especialidade: 'Redação & Copywriting',
    avatar: 'https://via.placeholder.com/60',
    rating: 4.7,
    avaliacoes: 156,
    descricao:
      'Redatora criativa especializada em conteúdo para blogs, sites e mídias sociais. SEO otimizado.',
    habilidades: ['Copywriting', 'SEO', 'Content Marketing', 'Blog Posts', 'Social Media'],
    precoMinimo: 120,
    tempoResposta: 'Responde em 30min',
    favorito: true,
    status: 'acompanhando',
  },
])

// Computed
const filteredInterests = computed(() => {
  switch (currentFilter.value) {
    case 'favoritos':
      return interests.value.filter((i) => i.favorito)
    case 'candidaturas':
      return interests.value.filter((i) => i.status === 'candidatura')
    case 'acompanhando':
      return interests.value.filter((i) => i.status === 'acompanhando')
    default:
      return interests.value
  }
})

// Métodos
const toggleFavorite = (interest) => {
  interest.favorito = !interest.favorito
  if (interest.favorito) {
    favoriteCount.value++
  } else {
    favoriteCount.value--
  }
}

const viewProfile = (interest) => {
  console.log('Ver perfil:', interest.nome)
  router.push('/freelancer-hub')
}

const sendMessage = (interest) => {
  console.log('Enviar mensagem para:', interest.nome)
}

const removeInterest = (interest) => {
  const index = interests.value.findIndex((i) => i.id === interest.id)
  if (index > -1) {
    interests.value.splice(index, 1)
  }
}

const viewPortfolio = (interest) => {
  console.log('Ver portfolio:', interest.nome)
  router.push('/freelancer-hub')
}

const hireFreelancer = (interest) => {
  console.log('Contratar:', interest.nome)
  router.push('/pagamento')
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'favorito':
      return 'favorite'
    case 'candidatura':
      return 'send'
    case 'acompanhando':
      return 'visibility'
    default:
      return 'info'
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'favorito':
      return 'red'
    case 'candidatura':
      return 'blue'
    case 'acompanhando':
      return 'orange'
    default:
      return 'grey'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'favorito':
      return 'Adicionado aos favoritos'
    case 'candidatura':
      return 'Candidatura enviada'
    case 'acompanhando':
      return 'Acompanhando perfil'
    default:
      return 'Status desconhecido'
  }
}
</script>

<style scoped>
.interest-page {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  min-height: 100vh;
  color: white;
}

/* Header */
.interest-header {
  background: linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 184, 148, 0.05) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 184, 148, 0.2);
  padding: 16px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #00b894;
}

.back-btn,
.fav-btn {
  color: #00b894;
  transition: all 0.3s ease;
}

.back-btn:hover,
.fav-btn:hover {
  color: white;
  transform: scale(1.1);
}

/* Conteúdo */
.interest-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 20px;
}

/* Estatísticas */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  border: 1px solid rgba(0, 184, 148, 0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 600;
  color: #00b894;
  margin-bottom: 8px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* Filtros */
.filter-section {
  margin-bottom: 32px;
  text-align: center;
}

.filter-toggle :deep(.q-btn) {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 4px;
}

/* Lista de interesses */
.interests-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.interest-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(0, 184, 148, 0.1);
  transition: all 0.3s ease;
}

.interest-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 184, 148, 0.3);
  transform: translateY(-4px);
}

.interest-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.interest-avatar {
  border: 2px solid #00b894;
}

.interest-info {
  flex: 1;
}

.interest-name {
  margin: 0 0 4px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.interest-specialty {
  margin: 0 0 8px 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.interest-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
}

.rating-count {
  color: rgba(255, 255, 255, 0.6);
}

.interest-actions {
  display: flex;
  gap: 8px;
}

.interest-description {
  margin: 0 0 16px 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
}

.more-tags {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
}

.interest-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price {
  font-weight: 600;
  color: #00b894;
}

.time {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.interaction-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(0, 184, 148, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 184, 148, 0.2);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Estado vazio */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.empty-state h4 {
  margin: 16px 0 8px 0;
  color: rgba(255, 255, 255, 0.8);
}

.empty-state p {
  margin: 0 0 24px 0;
}

/* Navegação de demonstração */
.demo-navigation {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsivo */
@media (max-width: 768px) {
  .interest-content {
    padding: 20px 16px;
  }

  .header-content {
    padding: 0 16px;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .interest-footer {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }

  .demo-navigation {
    flex-direction: column;
  }
}
</style>

<q-item-section>
            <q-item-label lines="1">Redatora Publicitária</q-item-label>
            <q-item-label style="color: #eceff1" caption lines="2">
              Produzo resenhas, fichamentos, artigos acadêmicos e TCCs conforme ABNT. Atendimento
              humanizado e sigiloso.
            </q-item-label>
          </q-item-section>
