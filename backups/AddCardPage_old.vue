<template>
  <q-page class="add-card-page">
    <!-- Header moderno -->
    <div class="modern-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="back-btn" @click="goBack" />
        <div class="header-title">Adicionar Cartão</div>
        <q-btn flat round icon="help" class="help-btn" />
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="add-card-content">
      <!-- Preview do cartão -->
      <div class="card-preview">
        <div class="credit-card" :class="getCardType()">
          <div class="card-chip">
            <div class="chip"></div>
          </div>

          <div class="card-number">
            {{ formattedNumber || '**** **** **** ****' }}
          </div>

          <div class="card-info">
            <div class="card-holder">
              <div class="label">Nome do Portador</div>
              <div class="value">{{ nome || 'NOME COMPLETO' }}</div>
            </div>
            <div class="card-expiry">
              <div class="label">Válido até</div>
              <div class="value">{{ expira || 'MM/AA' }}</div>
            </div>
          </div>

          <div class="card-brand">
            <q-icon :name="getBrandIcon()" size="32px" />
          </div>
        </div>
      </div>

      <!-- Formulário -->
      <div class="card-form">
        <div class="form-section">
          <h4 class="section-title">Dados do Cartão</h4>

          <div class="form-group">
            <q-input
              v-model="numero"
              label="Número do Cartão"
              mask="#### #### #### ####"
              fill-mask
              filled
              color="teal"
              class="card-input"
              :error="errors.numero"
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

          <div class="form-group">
            <q-input
              v-model="nome"
              label="Nome no Cartão"
              filled
              color="teal"
              class="card-input"
              :error="errors.nome"
              :error-message="errors.nome"
              @input="validateName"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>

          <div class="row q-gutter-md">
            <div class="col">
              <q-input
                v-model="expira"
                label="MM/AA"
                mask="##/##"
                fill-mask
                filled
                color="teal"
                class="card-input"
                :error="errors.expira"
                :error-message="errors.expira"
                @input="validateExpiry"
              >
                <template v-slot:prepend>
                  <q-icon name="calendar_today" />
                </template>
              </q-input>
            </div>
            <div class="col">
              <q-input
                v-model="cvv"
                label="CVV"
                mask="###"
                fill-mask
                filled
                color="teal"
                class="card-input"
                :error="errors.cvv"
                :error-message="errors.cvv"
                @input="validateCVV"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <!-- Informações de segurança -->
        <div class="security-info">
          <div class="security-item">
            <q-icon name="lock" color="teal" />
            <span>Seus dados são criptografados e seguros</span>
          </div>
          <div class="security-item">
            <q-icon name="verified_user" color="teal" />
            <span>Certificação SSL e PCI compliant</span>
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="action-buttons">
          <q-btn
            flat
            color="grey"
            label="Cancelar"
            icon="close"
            @click="goBack"
            class="cancel-btn"
          />
          <q-btn
            color="teal"
            label="Salvar Cartão"
            icon="save"
            @click="saveCard"
            :loading="saving"
            :disable="!isFormValid"
            class="save-btn"
          />
        </div>

        <!-- Link para voltar ao pagamento -->
        <div class="payment-link">
          <q-btn
            flat
            color="teal"
            label="Finalizar Pagamento"
            icon="payment"
            @click="goToPayment"
            v-if="fromPayment"
            size="sm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

// Estado do formulário
const numero = ref('')
const nome = ref('')
const expira = ref('')
const cvv = ref('')
const saving = ref(false)
const fromPayment = ref(false)

// Erros de validação
const errors = ref({
  numero: '',
  nome: '',
  expira: '',
  cvv: '',
})

// Verificar se veio da página de pagamento
onMounted(() => {
  fromPayment.value = route.query.from === 'payment'
})

// Computed
const formattedNumber = computed(() => {
  return numero.value.replace(/(\d{4})/g, '$1 ').trim()
})

const isFormValid = computed(() => {
  return (
    numero.value.length === 19 &&
    nome.value.length > 2 &&
    expira.value.length === 5 &&
    cvv.value.length === 3 &&
    !errors.value.numero &&
    !errors.value.nome &&
    !errors.value.expira &&
    !errors.value.cvv
  )
})

// Métodos de validação
const validateCardNumber = () => {
  const cleanNumber = numero.value.replace(/\s/g, '')
  if (cleanNumber.length < 16) {
    errors.value.numero = 'Número do cartão incompleto'
  } else if (!luhnCheck(cleanNumber)) {
    errors.value.numero = 'Número do cartão inválido'
  } else {
    errors.value.numero = ''
  }
}

