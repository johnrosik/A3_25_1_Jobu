<template>
  <q-page class="jobu-page">
    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content">
        <div class="header-title">Olá, que bom te ver de volta!</div>
        <q-btn flat round icon="search" class="jobu-btn--ghost" />
      </div>
    </div>

    <!-- Content -->
    <div class="jobu-content">
      <!-- Banner Explorar Perfis -->
      <div class="jobu-card jobu-card--highlight jobu-text-center jobu-mb-lg">
        <div class="jobu-text-lg jobu-mb-md">
          Encontre o profissional ideal <br />
          para o seu projeto!
        </div>
        <q-btn
          label="Explorar Perfis"
          class="jobu-btn jobu-btn--primary"
          @click="$router.push('/descubra')"
        />
      </div>

      <!-- Categorias -->
      <div class="jobu-section">
        <h3 class="jobu-section-title">Categorias</h3>

        <q-scroll-area class="category-scroll jobu-mb-lg" style="height: 110px">
          <div class="category-grid">
            <div
              v-for="cat in categories"
              :key="cat.id"
              class="category-card jobu-card--small jobu-card--interactive jobu-text-center"
              @click="selectCategory(cat.id)"
            >
              <q-icon :name="cat.icon" size="md" class="jobu-mb-xs jobu-text-accent" />
              <div class="jobu-text-caption">{{ cat.name }}</div>
            </div>
          </div>
        </q-scroll-area>
      </div>

      <!-- Em Destaque -->
      <div class="jobu-section">
        <h3 class="jobu-section-title jobu-text-accent">Em Destaque</h3>

        <div class="featured-profiles">
          <div
            v-for="profile in featuredProfiles"
            :key="profile.id"
            class="profile-card jobu-card jobu-card--interactive jobu-mb-md"
            @click="viewProfile(profile.id)"
          >
            <div class="jobu-flex jobu-items-center">
              <q-avatar size="60px" class="jobu-mr-md">
                <q-icon name="person" size="60px" class="jobu-text-accent" />
              </q-avatar>

              <div class="jobu-flex-1">
                <div class="profile-name jobu-font-semibold jobu-text-primary">
                  {{ profile.name }}
                </div>
                <div class="profile-role jobu-text-secondary jobu-mb-xs">
                  {{ profile.role }}
                </div>
                <div class="profile-rating jobu-flex jobu-items-center">
                  <q-icon name="star" color="yellow" size="16px" class="jobu-mr-xs" />
                  <span class="jobu-text-sm">{{ profile.rating }} | {{ profile.description }}</span>
                </div>
              </div>

              <q-btn flat label="Ver Perfil" class="jobu-btn--secondary" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu Inferior -->
    <q-footer class="jobu-footer">
      <q-tabs dense active-color="teal" indicator-color="teal" align="justify">
        <q-tab icon="home" @click="$router.push('/')" />
        <q-tab icon="search" @click="$router.push('/descubra')" />
        <q-tab icon="person_search" @click="$router.push('/filtros')" />
        <q-tab icon="work" @click="$router.push('/trabalhos')" />
        <q-tab icon="person" @click="$router.push('/perfil')" />
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = ref([
  { id: 1, name: 'Construção', icon: 'engineering' },
  { id: 2, name: 'Design', icon: 'palette' },
  { id: 3, name: 'Redação', icon: 'edit' },
  { id: 4, name: 'Tecnologia', icon: 'computer' },
  { id: 5, name: 'Consultoria', icon: 'support' },
  { id: 6, name: 'Arquitetura', icon: 'architecture' },
])

const featuredProfiles = ref([
  {
    id: 1,
    name: 'Maria da Silva',
    role: 'Redatora',
    rating: 4.9,
    description: 'Especialista em conteúdo',
  },
  {
    id: 2,
    name: 'Joana Rodrigues',
    role: 'Design Gráfico',
    rating: 4.8,
    description: 'Criativa e inovadora',
  },
  {
    id: 3,
    name: 'João Marcos Prates',
    role: 'Desenvolvedor',
    rating: 4.7,
    description: 'Full-stack experiente',
  },
  {
    id: 4,
    name: 'Carlos Souza Gomes',
    role: 'Engenheiro Civil',
    rating: 4.6,
    description: 'Projetos sustentáveis',
  },
])

const selectCategory = (categoryId) => {
  router.push(`/filtros?categoria=${categoryId}`)
}

const viewProfile = (profileId) => {
  router.push(`/freelancer/${profileId}`)
}
</script>

<style lang="scss" scoped>
// Estilos específicos apenas para esta página
.category-scroll {
  .category-grid {
    display: flex;
    gap: var(--jobu-space-sm);
    padding: var(--jobu-space-xs);

    .category-card {
      min-width: 90px;
      flex-shrink: 0;
    }
  }
}

.featured-profiles {
  .profile-card:hover {
    transform: translateY(-2px);
  }
}

.jobu-footer {
  background: var(--jobu-bg-glass);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--jobu-border-glass);
}
</style>
