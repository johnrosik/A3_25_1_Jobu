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
            to="/page3"
            label="Jobu"
            :class="{ active: $route.path === '/page3' }"
          />
        </div>

        <!-- botao login -->
        <div class="auth-section">
          <q-btn outline no-caps class="login-btn" to="/login" label="Login" icon-right="login" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <!-- menu lateral -->
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
import { useRoute } from 'vue-router'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const route = useRoute()

    const transitionName = computed(() => {
      // animacao especial pro login
      if (route.path === '/login') {
        return 'page-expand'
      }
      // animacao padrao pras outras
      return 'page-slide'
    })

    return {
      leftDrawerOpen,
      transitionName,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

// navbar bonita
.modern-navbar {
  background: linear-gradient(135deg, $navbarmain 0%, darken($navbarmain, 5%) 100%);
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
      background: lighten($secondary, 10%);
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
</style>
