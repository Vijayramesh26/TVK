<template>
  <v-container class="news-detail-page py-8 py-md-16 px-0 px-md-4" fluid>
    <v-container :fluid="!$vuetify.display.mdAndUp" class="px-0 px-md-4">
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

      <v-row v-if="article" no-gutters>
        <v-col cols="12" lg="10" class="mx-auto px-0 px-md-3">
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

          <!-- Featured Image as Poster -->
          <v-img
            :src="articleData.image"
            aspect-ratio="16/9"
            cover
            class="rounded-0 rounded-md-xl elevation-10 mb-0 mb-md-10 article-hero position-relative"
          >
            <!-- Poster Overlay -->
            <div class="poster-gradient absolute-inset"></div>
            
            <div class="news-poster-overlay absolute-inset overflow-hidden">
              <!-- Large Vijay Portrait (Standardized) -->
              <v-img 
                :src="heroImage" 
                alt="Vijay" 
                class="detail-vijay-portrait d-none d-md-flex"
                width="280"
                cover
              ></v-img>

              <!-- Poster Content -->
              <div class="absolute-inset d-flex flex-column justify-space-between pa-6 z-10">
                <div class="d-flex justify-start">
                  <v-chip color="#800000" class="elevation-4 font-weight-bold text-white px-4">
                    {{ articleData.tag }}
                  </v-chip>
                </div>
                
                <!-- Official Area Label -->
                <div class="news-official-label pa-4 rounded-lg elevation-10">
                  <div class="text-caption font-weight-black color-gold text-uppercase tracking-widest mb-1">
                    {{ isTamil ? "தளபதி விஜய்" : "THALAPATHY VIJAY" }}
                  </div>
                  <div class="text-h2 font-weight-black text-white letter-spacing-2">
                    {{ isTamil ? articleData.location : articleData.locationEn }}
                  </div>
                </div>
              </div>
            </div>

            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <!-- Article Content & Transcript -->
          <v-card class="pa-6 pa-md-12 rounded-0 rounded-md-xl glass-article border-gold-subtle mb-10 overflow-hidden">
            <!-- YouTube Video Embed -->
            <div v-if="articleData.youtubeId" class="video-container mb-12 elevation-10 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="500"
                :src="`https://www.youtube.com/embed/${articleData.youtubeId}`"
                title="TVK Official Speech"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>

            <!-- Article Summary/Body -->
            <div class="article-body text-h6 font-weight-medium color-grey-darken-3 mb-12">
              <p v-for="(paragraph, i) in articleContent" :key="i" class="mb-6 lh-relaxed">
                {{ paragraph }}
              </p>
            </div>

            <!-- Full Speech Transcript Section -->
            <div v-if="hasTranscript" class="transcript-section mt-12 pt-10 border-top-gold">
              <div class="d-flex align-center mb-8">
                <v-icon color="#D4AF37" size="32" class="mr-4">mdi-script-text-outline</v-icon>
                <h2 class="text-h4 font-weight-black color-maroon">
                  {{ isTamil ? 'தளபதி விஜய்யின் முழு உரை' : 'Full Speech Transcript' }}
                </h2>
              </div>
              
              <v-card variant="flat" color="grey-lighten-4" class="pa-8 rounded-lg transcript-content border-left-gold">
                <div class="text-h6 font-weight-regular color-grey-darken-4 line-height-xl whitespace-pre-wrap">
                  {{ articleTranscript }}
                </div>
              </v-card>
            </div>

            <!-- External Source Link -->
            <v-divider class="my-12"></v-divider>
            <div class="d-flex flex-column align-center">
              <h3 class="text-h6 font-weight-bold color-maroon mb-4">
                {{ isTamil ? 'கூடுதல் விவரங்களுக்கு' : 'For more details' }}
              </h3>
              <v-btn
                :href="article.sourceUrl"
                target="_blank"
                color="#D4AF37"
                size="large"
                class="rounded-pill px-10 font-weight-black elevation-4"
                append-icon="mdi-open-in-new"
              >
                {{ isTamil ? 'அதிகாரப்பூர்வ காணொளியைக் காண்க' : 'Watch Full Speech' }}
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
import heroImage from '../../assets/16170916.png';

