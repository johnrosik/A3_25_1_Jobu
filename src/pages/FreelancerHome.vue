<template>
  <div
    class="q-pa-md bg-dark text-white"
    style="min-height: 100vh; background-image: url('/fundo.jpg'); background-size: cover"
  >
    <div class="text-h5 text-bold q-mb-md">Olá, que bom te ver de volta!</div>

    <q-card
      class="q-pa-md bg-grey-10 text-center q-mb-md"
      style="border-radius: 20px; backdrop-filter: blur(5px)"
    >
      <div class="text-caption">
        Encontre a oportunidade certa para mostrar seu talento!
      </div>
      <q-btn label="Explorar Vagas" color="teal-4" class="q-mt-md" rounded />
    </q-card>

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
    <div class="text-right text-teal cursor-pointer q-mb-md">Ver todas</div>

    <div class="text-h6 text-bold text-teal q-mb-sm">Em Destaque</div>

    <div v-for="vaga in featuredJobs" :key="vaga.id" class="q-mb-md">
      <q-card class="row no-wrap bg-grey-9" style="border-radius: 15px">
        <q-avatar size="60px" class="q-ma-md">
          <q-icon name="description" size="40px" />
        </q-avatar>
        <q-card-section>
          <div class="text-subtitle2 text-weight-bold">
            {{ vaga.empresa }}
          </div>
          <div class="text-caption">{{ vaga.area }}</div>
          <div class="row items-center">
            <q-icon name="star" color="yellow" size="16px" />
            <div class="q-ml-xs">{{ vaga.rating }} | {{ vaga.descricao }}</div>
          </div>
        </q-card-section>
        <q-card-actions vertical class="q-ma-md items-end">
          <q-btn flat label="Ver Vaga" color="teal-4" rounded />
        </q-card-actions>
      </q-card>
    </div>

    <q-footer class="bg-grey-10 q-pa-sm" elevated>
      <q-tabs dense active-color="teal" indicator-color="teal" class="justify-between">
        <q-tab icon="home" />
        <q-tab icon="search" />
        <q-tab icon="shopping_cart" />
        <q-tab icon="work" />
        <q-tab icon="person" />
      </q-tabs>
    </q-footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  { id: 1, name: 'Segurança', icon: 'security' },
  { id: 2, name: 'Engenheiro', icon: 'engineering' },
  { id: 3, name: 'Cozinheiro', icon: 'restaurant' },
  { id: 4, name: 'Pedreiro', icon: 'construction' },
  { id: 5, name: 'Escrita', icon: 'edit' },
  { id: 6, name: 'Design', icon: 'palette' },
  { id: 7, name: 'Marketing', icon: 'campaign' },
  { id: 8, name: 'Programação', icon: 'code' },
  { id: 9, name: 'Vendas', icon: 'shopping_cart' },
  { id: 10, name: 'Saúde', icon: 'health_and_safety' },
  { id: 11, name: 'Educação', icon: 'school' },
  { id: 12, name: 'Logística', icon: 'local_shipping' },
  { id: 13, name: 'Financeiro', icon: 'account_balance' },
  { id: 14, name: 'Arquitetura', icon: 'home_repair_service' },
  { id: 15, name: 'Consultoria', icon: 'business_center' },
])

const featuredJobs = ref([
  {
    id: 1,
    empresa: 'Studio Criativo',
    area: 'Design Gráfico',
    rating: 4.8,
    descricao: 'Soluções visuais inovadoras para marcas',
  },
  {
    id: 2,
    empresa: 'Code Experts',
    area: 'Desenvolvimento Web',
    rating: 4.9,
    descricao: 'Sites modernos, seguros e rápidos',
  },
  {
    id: 3,
    empresa: 'Palavra Certa',
    area: 'Escrita e Tradução',
    rating: 4.7,
    descricao: 'Textos personalizados com linguagem profissional',
  },
  {
    id: 4,
    empresa: 'EnsimaMais',
    area: 'Aulas Particulares',
    rating: 4.6,
    descricao: 'Aprenda no seu ritmo com tutores dedicados',
  },
  {
    id: 5,
    empresa: 'Flash Pro Studio',
    area: 'Fotografia de Eventos',
    rating: 4.5,
    descricao: 'Momentos inesquecíveis registrados com qualidade',
  },
])
</script>

<style scoped>
.text-bold {
  font-weight: 700;
}
.q-scroll-area__container::-webkit-scrollbar {
  display: none;
}
</style>
