<template>
  <q-page class="jobu-page">
    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="$router.back()" />
        <div class="header-title">Filtros de Busca</div>
        <q-btn flat round icon="refresh" class="jobu-btn--ghost" @click="resetFilters" />
      </div>
    </div>

    <!-- Content -->
    <div class="jobu-content">
      <!-- Active Filters -->
      <div v-if="hasActiveFilters" class="active-filters jobu-mb-lg">
        <div class="jobu-card jobu-card--small">
          <div class="jobu-card-content">
            <div class="jobu-flex jobu-items-center jobu-justify-between jobu-mb-xs">
              <span class="jobu-text-sm jobu-font-semibold">Filtros Ativos</span>
              <q-btn
                flat
                dense
                label="Limpar Todos"
                class="jobu-btn--ghost jobu-text-xs"
                @click="resetFilters"
              />
            </div>
            <div class="filters-chips jobu-flex jobu-flex-wrap jobu-gap-xs">
              <q-chip
                v-if="filters.categoria"
                removable
                color="teal"
                text-color="white"
                size="sm"
                @remove="filters.categoria = null"
              >
                {{ filters.categoria }}
              </q-chip>
              <q-chip
                v-if="filters.precoMin || filters.precoMax"
                removable
                color="teal"
                text-color="white"
                size="sm"
                @remove="clearPriceFilter"
              >
                R$ {{ filters.precoMin || 0 }} - R$ {{ filters.precoMax || '∞' }}
              </q-chip>
              <q-chip
                v-if="filters.avaliacao > 0"
                removable
                color="teal"
                text-color="white"
                size="sm"
                @remove="filters.avaliacao = 0"
              >
                {{ filters.avaliacao }}+ estrelas
              </q-chip>
              <q-chip
                v-if="filters.prazo"
                removable
                color="teal"
                text-color="white"
                size="sm"
                @remove="filters.prazo = null"
              >
                {{ getPrazoLabel(filters.prazo) }}
              </q-chip>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Sections -->
      <div class="filter-sections">
        <!-- Category -->
        <div class="filter-section jobu-card jobu-mb-lg">
          <div class="jobu-card-header">
            <h4 class="card-title">Categoria</h4>
          </div>
          <div class="jobu-card-content">
            <q-select
              v-model="filters.categoria"
              :options="categoriaOptions"
              label="Selecione uma categoria"
              filled
              color="teal"
              class="jobu-input"
              clearable
            />
          </div>
        </div>

        <!-- Price Range -->
        <div class="filter-section jobu-card jobu-mb-lg">
          <div class="jobu-card-header">
            <h4 class="card-title">Faixa de Preço</h4>
          </div>
          <div class="jobu-card-content">
            <div class="price-range jobu-flex jobu-gap-md">
              <div class="jobu-flex-1">
                <q-input
                  v-model="filters.precoMin"
                  label="Preço mínimo"
                  type="number"
                  prefix="R$"
                  filled
                  color="teal"
                  class="jobu-input"
                />
              </div>
              <div class="jobu-flex-1">
                <q-input
                  v-model="filters.precoMax"
                  label="Preço máximo"
                  type="number"
                  prefix="R$"
                  filled
                  color="teal"
                  class="jobu-input"
                />
              </div>
            </div>

            <!-- Price suggestions -->
            <div class="price-suggestions jobu-mt-md">
              <div class="jobu-text-xs jobu-text-secondary jobu-mb-xs">Sugestões:</div>
              <div class="jobu-flex jobu-gap-xs jobu-flex-wrap">
                <q-chip
                  v-for="range in priceRanges"
                  :key="range.label"
                  clickable
                  color="grey-3"
                  text-color="grey-8"
                  size="sm"
                  @click="setPriceRange(range)"
                >
                  {{ range.label }}
                </q-chip>
              </div>
            </div>
          </div>
        </div>

        <!-- Rating -->
        <div class="filter-section jobu-card jobu-mb-lg">
          <div class="jobu-card-header">
            <h4 class="card-title">Avaliação Mínima</h4>
          </div>
          <div class="jobu-card-content">
            <q-slider
              v-model="filters.avaliacao"
              :min="0"
              :max="5"
              :step="0.5"
              label
              color="teal"
              class="jobu-mb-md"
            />
            <div class="rating-display jobu-flex jobu-items-center jobu-gap-xs">
              <q-rating
                v-model="filters.avaliacao"
                size="20px"
                color="amber"
                readonly
              />
              <span class="jobu-text-sm">{{ filters.avaliacao }}+ estrelas</span>
            </div>
          </div>
        </div>

        <!-- Delivery Time -->
        <div class="filter-section jobu-card jobu-mb-lg">
          <div class="jobu-card-header">
            <h4 class="card-title">Prazo de Entrega</h4>
          </div>
          <div class="jobu-card-content">
            <q-option-group
              v-model="filters.prazo"
              :options="prazoOptions"
              color="teal"
              class="prazo-options"
            />
          </div>
        </div>

        <!-- Location -->
        <div class="filter-section jobu-card jobu-mb-lg">
          <div class="jobu-card-header">
            <h4 class="card-title">Localização</h4>
          </div>
          <div class="jobu-card-content">
            <q-select
              v-model="filters.localizacao"
              :options="localizacaoOptions"
              label="Estado ou região"
              filled
              color="teal"
              class="jobu-input"
              clearable
            />
          </div>
        </div>

        <!-- Experience Level -->
        <div class="filter-section jobu-card jobu-mb-lg">
          <div class="jobu-card-header">
            <h4 class="card-title">Nível de Experiência</h4>
          </div>
          <div class="jobu-card-content">
            <q-btn-toggle
              v-model="filters.nivel"
              :options="nivelOptions"
              color="teal"
              class="nivel-toggle"
              clearable
            />
          </div>
        </div>

        <!-- Additional Skills -->
        <div class="filter-section jobu-card jobu-mb-lg">
          <div class="jobu-card-header">
            <h4 class="card-title">Habilidades Específicas</h4>
          </div>
          <div class="jobu-card-content">
            <q-select
              v-model="filters.habilidades"
              :options="habilidadesOptions"
              label="Selecione habilidades"
              filled
              multiple
              use-chips
              color="teal"
              class="jobu-input"
            />
          </div>
        </div>

        <!-- Availability -->
        <div class="filter-section jobu-card jobu-mb-xl">
          <div class="jobu-card-header">
            <h4 class="card-title">Disponibilidade</h4>
          </div>
          <div class="jobu-card-content">
            <div class="availability-options">
              <q-checkbox
                v-model="filters.disponibilidade.imediata"
                label="Disponível imediatamente"
                color="teal"
                class="jobu-mb-xs"
              />
              <q-checkbox
                v-model="filters.disponibilidade.tempoIntegral"
                label="Tempo integral"
                color="teal"
                class="jobu-mb-xs"
              />
              <q-checkbox
                v-model="filters.disponibilidade.fimDeSemana"
                label="Fins de semana"
                color="teal"
                class="jobu-mb-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="results-summary jobu-card jobu-card--highlight jobu-mb-lg">
        <div class="jobu-card-content">
          <div class="jobu-flex jobu-items-center jobu-justify-between">
            <div>
              <div class="jobu-font-semibold jobu-text-primary">
                {{ filteredResults }} freelancers encontrados
              </div>
              <div class="jobu-text-sm jobu-text-secondary">
                Com base nos filtros selecionados
              </div>
            </div>
            <q-icon name="search" size="24px" class="jobu-text-accent" />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="filter-actions">
        <div class="jobu-flex jobu-gap-md">
          <q-btn
            label="Limpar Filtros"
            class="jobu-btn jobu-btn--outline jobu-flex-1"
            @click="resetFilters"
          />
          <q-btn
            :label="`Ver ${filteredResults} Resultados`"
            class="jobu-btn jobu-btn--primary jobu-flex-1"
            @click="applyFilters"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Filter state
