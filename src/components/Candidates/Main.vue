<template>
  <v-container class="candidates-container py-10" fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="11">
        <!-- Header Section -->
        <div class="header-section mb-10 text-center px-4">
          <h1 class="text-h3 font-weight-bold mb-2">வேட்பாளர் விவரங்கள் 2026</h1>
          <p class="text-subtitle-1 text-grey-darken-1">My Vetri Tamilnadu - அதிகாரப்பூர்வ 234 வேட்பாளர்கள் பட்டியல்</p>
          
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="பெயர் (தமிழ்/English) அல்லது தொகுதி மூலம் தேடுக..."
            variant="solo"
            class="mt-8 max-width-600 mx-auto rounded-pill search-bar"
            hide-details
            clearable
            bg-color="white"
          ></v-text-field>
        </div>

        <!-- Candidates Grid -->
        <v-row>
          <v-col 
            v-for="candidate in filteredCandidates" 
            :key="candidate.id" 
            cols="12" 
            sm="6" 
            md="4"
            lg="3"
          >
            <v-card 
              class="candidate-card rounded-xl elevation-2 overflow-hidden border-maroon-thin"
              @click="showDetails(candidate)"
              hover
            >
              <!-- Branded Header Placeholder -->
              <div 
                class="candidate-header-pattern d-flex flex-column align-center justify-center pt-8 pb-4"
                :class="candidate.isPresident ? 'president-bg' : 'standard-bg'"
              >
                <v-avatar size="100" class="elevation-4 border-gold mb-3" :color="candidate.isPresident ? '#D4AF37' : 'white'">
                  <span class="text-h4 font-weight-bold" :class="candidate.isPresident ? 'white--text' : 'maroon--text'">
                    {{ getInitials(candidate.nameEn || candidate.name) }}
                  </span>
                </v-avatar>
                <v-chip size="x-small" :color="candidate.isPresident ? 'white' : '#800000'" variant="flat" class="font-weight-bold mb-1">
                  {{ candidate.isPresident ? 'தலைவர்' : 'வேட்பாளர்' }}
                </v-chip>
              </div>

              <v-card-text class="text-center pa-4">
                <div class="text-body-1 font-weight-black color-maroon mb-1 line-clamp-1">{{ candidate.name }}</div>
                <div class="text-caption font-weight-bold color-gold mb-2 line-clamp-1">{{ candidate.constituency }}</div>
                
                <!-- Quick Stats Footer -->
                <v-divider class="my-2 opacity-10"></v-divider>
                <div class="d-flex justify-space-between align-center px-2">
                   <div class="text-caption text-grey-darken-1">
                      <v-icon size="14" color="red">mdi-alert-circle-outline</v-icon> {{ candidate.criminalCases || '0' }}
                   </div>
                   <div class="text-caption text-grey-darken-1">
                      <v-icon size="14" color="green">mdi-cash-multiple</v-icon> {{ candidate.assets || '-' }}
                   </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <div v-if="filteredCandidates.length === 0" class="text-center py-16">
          <v-icon size="64" color="grey-lighten-2">mdi-account-search-outline</v-icon>
          <div class="text-h6 text-grey-darken-1 mt-4">வேட்பாளர்கள் யாரும் கிடைக்கவில்லை</div>
        </div>
      </v-col>
    </v-row>

    <!-- Detail Dialog -->
    <v-dialog v-model="dialog" max-width="500" scrollable transition="dialog-bottom-transition">
      <v-card v-if="selectedCandidate" class="rounded-xl overflow-hidden detail-card">
        <div 
          class="pa-8 text-center" 
          :class="selectedCandidate.isPresident ? 'president-bg' : 'standard-bg-full'"
        >
          <v-avatar size="120" class="elevation-10 border-gold mb-4" color="white">
            <span class="text-h3 font-weight-black maroon--text">{{ getInitials(selectedCandidate.nameEn || selectedCandidate.name) }}</span>
          </v-avatar>
          <h2 class="text-h4 font-weight-black mb-1" :class="selectedCandidate.isPresident ? 'white--text' : 'maroon--text'">
            {{ selectedCandidate.name }}
          </h2>
          <v-chip :color="selectedCandidate.isPresident ? '#800000' : '#D4AF37'" theme="dark" class="font-weight-bold">
            {{ selectedCandidate.constituency }} ({{ selectedCandidate.district }})
          </v-chip>
        </div>

        <v-card-text class="pa-8 pt-6">
          <v-row class="mb-4">
             <v-col cols="6">
                <div class="text-overline font-weight-black text-grey-darken-1 mb-1">சொத்து மதிப்பு</div>
                <div class="text-h6 color-maroon font-weight-bold">{{ selectedCandidate.assets || '-' }}</div>
             </v-col>
             <v-col cols="6">
                <div class="text-overline font-weight-black text-grey-darken-1 mb-1">வழக்குகள்</div>
                <div class="text-h6 color-maroon font-weight-bold">{{ selectedCandidate.criminalCases || '0' }}</div>
             </v-col>
          </v-row>

          <v-divider class="mb-6"></v-divider>

          <div class="mb-6">
            <div class="text-overline font-weight-black text-grey-darken-1 mb-1">கல்வித் தகுதி</div>
            <div class="text-body-1 font-weight-bold">{{ selectedCandidate.degree || 'தமிழக வெற்றி கழகம்' }}</div>
          </div>

          <div class="mb-4">
            <div class="text-overline font-weight-black text-grey-darken-1 mb-1">குறிக்கோள்</div>
            <p class="text-body-1 text-justify lh-relaxed grey-darken-3">
              {{ selectedCandidate.bio || 'தமிழகத்தின் ஒளிமயமான எதிர்காலத்திற்காக, ஊழலற்ற நேர்மையான நிர்வாகத்தை வழங்க மக்கள் பணியாற்றி வருகிறார்.' }}
            </p>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="pa-6 d-flex flex-column">
          <v-btn color="#800000" block size="x-large" class="rounded-lg elevation-4 mx-0 mb-2" prepend-icon="mdi-share-variant" theme="dark">
             விவரங்களை பகிரவும்
          </v-btn>
          <v-btn variant="text" block class="mx-0 text-grey-darken-1" @click="dialog = false">மூடுக</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { candidatesData } from '../../data/candidates';

