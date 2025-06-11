<template>
  <q-page class="bg-black text-white column q-px-md q-pt-md">

    <!-- Cabeçalho -->
    <div class="text-h6 text-weight-bold text-teal">Interesses</div>
    <div class="text-subtitle2 text-grey-5 q-mb-md">Revise as Vagas antes de se candidatar</div>

   Vagas Selecionados

    <div v-for="vaga in vagas" :key="vaga.id" class="q-pa-sm bg-grey-10 q-mb-sm rounded-borders">
      <div class="row items-center">
        <q-avatar size="56px">
          <img :src="vaga.logo" alt="Logo da Empresa" />
        </q-avatar>

        <div class="q-ml-md">
          <div class="text-bold">{{ vaga.titulo }}</div>
          <div class="row items-center">
            <q-icon name="star" color="yellow" size="16px" />
            <span class="q-ml-xs text-caption">{{ vaga.avaliacao }}</span>
          </div>
          <div class="text-caption text-grey-4 q-mt-xs">{{ vaga.descricao }}</div>
        </div>
      </div>
      <div class="q-mt-sm text-right">
        <q-btn label="Ver Vaga" color="teal" flat rounded />
      </div>
    </div>

    <q-footer class="bg-black text-white q-pt-sm q-mt-auto">
      <q-tabs align="justify" active-color="teal" class="text-teal">
        <q-tab icon="home" label="Início" href="/inicio" />
        <q-tab icon="shopping_cart" label="Loja" href="/loja" />
        <q-tab icon="school" label="Educação" href="/educacao" />
        <q-tab icon="person" label="Perfil" href="/perfil" />
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script setup>
const vagas = [
  {
    id: 1,
    logo: 'https://static.vecteezy.com/ti/vetor-gratis/p1/47656219-abstrato-logotipo-projeto-para-qualquer-corporativo-marca-negocios-companhia-vetor.jpg',
    titulo: 'Redatora',
    avaliacao: '2.9',
    descricao: 'Buscamos redatora criativa para redes sociais e blogs (lifestyle e bem-estar).'
  },
  {
    id: 2,
    logo: 'https://img.freepik.com/vetores-premium/modelo-de-design-de-vetor-de-logotipo-da-phoenix_731715-162.jpg',
    titulo: 'Redatora',
    avaliacao: '4.5',
    descricao: 'Projeto de reestruturação de site institucional. Experiência com SEO.'
  },
  {
    id: 3,
    logo: 'https://w7.pngwing.com/pngs/415/61/png-transparent-logo-company-marketing-business-computer-software-marketing-blue-company-logo.png',
    titulo: 'Redatora',
    avaliacao: '3.7',
    descricao: 'E-mails marketing para lançamento de produto. Requer linguagem persuasiva.'
  }
]
</script>
