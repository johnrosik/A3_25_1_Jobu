<template>
  <q-layout view="hHh lpR fFf">
    <!-- navbar moderna -->
    <q-header reveal class="modern-navbar" height-hint="80">
      <q-toolbar class="navbar-content">
        <!-- logo e menu -->
        <div class="logo-section">
          <q-btn dense flat round icon="menu" class="menu-btn" @click="toggleLeftDrawer" />
          <div class="brand-container">
            <q-avatar size="50px" class="logo-avatar">
              <img src="../assets/jobu-logo.png" alt="Jobu" />
            </q-avatar>
            <span class="brand-name">Jobu</span>
          </div>
        </div>

        <!-- links principais -->
        <div class="nav-links">
          <q-btn
            flat
            no-caps
            class="nav-link"
            to="/index"
            label="Início"
            :class="{ active: $route.path === '/index' }"
          />
          <q-btn
            flat
            no-caps
            class="nav-link"
            to="/descubra"
            label="Descubra"
            :class="{ active: $route.path === '/descubra' }"
          />
          <q-btn
            flat
            no-caps
            class="nav-link"
            to="/intro"
            label="Jobu"
            :class="{ active: $route.path === '/intro' }"
          />
        </div>

        <!-- botao login -->
        <div class="auth-section">
          <q-btn outline no-caps class="login-btn" to="/login" label="Login" icon-right="login" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      elevated
      class="navigation-drawer"
    >
      <!-- Header do menu lateral -->
      <div class="drawer-header">
        <q-avatar size="40px" class="drawer-logo">
          <img src="../assets/jobu-logo.png" alt="Jobu" />
        </q-avatar>
        <span class="drawer-title">Jobu</span>
      </div>

      <!-- Lista de navegação -->
      <q-list class="drawer-menu">
        <!-- Páginas Principais -->
        <q-item-label header class="menu-section-title">
          <q-icon name="home" />
          Páginas Principais
        </q-item-label>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/index')"
          :class="{ active: $route.path === '/index' }"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Início</q-item-label>
            <q-item-label caption>Página inicial</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/intro')"
          :class="{ active: $route.path === '/intro' }"
        >
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sobre o Jobu</q-item-label>
            <q-item-label caption>Conheça nossa plataforma</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/descubra')"
          :class="{ active: $route.path === '/descubra' }"
        >
          <q-item-section avatar>
            <q-icon name="explore" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Descubra</q-item-label>
            <q-item-label caption>Explore oportunidades</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/login')"
          :class="{ active: $route.path === '/login' }"
        >
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Login</q-item-label>
            <q-item-label caption>Acessar conta</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- Perfis -->
        <q-item-label header class="menu-section-title">
          <q-icon name="person" />
          Perfis
        </q-item-label>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/profile')"
          :class="{
            active: $route.path.startsWith('/profile'),
          }"
        >
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Meu Perfil</q-item-label>
            <q-item-label caption>Acessar perfil unificado</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- Funcionalidades -->
        <q-item-label header class="menu-section-title">
          <q-icon name="apps" />
          Funcionalidades
        </q-item-label>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/servicos')"
          :class="{ active: $route.path === '/servicos' }"
        >
          <q-item-section avatar>
            <q-icon name="design_services" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Serviços</q-item-label>
            <q-item-label caption>Seleção de serviços</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/filtros')"
          :class="{ active: $route.path === '/filtros' }"
        >
          <q-item-section avatar>
            <q-icon name="filter_list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Filtros</q-item-label>
            <q-item-label caption>Filtrar resultados</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/interesses')"
          :class="{ active: $route.path === '/interesses' }"
        >
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Interesses</q-item-label>
            <q-item-label caption>Seus interesses</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- Pagamento -->
        <q-item-label header class="menu-section-title">
          <q-icon name="payment" />
          Pagamento
        </q-item-label>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/pagamento')"
          :class="{ active: $route.path === '/pagamento' }"
        >
          <q-item-section avatar>
            <q-icon name="payment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pagamento</q-item-label>
            <q-item-label caption>Processar pagamentos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('/adicionar-cartao')"
          :class="{ active: $route.path === '/adicionar-cartao' }"
        >
          <q-item-section avatar>
            <q-icon name="credit_card" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Adicionar Cartão</q-item-label>
            <q-item-label caption>Gerenciar cartões</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Footer do drawer -->
      <div class="drawer-footer">
        <q-btn
          flat
          no-caps
          icon="close"
          label="Fechar"
          @click="leftDrawerOpen = false"
          class="close-drawer-btn"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <transition :name="transitionName" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
// funcoes do layout
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const route = useRoute()
    const router = useRouter()

    const transitionName = computed(() => {
      // animacao especial pro login
      if (route.path === '/login') {
        return 'page-expand'
      }
      // animacao padrao pras outras
      return 'page-slide'
    })

    const navigateTo = (path) => {
      router.push(path)
      leftDrawerOpen.value = false // Fecha o drawer após navegação
    }

    return {
      leftDrawerOpen,
      transitionName,
      navigateTo,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '../css/quasar.variables.scss';

// navbar bonita
.modern-navbar {
  background: linear-gradient(
    135deg,
    $navbarmain 0%,
    color.scale($navbarmain, $lightness: -5%) 100%
  );
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 184, 148, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 184, 148, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 12px 48px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(0, 184, 148, 0.2);
  }
}

