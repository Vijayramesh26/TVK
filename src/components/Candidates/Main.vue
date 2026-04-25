<template>
  <v-container class="candidates-container py-6 py-sm-10" fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="11">
        <!-- Header Section -->
        <div class="header-section mb-6 mb-sm-10 text-center px-4">
          <h1 class="text-h4 text-sm-h3 font-weight-bold mb-2">{{ t('candidates.title') }}</h1>
          <p class="text-subtitle-1 text-grey-darken-1">{{ t('candidates.subtitle') }}</p>
          
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            :label="t('candidates.searchPlaceholder')"
            bg-color="white"
          ></v-text-field>


          <!-- District Navigation -->
          <div class="district-nav mt-4 mt-sm-6" v-if="Object.keys(groupedCandidates).length > 1">
            <v-chip-group class="district-chips-group">
              <v-chip
                v-for="(district, index) in Object.keys(groupedCandidates)"
                :key="index"
                @click="scrollToDistrict(district)"
                variant="tonal"
                color="#800000"
                class="font-weight-bold mx-1"
                size="small"
              >
                {{ translateDistrict(district) }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>

        <!-- Candidates Grid by District -->
        <div v-for="(districtCandidates, districtName) in groupedCandidates" :key="districtName" :id="'district-' + districtName" class="mb-16 district-section">
          <div class="district-header d-flex flex-column mb-10 pa-6">
            <div class="d-flex align-center">
              <div class="district-shield mr-4"></div>
              <h2 class="text-h4 text-sm-h3 font-weight-black color-maroon mb-0">
                {{ translateDistrict(districtName) }}
              </h2>
            </div>
            <div class="d-flex align-center mt-2">
              <v-chip size="small" class="font-weight-black px-4" color="#800000" variant="flat">
                {{ districtCandidates.length }} {{ t('candidates.candidateCount') }}
              </v-chip>
              <div class="h-line ml-4 flex-grow-1"></div>
            </div>
          </div>
          
          <v-row>
            <v-col 
              v-for="candidate in districtCandidates" 
              :key="candidate.id" 
              cols="12" 
              sm="6" 
              md="4"
              lg="3"
              class="pa-4"
            >
              <v-card 
                class="power-card rounded-xl elevation-5 overflow-hidden"
                @click="showDetails(candidate)"
              >
                <!-- Cinematic Poster Background -->
                <div 
                  class="card-poster d-flex flex-column align-center justify-center"
                  :class="candidate.isPresident ? 'president-gradient' : 'standard-gradient'"
                >
                  <div class="district-label-overlay">{{ isTamil ? (candidate.constituency || candidate.constituencyEn) : (candidate.constituencyEn || candidate.constituency) }}</div>
                  
                  <v-avatar size="110" class="elevation-10 border-gold-thick mb-4 bg-white">
                    <v-img
                      v-if="candidate.imageUrl"
                      :src="candidate.imageUrl"
                      cover
                      @error="candidate.imageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                    >
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                          <v-progress-circular indeterminate color="#800000" size="24"></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                    <span v-else class="text-h3 font-weight-black color-maroon">
                      {{ getInitials(candidate.nameEn || candidate.name) }}
                    </span>
                  </v-avatar>
                  
                  <v-chip 
                    size="x-small" 
                    :color="candidate.isPresident ? '#800000' : 'white'" 
                    variant="flat" 
                    class="font-weight-black px-4 mb-2"
                  >
                    {{ candidate.isPresident ? t('candidates.leader') : t('candidates.role') }}
                  </v-chip>
                </div>

                <v-card-text class="pa-6 text-center bg-white position-relative">
                  <div class="card-action-hint">{{ t('candidates.viewProfile') }}</div>
                  <div class="text-h6 font-weight-black color-maroon mb-1 line-clamp-1">
                    {{ isTamil ? candidate.name : (candidate.nameEn || candidate.name) }}
                  </div>
                  <div class="text-subtitle-2 font-weight-bold color-gold mb-4">
                     {{ candidate.degree || 'TVK Representative' }}
                  </div>
                  
                  <div class="stats-grid d-flex justify-center ga-4">
                    <div class="stat-item">
                      <v-icon size="16" color="#800000" class="mb-1">mdi-gavel</v-icon>
                      <div class="stat-val">{{ candidate.criminalCases || '0' }}</div>
                      <div class="stat-label">{{ t('candidates.criminalCases') }}</div>
                    </div>
                    <v-divider vertical class="mx-1"></v-divider>
                    <div class="stat-item">
                      <v-icon size="16" color="#D4AF37" class="mb-1">mdi-bank</v-icon>
                      <div class="stat-val">{{ candidate.assets && candidate.assets !== '-' ? candidate.assets : 'NA' }}</div>
                      <div class="stat-label">{{ t('candidates.assets') }}</div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Empty State -->
        <div v-if="Object.keys(groupedCandidates).length === 0" class="text-center py-16">
          <v-icon size="100" color="grey-lighten-2" class="mb-6">mdi-account-search-outline</v-icon>
          <h3 class="text-h5 text-grey-darken-1 font-weight-bold">{{ t('candidates.noResults') }}</h3>
        </div>
      </v-col>
    </v-row>

    <!-- Detail Dialog -->
    <v-dialog v-model="dialog" max-width="600" scrollable transition="dialog-bottom-transition">
      <v-card v-if="selectedCandidate" class="rounded-xl overflow-hidden detail-card-premium">
        <!-- Close Button -->
        <v-btn icon="mdi-close" position="absolute" style="top: 15px; right: 15px; z-index: 10;" color="white" variant="text" @click="dialog = false"></v-btn>

        <div 
          class="profile-hero pa-6 pa-sm-10 text-center position-relative" 
          :class="selectedCandidate.isPresident ? 'president-gradient' : 'standard-gradient-deep'"
        >
          <div class="hero-pattern"></div>
          <v-avatar size="100" size-sm="140" class="elevation-20 border-gold-thick mb-6 bg-white">
            <v-img
              v-if="selectedCandidate.imageUrl"
              :src="selectedCandidate.imageUrl"
              cover
              @error="selectedCandidate.imageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                  <v-progress-circular indeterminate color="#800000"></v-progress-circular>
                </div>
              </template>
            </v-img>
            <span v-else class="text-h4 text-sm-h2 font-weight-black color-maroon">{{ getInitials(selectedCandidate.nameEn || selectedCandidate.name) }}</span>
          </v-avatar>
          <h2 class="text-h4 text-sm-h3 font-weight-black mb-1 color-white text-shadow-sm">
            {{ isTamil ? selectedCandidate.name : (selectedCandidate.nameEn || selectedCandidate.name) }}
          </h2>
          <div class="d-flex justify-center ga-2 mt-2">
            <v-chip color="white" variant="flat" class="font-weight-black color-maroon">
              {{ isTamil ? (selectedCandidate.constituency || selectedCandidate.constituencyEn) : (selectedCandidate.constituencyEn || selectedCandidate.constituency) }}
            </v-chip>
            <v-chip color="#D4AF37" variant="flat" class="font-weight-black color-white">
              {{ t('districts.' + selectedCandidate.district) }}
            </v-chip>
          </div>
        </div>

        <v-card-text class="pa-6 pa-sm-10 pt-4 pt-sm-8 bg-paper">
          <div class="stats-row d-flex justify-space-between mb-8">
             <div class="info-block border-gold-left pl-4">
                <div class="text-overline font-weight-black text-grey-darken-1">{{ t('candidates.assets') }}</div>
                <div class="text-h5 color-maroon font-weight-black">{{ selectedCandidate.assets && selectedCandidate.assets !== '-' ? selectedCandidate.assets : 'N/A' }}</div>
             </div>
             <div class="info-block border-maroon-left pl-4">
                <div class="text-overline font-weight-black text-grey-darken-1">{{ t('candidates.criminalCases') }}</div>
                <div class="text-h5 color-maroon font-weight-black">{{ selectedCandidate.criminalCases || '0' }}</div>
             </div>
          </div>

          <v-divider class="mb-8 opacity-10"></v-divider>

          <div class="mb-8">
            <div class="d-flex align-center mb-2">
              <v-icon color="#D4AF37" class="mr-2">mdi-school</v-icon>
              <div class="text-overline font-weight-black text-grey-darken-1">{{ t('candidates.degree') }}</div>
            </div>
            <div class="text-h6 font-weight-bold color-grey-darken-3">{{ selectedCandidate.degree || 'TVK Political Leadership Program' }}</div>
          </div>

          <div class="mb-6">
            <div class="d-flex align-center mb-2">
              <v-icon color="#800000" class="mr-2">mdi-target</v-icon>
              <div class="text-overline font-weight-black text-grey-darken-1">{{ t('candidates.objective') }}</div>
            </div>
            <p class="text-body-1 text-justify lh-premium color-grey-darken-2">
              {{ isTamil ? (selectedCandidate.bio || 'தமிழகத்தின் ஒளிமயமான எதிர்காலத்திற்காக, ஊழலற்ற நேர்மையான நிர்வாகத்தை வழங்க மக்கள் பணியாற்றி வருகிறார்.') : (selectedCandidate.bioEn || 'Working towards a bright future for Tamil Nadu by providing honest and corruption-free administration.') }}
            </p>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="pa-8 bg-white">
          <v-btn color="#800000" block size="x-large" class="rounded-lg elevation-10 cta-share-btn" prepend-icon="mdi-share-variant">
             {{ t('candidates.share') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Back to Top Button -->
    <v-fade-transition>
      <v-btn
        v-if="showTopBtn"
        icon
        color="#800000"
        size="large"
        elevation="8"
        class="back-to-top-btn"
        @click="scrollToTop"
      >
        <v-icon color="white" size="32">mdi-chevron-up</v-icon>
      </v-btn>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { candidatesData } from '../../data/candidates';
import { votingData } from '../../data/votingData';

export default {
  name: "Candidates",
  inject: ['t', 'currentLang'],
  data: () => ({
    search: "",
    dialog: false,
    selectedCandidate: null,
    candidates: candidatesData,
    showTopBtn: false
  }),
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    isTamil() {
      return this.currentLang() === 'ta';
    },
    filteredCandidates() {
      if (!this.search) return this.candidates;
      const s = this.search.toLowerCase();
      return this.candidates.filter(c => 
        (c.name && c.name.toLowerCase().includes(s)) || 
        (c.nameEn && c.nameEn.toLowerCase().includes(s)) ||
        (c.constituency && c.constituency.toLowerCase().includes(s)) ||
        (c.constituencyEn && c.constituencyEn.toLowerCase().includes(s))
      );
    },
    groupedCandidates() {
      const filtered = this.filteredCandidates;
      const groups = {};
      
      filtered.forEach(c => {
        // ALWAYS use English as the key for reliable filtering of stats
        const districtKey = c.districtEn || c.district || 'Other';
        if (!groups[districtKey]) groups[districtKey] = [];
        groups[districtKey].push(c);
      });
      
      const sortedKeys = Object.keys(groups).sort((a, b) => a.localeCompare(b));
      const sortedGroups = {};
      sortedKeys.forEach(key => {
        sortedGroups[key] = groups[key];
      });
      
      return sortedGroups;
    }
  },
  methods: {
    translateDistrict(districtEn) {
      return this.t('districts.' + districtEn);
    },
    scrollToDistrict(id) {
      const el = document.getElementById('district-' + id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    getInitials(name) {
      if (!name) return "TVK";
      const parts = name.split(/[. \s]+/);
      const filtered = parts.filter(p => !['Thiru', 'திரு', 'Dr', 'Mr', 'Mrs', 'Ms', 'டாக்டர்', 'திருமதி', 'சி', 'ஆர்', 'ஏ', 'எஸ்', 'எம்', 'கே', 'ஜி', 'என்', 'வி', 'டி', 'பி', 'ஜே'].includes(p));
      
      if (filtered.length >= 2) {
        return (filtered[0][0] + filtered[filtered.length-1][0]).toUpperCase();
      }
      if (filtered.length === 1) {
        return filtered[0].slice(0, 2).toUpperCase();
      }
      return "TVK";
    },
    formatNumber(num) {
      return num ? num.toLocaleString() : '0';
    },
    showDetails(candidate) {
      this.selectedCandidate = candidate;
      this.dialog = true;
    },
    handleScroll() {
      this.showTopBtn = window.scrollY > 500;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style scoped>
/* styles remain mostly the same, ensuring responsiveness */
.candidates-container {
  min-height: 100vh;
  background-color: #fcfcfc;
}

.district-chips-group {
  display: flex;
  justify-content: center;
}

@media (max-width: 960px) {
  .district-chips-group {
    justify-content: flex-start;
  }
}
.max-width-600 { max-width: 600px; }
.search-bar :deep(.v-field__outline) {
  --v-field-border-opacity: 0.1;
  border-width: 2px;
}

.back-to-top-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 100;
  width: 70px !important;
  height: 70px !important;
  background: #800000 !important;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); /* Perfect Hexagon */
  display: flex !important;
  align-items: center;
  justify-content: center;
  border: none !important;
  box-shadow: 0 15px 35px rgba(0,0,0,0.3) !important;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.back-to-top-btn::before {
  content: '';
  position: absolute;
  top: -5px; left: -5px; right: -5px; bottom: -5px;
  border: 2px solid #D4AF37;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: orbit-rotate 4s linear infinite;
}

.back-to-top-btn::after {
  content: 'TOP';
  position: absolute;
  font-size: 0.6rem;
  font-weight: 900;
  color: #D4AF37;
  bottom: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

@keyframes orbit-rotate {
  0% { transform: scale(1) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 0.5; }
  100% { transform: scale(1) rotate(360deg); opacity: 1; }
}

.back-to-top-btn .v-icon {
  transition: all 0.3s ease;
  margin-top: -5px;
}

.back-to-top-btn:hover {
  transform: translateY(-10px) scale(1.1);
  background: #aa0000 !important;
}

.back-to-top-btn:hover .v-icon {
  transform: translateY(-5px);
  margin-bottom: 10px;
}

.back-to-top-btn:hover::after {
  opacity: 1;
}

@media (max-width: 600px) {
  .back-to-top-btn {
    bottom: 30px;
    right: 20px;
    width: 60px !important;
    height: 60px !important;
  }
}

/* Power Card Styling */
.power-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(0,0,0,0.05);
  cursor: pointer;
  background: white;
}

.power-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 30px 60px rgba(128, 0, 0, 0.15) !important;
}

.card-poster {
  height: 180px;
  position: relative;
  overflow: hidden;
}

.district-label-overlay {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-action-hint {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #D4AF37;
  color: #800000;
  font-size: 0.6rem;
  font-weight: 900;
  padding: 2px 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.standard-gradient { background: linear-gradient(135deg, #800000 0%, #a00000 100%); }
.president-gradient { background: linear-gradient(135deg, #D4AF37 0%, #f1c40f 100%); }
.standard-gradient-deep { background: linear-gradient(135deg, #600000 0%, #800000 100%); }

.border-gold-thick { border: 4px solid #D4AF37 !important; }

/* Stats Grid */
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}
.stat-val { font-weight: 900; color: #333; font-size: 0.9rem; }
.stat-label { font-size: 0.6rem; font-weight: 700; color: #999; }

.district-header {
  border-left: 8px solid #800000;
  background: rgba(128, 0, 0, 0.03);
  border-radius: 0 16px 16px 0;
}
.district-shield { display: none; }
.h-line { height: 2px; background: rgba(128, 0, 0, 0.1); border-radius: 1px; }

/* Premium Modal */
.detail-card-premium {
  background: #fff;
}
.profile-hero {
  overflow: hidden;
}
.hero-pattern {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
  pointer-events: none;
}
.bg-paper { background-color: #fbfbfb; }
.border-gold-left { border-left: 4px solid #D4AF37; }
.border-maroon-left { border-left: 4px solid #800000; }
.lh-premium { line-height: 1.8; }
.text-shadow-sm { text-shadow: 0 2px 4px rgba(0,0,0,0.2); }

.cta-share-btn {
  background: #800000 !important;
  color: white !important;
  font-weight: 900;
  letter-spacing: 1px;
}

.color-maroon { color: #800000; }
.color-gold { color: #D4AF37; }
.maroon--text { color: #800000 !important; }
.white--text { color: white !important; }
.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }

.district-section {
  animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.voting-stat-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(212, 175, 55, 0.2);
  position: relative;
  overflow: hidden;
}

.voting-stat-card:hover {
  transform: translateY(-5px);
  border-color: #D4AF37;
  box-shadow: 0 12px 40px rgba(128, 0, 0, 0.1);
}

.voting-stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #D4AF37;
  opacity: 0.5;
}

.view-toggle {
  z-index: 5;
}

.gap-3 { gap: 12px; }

@media (max-width: 600px) {
  .power-card {
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>
