<template>
  <q-page class="payment-page">
    <!-- Header moderno -->
    <div class="modern-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="back-btn" @click="$router.back()" />
        <div class="header-title">Sistema de Pagamento</div>
        <q-btn flat round icon="security" class="security-btn" />
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="payment-content">
      <!-- Card de resumo -->
      <div class="summary-card">
        <div class="summary-header">
          <h3>Resumo do Pagamento</h3>
          <div class="amount">R$ 450,00</div>
        </div>
        <div class="summary-details">
          <div class="detail-item">
            <span>Serviço:</span>
            <span>Design de Logo</span>
          </div>
          <div class="detail-item">
            <span>Taxa da plataforma:</span>
            <span>R$ 22,50 (5%)</span>
          </div>
          <div class="detail-separator"></div>
          <div class="detail-item total">
            <span>Total:</span>
            <span>R$ 472,50</span>
          </div>
        </div>
      </div>

      <!-- Métodos de pagamento -->
      <div class="payment-methods-card">
        <h4 class="methods-title">Escolha o método de pagamento</h4>

        <div class="payment-methods-list">
          <div
            v-for="(method, index) in paymentMethods"
            :key="index"
            class="payment-method-item"
            :class="{ active: selectedMethod === method.value }"
            @click="selectedMethod = method.value"
          >
            <div class="method-icon">
              <q-icon :name="method.icon" size="24px" />
            </div>
            <div class="method-info">
              <div class="method-name">{{ method.label }}</div>
              <div class="method-description">{{ method.description }}</div>
            </div>
            <div class="method-radio">
              <q-radio v-model="selectedMethod" :val="method.value" color="teal" />
            </div>
          </div>
        </div>

        <!-- Formulário do cartão (se cartão selecionado) -->
        <div v-if="selectedMethod === 'card'" class="card-form">
          <!-- Cartões salvos -->
          <div class="saved-cards" v-if="savedCards.length > 0">
            <h5>Cartões Salvos</h5>
            <div class="cards-list">
              <div
                v-for="card in savedCards"
                :key="card.id"
                class="saved-card-item"
                :class="{ active: selectedCard === card.id }"
                @click="selectedCard = card.id"
              >
                <q-icon name="credit_card" size="24px" />
                <div class="card-details">
                  <div class="card-number">**** **** **** {{ card.lastFour }}</div>
                  <div class="card-brand">{{ card.brand }} • {{ card.expiry }}</div>
                </div>
                <q-radio v-model="selectedCard" :val="card.id" color="teal" />
              </div>
            </div>
          </div>

          <!-- Botão adicionar novo cartão -->
          <div class="add-new-card">
            <q-btn
              flat
              color="teal"
              label="Adicionar Novo Cartão"
              icon="add"
              @click="goToAddCard"
              class="add-card-btn"
            />
          </div>

          <!-- Formulário novo cartão (se nenhum salvo selecionado) -->
          <div v-if="!selectedCard || selectedCard === 'new'" class="new-card-form">
            <div class="form-group">
              <q-input
                v-model="cardNumber"
                label="Número do Cartão"
                mask="#### #### #### ####"
                fill-mask
                filled
                color="teal"
                class="card-input"
              >
                <template v-slot:prepend>
                  <q-icon name="credit_card" />
                </template>
              </q-input>
            </div>

            <div class="row q-gutter-md">
              <div class="col">
                <q-input
                  v-model="expiryDate"
                  label="MM/AA"
                  mask="##/##"
                  fill-mask
                  filled
                  color="teal"
                  class="card-input"
                />
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
                />
              </div>
            </div>

            <div class="form-group">
              <q-input
                v-model="cardHolder"
                label="Nome do Portador"
                filled
                color="teal"
                class="card-input"
              />
            </div>

            <div class="save-card-option">
              <q-checkbox
                v-model="saveCard"
                label="Salvar este cartão para pagamentos futuros"
                color="teal"
              />
            </div>
          </div>
        </div>

        <!-- Informações de segurança -->
        <div class="security-info">
          <div class="security-item">
            <q-icon name="lock" color="teal" />
            <span>Pagamento 100% seguro e criptografado</span>
          </div>
          <div class="security-item">
            <q-icon name="verified_user" color="teal" />
            <span>Proteção contra fraudes</span>
          </div>
          <div class="security-item">
            <q-icon name="account_balance" color="teal" />
            <span>Dinheiro protegido até a entrega</span>
          </div>
        </div>

        <!-- Botão de pagamento -->
        <q-btn
          class="payment-btn"
          color="teal"
          size="lg"
          label="Confirmar Pagamento"
          icon="payment"
          @click="processPayment"
          :loading="processing"
        />

        <!-- Botões de demonstração -->
        <div class="demo-buttons">
          <q-btn
            flat
            color="grey"
            label="Voltar aos Perfis"
            icon="arrow_back"
            @click="$router.push('/login')"
            size="sm"
          />
          <q-btn
            flat
            color="teal"
            label="Explorar Serviços"
            icon="explore"
            @click="$router.push('/descubra')"
            size="sm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Estado dos formulários
const selectedMethod = ref('card')
const processing = ref(false)
const selectedCard = ref(null)
const saveCard = ref(false)

