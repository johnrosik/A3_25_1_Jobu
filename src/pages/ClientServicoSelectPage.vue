<template>
  <q-page class="bg-black text-white column q-pa-md" style="height: 100vh; overflow-y: auto; position: relative;">
    
    <div style="position: absolute; top: 80px; right: -4px; width: 6px; height: 70%; background: teal; border-radius: 3px; opacity: 0.5;"></div>

    <div class="row justify-between items-center q-mb-md">
      <q-btn flat round icon="arrow_back" class="text-teal" />
      <q-btn flat round icon="menu" class="text-white" />
    </div>

    <div class="text-bold text-teal text-subtitle1 q-mb-sm">Comentários</div>

    <div class="q-mb-sm">
      <div class="row items-center q-gutter-sm">
        <q-avatar icon="person" />
        <div class="text-bold">Lucas M.</div>
      </div>
      <q-rating v-model="rating1" max="5" color="yellow" readonly size="20px" />
      <div class="text-caption">Muito profissional! Entregou antes do prazo e o resultado ficou incrível.</div>
    </div>

    <div class="q-mb-md">
      <div class="row items-center q-gutter-sm">
        <q-avatar icon="person" />
        <div class="text-bold">Camila S.</div>
      </div>
      <q-rating v-model="rating2" max="5" color="yellow" readonly size="20px" />
      <div class="text-caption">Joana entendeu exatamente o que eu queria. Super recomendo!</div>
    </div>

    <div class="text-subtitle2 text-bold text-teal q-mb-sm">Selecionar Serviços</div>
    <q-option-group
      v-model="servicoSelecionado"
      :options="servicos"
      type="radio"
      color="teal"
      class="q-mb-md"
    />

    <q-btn label="Finalizar Contratação" color="teal" class="full-width q-mt-md" no-caps rounded />

    <q-footer class="bg-black q-pt-sm q-mt-lg">
      <q-tabs align="justify" active-color="teal" class="text-teal">
        <q-tab icon="home" />
        <q-tab icon="notifications" />
        <q-tab icon="group" />
        <q-tab icon="person" />
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const rating1 = ref(5)
const rating2 = ref(5)
const servicoSelecionado = ref('s1')

const servicos = Array.from({ length: 10 }, (_, i) => ({
  label: 'Criação de Logotipos',
  value: `s${i + 1}`,
  caption: 'R$ 75,00'
}))
</script>
