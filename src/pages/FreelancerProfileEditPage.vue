<template>
  <q-page class="bg-black text-white column items-center q-px-md q-pt-md">

    <div class="row items-center justify-between full-width">
      <div class="text-h6 text-weight-bold text-teal">Meu Perfil</div>
      <q-btn v-if="!editando" flat round icon="edit" @click="editando = true" />
    </div>

  <q-avatar size="100px" class="q-mt-sm">
  <img src="https://images.icon-icons.com/2859/PNG/512/avatar_face_man_boy_profile_smiley_happy_people_icon_181659.png" alt="Company Logo" />
</q-avatar>

    <!-- Nome e ID -->
    <div class="text-center q-mt-sm">
      <div class="text-subtitle1 text-teal-4 text-weight-bold">Empresa Company</div>
      <div class="text-teal-3">ID: 782310273–323</div>
    </div>

    <div v-if="!editando" class="q-mt-xl full-width">
      <div class="q-mb-md">
        <q-icon name="person" class="q-mr-sm text-teal" />
        {{ form.nome }}
      </div>
      <div class="q-mb-md">
        <q-icon name="email" class="q-mr-sm text-teal" />
        {{ form.email }}
      </div>
      <div>
        <q-icon name="phone" class="q-mr-sm text-teal" />
        {{ form.telefone }}
      </div>
    </div>

    <!-- PARTE EM QUE DÁ PARA EDITAR!! -->
    <div v-else class="q-mt-md full-width">
      <q-input
        v-model="form.nome"
        label="Nome Completo"
        filled
        dense
        color="teal"
        rounded
        class="q-mb-md"
      />
      <q-input
        v-model="form.email"
        label="E-mail"
        filled
        dense
        color="teal"
        rounded
        class="q-mb-md"
      />
      <q-input
        v-model="form.telefone"
        label="Telefone"
        filled
        dense
        color="teal"
        rounded
        class="q-mb-md"
        placeholder="(11) 91234-5678"
      />
      <q-btn
        label="Atualizar"
        class="q-mt-sm bg-teal text-white full-width"
        rounded
        no-caps
        @click="atualizar"
      />
    </div>

    <q-footer class="bg-black q-pt-sm">
      <q-tabs
        align="justify"
        active-color="teal"
        indicator-color="teal"
        class="text-teal"
      >
        <q-tab icon="home" />
        <q-tab icon="notifications" />
        <q-tab icon="group" />
        <q-tab icon="person" />
      </q-tabs>
    </q-footer>

    <q-dialog v-model="confirmado">
      <q-card class="bg-teal text-white">
        <q-card-section class="text-h6">
          Informações atualizadas!
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" @click="confirmado = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const editando = ref(false)
const confirmado = ref(false)

const form = ref({
  nome: 'Maria Oliveira',
  email: 'maria@email.com',
  telefone: '(11) 91234-5678'
})

function atualizar() {
  confirmado.value = true
  editando.value = false
}
</script>