export default {
  name: "Candidates",
  data: () => ({
    search: "",
    dialog: false,
    selectedCandidate: null,
    candidates: candidatesData
  }),
  computed: {
    filteredCandidates() {
      if (!this.search) return this.candidates;
      const s = this.search.toLowerCase();
      return this.candidates.filter(c => 
        (c.name && c.name.toLowerCase().includes(s)) || 
        (c.nameEn && c.nameEn.toLowerCase().includes(s)) ||
        (c.constituency && c.constituency.toLowerCase().includes(s))
      );
    }
  },
  methods: {
    getInitials(name) {
      if (!name) return "TVK";
      const parts = name.split(/[. \s]+/);
      const filtered = parts.filter(p => !['Thiru', 'சி', 'ஆர்', 'ஏ'].includes(p));
      if (filtered.length > 1) {
        return (filtered[0][0] + filtered[filtered.length-1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    },
    showDetails(candidate) {
      this.selectedCandidate = candidate;
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
/* styles remain mostly the same, ensuring responsiveness */
.candidates-container {
  min-height: 100vh;
  background-color: #f8fafc;
}
.max-width-600 { max-width: 600px; }
.search-bar :deep(.v-field__outline) {
  --v-field-border-opacity: 0.1;
  border-width: 2px;
}
.candidate-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: white;
}
.candidate-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(128, 0, 0, 0.1) !important;
}
.border-maroon-thin { border: 1px solid rgba(128, 0, 0, 0.08); }
.standard-bg { background: linear-gradient(135deg, #800000 0%, #a00000 100%); opacity: 0.95; }
.standard-bg-full { background: linear-gradient(135deg, #800000 0%, #a00000 100%); }
.president-bg { background: linear-gradient(135deg, #D4AF37 0%, #f1c40f 100%); }
.border-gold { border: 3px solid #D4AF37; }
.color-maroon { color: #800000; }
.color-gold { color: #D4AF37; }
.maroon--text { color: #800000 !important; }
.white--text { color: white !important; }
.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.lh-relaxed { line-height: 1.8; }
</style>
