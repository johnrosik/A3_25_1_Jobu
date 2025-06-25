<template>
  <q-page class="jobu-page">
    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="$router.go(-1)" />
        <div class="header-title">Selecionar Serviço</div>
        <q-btn flat round icon="menu" class="jobu-btn--ghost" />
      </div>
    </div>

    <!-- Content -->
    <div class="jobu-content">
      <!-- Comentários Section -->
      <div class="jobu-section jobu-mb-xl">
        <h3 class="jobu-section-title jobu-text-accent jobu-mb-lg">Comentários</h3>

        <div class="comments-list jobu-space-y-md">
          <div class="comment-card jobu-card jobu-card--small">
            <div class="comment-header jobu-flex jobu-items-center jobu-gap-sm jobu-mb-sm">
              <q-avatar icon="person" class="jobu-avatar" />
              <div class="jobu-text-semibold">Lucas M.</div>
            </div>
            <q-rating
              v-model="rating1"
              max="5"
              color="yellow"
              readonly
              size="20px"
              class="jobu-mb-sm"
            />
            <div class="jobu-text-sm jobu-text-secondary">
              Muito profissional! Entregou antes do prazo e o resultado ficou incrível.
            </div>
          </div>

          <div class="comment-card jobu-card jobu-card--small">
            <div class="comment-header jobu-flex jobu-items-center jobu-gap-sm jobu-mb-sm">
              <q-avatar icon="person" class="jobu-avatar" />
              <div class="jobu-text-semibold">Camila S.</div>
            </div>
            <q-rating
              v-model="rating2"
              max="5"
              color="yellow"
              readonly
              size="20px"
              class="jobu-mb-sm"
            />
            <div class="jobu-text-sm jobu-text-secondary">
              Joana entendeu exatamente o que eu queria. Super recomendo!
            </div>
          </div>
        </div>
      </div>

      <!-- Serviços Section -->
      <div class="jobu-section jobu-mb-xl">
        <h3 class="jobu-section-title jobu-text-accent jobu-mb-lg">Selecionar Serviços</h3>

        <div class="services-selection jobu-card">
          <q-option-group
            v-model="servicoSelecionado"
            :options="servicos"
            type="radio"
            color="primary"
            class="jobu-radio-group"
          />
        </div>
      </div>

      <!-- Action Button -->
      <div class="action-section jobu-text-center">
        <q-btn
          label="Finalizar Contratação"
          class="jobu-btn jobu-btn--primary jobu-btn--large jobu-full-width"
          @click="finalizarContratacao"
        />
      </div>
    </div>

    <!-- Footer Navigation -->
    <div class="jobu-footer">
      <q-tabs align="justify" class="jobu-tabs">
        <q-tab icon="home" class="jobu-tab" @click="$router.push('/')" />
        <q-tab icon="notifications" class="jobu-tab" />
        <q-tab icon="group" class="jobu-tab" />
        <q-tab icon="person" class="jobu-tab" />
      </q-tabs>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const rating1 = ref(5)
const rating2 = ref(5)
const servicoSelecionado = ref('s1')

const servicos = Array.from({ length: 10 }, (_, i) => ({
  label: 'Criação de Logotipos',
  value: `s${i + 1}`,
  caption: 'R$ 75,00',
}))

const finalizarContratacao = () => {
  // Lógica para finalizar contratação
  console.log('Serviço selecionado:', servicoSelecionado.value)
  // Redirecionar para página de pagamento ou confirmação
  router.push('/pagamento')
}
</script>

<style scoped>
/* Estilos específicos para esta página */
.comment-card {
  border-left: 3px solid var(--jobu-accent);
}

:deep(.jobu-radio-group .q-radio) {
  color: var(--jobu-text-primary);
}

:deep(.jobu-radio-group .q-radio__label) {
  color: var(--jobu-text-primary);
}
</style>
