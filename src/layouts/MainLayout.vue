<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Jobu
        </q-toolbar-title>
      </q-toolbar>

        <div class="row items-center no-wrap full-width">
          <q-tabs
            align="center"
            class="bg-highlight text-white col"
            style="font-size: 1.15rem;"
          >
            <q-route-tab to="/page1" label="Início" />
            <q-route-tab to="/page2" label="Descubra" />
            <q-route-tab to="/page3" label="Jobu" />
          </q-tabs>
          <q-tabs
            align="right"
            class="bg-highlight text-white"
            style="font-size: 1.15rem; min-width: 120px;"
          >
            <q-route-tab to="/login" label="Login" />
          </q-tabs>
        </div>
        </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
