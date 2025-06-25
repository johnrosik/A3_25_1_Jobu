<!-- REFACTORED PaymentPage.vue using modular CSS -->
<template>
  <q-page class="jobu-page">
    <!-- Header -->
    <div class="jobu-header">
      <div class="header-content">
        <q-btn flat round icon="arrow_back" class="jobu-btn--ghost" @click="$router.back()" />
        <div class="header-title">Pagamento Seguro</div>
        <q-btn flat round icon="security" class="jobu-btn--ghost" />
      </div>
    </div>

    <!-- Content -->
    <div class="jobu-content">
      <!-- Resumo do Pedido -->
      <div class="jobu-card">
        <div class="jobu-card-header">
          <h3 class="card-title">Resumo do Pedido</h3>
          <div class="amount jobu-text-accent jobu-text-2xl jobu-font-bold">R$ 2.500,00</div>
        </div>
        <div class="jobu-card-content">
          <div class="jobu-list">
            <div class="list-item">
              <span>Desenvolvimento de Logo</span>
              <span>R$ 1.800,00</span>
            </div>
            <div class="list-item">
              <span>Taxa da plataforma (5%)</span>
              <span>R$ 90,00</span>
            </div>
            <div class="list-item">
              <span>Proteção Jobu</span>
              <span>R$ 150,00</span>
            </div>
          </div>
          <div class="jobu-divider"></div>
          <div class="list-item jobu-font-semibold jobu-text-accent">
            <span>Total</span>
            <span>R$ 2.500,00</span>
          </div>
        </div>
      </div>

      <!-- Métodos de Pagamento -->
      <div class="jobu-card">
        <div class="jobu-card-header">
          <h3 class="card-title">Forma de Pagamento</h3>
        </div>
        <div class="jobu-card-content">
          <div class="payment-methods">
            <div
              v-for="method in paymentMethods"
              :key="method.value"
              class="payment-method"
              :class="{ 'payment-method--active': selectedMethod === method.value }"
              @click="selectedMethod = method.value"
            >
              <div class="method-icon">
                <q-icon :name="method.icon" size="24px" />
              </div>
              <div class="method-info jobu-flex-1">
                <div class="method-name jobu-font-medium">{{ method.label }}</div>
                <div class="method-description jobu-text-secondary jobu-text-sm">
                  {{ method.description }}
                </div>
              </div>
              <q-radio v-model="selectedMethod" :val="method.value" color="teal" />
            </div>
          </div>

          <!-- Card Form -->
          <div v-if="selectedMethod === 'card'" class="card-form jobu-mt-lg">
            <!-- Saved Cards -->
            <div v-if="savedCards.length > 0" class="saved-cards jobu-mb-lg">
              <h5 class="jobu-text-accent jobu-font-medium jobu-mb-md">Cartões Salvos</h5>
              <div class="jobu-grid--1-cols">
                <div
                  v-for="card in savedCards"
                  :key="card.id"
                  class="saved-card jobu-card--interactive jobu-card--small"
                  :class="{ 'saved-card--active': selectedCard === card.id }"
                  @click="selectedCard = card.id"
                >
                  <div class="jobu-flex jobu-items-center">
                    <q-icon name="credit_card" size="24px" class="jobu-mr-md" />
                    <div class="jobu-flex-1">
                      <div class="card-number jobu-font-medium">
                        **** **** **** {{ card.lastFour }}
                      </div>
                      <div class="card-brand jobu-text-secondary jobu-text-sm">
                        {{ card.brand }} • {{ card.expiry }}
                      </div>
                    </div>
                    <q-radio v-model="selectedCard" :val="card.id" color="teal" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Add New Card Button -->
            <div class="jobu-text-center jobu-mb-lg">
              <q-btn
                flat
                color="teal"
                label="Adicionar Novo Cartão"
                icon="add"
                @click="goToAddCard"
                class="jobu-btn--secondary add-card-btn"
              />
            </div>

            <!-- New Card Form -->
            <div
              v-if="!selectedCard || selectedCard === 'new'"
              class="new-card-form jobu-card--small"
            >
              <div class="jobu-input-group">
                <q-input
                  v-model="cardNumber"
                  label="Número do Cartão"
                  mask="#### #### #### ####"
                  fill-mask
                  filled
                  color="teal"
                  class="jobu-input"
                >
                  <template v-slot:prepend>
                    <q-icon name="credit_card" />
                  </template>
                </q-input>
              </div>

              <div class="jobu-grid--2-cols">
                <div class="jobu-input-group">
                  <q-input
                    v-model="expiryDate"
                    label="MM/AA"
                    mask="##/##"
                    fill-mask
                    filled
                    color="teal"
                    class="jobu-input"
                  />
                </div>
                <div class="jobu-input-group">
                  <q-input
                    v-model="cvv"
                    label="CVV"
                    mask="###"
                    fill-mask
                    filled
                    color="teal"
                    class="jobu-input"
                  />
                </div>
              </div>

              <div class="jobu-input-group">
                <q-input
                  v-model="cardHolder"
                  label="Nome do Portador"
                  filled
                  color="teal"
                  class="jobu-input"
                />
              </div>

              <div class="save-card-option jobu-card--small">
                <q-checkbox
                  v-model="saveCard"
                  label="Salvar este cartão para pagamentos futuros"
                  color="teal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Info -->
      <div class="jobu-card security-info">
        <div class="jobu-flex jobu-flex-col jobu-gap-md">
          <div class="security-item">
            <q-icon name="lock" color="teal" class="jobu-mr-sm" />
            <span class="jobu-text-secondary">Pagamento 100% seguro e criptografado</span>
          </div>
          <div class="security-item">
            <q-icon name="verified_user" color="teal" class="jobu-mr-sm" />
            <span class="jobu-text-secondary">Proteção contra fraudes</span>
          </div>
          <div class="security-item">
            <q-icon name="account_balance" color="teal" class="jobu-mr-sm" />
            <span class="jobu-text-secondary">Dinheiro protegido até a entrega</span>
          </div>
        </div>
      </div>

      <!-- Payment Button -->
      <q-btn
        class="jobu-btn--primary jobu-btn--large jobu-btn--full-width payment-btn"
        label="Confirmar Pagamento"
        icon="payment"
        @click="processPayment"
        :loading="processing"
      />

      <!-- Demo Navigation -->
      <div class="demo-buttons jobu-flex jobu-justify-center jobu-gap-md jobu-mt-lg">
        <q-btn
          flat
          color="grey"
          label="Voltar aos Perfis"
          icon="arrow_back"
          @click="$router.push('/login')"
          class="jobu-btn--ghost"
        />
        <q-btn
          flat
          color="teal"
          label="Explorar Serviços"
          icon="explore"
          @click="$router.push('/descubra')"
          class="jobu-btn--ghost"
        />
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

