<template>
  <q-page class="bg-black text-white q-pa-md">

    <div class="row items-center justify-between">
      <q-btn flat round icon="arrow_back" class="text-teal" />
      <div class="text-subtitle1 text-teal text-weight-bold">Meu Perfil</div>
      <div></div>
    </div>

    <div class="column items-center q-mt-md">
      <q-avatar size="80px">
        <img src="https://via.placeholder.com/80" />
      </q-avatar>
      <div class="text-teal text-bold q-mt-sm">Joana da Silva</div>
      <div class="text-teal-4 text-caption">ID: 782310273–323</div>
      <div class="text-caption">Design Gráfico</div>
      <div class="row items-center q-mt-xs">
        <q-icon name="star" size="16px" color="yellow" />
        <span class="text-caption q-ml-xs">4.8</span>
      </div>
    </div>

    <div class="row justify-around q-mt-md">
      <q-btn dense flat round size="sm" icon="person" color="teal" />
      <q-btn dense flat round size="sm" icon="group" color="teal" />
      <q-btn dense flat round size="sm" icon="description" color="teal" />
    </div>

    <q-list class="bg-black text-white q-mt-md">
      <q-item dense clickable v-ripple>
        <q-item-section avatar><q-icon name="description" color="teal" /></q-item-section>
        <q-item-section>Currículo</q-item-section>
      </q-item>
      <q-item dense clickable v-ripple>
        <q-item-section avatar><q-icon name="notifications" color="teal" /></q-item-section>
        <q-item-section>Notificações</q-item-section>
      </q-item>
      <q-item dense clickable v-ripple>
        <q-item-section avatar><q-icon name="settings" color="teal" /></q-item-section>
        <q-item-section>Configurações</q-item-section>
      </q-item>
      <q-item dense clickable v-ripple>
        <q-item-section avatar><q-icon name="share" color="teal" /></q-item-section>
        <q-item-section>Compartilhar</q-item-section>
      </q-item>
      <q-item dense clickable v-ripple>
        <q-item-section avatar><q-icon name="logout" color="teal" /></q-item-section>
        <q-item-section>Sair</q-item-section>
      </q-item>
    </q-list>

    <q-footer class="bg-black q-pt-sm q-mt-md">
      <q-tabs dense align="justify" class="text-teal" active-color="teal">
        <q-tab icon="home" />
        <q-tab icon="shopping_cart" />
        <q-tab icon="school" />
        <q-tab icon="person" />
      </q-tabs>
    </q-footer>

  </q-page>
</template>

<script setup>
</script>