const filters = reactive({
  categoria: null,
  precoMin: null,
  precoMax: null,
  avaliacao: 0,
  prazo: null,
  localizacao: null,
  nivel: null,
  habilidades: [],
  disponibilidade: {
    imediata: false,
    tempoIntegral: false,
    fimDeSemana: false
  }
})

// Options
const categoriaOptions = [
  'Desenvolvimento Web',
  'Design Gráfico',
  'Marketing Digital',
  'Redação',
  'Tradução',
  'Fotografia',
  'Arquitetura',
  'Consultoria'
]

const prazoOptions = [
  { label: 'Menos de 1 semana', value: '1week' },
  { label: '1-2 semanas', value: '2weeks' },
  { label: '2-4 semanas', value: '1month' },
  { label: 'Mais de 1 mês', value: 'more1month' }
]

const localizacaoOptions = [
  'São Paulo',
  'Rio de Janeiro',
  'Minas Gerais',
  'Bahia',
  'Paraná',
  'Rio Grande do Sul',
  'Pernambuco',
  'Ceará',
  'Pará',
  'Santa Catarina',
  'Goiás',
  'Maranhão',
  'Paraíba',
  'Espírito Santo',
  'Piauí'
]

const nivelOptions = [
  { label: 'Iniciante', value: 'iniciante' },
  { label: 'Intermediário', value: 'intermediario' },
  { label: 'Avançado', value: 'avancado' },
  { label: 'Especialista', value: 'especialista' }
]

