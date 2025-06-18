<template>
  <div class="q-pa-md bg-dark text-white column items-center" style="min-height: 100vh">
    <div style="max-width: 50vh; width: 100%">
      <div class="text-h6 text-bold text-center q-mb-lg">Adicionar Cartão</div>

      <q-card flat bordered class="q-pa-md bg-grey-10">
        <div class="text-white q-mb-md">Nome no Cartão</div>
        <q-input filled v-model="nome" class="q-mb-md" input-class="text-white" />

        <div class="text-white q-mb-md">Número do Cartão</div>
        <q-input filled v-model="numero" class="q-mb-md" input-class="text-white" />

        <div class="row q-gutter-md">
          <div class="col">
            <div class="text-white q-mb-sm">Data de Validade</div>
            <q-input filled v-model="expira" input-class="text-white" />
          </div>
          <div class="col">
            <div class="text-white q-mb-sm">CVC</div>
            <q-input filled v-model="cvv" input-class="text-white" />
          </div>
        </div>

        <q-btn label="Salvar Cartão" color="teal" class="full-width q-mt-lg" rounded />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const numero = ref('')
const nome = ref('')
const expira = ref('')
const cvv = ref('')
</script>
