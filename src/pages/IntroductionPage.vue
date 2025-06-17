<template>
  <div class="flex flex-center q-pa-md" style="height: 100vh">
    <div style="width: 100%; max-width: 400px">
      <q-card>
        <q-card class="bg-white text-black" style="width: 80vh">
          <q-card-section class="q-pa-md" padding-bottom="100vh">
            <!-- Etapa 1: Escolher perfil -->
            <div v-if="step === 1">
              <div class="text-h6 text-center">Quem é você?</div>
              <div class="flex flex-center q-mt-md" style="margin-bottom: 50vh">
                <q-avatar size="140px" font-size="52px" color="teal" text-color="white">U</q-avatar>
              </div>
              <div class="q-mt-xl text-subtitle1 text-center">
                Selecione como você quer usar o App:
              </div>
              <div class="q-mt-md q-pa-xl">
                <q-option-group v-model="group" :options="options" color="primary" />
              </div>
              <div class="flex justify-end q-mt-xl">
                <q-btn unelevated rounded color="teal" label="Próximo" @click="goToIntro" />
              </div>
            </div>

            <!-- Etapa 2: Introdução Freelancer -->
            <div v-else-if="step === 2 && group === 'op1'">
              <div class="q-pa-md">
                <q-carousel
                  v-model="slide"
                  transition-prev="scale"
                  transition-next="scale"
                  swipeable
                  animated
                  control-color="white"
                  navigation
                  padding
                  arrows
                  height="600px"
                  class="bg-primary text-white shadow-1 rounded-borders"
                >
                  <q-carousel-slide name="style" class="column no-wrap flex-center">
                    <q-icon name="style" size="56px" />
                    <div class="q-mt-md text-center">
                      <div class="text-h6">Liberdade para trabalhar</div>
                      <div class="text-subtitle2">
                        Trabalhe de onde quiser, com os projetos que mais combinam com você.
                      </div>
                    </div>
                  </q-carousel-slide>

                  <q-carousel-slide name="tv" class="column no-wrap flex-center">
                    <q-icon name="live_tv" size="56px" />
                    <div class="q-mt-md text-center">
                      <div class="text-h6">Mostre seu talento</div>
                      <div class="text-subtitle2">
                        Monte seu portfólio, adicione experiências e se destaque entre os melhores.
                      </div>
                    </div>
                  </q-carousel-slide>

                  <q-carousel-slide name="layers" class="column no-wrap flex-center">
                    <q-icon name="layers" size="56px" />
                    <div class="q-mt-md text-center">
                      <div class="text-h6">Propostas rápidas e fáceis</div>
                      <div class="text-subtitle2">
                        Encontre oportunidades e envie propostas em segundos.
                      </div>
                    </div>
                  </q-carousel-slide>

                  <q-carousel-slide name="map" class="column no-wrap flex-center">
                    <q-icon name="terrain" size="56px" />
                    <div class="q-mt-md text-center">
                      <div class="text-h6">Pronto para começar?</div>
                      <div class="flex flex-center q-mt-xl">
                        <q-btn unelevated rounded color="teal" label="Criar meu perfil" />
                      </div>
                    </div>
                  </q-carousel-slide>
                </q-carousel>
              </div>
            </div>

            <!-- Etapa 2: Introdução Cliente -->
            <div v-else-if="step === 2 && group === 'op2'">
              <div class="q-pa-md">
                <q-carousel
                  v-model="slide"
                  transition-prev="scale"
                  transition-next="scale"
                  swipeable
                  animated
                  control-color="white"
                  navigation
                  padding
                  arrows
                  height="600px"
                  class="bg-primary text-white shadow-1 rounded-borders"
                >
                  <q-carousel-slide name="style" class="column no-wrap flex-center">
                    <q-icon name="style" size="56px" />
                    <div class="q-mt-md text-center">
                      <div class="text-h6">Encontre o profissional ideal</div>
                      <div class="text-subtitle2">
                        Precisa de ajuda com um projeto? Aqui você encontra pessoas talentosas para
                        transformar sua ideia em realidade.
                      </div>
                    </div>
                  </q-carousel-slide>

                  <q-carousel-slide name="tv" class="column no-wrap flex-center">
                    <q-icon name="live_tv" size="56px" />
                    <div class="q-mt-md text-center">
                      <div class="text-h6">Publique sua demanda</div>
                      <div class="text-subtitle2">
                        Conte o que você precisa em poucos passos e receba propostas de quem
                        realmente entende do assunto.
                      </div>
                    </div>
                  </q-carousel-slide>

                  <q-carousel-slide name="layers" class="column no-wrap flex-center">
                    <q-icon name="layers" size="56px" />
                    <div class="q-mt-md text-center">
                      <div class="text-h6">Contrate com facilidade</div>
                      <div class="text-subtitle2">
                        Converse direto com profissionais, avalie perfis e feche negócio com
                        praticidade e confiança.
                      </div>
                    </div>
                  </q-carousel-slide>

                  <q-carousel-slide name="map" class="column no-wrap flex-center">
                    <q-icon name="terrain" size="56px" />
                    <div class="q-mt-md text-center">
                      <div class="text-h6">Pronto para começar?</div>
                      <div class="flex flex-center q-mt-xl">
                        <q-btn unelevated rounded color="teal" label="Criar meu perfil" />
                      </div>
                    </div>
                  </q-carousel-slide>
                </q-carousel>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const step = ref(1) // 1 = escolha, 2 = introdução
    const group = ref('op1')
    const slide = ref('style')

    const options = [
      { label: 'Sou Freelancer', value: 'op1' },
      { label: 'Sou Cliente', value: 'op2' },
    ]

    function goToIntro() {
      step.value = 2
    }

    return {
      step,
      group,
      options,
      slide,
      goToIntro,
    }
  },
}
</script>