const habilidadesOptions = [
  'JavaScript',
  'Python',
  'React',
  'Vue.js',
  'Node.js',
  'PHP',
  'Adobe Photoshop',
  'Figma',
  'WordPress',
  'SEO',
  'Google Ads',
  'Social Media',
  'Inglês',
  'Espanhol'
]

const priceRanges = [
  { label: 'R$ 0 - R$ 500', min: 0, max: 500 },
  { label: 'R$ 500 - R$ 1.500', min: 500, max: 1500 },
  { label: 'R$ 1.500 - R$ 3.000', min: 1500, max: 3000 },
  { label: 'R$ 3.000+', min: 3000, max: null }
]

// Computed
const hasActiveFilters = computed(() => {
  return filters.categoria ||
         filters.precoMin ||
         filters.precoMax ||
         filters.avaliacao > 0 ||
         filters.prazo ||
         filters.localizacao ||
         filters.nivel ||
         filters.habilidades.length > 0 ||
         Object.values(filters.disponibilidade).some(v => v)
})

const filteredResults = computed(() => {
  // Simulate filtering logic
  let baseResults = 1247 // Total freelancers

  if (filters.categoria) baseResults *= 0.3
  if (filters.precoMin || filters.precoMax) baseResults *= 0.6
  if (filters.avaliacao > 3) baseResults *= 0.4
  if (filters.prazo) baseResults *= 0.5
  if (filters.localizacao) baseResults *= 0.4
  if (filters.nivel) baseResults *= 0.7
  if (filters.habilidades.length > 0) baseResults *= 0.3

  return Math.max(1, Math.floor(baseResults))
})

// Methods
const resetFilters = () => {
  filters.categoria = null
  filters.precoMin = null
  filters.precoMax = null
  filters.avaliacao = 0
  filters.prazo = null
  filters.localizacao = null
  filters.nivel = null
  filters.habilidades = []
  filters.disponibilidade = {
    imediata: false,
    tempoIntegral: false,
    fimDeSemana: false
  }

  $q.notify({
    color: 'info',
    message: 'Filtros limpos',
    icon: 'refresh'
  })
}

const clearPriceFilter = () => {
  filters.precoMin = null
  filters.precoMax = null
}

const setPriceRange = (range) => {
  filters.precoMin = range.min
  filters.precoMax = range.max
}

const getPrazoLabel = (value) => {
  const option = prazoOptions.find(opt => opt.value === value)
  return option?.label || value
}

const applyFilters = () => {
  // Apply filters and navigate to results
  const queryParams = {}

  if (filters.categoria) queryParams.categoria = filters.categoria
  if (filters.precoMin) queryParams.precoMin = filters.precoMin
  if (filters.precoMax) queryParams.precoMax = filters.precoMax
  if (filters.avaliacao > 0) queryParams.avaliacao = filters.avaliacao
  if (filters.prazo) queryParams.prazo = filters.prazo
  if (filters.localizacao) queryParams.localizacao = filters.localizacao
  if (filters.nivel) queryParams.nivel = filters.nivel
  if (filters.habilidades.length > 0) queryParams.habilidades = filters.habilidades.join(',')

  $q.notify({
    color: 'positive',
    message: `Aplicando filtros... ${filteredResults.value} resultados encontrados`,
    icon: 'search'
  })

  // Navigate to results page with filters
  router.push({
    path: '/descubra',
    query: queryParams
  })
}
</script>

<style lang="scss" scoped>
.active-filters {
  .filters-chips {
    min-height: 32px;
  }
}

.filter-sections {
  .filter-section {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
}

.price-range {
  .jobu-flex-1:first-child {
    margin-right: var(--jobu-space-md);
  }
}

.price-suggestions {
  .q-chip {
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 184, 148, 0.1) !important;
      color: var(--jobu-accent) !important;
    }
  }
}

.rating-display {
  background: rgba(255, 255, 255, 0.05);
  padding: var(--jobu-space-sm);
  border-radius: 8px;
}

.prazo-options {
  .q-radio {
    margin-bottom: var(--jobu-space-xs);
  }
}

.nivel-toggle {
  .q-btn {
    flex: 1;
    margin: 2px;
  }
}

.availability-options {
  .q-checkbox {
    width: 100%;
    margin-bottom: var(--jobu-space-xs);
  }
}

.results-summary {
  border: 2px solid rgba(0, 184, 148, 0.3);
}

.filter-actions {
  position: sticky;
  bottom: var(--jobu-space-lg);
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--jobu-space-md);
  border-radius: 12px;
  border: 1px solid rgba(0, 184, 148, 0.2);
}

// Mobile responsiveness
@media (max-width: 768px) {
  .price-range {
    flex-direction: column;

    .jobu-flex-1:first-child {
      margin-right: 0;
      margin-bottom: var(--jobu-space-md);
    }
  }

  .filter-actions {
    .jobu-flex {
      flex-direction: column;
    }
  }
}
</style>