// conteudo principal
.navbar-content {
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
}

// logo e marca
.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-btn {
  color: $navbartext;
  transition: all 0.3s ease;

  &:hover {
    color: $secondary;
    transform: scale(1.1);
  }

  @media (min-width: 1024px) {
    display: none;
  }
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }
}

.logo-avatar {
  border: 2px solid rgba(0, 184, 148, 0.3);
  transition: all 0.3s ease;

  &:hover {
    border-color: $secondary;
    box-shadow: 0 0 20px rgba(0, 184, 148, 0.4);
  }
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: $textprimary;
  background: linear-gradient(135deg, $textprimary 0%, $secondary 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

// menu de links
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  color: $navbartext;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 184, 148, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    color: $secondary;
    background: rgba(0, 184, 148, 0.1);
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &.active {
    color: $navbarmain;
    background: $secondary;
    box-shadow: 0 4px 15px rgba(0, 184, 148, 0.3);

    &:hover {
      color: $navbarmain;
      background: color.scale($secondary, $lightness: 10%);
    }
  }
}

// botao de login
.auth-section {
  display: flex;
  align-items: center;
}

.login-btn {
  color: $secondary !important;
  border: 2px solid $secondary;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: $secondary;
    transition: width 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: $navbarmain !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 184, 148, 0.3);

    &::before {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
}

// responsivo mobile
@media (max-width: 768px) {
  .navbar-content {
    justify-content: space-between;
  }

  .brand-name {
    font-size: 1.3rem;
  }

  .logo-avatar {
    width: 40px;
    height: 40px;
  }
}

/* Page Transitions */
.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.3s ease;
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.page-expand-enter-active,
.page-expand-leave-active {
  transition: all 0.4s ease;
  transform-origin: center;
}

.page-expand-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.page-expand-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Responsive Drawer */
@media (min-width: 1024px) {
  .navigation-drawer {
    width: 300px;
  }
}

@media (max-width: 768px) {
  .drawer-header {
    padding: 16px 12px;
  }

  .drawer-title {
    font-size: 1.2rem;
  }

  .menu-section-title {
    font-size: 0.8rem;
    padding: 12px 12px 6px 12px;
  }

  .q-item {
    margin: 1px 4px;
    padding: 8px 12px;
  }
}

// brilho da navbar
@keyframes navbarGlow {
  0%,
  100% {
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(0, 184, 148, 0.1);
  }
  50% {
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(0, 184, 148, 0.2);
  }
}

.modern-navbar {
  animation: navbarGlow 3s ease-in-out infinite;
}

/* Drawer/Sidebar Styles */
.navigation-drawer {
  background: linear-gradient(180deg, rgba(26, 26, 26, 0.98) 0%, rgba(15, 15, 15, 0.98) 100%);
  backdrop-filter: blur(10px);
}

.drawer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  background: rgba(0, 184, 148, 0.05);
  border-bottom: 1px solid rgba(0, 184, 148, 0.1);
}

.drawer-logo {
  border: 2px solid rgba(0, 184, 148, 0.2);
}

.drawer-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: $textprimary;
  background: linear-gradient(135deg, $textprimary 0%, $secondary 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.drawer-menu {
  padding: 8px 0;
}

.menu-section-title {
  color: $secondary !important;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 16px 16px 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: transparent;
}

.q-item {
  color: rgba(255, 255, 255, 0.8);
  margin: 2px 8px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: transparent;

  &:hover {
    background: rgba(0, 184, 148, 0.08) !important;
    color: $secondary;
    transform: translateX(2px);
  }

  &.active {
    background: rgba(0, 184, 148, 0.12) !important;
    color: $secondary;
    border-left: 3px solid $secondary;

    .q-icon {
      color: $secondary;
    }
  }

  .q-item-section--avatar {
    min-width: 40px;

    .q-icon {
      transition: all 0.3s ease;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  &:hover .q-icon,
  &.active .q-icon {
    color: $secondary;
  }

  .q-item__label {
    font-weight: 500;
  }

  .q-item__label--caption {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
  }
}

.q-separator {
  background: rgba(0, 184, 148, 0.15);
  margin: 8px 16px;
}

.drawer-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(0, 184, 148, 0.1);
}

.close-drawer-btn {
  width: 100%;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  background: transparent;

  &:hover {
    background: rgba(0, 184, 148, 0.08) !important;
    color: $secondary;
  }
}

/* Remover highlights padrão do Quasar */
:deep(.q-item) {
  &.q-item--active {
    background: transparent !important;
  }

  &:before {
    display: none !important;
  }

  .q-focus-helper {
    display: none !important;
  }

  .q-ripple {
    opacity: 0.1 !important;
  }
}
</style>
