<template>
  <div class="flex flex-center q-pa-md" style="height: 100vh">
    <div style="width: 100%; max-width: 400px">
      <q-card class="elevated-card" style="width: 80vh">
        <q-card-section class="q-pa-md">
          <!-- Etapa 1: Escolher perfil -->
          <div v-if="step === 1">
            <div class="text-h6 text-center text-bold" style="color: #00b894">Quem é você?</div>

            <div class="flex flex-center q-mt-md">
              <q-avatar size="140px" font-size="52px" color="teal" text-color="white"> U </q-avatar>
            </div>

            <div class="q-mt-xl text-subtitle1 text-center" style="color: #00b894">
              Selecione como você quer usar o App:
            </div>

            <div class="q-mt-md">
              <q-option-group v-model="group" :options="options" color="primary" />
            </div>

            <div class="flex justify-end q-mt-xl">
              <q-btn unelevated rounded color="teal" label="Próximo" @click="goToIntro" />
            </div>
          </div>

          <!-- Etapa 2: Introdução Freelancer -->
          <div v-else-if="step === 2 && group === 'op1'">
            <q-carousel
              v-model="slide"
              @update:model-value="refresh"
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
                <img :src="url" style="width: 380px; height: 420px" />
                <div class="q-mt-md text-center">
                  <div class="text-h6" style="color: #00b894">Liberdade para trabalhar</div>
                  <div class="text-subtitle2" style="color: #eceff1">
                    Trabalhe de onde quiser, com os projetos que mais combinam com você.
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <img :src="url" style="width: 380px; height: 420px" />
                <div class="q-mt-md text-center" style="color: #00b894">
                  <div class="text-h6">Mostre seu talento</div>
                  <div class="text-subtitle2" style="color: #eceff1">
                    Monte seu portfólio, adicione experiências e se destaque entre os melhores.
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="layers" class="column no-wrap flex-center">
                <img :src="url" style="width: 380px; height: 420px" />
                <div class="q-mt-md text-center">
                  <div class="text-h6" style="color: #00b894">Propostas rápidas e fáceis</div>
                  <div class="text-subtitle2" style="color: #eceff1">
                    Encontre oportunidades e envie propostas em segundos.
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="map" class="column no-wrap flex-center">
                <img :src="url" style="width: 380px; height: 420px" />
                <div class="q-mt-md text-center">
                  <div class="text-h6" style="color: #00b894">Pronto para começar?</div>
                  <div class="flex flex-center q-mt-xl">
                    <q-btn unelevated rounded color="teal" label="Criar meu perfil" />
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>

          <!-- Etapa 2: Introdução Cliente -->
          <div v-else-if="step === 2 && group === 'op2'">
            <q-carousel
              v-model="slide"
              @update:model-value="refresh"
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
                <img :src="url" style="width: 380px; height: 420px" />
                <div class="q-mt-md text-center">
                  <div class="text-h6" style="color: #00b894">Encontre o profissional ideal</div>
                  <div class="text-subtitle2" style="color: #eceff1">
                    Precisa de ajuda com um projeto? Aqui você encontra pessoas capacitadas para
                    transformar sua ideia em realidade.
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <img :src="url" style="width: 380px; height: 420px" />
                <div class="q-mt-md text-center">
                  <div class="text-h6" style="color: #00b894">Publique sua demanda</div>
                  <div class="text-subtitle2" style="color: #eceff1">
                    Conte o que você precisa em poucos passos e receba propostas de quem realmente
                    entende do assunto.
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="layers" class="column no-wrap flex-center">
                <img :src="url" style="width: 380px; height: 420px" />
                <div class="q-mt-md text-center">
                  <div class="text-h6" style="color: #00b894">Contrate com facilidade</div>
                  <div class="text-subtitle2" style="color: #eceff1">
                    Converse com profissionais, avalie perfis e feche negócio com praticidade e
                    confiança.
                  </div>
                </div>
              </q-carousel-slide>

              <q-carousel-slide name="map" class="column no-wrap flex-center">
                <img :src="url" style="width: 380px; height: 420px" />
                <div class="q-mt-md text-center">
                  <div class="text-h6" style="color: #00b894">Pronto para começar?</div>
                  <div class="flex flex-center q-mt-xl">
                    <q-btn unelevated rounded color="teal" label="Criar meu perfil" />
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1) // 1 = escolha, 2 = introdução
const group = ref('op1')
const slide = ref('style')

const options = [
  { label: 'Sou Freelancer', value: 'op1' },
  { label: 'Sou Cliente', value: 'op2' },
]

const url = ref('https://picsum.photos/500/300')

function refresh() {
  url.value = 'https://picsum.photos/500/300?t=' + Math.random()
}

function goToIntro() {
  step.value = 2
}
</script>
