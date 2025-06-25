<template>
  <q-page class="jobu-page">
    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="goBack" />
        <div class="header-title">Adicionar Cartão</div>
        <q-btn flat round icon="help" class="jobu-btn--ghost" />
      </div>
    </div>

    <!-- Content -->
    <div class="jobu-content">
      <!-- Card Preview -->
      <div class="card-preview jobu-mb-xl">
        <div class="credit-card jobu-card--glass" :class="getCardType()">
          <div class="card-chip">
            <div class="chip"></div>
          </div>

          <div class="card-number jobu-text-lg jobu-font-mono jobu-mb-lg">
            {{ formattedNumber || '**** **** **** ****' }}
          </div>

          <div class="card-info jobu-flex jobu-justify-between jobu-mb-md">
            <div class="card-holder">
              <div class="label jobu-text-xs jobu-text-secondary jobu-uppercase">Nome do Portador</div>
              <div class="value jobu-text-sm jobu-font-semibold">{{ nome || 'NOME COMPLETO' }}</div>
            </div>
            <div class="card-expiry">
              <div class="label jobu-text-xs jobu-text-secondary jobu-uppercase">Válido até</div>
              <div class="value jobu-text-sm jobu-font-semibold">{{ expira || 'MM/AA' }}</div>
            </div>
          </div>

          <div class="card-brand">
            <q-icon :name="getBrandIcon()" size="32px" class="jobu-text-white" />
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="card-form">
        <div class="jobu-card">
          <div class="jobu-card-header">
            <h4 class="card-title">Dados do Cartão</h4>
          </div>

          <div class="jobu-card-content">
            <q-form @submit="onSubmit" class="form-grid">
              <!-- Card Number -->
              <div class="form-group jobu-mb-lg">
                <q-input
                  v-model="numero"
                  label="Número do Cartão"
                  mask="#### #### #### ####"
                  fill-mask
                  filled
                  color="teal"
                  class="jobu-input"
                  :error="!!errors.numero"
                  :error-message="errors.numero"
                  @input="validateCardNumber"
                >
                  <template v-slot:prepend>
                    <q-icon name="credit_card" />
                  </template>
                  <template v-slot:append>
                    <q-icon :name="getBrandIcon()" v-if="getCardType() !== 'default'" />
                  </template>
                </q-input>
              </div>

              <!-- Cardholder Name -->
              <div class="form-group jobu-mb-lg">
                <q-input
                  v-model="nome"
                  label="Nome no Cartão"
                  filled
                  color="teal"
                  class="jobu-input"
                  :error="!!errors.nome"
                  :error-message="errors.nome"
                  @input="validateName"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <!-- Expiry and CVV -->
              <div class="form-row jobu-flex jobu-gap-md jobu-mb-lg">
                <div class="jobu-flex-1">
                  <q-input
                    v-model="expira"
                    label="MM/AA"
                    mask="##/##"
                    fill-mask
                    filled
                    color="teal"
                    class="jobu-input"
                    :error="!!errors.expira"
                    :error-message="errors.expira"
                    @input="validateExpiry"
                  >
                    <template v-slot:prepend>
                      <q-icon name="calendar_today" />
                    </template>
                  </q-input>
                </div>

                <div class="jobu-flex-1">
                  <q-input
                    v-model="cvv"
                    label="CVV"
                    mask="###"
                    fill-mask
                    filled
                    color="teal"
                    class="jobu-input"
                    :error="!!errors.cvv"
                    :error-message="errors.cvv"
                    @input="validateCVV"
                  >
                    <template v-slot:prepend>
                      <q-icon name="security" />
                    </template>
                  </q-input>
                </div>
              </div>

              <!-- Save Card Toggle -->
              <div class="form-group jobu-mb-lg">
                <q-toggle
                  v-model="salvarCartao"
                  label="Salvar cartão para pagamentos futuros"
                  color="teal"
                />
                <div class="jobu-text-sm jobu-text-secondary jobu-mt-xs">
                  Seus dados são criptografados e seguros
                </div>
              </div>

              <!-- Buttons -->
              <div class="form-actions jobu-flex jobu-gap-md">
                <q-btn
                  label="Cancelar"
                  class="jobu-btn jobu-btn--outline jobu-flex-1"
                  @click="goBack"
                />
                <q-btn
                  label="Adicionar Cartão"
                  type="submit"
                  class="jobu-btn jobu-btn--primary jobu-flex-1"
                  :loading="loading"
                  :disable="!isFormValid"
                />
              </div>
            </q-form>
          </div>
        </div>

        <!-- Security Info -->
        <div class="jobu-card jobu-card--highlight jobu-mt-lg">
          <div class="jobu-card-content">
            <div class="security-info jobu-flex jobu-items-center jobu-gap-md">
              <q-icon name="shield" size="32px" class="jobu-text-accent" />
              <div>
                <div class="jobu-font-semibold jobu-mb-xs">Seus dados estão seguros</div>
                <div class="jobu-text-sm jobu-text-secondary">
                  Utilizamos criptografia de nível bancário para proteger suas informações
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Form state
const numero = ref('')
const nome = ref('')
const expira = ref('')
const cvv = ref('')
const salvarCartao = ref(false)
const loading = ref(false)

