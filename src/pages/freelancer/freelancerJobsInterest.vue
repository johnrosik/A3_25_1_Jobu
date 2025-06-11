<template>
  <q-page class="bg-black text-white q-pa-md">

    <div class="row items-center justify-between q-mb-md">
      <q-btn flat round icon="arrow_back" to="/vaga" class="text-teal" />
      <div class="text-h6 text-weight-bold text-teal">Candidatar-se</div>
      <div></div>
    </div>

    <q-input v-model="form.nome" label="Nome Completo" filled rounded dense color="teal" class="q-mb-md" />
    <q-input v-model="form.email" label="E-mail" filled rounded dense color="teal" class="q-mb-md" />
    <q-input v-model="form.telefone" label="Telefone" filled rounded dense color="teal" class="q-mb-md" />
    <q-input v-model="form.texto" label="Texto" filled rounded type="textarea" color="teal" class="q-mb-md" />

    <div class="text-center text-white q-mb-xs">Anexar Currículo</div>
    <div class="flex flex-center q-mb-lg">
      <q-btn round flat icon="upload" color="teal" />
    </div>

    <q-btn label="Candidatar-Se" class="bg-teal text-white full-width" rounded no-caps />

    <q-footer class="bg-black q-pt-sm q-mt-lg">
      <q-tabs align="justify" class="text-teal" active-color="teal">
        <q-tab icon="home" />
        <q-tab icon="shopping_cart" />
        <q-tab icon="school" />
        <q-tab icon="person" />
      </q-tabs>
    </q-footer>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nome: '',
  email: '',
  telefone: '',
  texto: ''
})
</script>
