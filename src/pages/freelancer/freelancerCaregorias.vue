<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark text-white">

    <q-page-container>
      <q-page padding>

        <div class="q-gutter-md">
          <!-- Grade de ícones -->
          <div class="row q-col-gutter-md q-gutter-md justify-around">
            <q-card
              v-for="(item, index) in items"
              :key="index"
              class="col-3 q-pa-md bg-primary text-white text-center cursor-pointer"
              flat
              bordered
              style="min-width: 90px; max-width: 110px"
            >
              <q-icon :name="item.icon" size="md" class="q-mb-sm" />
              <div class="text-caption">{{ item.label }}</div>
            </q-card>
          </div>
        </div>

      </q-page>
    </q-page-container>

    <q-footer class="bg-black text-white">
      <q-tabs align="justify" class="text-white">
        <q-tab icon="home" label="Início" />
        <q-tab icon="shopping_cart" label="Loja" />
        <q-tab icon="school" label="Educação" />
        <q-tab icon="person" label="Perfil" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [

        { icon: 'edit', label: 'Escrita e Tradução' },
        { icon: 'edit', label: 'Escrita e Tradução' },
        { icon: 'edit', label: 'Escrita e Tradução' },
        { icon: 'edit', label: 'Escrita e Tradução' },
        { icon: 'edit', label: 'Escrita e Tradução' },
        { icon: 'edit', label: 'Escrita e Tradução' },

      ]
    };
  }
}
</script>

<style scoped>
.q-card {
  border-radius: 12px;
  box-shadow: 0 2px 8pxrgb(255, 0, 242);
}
</style>
