<template>
  <v-container fluid class="results-container pa-0">
    <!-- Premium Hero Section -->
    <section class="results-hero position-relative d-flex align-center justify-center text-center text-white">
      <div class="results-hero-bg absolute-inset" :style="{ '--bg-img': `url(${resultsBg})` }"></div>
      <div class="hero-overlay absolute-inset"></div>
      
      <v-container class="position-relative z-10 py-16">
        <v-chip color="#D4AF37" variant="elevated" class="mb-6 font-weight-black px-6 py-2 elevation-8 text-uppercase">
          {{ t('election.title') }} 2026
        </v-chip>
        <h1 class="display-promo font-weight-black mb-4 glow-text">{{ t('election.results') }}</h1>
        <p class="text-h6 opacity-90 max-width-800 mx-auto font-weight-regular font-italic">
          {{ t('election.subtitle') }}
        </p>

        <!-- Overall Summary Cards -->
        <v-row class="mt-12">
          <v-col cols="12" sm="6" md="3">
            <div class="summary-card glass-effect pa-6 rounded-xl h-100 d-flex flex-column justify-center align-center text-center">
              <div class="text-overline color-gold font-weight-bold mb-2">{{ t('election.totalElectors') }}</div>
              <div class="stat-value text-h3 font-weight-black">{{ t('election.totalRegistered').split(': ')[1] || '5.67 Cr' }}</div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <div class="summary-card glass-effect pa-6 rounded-xl h-100 d-flex flex-column justify-center align-center text-center">
              <div class="text-overline color-gold font-weight-bold mb-2">{{ t('election.votesPolled') }}</div>
              <div class="stat-value text-h3 font-weight-black">{{ t('election.totalPolled').split(': ')[1] || '4.82 Cr' }}</div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <div class="summary-card glass-effect pa-6 rounded-xl h-100 d-flex flex-column justify-center align-center text-center">
              <div class="text-overline color-gold font-weight-bold mb-2">{{ t('candidates.constituency') }}</div>
              <div class="stat-value text-h3 font-weight-black">234</div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <div class="summary-card glass-effect pa-6 rounded-xl highlight-gold h-100 d-flex flex-column justify-center align-center text-center">
              <div class="text-overline text-white font-weight-bold mb-2">{{ t('election.turnout') }}</div>
              <div class="stat-value text-h3 font-weight-black">85.15<span class="text-h5">%</span></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Main Content -->
    <v-container class="py-12">
      <!-- Search & Filters -->
      <v-row align="center" class="mb-10">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            :label="t('election.searchPlaceholder')"
            variant="solo"
            class="rounded-pill elevation-4 elevation-hover transition-3ms"
            bg-color="white"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right">
           <v-chip-group v-model="selectedCategory" selected-class="bg-maroon text-white" mandatory>
             <v-chip value="ALL" class="font-weight-black">{{ t('election.all') }}</v-chip>
             <v-chip value="GEN" class="font-weight-black">{{ t('candidates.categories.GEN') }}</v-chip>
             <v-chip value="SC" class="font-weight-black">{{ t('candidates.categories.SC') }}</v-chip>
             <v-chip value="ST" class="font-weight-black">{{ t('candidates.categories.ST') }}</v-chip>
           </v-chip-group>
        </v-col>
      </v-row>

      <!-- Results Grid -->
      <div v-for="(districtStats, districtName) in groupedStats" :key="districtName" class="mb-16">
        <div class="d-flex align-center mb-8 district-header">
          <div class="header-line flex-grow-1"></div>
          <h2 class="text-h4 font-weight-black color-maroon px-6 text-uppercase">
            {{ translateDistrict(districtName) }}
          </h2>
          <div class="header-line flex-grow-1"></div>
        </div>

        <v-row>
          <v-col 
            v-for="stat in districtStats" 
            :key="stat.id"
            cols="12" 
            sm="6" 
            md="4" 
            lg="4"
            class="pa-4"
          >
            <v-card class="result-card rounded-xl elevation-4 h-100 overflow-hidden glass-card">
              <!-- Top Accent -->
              <div class="card-accent-bar" :class="stat.type.toLowerCase()"></div>
              
              <v-card-text class="pa-6">
                <!-- Header: ID & Category -->
                <div class="d-flex justify-space-between align-center mb-4">
                  <v-chip size="x-small" color="#D4AF37" variant="flat" class="font-weight-black text-white px-3">
                    #{{ stat.id }}
                  </v-chip>
                  <span class="text-caption font-weight-black color-gold text-uppercase tracking-wider">
                    {{ translateCategory(stat.type) }}
                  </span>
                </div>

                <!-- Constituency Name -->
                <h3 class="constituency-title text-h5 font-weight-black color-maroon mb-1">
                  {{ translateConstituency(stat.name) }}
                </h3>
                <div class="text-caption text-grey-darken-1 mb-6 d-flex align-center">
                  <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon>
                  {{ translateDistrict(stat.district) }}
                </div>

                <!-- Candidate Info (Merged) -->
                <div class="candidate-mini-profile pa-4 rounded-xl mb-6 bg-maroon-light">
                   <div class="text-tiny font-weight-black color-gold text-uppercase mb-1 opacity-70">{{ t('candidates.role') }}</div>
                   <div class="d-flex align-center">
                      <v-avatar size="40" color="white" class="mr-3 elevation-2 border-gold-thin">
                        <span class="text-h6 font-weight-black color-maroon">{{ getCandidateInitial(stat.name) }}</span>
                      </v-avatar>
                      <div>
                        <div class="text-subtitle-1 font-weight-black color-maroon lh-1 mb-1">
                          {{ getCandidateName(stat.name) }}
                        </div>
                        <div class="text-tiny color-gold font-weight-bold opacity-80">
                          {{ getCandidateDegree(stat.name) }}
                        </div>
                      </div>
                   </div>
                </div>

                <!-- Stats Section -->
                <div class="stats-grid">
                  <div class="stat-item">
                    <div class="stat-label text-tiny font-weight-black opacity-60">{{ t('candidates.electors') }}</div>
                    <div class="stat-val font-weight-black">{{ formatNumber(stat.electors) }}</div>
                  </div>
                  <div class="stat-item text-right">
                    <div class="stat-label text-tiny font-weight-black opacity-60">{{ t('candidates.polled') }}</div>
                    <div class="stat-val font-weight-black color-maroon">{{ formatNumber(Math.round(stat.electors * stat.turnout / 100)) }}</div>
                  </div>
                </div>

                <!-- Turnout Progress -->
                <div class="turnout-container mt-4">
                  <div class="d-flex justify-space-between align-end mb-2">
                    <span class="text-tiny font-weight-black text-uppercase opacity-60">{{ t('candidates.turnout') }}</span>
                    <span class="text-h6 font-weight-black color-maroon">{{ stat.turnout }}%</span>
                  </div>
                  <v-progress-linear
                    v-model="stat.turnout"
                    color="#D4AF37"
                    height="12"
                    rounded
                    class="turnout-bar elevation-1"
                  >
                  </v-progress-linear>
                </div>
              </v-card-text>
              
              <!-- Bottom Status Bar -->
              <div class="card-status-footer py-2 px-6 d-flex align-center justify-space-between bg-white border-top">
                <span class="text-tiny font-weight-black color-gold d-flex align-center">
                  <v-icon size="12" class="mr-1">mdi-check-circle-outline</v-icon>
                  {{ t('election.officialData') }}
                </span>
                <v-icon size="16" color="#800000">mdi-chevron-right</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { votingData } from '../../data/votingData';
