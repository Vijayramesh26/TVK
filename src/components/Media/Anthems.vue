<template>
  <section class="anthems-section py-16 overflow-hidden">
    <v-container>
      <div class="text-center mb-12">
        <v-chip color="#D4AF37" class="mb-4 font-weight-bold px-6 py-2 elevation-2" variant="elevated">
          {{ t('anthems.subtitle') }}
        </v-chip>
        <h2 class="text-h2 font-weight-black color-maroon mb-2">
          {{ t('anthems.title') }}
        </h2>
        <div class="title-divider bg-gold mx-auto"></div>
      </div>

      <v-row>
        <v-col v-for="n in 4" :key="n" cols="12" sm="6" lg="3">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 24 : 6"
              class="song-card rounded-xl overflow-hidden transition-swing"
              :class="{ 'on-hover': isHovering }"
            >
              <v-img
                :src="anthemsCover"
                height="300"
                cover
                class="align-end"
                :style="{ filter: isHovering ? 'brightness(0.7)' : 'brightness(0.9)' }"
              >
                <div class="d-flex flex-column pa-6 bg-gradient-overlay">
                  <h3 class="text-h5 font-weight-black text-white mb-2">
                    {{ t(`anthems.song${n}`) }}
                  </h3>
                  <v-btn
                    color="#D4AF37"
                    class="rounded-pill font-weight-black text-maroon mt-auto shadow-gold"
                    append-icon="mdi-play-circle"
                    @click="playSong(n)"
                  >
                    {{ t('anthems.play') }}
                  </v-btn>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import anthemsCover from '../../assets/generated/anthems_cover.png';

export default {
  name: 'Anthems',
  inject: ['t'],
  data: () => ({
    anthemsCover,
    links: [
      'https://www.youtube.com/watch?v=tvk_flag_song',
      'https://www.youtube.com/watch?v=tvk_whistle_song',
      'https://www.youtube.com/watch?v=tvk_unga_vijay',
      'https://www.youtube.com/watch?v=tvk_kolgai_song'
    ]
  }),
  methods: {
    playSong(index) {
      window.open(this.links[index - 1], '_blank');
    }
  }
}
</script>

<style scoped>
.anthems-section {
  background: linear-gradient(to bottom, #fff 0%, #fffbf2 100%);
}

.song-card {
  border: 1px solid rgba(212, 175, 55, 0.2);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.song-card.on-hover {
  transform: translateY(-12px) scale(1.02);
}

.bg-gradient-overlay {
  background: linear-gradient(to top, rgba(128, 0, 0, 0.9) 0%, rgba(128, 0, 0, 0.4) 50%, transparent 100%);
}

.color-maroon { color: #800000; }
.bg-gold { background-color: #D4AF37; }

.title-divider {
  width: 80px;
  height: 4px;
  border-radius: 2px;
}

.shadow-gold {
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4) !important;
}

.text-maroon {
  color: #800000 !important;
}
</style>
