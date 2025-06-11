<template>
  <q-page class="bg-black text-white column items-center q-pa-md">
    <div class="text-center q-mb-md">
      <div class="text-h5 text-weight-bold text-teal">Meu Perfil</div>
      <q-btn flat round dense icon="edit" class="absolute-top-right q-mt-sm q-mr-sm text-white" />
    </div>

   <q-avatar size="100px" class="q-mt-sm">
  <img src="https://img.freepik.com/vetores-gratis/logo-search-engine_1071-76.jpg?semt=ais_hybrid&w=740" alt="Company Logo" />
</q-avatar>

    <div class="text-center q-mt-sm">
      <div class="text-subtitle1 text-bold text-teal-4">Empresa Company</div>
      <div class="text-teal-3">ID: 782310273–323</div>
    </div>

    <div class="row q-my-md justify-around" style="width: 100px;">
      <q-icon name="person" size="24px" class="q-mx-sm" />
      <q-icon name="groups" size="24px" class="q-mx-sm" />
      <q-icon name="badge" size="24px" class="q-mx-sm" />
    </div>

    <q-list bordered class="bg-black text-white" style="width: 90%;">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="credit_card" color="teal" />
        </q-item-section>
        <q-item-section> Métodos de Pagamento </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="notifications" color="teal" />
        </q-item-section>
        <q-item-section> Notificações </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="settings" color="teal" />
        </q-item-section>
        <q-item-section> Configurações </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="logout" color="teal" />
        </q-item-section>
        <q-item-section> Sair </q-item-section>
      </q-item>
    </q-list>

    <!-- Bottom Navigation -->
    <q-footer class="bg-black text-teal q-mt-auto">
      <q-tabs
        align="justify"
        class="text-teal"
        active-color="teal"
        indicator-color="teal"
      >
        <q-tab icon="home" />
        <q-tab icon="chat" />
        <q-tab icon="group" />
        <q-tab icon="person" />
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
.absolute-top-right {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
