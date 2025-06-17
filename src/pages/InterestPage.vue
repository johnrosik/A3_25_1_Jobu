<template>
  <div class="flex flex-center q-pa-md" style="height: 100vh">
    <div style="width: 100%; max-width: 400px">
      <q-card class="bg-white text-black" style="width: 80vh">
        <q-card-section class="q-pa-md" padding-bottom="100vh">
          <div class="text-h6">Interesses</div>
        </q-card-section>
        <q-card-section class="q-pa-md" padding-bottom="100vh">
          <div class="text-subtitle1">Revise os perfis antes de contratar</div>
        </q-card-section>
        <q-card-section class="q-pa-md" padding-bottom="100vh">
          <div class="text-subtitle1, text-bold">Perfis Selecionados</div>
        </q-card-section>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Redatora Acadêmica</q-item-label>
            <q-item-label caption lines="2">
              Produzo resenhas, fichamentos, artigos acadêmicos e TCCs conforme ABNT. Atendimento
              humanizado e sigiloso.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="text-orange">
              <q-icon name="star" />
            </div>

            <div class="flex justify-end q-mt-xl">
              <q-btn outline rounded color="teal" size="sm" label="Ver Perfil" />
            </div>
          </q-item-section>
        </q-item>

        <q-separator inset="item" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Redatora Acadêmica</q-item-label>
            <q-item-label caption lines="2">
              Produzo resenhas, fichamentos, artigos acadêmicos e TCCs conforme ABNT. Atendimento
              humanizado e sigiloso.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="text-orange">
              <q-icon name="star" />
              <q-icon name="star" />
            </div>

            <div class="flex justify-end q-mt-xl">
              <q-btn outline rounded color="teal" size="sm" label="Ver Perfil" />
            </div>
          </q-item-section>
        </q-item>

        <q-separator inset="item" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar1.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Redatora Seo</q-item-label>
            <q-item-label caption lines="2">
              Redação otimizada para SEO com foco em blogs corporativos. Experiência em saúde,
              tecnologia e finanças.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="text-orange">
              <q-icon name="star" />
              <q-icon name="star" />
              <q-icon name="star" />
            </div>

            <div class="flex justify-end q-mt-xl">
              <q-btn outline rounded color="teal" size="sm" label="Ver Perfil" />
            </div>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script></script>
