<template>
  <q-page class="filter-page">
    <!-- Header -->
    <div class="filter-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="back-btn" @click="$router.back()" />
        <div class="header-title">Filtros de Busca</div>
        <q-btn flat round icon="refresh" class="reset-btn" @click="resetFilters" />
      </div>
    </div>

    <!-- Conteúdo dos filtros -->
    <div class="filter-content">
      <!-- Categoria -->
      <div class="filter-section">
        <h4 class="filter-title">Categoria</h4>
        <q-select
          v-model="filters.categoria"
          :options="categoriaOptions"
          label="Selecione uma categoria"
          filled
          color="teal"
          class="filter-input"
        />
      </div>

      <!-- Preço -->
      <div class="filter-section">
        <h4 class="filter-title">Faixa de Preço</h4>
        <div class="price-range">
          <q-input
            v-model="filters.precoMin"
            label="Preço mínimo"
            type="number"
            prefix="R$"
            filled
            color="teal"
            class="price-input"
          />
          <q-input
            v-model="filters.precoMax"
            label="Preço máximo"
            type="number"
            prefix="R$"
            filled
            color="teal"
            class="price-input"
          />
        </div>
      </div>

      <!-- Avaliação -->
      <div class="filter-section">
        <h4 class="filter-title">Avaliação Mínima</h4>
        <q-slider
          v-model="filters.avaliacao"
          :min="0"
          :max="5"
          :step="0.5"
          label
          color="teal"
          class="rating-slider"
        />
        <div class="rating-display">
          <q-icon name="star" color="amber" />
          <span>{{ filters.avaliacao }}+ estrelas</span>
        </div>
      </div>

      <!-- Prazo -->
      <div class="filter-section">
        <h4 class="filter-title">Prazo de Entrega</h4>
        <q-option-group
          v-model="filters.prazo"
          :options="prazoOptions"
          color="teal"
          class="prazo-options"
        />
      </div>

      <!-- Localização -->
      <div class="filter-section">
        <h4 class="filter-title">Localização</h4>
        <q-select
          v-model="filters.localizacao"
          :options="localizacaoOptions"
          label="Estado ou região"
          filled
          color="teal"
          class="filter-input"
        />
      </div>

      <!-- Nível de experiência -->
      <div class="filter-section">
        <h4 class="filter-title">Nível de Experiência</h4>
        <q-btn-toggle
          v-model="filters.nivel"
          :options="nivelOptions"
          color="teal"
          class="nivel-toggle"
        />
      </div>

      <!-- Habilidades -->
      <div class="filter-section">
        <h4 class="filter-title">Habilidades Específicas</h4>
        <q-select
          v-model="filters.habilidades"
          :options="habilidadesOptions"
          label="Selecione habilidades"
          multiple
          filled
          color="teal"
          use-chips
          class="filter-input"
        />
      </div>

      <!-- Botões de ação -->
      <div class="action-buttons">
        <q-btn
          flat
          color="grey"
          label="Limpar Filtros"
          icon="clear"
          @click="resetFilters"
          class="clear-btn"
        />
        <q-btn
          color="teal"
          label="Aplicar Filtros"
          icon="search"
          @click="applyFilters"
          class="apply-btn"
        />
      </div>

      <!-- Resultados encontrados -->
      <div class="results-info">
        <q-icon name="info" color="teal" />
        <span>{{ resultsCount }} resultados encontrados</span>
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
          label="Explorar Mais"
          icon="explore"
          @click="$router.push('/descubra')"
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

// Estado dos filtros
const filters = ref({
  categoria: null,
  precoMin: null,
  precoMax: null,
  avaliacao: 4,
  prazo: null,
  localizacao: null,
  nivel: null,
  habilidades: [],
})

// Opções dos filtros
const categoriaOptions = [
  'Design Gráfico',
  'Desenvolvimento',
  'Escrita e Tradução',
  'Marketing Digital',
  'Vídeo e Animação',
  'Música e Áudio',
  'Consultoria',
  'Educação',
]

const prazoOptions = [
  { label: 'Até 24 horas', value: '1day' },
  { label: 'Até 3 dias', value: '3days' },
  { label: 'Até 1 semana', value: '1week' },
  { label: 'Até 1 mês', value: '1month' },
  { label: 'Flexível', value: 'flexible' },
]

const localizacaoOptions = [
  'São Paulo',
  'Rio de Janeiro',
  'Minas Gerais',
  'Rio Grande do Sul',
  'Paraná',
  'Santa Catarina',
  'Bahia',
  'Goiás',
  'Pernambuco',
  'Ceará',
  'Remoto',
]

const nivelOptions = [
  { label: 'Iniciante', value: 'iniciante' },
  { label: 'Intermediário', value: 'intermediario' },
  { label: 'Avançado', value: 'avancado' },
]

const habilidadesOptions = [
  'Photoshop',
  'Illustrator',
  'Figma',
  'JavaScript',
  'React',
  'Vue.js',
  'Node.js',
  'Python',
  'WordPress',
  'SEO',
  'Google Ads',
  'Social Media',
  'Copywriting',
  'After Effects',
  'Premiere Pro',
]

// Computed para contagem de resultados
const resultsCount = computed(() => {
  // Simulação baseada nos filtros ativos
  let count = 150
  if (filters.value.categoria) count -= 30
  if (filters.value.precoMin || filters.value.precoMax) count -= 20
  if (filters.value.avaliacao > 4) count -= 40
  if (filters.value.prazo) count -= 25
  if (filters.value.habilidades.length > 0) count -= 15
  return Math.max(count, 12)
})

// Funções
const resetFilters = () => {
  filters.value = {
    categoria: null,
    precoMin: null,
    precoMax: null,
    avaliacao: 4,
    prazo: null,
    localizacao: null,
    nivel: null,
    habilidades: [],
  }
}

const applyFilters = () => {
  // Aqui aplicaria os filtros na busca real
  console.log('Filtros aplicados:', filters.value)
  // Simular navegação para resultados
  router.push('/descubra')
}
</script>

<style scoped>
.filter-page {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  min-height: 100vh;
  color: white;
}

/* Header */
.filter-header {
  background: linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 184, 148, 0.05) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 184, 148, 0.2);
  padding: 16px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #00b894;
}

.back-btn,
.reset-btn {
  color: #00b894;
  transition: all 0.3s ease;
}

.back-btn:hover,
.reset-btn:hover {
  color: white;
  transform: scale(1.1);
}

/* Conteúdo */
.filter-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 20px;
}

.filter-section {
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0, 184, 148, 0.1);
}

.filter-title {
  color: #00b894;
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.filter-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

/* Preço */
.price-range {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Avaliação */
.rating-slider {
  margin: 16px 0;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

/* Prazo */
.prazo-options :deep(.q-radio__label) {
  color: rgba(255, 255, 255, 0.8);
}

/* Nível */
.nivel-toggle :deep(.q-btn) {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Botões de ação */
.action-buttons {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
  margin: 32px 0;
}

.clear-btn,
.apply-btn {
  height: 48px;
  border-radius: 12px;
  font-weight: 500;
}

/* Informações de resultado */
.results-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(0, 184, 148, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(0, 184, 148, 0.2);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
}

/* Navegação de demonstração */
.demo-navigation {
  display: flex;
  gap: 12px;
  justify-content: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsivo */
@media (max-width: 768px) {
  .filter-content {
    padding: 20px 16px;
  }

  .header-content {
    padding: 0 16px;
  }

  .price-range {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .demo-navigation {
    flex-direction: column;
  }
}
</style>
