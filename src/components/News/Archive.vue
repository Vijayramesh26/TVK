<template>
  <v-container class="news-archive-page py-16" fluid>
    <v-container>
      <!-- Header -->
      <div class="text-center mb-16">
        <v-chip color="#D4AF37" variant="elevated" class="mb-4 font-weight-black">TVK NEWS ARCHIVE</v-chip>
        <h1 class="text-h2 font-weight-black color-maroon mb-4">
          {{ isTamil ? 'செய்திக் களஞ்சியம்' : 'News Archive' }}
        </h1>
        <div class="title-divider mx-auto bg-gold mb-6"></div>
        <p class="text-h6 text-grey-darken-1 max-w-lg mx-auto">
          {{ isTamil ? 'தமிழக வெற்றிக் கழகத்தின் முக்கிய நிகழ்வுகள் மற்றும் செய்திகளின் தொகுப்பு.' : 'A comprehensive archive of key events and official news from Tamilaga Vettri Kazhagam.' }}
        </p>
      </div>

      <!-- Search & Filter -->
      <v-row class="mb-12" justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="search-card rounded-pill elevation-12 overflow-hidden border-gold-thin">
            <v-text-field
              v-model="search"
              :label="isTamil ? 'செய்திகளைத் தேடுங்கள்...' : 'Search news archive...'"
              prepend-inner-icon="mdi-magnify"
              variant="solo"
              flat
              hide-details
              rounded="pill"
              class="search-input"
              bg-color="white"
              clearable
            >
              <template v-slot:append-inner>
                <v-btn
                  color="#800000"
                  class="rounded-pill px-6 font-weight-black text-white d-none d-sm-flex"
                  elevation="0"
                >
                  {{ isTamil ? 'தேடு' : 'Search' }}
                </v-btn>
              </template>
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>

      <!-- News Grid -->
      <v-row v-if="filteredNews.length > 0">
        <v-col 
          v-for="item in filteredNews" 
          :key="item.id" 
          cols="12" 
          sm="6" 
          lg="4"
          class="mb-6"
        >
          <v-card 
            class="news-card h-100 rounded-xl overflow-hidden hover-lift border-transparent elevation-10"
            @click="$router.push(`/news/${item.slug}`)"
          >
            <v-img
              :src="item.image_url"
              height="240"
              cover
              class="position-relative"
            >
              <div class="poster-gradient absolute-inset"></div>
              <div class="pa-4 position-relative z-10 d-flex flex-column justify-space-between h-100">
                <div class="d-flex justify-start">
                  <v-chip size="small" color="#800000" class="font-weight-bold text-white px-3">
                    {{ item.category }}
                  </v-chip>
                </div>
                <div class="news-date-badge pa-2 rounded-lg text-center">
                  <div class="text-caption font-weight-black color-gold line-height-1">{{ formatDate(item.date).month }}</div>
                  <div class="text-h6 font-weight-black text-white line-height-1">{{ formatDate(item.date).day }}</div>
                  <div class="text-caption font-weight-bold text-white opacity-60 line-height-1">{{ formatDate(item.date).year }}</div>
                </div>
              </div>
            </v-img>

            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-3">
                <v-icon size="14" color="#D4AF37" class="mr-1">mdi-tag-outline</v-icon>
                <span class="text-caption font-weight-bold color-gold uppercase">{{ item.tags[0] }}</span>
              </div>
              <h3 class="text-h6 font-weight-black color-maroon line-clamp-2 mb-3 lh-tight">
                {{ isTamil ? (t(`news.item${item.id + 1}.title`) || item.title) : item.title }}
              </h3>
              <p class="text-body-2 text-grey-darken-1 line-clamp-3 mb-4">
                {{ isTamil ? (t(`news.item${item.id + 1}.content`) || item.excerpt) : item.excerpt }}
              </p>
              <v-divider class="mb-4 opacity-10"></v-divider>
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-icon size="16" color="grey" class="mr-1">mdi-account-edit-outline</v-icon>
                  <span class="text-caption color-grey font-weight-medium">{{ item.author }}</span>
                </div>
                <v-btn variant="text" color="#800000" density="comfortable" icon="mdi-arrow-right"></v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Empty State -->
      <v-row v-else class="py-16 text-center">
        <v-col cols="12">
          <v-icon size="100" color="grey-lighten-2" class="mb-4">mdi-newspaper-plus</v-icon>
          <div class="text-h5 color-grey">
            {{ isTamil ? 'செய்திகள் எதுவும் காணப்படவில்லை.' : 'No news found matching your search.' }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { newsData } from '../../data/newsData';
import { apiService } from '../../services/api';

export default {
  name: 'NewsArchive',
  inject: ['t', 'currentLang'],
  data: () => ({
    search: '',
    news: [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date))
  }),
  computed: {
    isTamil() {
      return this.currentLang() === 'ta';
    },
    filteredNews() {
      if (!this.search) return this.news;
      const s = this.search.toLowerCase();
      return this.news.filter(n => 
        n.title.toLowerCase().includes(s) || 
        n.excerpt.toLowerCase().includes(s) ||
        n.tags.some(t => t.toLowerCase().includes(s))
      );
    }
  },
  methods: {
    async fetchBackendNews() {
      const backendNews = await apiService.getNewsData();
      if (backendNews && backendNews.length > 0) {
        this.news = backendNews.map((bItem, idx) => ({
          ...this.news[idx % this.news.length],
          ...bItem,
        })).sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    },
    updateSEO() {
      // Breadcrumb Schema
      let breadcrumbScript = document.getElementById('json-ld-breadcrumb-archive');
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.setAttribute('id', 'json-ld-breadcrumb-archive');
        breadcrumbScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbScript);
      }
      const breadcrumbLD = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": this.isTamil ? "முகப்பு" : "Home",
            "item": "https://myvetritamilnadu.org/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": this.isTamil ? "செய்திகள்" : "News",
            "item": "https://myvetritamilnadu.org/news"
          }
        ]
      };
      breadcrumbScript.text = JSON.stringify(breadcrumbLD);
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return {
        month: months[date.getMonth()],
        day: date.getDate(),
        year: date.getFullYear()
      };
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.updateSEO();
    this.fetchBackendNews();
  }
};
</script>

<style scoped>
.news-archive-page {
  background: linear-gradient(135deg, #fcfbf9 0%, #ffffff 100%);
  min-height: 100vh;
}

.color-maroon { color: #800000; }
.color-gold { color: #D4AF37; }
.bg-gold { background-color: #D4AF37; }

.title-divider {
  width: 80px;
  height: 4px;
  border-radius: 2px;
}

.search-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(212, 175, 55, 0.3) !important;
}

.search-card:focus-within {
  border-color: #D4AF37 !important;
  box-shadow: 0 10px 30px rgba(128, 0, 0, 0.1) !important;
}

.search-input :deep(.v-field__outline) {
  display: none;
}

.poster-gradient {
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
  z-index: 1;
}

.news-date-badge {
  background: rgba(128, 0, 0, 0.9);
  border: 1px solid #D4AF37;
  width: 60px;
  align-self: flex-end;
  backdrop-filter: blur(5px);
}

.news-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: white;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(128, 0, 0, 0.15) !important;
}

.border-gold-thin {
  border: 1px solid rgba(212, 175, 55, 0.5) !important;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lh-tight { line-height: 1.2; }
.line-height-1 { line-height: 1 !important; }

@media (max-width: 600px) {
  .text-h2 {
    font-size: 2.5rem !important;
  }
}
</style>
