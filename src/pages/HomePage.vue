<template>
  <div class="q-pa-md bg-dark text-white" style="min-height: 100vh">
    <!-- Saudação -->
    <div class="text-h5 text-bold q-mb-md">
      Olá, que bom te ver de volta!
      <q-btn dense flat round icon="search" class="float-right" />
    </div>

    <!-- Banner Explorar Perfis -->
    <q-card class="q-pa-md bg-grey-9 text-center q-mb-md" style="border-radius: 20px">
      <div class="text-subtitle1">
        Encontre o profissional ideal <br />
        para o seu projeto!
      </div>
      <q-btn label="Explorar Perfis" color="teal-4" class="q-mt-md" rounded />
    </q-card>

    <!-- Categorias -->
    <div class="text-h6 text-bold q-mb-sm">Categorias</div>

    <q-scroll-area class="row no-wrap q-mb-md" style="max-width: 100%; height: 110px">
      <div class="row">
        <q-card
          v-for="cat in categories"
          :key="cat.id"
          class="q-mr-sm q-pa-sm bg-grey-8"
          style="width: 90px; border-radius: 15px"
        >
          <q-icon :name="cat.icon" size="md" class="q-mb-xs" />
          <div class="text-caption text-center">{{ cat.name }}</div>
        </q-card>
      </div>
    </q-scroll-area>

    <!-- Em Destaque -->
    <div class="text-h6 text-bold text-teal q-mb-sm">Em Destaque</div>

    <div v-for="profile in featuredProfiles" :key="profile.id" class="q-mb-md">
      <q-card class="row no-wrap bg-grey-9" style="border-radius: 15px">
        <q-avatar size="60px" class="q-ma-md">
          <q-icon name="person" size="60px" />
        </q-avatar>
        <q-card-section>
          <div class="text-subtitle2 text-weight-bold">
            {{ profile.name }}
          </div>
          <div class="text-caption">
            {{ profile.role }}
          </div>
          <div class="row items-center">
            <q-icon name="star" color="yellow" size="16px" />
            <div class="q-ml-xs">{{ profile.rating }} | {{ profile.description }}</div>
          </div>
        </q-card-section>
        <q-btn flat label="Ver Perfil" color="teal" class="q-ma-md" rounded />
      </q-card>
    </div>

    <!-- Menu Inferior -->
    <q-footer class="bg-grey-10 q-pa-sm">
      <q-tabs dense active-color="teal" indicator-color="teal" align="justify">
        <q-tab icon="home" label="" />
        <q-tab icon="search" label="" />
        <q-tab icon="person_search" label="" />
        <q-tab icon="work" label="" />
        <q-tab icon="person" label="" />
      </q-tabs>
    </q-footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  { id: 1, name: 'Construção', icon: 'engineering' },
  { id: 2, name: 'Design', icon: 'palette' },
  { id: 3, name: 'Redação', icon: 'edit' },
  { id: 4, name: 'Tecnologia', icon: 'computer' },
  { id: 5, name: 'Consultoria', icon: 'support' },
  { id: 6, name: 'Arquitetura', icon: 'architecture' },
  { id: 7, name: 'Marketing', icon: 'campaign' },
  { id: 8, name: 'Fotografia', icon: 'photo_camera' },
  { id: 9, name: 'Saúde', icon: 'health_and_safety' },
  { id: 10, name: 'Educação', icon: 'school' },
  { id: 11, name: 'Financeiro', icon: 'account_balance' },
  { id: 12, name: 'Jurídico', icon: 'gavel' },
  { id: 13, name: 'Eventos', icon: 'event' },
  { id: 14, name: 'Esportes', icon: 'sports' },
  { id: 15, name: 'Música', icon: 'music_note' },
  { id: 16, name: 'Viagens', icon: 'flight' },
  { id: 17, name: 'Gastronomia', icon: 'restaurant' },
  { id: 18, name: 'Beleza', icon: 'spa' },
  { id: 19, name: 'Pets', icon: 'pets' },
  { id: 20, name: 'Automotivo', icon: 'directions_car' },
])

const featuredProfiles = ref([
  {
    id: 1,
    name: 'Maria da Silva',
    role: 'Redatora',
    rating: 4.9,
    description: 'palavras palavras palavras',
  },
  {
    id: 2,
    name: 'Joana Rodrigues',
    role: 'Design Gráfico',
    rating: 4.8,
    description: 'palavras palavras palavras',
  },
  {
    id: 3,
    name: 'João Marcos Prates',
    role: 'Desenvolvedor',
    rating: 4.7,
    description: 'palavras palavras palavras',
  },
  {
    id: 4,
    name: 'Carlos Souza Gomes',
    role: 'Engenheiro Civil',
    rating: 4.6,
    description: 'palavras palavras palavras',
  },
  {
    id: 5,
    name: 'Ana Fernandes Lima ',
    role: 'Consultora de Negócios',
    rating: 4.5,
    description: 'palavras palavras palavras',
  },
  {
    id: 6,
    name: 'Pedro Ramos Rameira',
    role: 'Arquiteto',
    rating: 4.4,
    description: 'palavras palavras palavras',
  },
])
</script>

<style scoped>
.text-bold {
  font-weight: 700;
}
</style>