export default {
  name: 'NewsDetail',
  props: ['id'],
  inject: ['t', 'currentLang'],
  data: () => ({
    heroImage
  }),
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
      return {
        sourceUrl: this.t(`news.item${this.idNum + 1}.sourceUrl`)
      };
    },
    articleContent() {
      const fullText = this.t(`news.item${this.idNum + 1}.content`);
      return fullText.split('\n\n');
    },
    hasTranscript() {
      const transcript = this.isTamil ? 
        this.t(`news.item${this.idNum + 1}.fullTranscript`) : 
        this.t(`news.item${this.idNum + 1}.fullTranscriptEn`);
      return transcript && transcript.length > 0 && !transcript.includes('news.item');
    },
    articleTranscript() {
      return this.isTamil ? 
        this.t(`news.item${this.idNum + 1}.fullTranscript`) : 
        this.t(`news.item${this.idNum + 1}.fullTranscriptEn`);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.updateSEO();
  },
  methods: {
    updateSEO() {
      const articleTitle = this.t(`news.item${this.idNum + 1}.title`);
      const title = this.isTamil 
        ? `தளபதி விஜய் அதிரடி உரை: ${articleTitle} | தவெக அதிகாரப்பூர்வ தளம்`
        : `Watch Now: ${articleTitle} | Thalapathy Vijay's Emotional Political Speech | TVK`;
      
      document.title = title;

      // Update Meta Description with a "grabbing" prefix
      const description = this.isTamil
        ? `இப்போதே படிக்கவும்: ${articleTitle}. தளபதி விஜய்யின் எழுச்சிமிக்க உரையின் முழு தொகுப்பு. தமிழக வெற்றிக் கழகம்.`
        : `Exclusive: Read the full powerful address - ${articleTitle}. Experience the history of Thalapathy Vijay's political journey with full transcripts.`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  },
  watch: {
    id() {
      this.updateSEO();
      window.scrollTo(0, 0);
    },
    'currentLang'() {
      this.updateSEO();
    }
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
  min-height: 350px;
}

/* Poster Overlay Styles */
.poster-gradient {
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
  z-index: 1;
}

.news-poster-overlay {
  z-index: 2;
  background: linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.4) 100%);
}

.detail-vijay-portrait {
  position: absolute;
  right: 40px;
  bottom: 0;
  height: 110% !important;
  opacity: 1;
  filter: drop-shadow(-20px 0 30px rgba(0,0,0,0.6));
  z-index: 5;
  object-position: top center;
}

.news-official-label {
  background: linear-gradient(135deg, rgba(128, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.9) 100%);
  border-left: 6px solid #D4AF37;
  backdrop-filter: blur(15px);
  position: relative;
  z-index: 10;
  max-width: 600px;
}

.color-gold { color: #D4AF37 !important; }

.tracking-widest {
  letter-spacing: 4px !important;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}

/* Transcript Section Styles */
.border-top-gold {
  border-top: 2px solid rgba(212, 175, 55, 0.3);
}

.border-left-gold {
  border-left: 6px solid #D4AF37 !important;
}

.whitespace-pre-wrap {
  white-space: pre-wrap;
}

.line-height-xl {
  line-height: 1.9;
}

.glass-article {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(15px);
  box-shadow: 0 20px 60px rgba(128, 0, 0, 0.08) !important;
}

.border-gold-subtle {
  border: 1px solid rgba(212, 175, 55, 0.3) !important;
}

.article-body p {
  text-align: justify;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  background: black;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 600px) {
  .news-detail-page {
    padding-top: 40px !important;
  }
}
</style>