// State
const selectedMethod = ref('card')
const processing = ref(false)
const selectedCard = ref(null)
const saveCard = ref(false)

// Card data
const cardNumber = ref('')
const expiryDate = ref('')
const cvv = ref('')
const cardHolder = ref('')

// Saved cards (simulation)
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

// Payment methods
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

// Functions
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

    setTimeout(() => {
      router.push('/client-profile')
    }, 2000)
  }, 2000)
}

const goToAddCard = () => {
  router.push('/adicionar-cartao?from=payment')
}
</script>

<style scoped lang="scss">
/* Import our base styles for mixins */
@import '../css/base/variables';
@import '../css/base/mixins';

/* Custom styles only for specific PaymentPage components */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: var(--jobu-space-sm);
}

.payment-method {
  @include jobu-flex-between;
  padding: var(--jobu-space-md);
  background: var(--jobu-bg-glass);
  border: 1px solid var(--jobu-border-subtle);
  border-radius: var(--jobu-radius-md);
  cursor: pointer;
  transition: all var(--jobu-transition-normal);

  &:hover {
    background: var(--jobu-bg-glass-hover);
    border-color: var(--jobu-border-glass);
  }

  &--active {
    background: var(--jobu-bg-glass-active);
    border-color: var(--jobu-secondary);
  }
}

.method-icon {
  @include jobu-flex-center;
  width: 48px;
  height: 48px;
  border-radius: var(--jobu-radius-md);
  background: var(--jobu-bg-glass-hover);
  color: var(--jobu-text-accent);
  margin-right: var(--jobu-space-md);
}

.card-form {
  padding: var(--jobu-space-lg);
  background: var(--jobu-bg-glass);
  border: 1px solid var(--jobu-border-subtle);
  border-radius: var(--jobu-radius-md);
}

.saved-card {
  cursor: pointer;
  transition: all var(--jobu-transition-normal);

  &--active {
    border-color: var(--jobu-secondary);
    background: var(--jobu-bg-glass-active);
  }

  &:hover {
    border-color: var(--jobu-border-glass);
  }
}

.add-card-btn {
  border: 2px dashed var(--jobu-border-glass);
  width: 100%;
  padding: var(--jobu-space-md) var(--jobu-space-lg);

  &:hover {
    border-color: var(--jobu-secondary);
    background: var(--jobu-bg-glass-hover);
  }
}

.security-info {
  background: var(--jobu-bg-glass-hover);
  border: 1px solid var(--jobu-border-glass);
}

.security-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.payment-btn {
  height: 56px;
  font-size: 1.1rem;
  margin: var(--jobu-space-lg) 0;
  animation: jobu-glow 2s ease-in-out infinite alternate;
}

/* Responsive */
@include jobu-responsive(mobile) {
  .demo-buttons {
    flex-direction: column;
  }

  .jobu-grid--2-cols {
    grid-template-columns: 1fr;
  }
}
</style>
