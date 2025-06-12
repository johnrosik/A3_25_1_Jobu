<template>
  <div class="flex flex-center q-pa-md" style="height: 100vh">
    <div style="width: 100%; max-width: 400px">
      <q-card class="bg-white text-black" style="width: 80vh">
        <q-card-section class="q-pa-md" padding-bottom="100vh">
          <div class="text-h6 text-center">Quem é você?</div>
          <div class="flex flex-center q-mt-md" style="margin-bottom: 50vh">
            <q-avatar size="140px" font-size="52px" color="teal" text-color="white">U</q-avatar>
          </div>
          <div class="q-mt-xl text-subtitle1 text-center">Selecione como você quer usar o App:</div>
          <div class="q-mt-md q-pa-xl">
            <q-option-group v-model="group" :options="options" color="primary" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      group: ref('op1'),

      options: [
        {
          label: 'Sou Freelancer',
          value: 'op1',
        },
        {
          label: 'Sou Cliente',
          value: 'op2',
        },
      ],
    }
  },
}
</script>
