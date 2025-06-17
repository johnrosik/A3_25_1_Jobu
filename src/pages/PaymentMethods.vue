<template>
    <div
      class="q-pa-md bg-dark text-white column items-center justify-between"
      style="min-height: 100vh; padding-top: 10vh"
    >
      <div style="max-width: 50vh; width: 100%">
        <div class="text-h6 text-bold text-center q-mb-lg">
          Métodos de Pagamentos
        </div>
  
        <q-list bordered separator>
          <q-item
            v-for="(method, index) in paymentMethods"
            :key="index"
            clickable
            v-ripple
            class="flex items-center justify-between"
          >
            <div class="row items-center">
              <q-icon :name="method.icon" size="md" class="q-mr-md" />
              <div>{{ method.label }}</div>
            </div>
  
            <q-radio
              v-model="selectedMethod"
              :val="method.label"
              color="teal"
            />
          </q-item>
        </q-list>
  
        <q-btn
          label="Adicionar"
          color="teal"
          class="full-width q-mt-xl"
          rounded
        />
      </div>
  
      <q-footer class="bg-grey-10 q-pa-sm full-width">
        <q-tabs
          dense
          active-color="teal"
          indicator-color="teal"
          class="justify-between"
        >
          <q-tab icon="home" />
          <q-tab icon="shopping_cart" />
          <q-tab icon="credit_card" />
          <q-tab icon="receipt_long" />
          <q-tab icon="person" />
        </q-tabs>
      </q-footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const selectedMethod = ref('Cartão')
  const paymentMethods = ref([
    { label: 'Cartão', icon: 'credit_card' },
      { label: 'Apple Pay', icon: 'apple' },
      { label: 'PayPal', icon: 'payment' },
  ])
  </script>