const validateName = () => {
  if (nome.value.length < 3) {
    errors.value.nome = 'Nome muito curto'
  } else if (!/^[a-zA-Z\s]+$/.test(nome.value)) {
    errors.value.nome = 'Nome deve conter apenas letras'
  } else {
    errors.value.nome = ''
  }
}

const validateExpiry = () => {
  const [month, year] = expira.value.split('/')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  if (!month || !year) {
    errors.value.expira = 'Data inválida'
  } else if (parseInt(month) < 1 || parseInt(month) > 12) {
    errors.value.expira = 'Mês inválido'
  } else if (
    parseInt(year) < currentYear ||
    (parseInt(year) === currentYear && parseInt(month) < currentMonth)
  ) {
    errors.value.expira = 'Cartão expirado'
  } else {
    errors.value.expira = ''
  }
}

const validateCVV = () => {
  if (cvv.value.length !== 3) {
    errors.value.cvv = 'CVV deve ter 3 dígitos'
  } else {
    errors.value.cvv = ''
  }
}

// Algoritmo de Luhn para validação do cartão
const luhnCheck = (num) => {
  let sum = 0
  let isEven = false

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i])

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

// Identificação da bandeira do cartão
const getCardType = () => {
  const cleanNumber = numero.value.replace(/\s/g, '')

  if (cleanNumber.startsWith('4')) return 'visa'
  if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard'
  if (cleanNumber.startsWith('3')) return 'amex'
  if (cleanNumber.startsWith('6')) return 'discover'

  return 'default'
}

const getBrandIcon = () => {
  const type = getCardType()
  switch (type) {
    case 'visa':
      return 'credit_card'
    case 'mastercard':
      return 'credit_card'
    case 'amex':
      return 'credit_card'
    case 'discover':
      return 'credit_card'
    default:
      return 'credit_card'
  }
}

// Ações
const goBack = () => {
  if (fromPayment.value) {
    router.push('/pagamento')
  } else {
    router.back()
  }
}

const saveCard = () => {
  saving.value = true

  // Simular salvamento
  setTimeout(() => {
    saving.value = false

    $q.notify({
      type: 'positive',
      message: 'Cartão salvo com sucesso!',
      caption: 'Você pode usá-lo para pagamentos futuros.',
      icon: 'check_circle',
      timeout: 3000,
    })

    // Voltar para pagamento se veio de lá
    if (fromPayment.value) {
      router.push('/pagamento')
    } else {
      router.push('/client-profile')
    }
  }, 2000)
}

const goToPayment = () => {
  router.push('/pagamento')
}
</script>

<style scoped>
.add-card-page {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  min-height: 100vh;
  color: white;
}

/* Header */
.modern-header {
  background: linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 184, 148, 0.05) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 184, 148, 0.2);
  padding: 16px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #00b894;
}

.back-btn,
.help-btn {
  color: #00b894;
  transition: all 0.3s ease;
}

.back-btn:hover,
.help-btn:hover {
  color: white;
  transform: scale(1.1);
}

/* Conteúdo */
.add-card-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 20px;
}

/* Preview do cartão */
.card-preview {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}

.credit-card {
  width: 350px;
  height: 220px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: white;
  font-family: 'Courier New', monospace;
}

.credit-card.visa {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.credit-card.mastercard {
  background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
}

.credit-card.amex {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
}

.card-chip {
  width: 50px;
  height: 40px;
  margin-bottom: 24px;
}

.chip {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border-radius: 6px;
  border: 2px solid #b8860b;
}

.card-number {
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 4px;
  margin-bottom: 24px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.card-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.card-holder,
.card-expiry {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 0.7rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.value {
  font-size: 0.9rem;
  font-weight: 600;
}

.card-brand {
  position: absolute;
  top: 24px;
  right: 24px;
  opacity: 0.8;
}

/* Formulário */
.card-form {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(0, 184, 148, 0.1);
}

.form-section {
  margin-bottom: 32px;
}

.section-title {
  color: #00b894;
  margin: 0 0 24px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.card-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.card-input :deep(.q-field__native) {
  color: white;
}

/* Informações de segurança */
.security-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
  padding: 16px;
  background: rgba(0, 184, 148, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 184, 148, 0.2);
}

.security-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Botões */
.action-buttons {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
  margin: 32px 0 16px 0;
}

.cancel-btn,
.save-btn {
  height: 48px;
  border-radius: 12px;
  font-weight: 500;
}

.payment-link {
  text-align: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsivo */
@media (max-width: 768px) {
  .add-card-content {
    padding: 20px 16px;
  }

  .header-content {
    padding: 0 16px;
  }

  .credit-card {
    width: 100%;
    max-width: 320px;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
