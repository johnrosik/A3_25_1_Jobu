<template>
  <div v-scroll="onScroll" style="height: 100vh; overflow-y: auto;">
    <q-page class="bg-black text-white column items-center q-pa-md">

      <div class="full-width row items-center justify-between">
        <q-btn flat round icon="arrow_back" class="text-teal" />
        <q-btn flat round icon="menu" class="text-white" />
      </div>

      <!-- icone de perfil  -->
      <q-avatar size="100px" class="q-my-md">
        <q-icon name="person" size="100px" />
      </q-avatar>

      <div class="text-h6 text-bold text-center">Joana Rodrigues</div>
      <div class="text-subtitle2 text-center">Design Gráfico</div>
      <div class="row items-center justify-center q-my-sm">
        <q-icon name="star" color="yellow" />
        <span class="q-ml-xs text-bold">4.8</span>
      </div>

      <div class="text-center q-mb-lg">
        Trabalho com criação de logotipos, paleta de cores, tipografia e toda a identidade visual da sua empresa ou projeto.
      </div>

      <div class="text-subtitle2 text-bold q-mb-sm">Selecionar Serviços</div>
      <q-option-group
        v-model="servicoSelecionado"
        :options="servicos"
        type="radio"
        color="teal"
        class="q-mb-md"
      />

      <q-btn label="Finalizar Contratação" color="teal" class="full-width" rounded no-caps />

      <q-footer class="bg-black q-pt-sm q-mt-lg">
        <q-tabs align="justify" active-color="teal" class="text-teal">
          <q-tab icon="home" />
          <q-tab icon="notifications" />
          <q-tab icon="group" />
          <q-tab icon="person" />
        </q-tabs>
      </q-footer>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from 'quasar'

const servicoSelecionado = ref('logo2')

const servicos = [
  {
    label: 'Criação de Logotipos',
    value: 'logo1',
    disable: true,
    caption: 'R$ 75,00'
  },
  {
    label: 'Criação de Logotipos',
    value: 'logo2',
    caption: 'R$ 75,00'
  }
]

// Scroll com debounce
const onScroll = debounce((position) => {
  console.log('Scroll position:', position)
}, 200)
</script>