import { candidatesData } from '../../data/candidates';
import { constituencyTranslations } from '../../data/constituencyTranslations';
import resultsBg from "../../assets/voteForWhistle.jpg";

export default {
  name: "Results",
  inject: ['t', 'currentLang'],
  data: () => ({
    resultsBg,
    votingStats: votingData,
    candidates: candidatesData,
    search: "",
    selectedCategory: "ALL"
  }),
  computed: {
    isTamil() {
      return this.currentLang() === 'ta';
    },
    constituencyMap() {
      const map = { ...constituencyTranslations };
      this.candidates.forEach(c => {
        if (c.constituencyEn && !map[c.constituencyEn]) {
          map[c.constituencyEn] = c.constituency;
        }
      });
      return map;
    },
    districtMap() {
      const map = {};
      this.candidates.forEach(c => {
        if (c.districtEn) map[c.districtEn] = c.district;
      });
      return map;
    },
    filteredStats() {
      let stats = this.votingStats;
      
      if (this.selectedCategory !== 'ALL') {
        stats = stats.filter(s => s.type === this.selectedCategory);
      }
      
      if (this.search) {
        const q = this.search.toLowerCase();
        stats = stats.filter(s => 
          s.name.toLowerCase().includes(q) || 
          s.district.toLowerCase().includes(q) ||
          (this.constituencyMap[s.name] && this.constituencyMap[s.name].toLowerCase().includes(q))
        );
      }
      
      return stats;
    },
    groupedStats() {
      const groups = {};
      this.filteredStats.forEach(s => {
        if (!groups[s.district]) groups[s.district] = [];
        groups[s.district].push(s);
      });
      return groups;
    }
  },
  methods: {
    translateDistrict(dist) {
      const translated = this.t('districts.' + dist);
      if (translated && translated !== 'districts.' + dist) return translated;
      return this.isTamil && this.districtMap[dist] ? this.districtMap[dist] : dist;
    },
    translateConstituency(name) {
      return this.isTamil && this.constituencyMap[name] ? this.constituencyMap[name] : name;
    },
    translateCategory(cat) {
       return this.t(`candidates.categories.${cat}`);
    },
    formatNumber(num) {
      return num ? num.toLocaleString() : '0';
    },
    getCandidate(constituencyEn) {
      return this.candidates.find(c => c.constituency === constituencyEn);
    },
    getCandidateName(constituencyEn) {
      const c = this.getCandidate(constituencyEn);
      if (!c) return 'Candidate Name';
      return this.isTamil ? c.name : c.nameEn;
    },
    getCandidateDegree(constituencyEn) {
      const c = this.getCandidate(constituencyEn);
      return c ? c.degree : '';
    },
    getCandidateInitial(constituencyEn) {
      const c = this.getCandidate(constituencyEn);
      if (!c) return '?';
      const name = c.nameEn || '';
      return name.charAt(0);
    }
  }
}
</script>

