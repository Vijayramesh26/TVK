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
          <v-card
            elevation="6"
            class="song-card rounded-xl overflow-hidden"
          >
            <div class="video-container">
              <iframe 
                :src="getEmbedUrl(links[n-1])" 
                title="TVK Party Anthem" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
              ></iframe>
            </div>
            <v-card-text class="pa-4 bg-maroon-dark text-center">
              <h3 class="text-subtitle-1 font-weight-black text-white line-clamp-1">
                {{ t(`anthems.song${n}`) }}
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Anthems',
  inject: ['t'],
  data: () => ({
    links: [
      'https://youtu.be/as86Klk5qUE?si=8f9JU-yUQ09zXKJY',
      'https://youtu.be/JHJmFbLeK-Y?si=Y7bZLbWzBA8NGDuD',
      'https://youtu.be/UVgMRd76Bbo?si=Z20SAdxg28tf9lP1',
      'https://youtu.be/NHM1Y_lll6o?si=p2iTf_m1zu7z_q4f'
    ]
  }),
  methods: {
    getEmbedUrl(url) {
      if (!url) return '';
      // Extract video ID from youtu.be link
      const regExp = /^https:\/\/youtu\.be\/([^?]+)/;
      const match = url.match(regExp);
      const videoId = match ? match[1] : '';
      return `https://www.youtube.com/embed/${videoId}`;
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
  transition: transform 0.3s ease;
}

.song-card:hover {
  transform: translateY(-5px);
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.bg-maroon-dark {
  background: #600000;
}

.color-maroon { color: #800000; }
.bg-gold { background-color: #D4AF37; }

.title-divider {
  width: 80px;
  height: 4px;
  border-radius: 2px;
}
</style>
