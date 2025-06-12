<template>
  <div class="flex flex-center q-pa-md" style="height: 100vh;">
    <div style="width: 100%; max-width: 400px;">
      <q-card class="elevated-card q-pa-md">
        <q-card-section>
          <div class="text-h6 text-center"
          color="primary">
            {{ isRegister ? 'Registro' : 'Login' }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="email"
              label="E-Mail"
              hint="Email de Cadastro"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor, digite seu e-mail' ]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="Senha"
              lazy-rules
              :rules="[ val => !!val || 'Por favor, digite sua senha' ]"
            />

            <!-- Apenas no modo registro -->
            <q-input
              v-if="isRegister"
              filled
              type="email"
              v-model="email"
              label="Your email *"
              lazy-rules
              :rules="[ val => val && val.includes('@') || 'Por favor, digite um e-mail válido' ]"
            />
            <q-input
              v-if="isRegister"
              filled
              v-model="firstName"
              label="Primeiro Nome"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor, digite seu primeiro nome' ]"
            />
            <q-input
              v-if="isRegister"
              filled
              v-model="lastName"
              label="Sobrenome"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor, digite seu sobrenome' ]"
            />
            <q-input
              v-if="isRegister"
              filled
              type="number"
              v-model="age"
              label="Idade"
              lazy-rules
              :rules="[ val => val && val > 0 || 'Por favor, digite sua idade' ]"
            />
            <q-toggle
              v-if="isRegister"
              v-model="accept"
              label="Aceito os termos e condições"
              :rules="[ val => val === true || 'Você precisa aceitar os termos' ]"
            />
            <div v-if="isRegister" class="text-caption text-grey">
              Ao se registrar, você concorda com nossos termos e condições.
            </div>
            <div class="row justify-center q-gutter-sm">
              <q-btn
              :label="isRegister ? 'Confirmar' : 'Login'"
              :type="isRegister ? 'submit' : 'reset'"
              color="primary"
              />
            </div>
            </q-form>

            <div class="text-center q-mt-md">
            <q-btn
              flat
              color="primary"
              :label="isRegister ? 'Já tem uma conta? Faça Login' : 'Nâo tem uma conta? Registre-se'"
              @click="toggleMode"
            />
            </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup() {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const email = ref(null)
    const accept = ref(false)
    const isRegister = ref(false)

    function toggleMode() {
      isRegister.value = !isRegister.value
    }

    function onSubmit() {
      if (accept.value !== true) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: isRegister.value ? 'Registered!' : 'Logged in!'
        })
      }
    }

    function onReset() {
      name.value = null
      age.value = null
      email.value = null
      accept.value = false
    }

    return {
      name,
      age,
      email,
      accept,
      isRegister,
      toggleMode,
      onSubmit,
      onReset
    }
  }
}
</script>