<style scoped>
.results-container {
  min-height: 100vh;
  background: #fcfcfc;
}

.results-hero {
  min-height: 500px;
  background-color: #800000;
  overflow: hidden;
}

.results-hero-bg {
  background-image: var(--bg-img);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.8;
}

.hero-overlay {
  background: linear-gradient(135deg, rgba(128, 0, 0, 0.85) 0%, rgba(128, 0, 0, 0.95) 100%);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.highlight-gold {
  background: rgba(212, 175, 55, 0.25) !important;
  border: 1px solid rgba(212, 175, 55, 0.5) !important;
}

.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.15) !important;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.glass-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(128, 0, 0, 0.15) !important;
  border-color: rgba(212, 175, 55, 0.5) !important;
}

.card-accent-bar {
  height: 6px;
  width: 100%;
}
.card-accent-bar.gen { background: linear-gradient(90deg, #800000, #a00000); }
.card-accent-bar.sc { background: linear-gradient(90deg, #D4AF37, #f1c40f); }
.card-accent-bar.st { background: linear-gradient(90deg, #555, #888); }

.bg-maroon-light {
  background: rgba(128, 0, 0, 0.03);
  border: 1px solid rgba(128, 0, 0, 0.05);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-item {
  padding: 8px 0;
}

.stat-val {
  font-size: 1.1rem;
}

.color-gold { color: #D4AF37; }
.color-maroon { color: #800000; }
.bg-maroon { background-color: #800000 !important; }

.district-header .header-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(128, 0, 0, 0.3), transparent);
}

.turnout-bar {
  background: rgba(0,0,0,0.05) !important;
}

.glow-text {
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
}

.text-tiny {
  font-size: 0.65rem;
  letter-spacing: 1px;
}

.border-gold-thin {
  border: 1px solid rgba(212, 175, 55, 0.3) !important;
}

@media (max-width: 600px) {
  .display-promo { font-size: 2.5rem !important; }
}
</style>