// Dados do cartão
const cardNumber = ref('')
const expiryDate = ref('')
const cvv = ref('')
const cardHolder = ref('')

// Cartões salvos (simulação)
const savedCards = ref([
  {
    id: 1,
    lastFour: '4532',
    brand: 'Visa',
    expiry: '12/25',
    holder: 'João Silva',
  },
  {
    id: 2,
    lastFour: '1234',
    brand: 'Mastercard',
    expiry: '08/26',
    holder: 'João Silva',
  },
])

// Métodos de pagamento
const paymentMethods = ref([
  {
    label: 'Cartão de Crédito/Débito',
    icon: 'credit_card',
    value: 'card',
    description: 'Visa, Mastercard, American Express',
  },
  {
    label: 'PIX',
    icon: 'qr_code',
    value: 'pix',
    description: 'Pagamento instantâneo',
  },
  {
    label: 'PayPal',
    icon: 'account_balance_wallet',
    value: 'paypal',
    description: 'Conta PayPal ou cartão',
  },
  {
    label: 'Apple Pay',
    icon: 'apple',
    value: 'apple',
    description: 'Touch ID ou Face ID',
  },
])

// Processar pagamento
const processPayment = () => {
  processing.value = true

  setTimeout(() => {
    processing.value = false
    $q.notify({
      type: 'positive',
      message: 'Pagamento processado com sucesso!',
      caption: 'O freelancer foi notificado e iniciará o trabalho.',
      icon: 'check_circle',
      timeout: 3000,
    })

    // Redirecionar após sucesso
    setTimeout(() => {
      router.push('/client-profile')
    }, 2000)
  }, 2000)
}

// Ir para página de adicionar cartão
const goToAddCard = () => {
  router.push('/adicionar-cartao?from=payment')
}
</script>

<style scoped>
.payment-page {
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
.security-btn {
  color: #00b894;
  transition: all 0.3s ease;
}

.back-btn:hover,
.security-btn:hover {
  color: white;
  transform: scale(1.1);
}

/* Conteúdo */
.payment-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Card de resumo */
.summary-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(0, 184, 148, 0.2);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.summary-header h3 {
  margin: 0;
  color: #00b894;
  font-size: 1.2rem;
}

.amount {
  font-size: 1.8rem;
  font-weight: 600;
  color: #00b894;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-item.total {
  font-weight: 600;
  font-size: 1.1rem;
  color: #00b894;
}

.detail-separator {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 8px 0;
}

/* Card de métodos */
.payment-methods-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(0, 184, 148, 0.2);
}

.methods-title {
  margin: 0 0 20px 0;
  color: #00b894;
  font-size: 1.2rem;
  font-weight: 600;
}

/* Lista de métodos */
.payment-methods-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.payment-method-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-method-item:hover {
  background: rgba(0, 184, 148, 0.1);
  border-color: rgba(0, 184, 148, 0.3);
}

.payment-method-item.active {
  background: rgba(0, 184, 148, 0.15);
  border-color: rgba(0, 184, 148, 0.4);
}

.method-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(0, 184, 148, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00b894;
  margin-right: 16px;
}

.method-info {
  flex: 1;
}

.method-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.method-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Formulário do cartão */
.card-form {
  margin: 24px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(0, 184, 148, 0.1);
}

.form-group {
  margin-bottom: 16px;
}

.card-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

/* Cartões salvos */
.saved-cards {
  margin-bottom: 24px;
}

.saved-cards h5 {
  color: #00b894;
  margin: 0 0 16px 0;
  font-size: 1rem;
  font-weight: 600;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.saved-card-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.saved-card-item:hover {
  background: rgba(0, 184, 148, 0.1);
  border-color: rgba(0, 184, 148, 0.3);
}

.saved-card-item.active {
  background: rgba(0, 184, 148, 0.15);
  border-color: rgba(0, 184, 148, 0.4);
}

.card-details {
  flex: 1;
  margin-left: 12px;
}

.card-number {
  font-family: 'Courier New', monospace;
  font-weight: 500;
  margin-bottom: 4px;
}

.card-brand {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Botão adicionar novo cartão */
.add-new-card {
  margin: 16px 0;
  text-align: center;
}

.add-card-btn {
  border: 2px dashed rgba(0, 184, 148, 0.3);
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
  transition: all 0.3s ease;
}

.add-card-btn:hover {
  border-color: rgba(0, 184, 148, 0.6);
  background: rgba(0, 184, 148, 0.05);
}

/* Formulário novo cartão */
.new-card-form {
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(0, 184, 148, 0.1);
}

.save-card-option {
  margin-top: 16px;
  padding: 12px;
  background: rgba(0, 184, 148, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 184, 148, 0.2);
}

.save-card-option :deep(.q-checkbox__label) {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
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

/* Botão de pagamento */
.payment-btn {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 24px 0 16px 0;
}

/* Botões de demonstração */
.demo-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 16px;
}

/* Responsivo */
@media (max-width: 768px) {
  .payment-content {
    padding: 20px 16px;
  }

  .header-content {
    padding: 0 16px;
  }

  .amount {
    font-size: 1.5rem;
  }

  .summary-header {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .demo-buttons {
    flex-direction: column;
  }
}
</style>