// Errors state
const errors = ref({
  numero: '',
  nome: '',
  expira: '',
  cvv: ''
})

// Computed properties
const formattedNumber = computed(() => {
  return numero.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
})

const isFormValid = computed(() => {
  return numero.value && nome.value && expira.value && cvv.value &&
         !errors.value.numero && !errors.value.nome &&
         !errors.value.expira && !errors.value.cvv
})

// Card type detection
const getCardType = () => {
  const number = numero.value.replace(/\s/g, '')
  if (number.startsWith('4')) return 'visa'
  if (number.startsWith('5') || number.startsWith('2')) return 'mastercard'
  if (number.startsWith('3')) return 'amex'
  return 'default'
}

const getBrandIcon = () => {
  const type = getCardType()
  switch (type) {
    case 'visa': return 'credit_card'
    case 'mastercard': return 'credit_card'
    case 'amex': return 'credit_card'
    default: return 'credit_card'
  }
}

// Validation functions
const validateCardNumber = () => {
  const number = numero.value.replace(/\s/g, '')
  if (!number) {
    errors.value.numero = 'Número do cartão é obrigatório'
  } else if (number.length < 16) {
    errors.value.numero = 'Número do cartão deve ter 16 dígitos'
  } else if (!/^\d+$/.test(number)) {
    errors.value.numero = 'Número do cartão deve conter apenas dígitos'
  } else {
    errors.value.numero = ''
  }
}

const validateName = () => {
  if (!nome.value.trim()) {
    errors.value.nome = 'Nome do portador é obrigatório'
  } else if (nome.value.trim().length < 2) {
    errors.value.nome = 'Nome deve ter pelo menos 2 caracteres'
  } else {
    errors.value.nome = ''
  }
}

const validateExpiry = () => {
  const [month, year] = expira.value.split('/')
  const currentYear = new Date().getFullYear() % 100
  const currentMonth = new Date().getMonth() + 1

  if (!expira.value) {
    errors.value.expira = 'Data de validade é obrigatória'
  } else if (!/^\d{2}\/\d{2}$/.test(expira.value)) {
    errors.value.expira = 'Formato inválido (MM/AA)'
  } else if (parseInt(month) < 1 || parseInt(month) > 12) {
    errors.value.expira = 'Mês inválido'
  } else if (parseInt(year) < currentYear ||
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    errors.value.expira = 'Cartão expirado'
  } else {
    errors.value.expira = ''
  }
}

const validateCVV = () => {
  if (!cvv.value) {
    errors.value.cvv = 'CVV é obrigatório'
  } else if (cvv.value.length < 3) {
    errors.value.cvv = 'CVV deve ter 3 dígitos'
  } else if (!/^\d+$/.test(cvv.value)) {
    errors.value.cvv = 'CVV deve conter apenas dígitos'
  } else {
    errors.value.cvv = ''
  }
}

// Watchers for real-time validation
watch(numero, validateCardNumber)
watch(nome, validateName)
watch(expira, validateExpiry)
watch(cvv, validateCVV)

// Form handlers
const onSubmit = async () => {
  // Validate all fields
  validateCardNumber()
  validateName()
  validateExpiry()
  validateCVV()

  if (!isFormValid.value) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, corrija os erros no formulário',
      icon: 'error'
    })
    return
  }

  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    $q.notify({
      color: 'positive',
      message: 'Cartão adicionado com sucesso!',
      icon: 'check_circle'
    })

    // Redirect back to payment page
    router.push('/pagamento')
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Erro ao adicionar cartão. Tente novamente.',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.card-preview {
  display: flex;
  justify-content: center;
  margin-bottom: var(--jobu-space-xl);
}

.credit-card {
  width: 350px;
  height: 220px;
  border-radius: 20px;
  padding: var(--jobu-space-lg);
  position: relative;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  &.visa {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  }

  &.mastercard {
    background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
  }

  &.amex {
    background: linear-gradient(135deg, #3a6073 0%, #16222a 100%);
  }
}

.card-chip {
  margin-bottom: var(--jobu-space-lg);

  .chip {
    width: 40px;
    height: 30px;
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
    border-radius: 6px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      bottom: 4px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }
  }
}

.card-number {
  letter-spacing: 2px;
}

.card-brand {
  position: absolute;
  top: var(--jobu-space-lg);
  right: var(--jobu-space-lg);
}

.card-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-grid {
  .form-group {
    width: 100%;
  }
}

.security-info {
  padding: var(--jobu-space-md);
}

// Mobile responsiveness
@media (max-width: 768px) {
  .credit-card {
    width: 300px;
    height: 190px;
    padding: var(--jobu-space-md);
  }

  .form-row {
    flex-direction: column;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
