<template>
  <v-container class="news-detail-page py-16" fluid>
    <v-container>
      <!-- Back Button -->
      <v-btn
        prepend-icon="mdi-arrow-left"
        variant="text"
        color="#800000"
        class="mb-6 font-weight-bold"
        @click="$router.push('/')"
      >
        {{ isTamil ? 'முகப்புக்குச் செல்க' : 'Back to Home' }}
      </v-btn>

      <v-row v-if="article">
        <v-col cols="12" lg="8" class="mx-auto">
          <!-- Article Header -->
          <div class="article-header mb-8 text-center text-md-left">
            <v-chip color="#800000" class="mb-4 font-weight-bold text-white px-4">
              {{ articleData.tag }}
            </v-chip>
            <h1 class="text-h3 text-md-h2 font-weight-black color-maroon mb-4 lh-tight">
              {{ t(`news.item${idNum + 1}.title`) }}
            </h1>
            <div class="d-flex align-center justify-center justify-md-start text-subtitle-1 color-grey">
              <v-icon start icon="mdi-calendar-range" size="20"></v-icon>
              {{ t(`news.item${idNum + 1}.date`) }}
              <v-divider vertical class="mx-4" thickness="2"></v-divider>
              <v-icon start icon="mdi-account-tie" size="20"></v-icon>
              {{ isTamil ? 'தமிழக வெற்றிக் கழகம்' : 'TVK Official' }}
            </div>
          </div>

          <!-- Featured Image -->
          <v-img
            :src="articleData.image"
            aspect-ratio="16/9"
            cover
            class="rounded-xl elevation-10 mb-10 article-hero"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <!-- Article Content -->
          <v-card class="pa-8 pa-md-12 rounded-xl glass-article border-gold-subtle mb-10">
            <div class="article-body text-h6 font-weight-medium color-grey-darken-3">
              <p v-for="(paragraph, i) in articleContent" :key="i" class="mb-6 lh-relaxed">
                {{ paragraph }}
              </p>
            </div>

            <!-- External Source Link -->
            <v-divider class="my-8"></v-divider>
            <div class="d-flex flex-column align-center">
              <h3 class="text-h6 font-weight-bold color-maroon mb-4">
                {{ isTamil ? 'கூடுதல் விவரங்களுக்கு' : 'For more details' }}
              </h3>
              <v-btn
                :href="article.sourceUrl"
                target="_blank"
                color="#D4AF37"
                size="large"
                class="rounded-pill px-8 font-weight-black elevation-4"
                append-icon="mdi-open-in-new"
              >
                {{ isTamil ? 'அதிகாரப்பூர்வ இணைப்பைக் காண்க' : 'View Official Link' }}
              </v-btn>
            </div>
          </v-card>

          <!-- Share Section -->
          <div class="share-box d-flex align-center justify-center py-6">
            <span class="mr-4 font-weight-bold color-grey">{{ isTamil ? 'பகிரவும்:' : 'Share this:' }}</span>
            <v-btn icon="mdi-facebook" variant="tonal" color="#1877F2" class="mr-2"></v-btn>
            <v-btn icon="mdi-twitter" variant="tonal" color="#1DA1F2" class="mr-2"></v-btn>
            <v-btn icon="mdi-whatsapp" variant="tonal" color="#25D366" class="mr-2"></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { newsData } from '../../data/newsData';

export default {
  name: 'NewsDetail',
  props: ['id'],
  inject: ['t', 'currentLang'],
  computed: {
    idNum() {
      return parseInt(this.id);
    },
    isTamil() {
      return this.currentLang() === 'ta';
    },
    articleData() {
      return newsData.find(n => n.id === this.idNum) || newsData[0];
    },
    article() {
      // Accessing translation data directly for structural content
      // In a real app, this would come from a CMS or explicit data file
      return {
        sourceUrl: this.t(`news.item${this.idNum + 1}.sourceUrl`)
      };
    },
    articleContent() {
      const fullText = this.t(`news.item${this.idNum + 1}.content`);
      return fullText.split('\n\n');
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.news-detail-page {
  background: linear-gradient(135deg, #fcfbf9 0%, #fff 100%);
  min-height: 100vh;
}

.color-maroon { color: #800000; }
.color-grey { color: #555555; }
.lh-tight { line-height: 1.25; }
.lh-relaxed { line-height: 1.8; }

.article-hero {
  border: 4px solid rgba(212, 175, 55, 0.2);
}

.glass-article {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(128, 0, 0, 0.05) !important;
}

.border-gold-subtle {
  border: 1px solid rgba(212, 175, 55, 0.3) !important;
}

.article-body p {
  text-align: justify;
}

@media (max-width: 600px) {
  .news-detail-page {
    padding-top: 40px !important;
  }
}
</style>
