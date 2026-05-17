<template>
  <v-container class="schemes-container py-md-10 py-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="11" lg="10">
        <!-- Premium Header Banner -->
        <v-card class="hero-card rounded-xl overflow-hidden elevation-10 mb-8 border-gold" dark>
          <div class="hero-gradient pa-8 pa-md-12 text-center position-relative">
            <v-chip
              color="rgba(212, 175, 55, 0.2)"
              text-color="#D4AF37"
              class="mb-4 font-weight-bold"
              variant="flat"
            >
              <v-icon start icon="mdi-shield-star" size="small"></v-icon>
              {{ t("schemes.badge") }}
            </v-chip>
            <h1 class="text-h3 text-md-h2 font-weight-black text-white mb-4 shadow-text">
              {{ t("schemes.title") }}
            </h1>
            <p class="text-subtitle-1 text-md-h6 font-weight-regular text-white opacity-90 max-width-800 mx-auto mb-0 lh-relaxed">
              {{ t("schemes.subtitle") }}
            </p>
            <div class="bg-shape shape-1"></div>
            <div class="bg-shape shape-2"></div>
          </div>
        </v-card>

        <!-- Stats Counters Banner -->
        <v-row class="mb-8">
          <v-col cols="12" md="4">
            <v-card class="glass-card rounded-xl pa-6 text-center stat-card hover-lift border-gold-thin">
              <div class="stat-icon-wrapper mx-auto mb-3 bg-maroon-light">
                <v-icon color="#800000" size="36">mdi-account-group-outline</v-icon>
              </div>
              <div class="text-h3 font-weight-black color-maroon mb-1">3.5 Cr+</div>
              <div class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ t("schemes.statBeneficiaries") }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="glass-card rounded-xl pa-6 text-center stat-card hover-lift border-gold-thin">
              <div class="stat-icon-wrapper mx-auto mb-3 bg-gold-light">
                <v-icon color="#D4AF37" size="36">mdi-currency-inr</v-icon>
              </div>
              <div class="text-h3 font-weight-black color-gold mb-1">₹45,000 Cr</div>
              <div class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ t("schemes.statBudget") }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="glass-card rounded-xl pa-6 text-center stat-card hover-lift border-gold-thin">
              <div class="stat-icon-wrapper mx-auto mb-3 bg-maroon-light">
                <v-icon color="#800000" size="36">mdi-map-marker-star</v-icon>
              </div>
              <div class="text-h3 font-weight-black color-maroon mb-1">38</div>
              <div class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ t("schemes.statDistricts") }}</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Interactive Eligibility Calculator Banner -->
        <v-card class="calc-card rounded-xl pa-8 mb-10 elevation-6 border-gold">
          <v-row align="center">
            <v-col cols="12" md="7">
              <v-chip color="#D4AF37" text-color="#800000" class="font-weight-black mb-3">
                <v-icon start icon="mdi-calculator-variant"></v-icon>
                {{ t("schemes.btnCheckEligibility") }}
              </v-chip>
              <h2 class="text-h4 font-weight-black color-maroon mb-2">
                {{ t("schemes.eligibilityTitle") }}
              </h2>
              <p class="text-body-1 font-weight-regular text-grey-darken-2 mb-0">
                {{ t("schemes.eligibilitySubtitle") }}
              </p>
            </v-col>
            <v-col cols="12" md="5">
              <v-select
                v-model="selectedOccupation"
                :items="occupationList"
                :label="t('schemes.labelCategory')"
                prepend-inner-icon="mdi-briefcase-account-outline"
                variant="outlined"
                color="#800000"
                bg-color="white"
                rounded="lg"
                hide-details
                @update:modelValue="calculateEligible"
              ></v-select>
            </v-col>
          </v-row>

          <v-expand-transition>
            <div v-if="selectedOccupation" class="mt-8 pt-6 border-top">
              <div class="text-h6 font-weight-bold color-maroon mb-4">
                <v-icon color="#D4AF37" class="mr-2">mdi-check-all</v-icon>
                {{ t("schemes.resultCount") }} {{ eligibleSchemes.length }}
              </div>
              <v-row>
                <v-col v-for="scheme in eligibleSchemes" :key="scheme.id" cols="12" sm="6" md="4">
                  <v-card class="bg-maroon-light pa-4 rounded-lg d-flex align-center h-100 border-gold-thin">
                    <v-avatar color="#800000" size="48" class="mr-4">
                      <v-icon color="#D4AF37">{{ scheme.icon }}</v-icon>
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold color-maroon">{{ scheme.title }}</div>
                      <div class="text-caption text-grey-darken-2">{{ scheme.beneficiaries }}</div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>
        </v-card>

        <!-- Schemes Filter Tabs -->
        <div class="d-flex justify-center mb-8 flex-wrap gap-3">
          <v-btn
            v-for="filter in filters"
            :key="filter.value"
            :color="activeFilter === filter.value ? '#800000' : 'white'"
            :variant="activeFilter === filter.value ? 'flat' : 'elevated'"
            :class="{'text-white': activeFilter === filter.value, 'color-maroon': activeFilter !== filter.value}"
            class="rounded-pill px-6 py-2 font-weight-bold text-subtitle-1 elevation-2 border-gold-thin"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </v-btn>
        </div>

        <!-- Schemes Grid -->
        <v-row>
          <v-col v-for="scheme in filteredSchemes" :key="scheme.id" cols="12" md="6">
            <v-card class="glass-card rounded-xl pa-8 elevation-4 border-gold-thin h-100 d-flex flex-column justify-space-between hover-scale">
              <div>
                <div class="d-flex align-center justify-space-between mb-6">
                  <v-avatar color="#800000" size="64" class="elevation-4 border-gold-thin">
                    <v-icon color="#D4AF37" size="32">{{ scheme.icon }}</v-icon>
                  </v-avatar>
                  <v-chip color="rgba(128, 0, 0, 0.1)" text-color="#800000" class="font-weight-bold">
                    {{ scheme.beneficiaries }}
                  </v-chip>
                </div>
                <h3 class="text-h5 font-weight-black color-maroon mb-3">{{ scheme.title }}</h3>
                <p class="text-body-1 text-grey-darken-3 lh-relaxed mb-6">{{ scheme.desc }}</p>
              </div>
              <div class="d-flex align-center justify-space-between border-top pt-4">
                <span class="text-caption font-weight-bold text-uppercase color-gold">
                  CM Directives 2026
                </span>
                <v-btn
                  color="#800000"
                  variant="tonal"
                  size="small"
                  class="rounded-pill px-4 font-weight-bold"
                  prepend-icon="mdi-download"
                  @click="downloadPDF(scheme.title)"
                >
                  {{ t("schemes.btnDownload") }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Simulated Download Snackbar -->
        <v-snackbar v-model="snackbar" color="#800000" timeout="2500" rounded="pill">
          <span class="text-white font-weight-bold">
            <v-icon start icon="mdi-check-circle" color="#D4AF37"></v-icon>
            {{ downloadMsg }}
          </span>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SchemesPortal",
  inject: ["t", "currentLang"],
  data: () => ({
    activeFilter: "all",
    selectedOccupation: null,
    eligibleSchemes: [],
    snackbar: false,
    downloadMsg: "",
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    schemesList() {
      const items = this.t("schemes.items");
      return Array.isArray(items) ? items : [
        { id: 1, category: "general", title: "200 Units Free Electricity", desc: "First 200 units free for all households.", beneficiaries: "2.1 Crore Families", icon: "mdi-lightning-bolt" },
        { id: 2, category: "women", title: "Women Special Security Brigade", desc: "24/7 dedicated rapid response security brigade.", beneficiaries: "38 Districts", icon: "mdi-shield-star" },
        { id: 3, category: "students", title: "Interest-Free Higher Education Loan", desc: "Collateral-free, zero-interest education loans up to Rs. 20 Lakhs.", beneficiaries: "5 Lakh Students", icon: "mdi-school" },
        { id: 4, category: "farmers", title: "High Procurement & Loan Waiver", desc: "Rs. 3500 for paddy and cooperative loan waivers.", beneficiaries: "35 Lakh Farmers", icon: "mdi-tractor" },
        { id: 5, category: "students", title: "Youth Skilling & Stipend Scheme", desc: "Free industry internships with Rs. 10,000 monthly stipend.", beneficiaries: "5 Lakh Youth", icon: "mdi-account-hard-hat" },
        { id: 6, category: "women", title: "Women Entrepreneurship Grants", desc: "Rs. 25 Lakhs zero-interest loans with 30% subsidy.", beneficiaries: "1.2 Lakh Women", icon: "mdi-storefront" }
      ];
    },
    filters() {
      return [
        { label: this.t("schemes.filterAll") || "All", value: "all" },
        { label: this.t("schemes.filterWomen") || "Women", value: "women" },
        { label: this.t("schemes.filterStudents") || "Students", value: "students" },
        { label: this.t("schemes.filterFarmers") || "Farmers", value: "farmers" },
        { label: this.t("schemes.filterGeneral") || "General", value: "general" },
      ];
    },
    occupationList() {
      const items = this.t("schemes.categories");
      return Array.isArray(items) ? items : [
        "Student / Graduate",
        "Woman / Homemaker",
        "Farmer",
        "Youth / Entrepreneur",
        "General Citizen"
      ];
    },
    filteredSchemes() {
      if (this.activeFilter === "all") return this.schemesList;
      return this.schemesList.filter(s => s.category === this.activeFilter);
    },
  },
  methods: {
    calculateEligible() {
      if (!this.selectedOccupation) return;
      const occ = String(this.selectedOccupation).toLowerCase();
      if (occ.includes("student") || occ.includes("மாணவர்")) {
        this.eligibleSchemes = this.schemesList.filter(s => s.category === "students" || s.category === "general");
      } else if (occ.includes("woman") || occ.includes("மகளிர்")) {
        this.eligibleSchemes = this.schemesList.filter(s => s.category === "women" || s.category === "general");
      } else if (occ.includes("farmer") || occ.includes("விவசாயி")) {
        this.eligibleSchemes = this.schemesList.filter(s => s.category === "farmers" || s.category === "general");
      } else {
        this.eligibleSchemes = this.schemesList.filter(s => s.category === "general" || s.category === "students");
      }
    },
    downloadPDF(title) {
      this.downloadMsg = `${title} PDF downloading...`;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.schemes-container {
  min-height: 100vh;
  background-color: #f8fafc;
  background-image:
    radial-gradient(at 0% 0%, hsla(0, 100%, 25%, 0.04) 0px, transparent 50%),
    radial-gradient(at 100% 100%, hsla(46, 65%, 52%, 0.06) 0px, transparent 50%);
  position: relative;
}

.color-maroon { color: #800000; }
.color-gold { color: #d4af37; }

.hero-card {
  background-color: #800000;
  border: 2px solid #d4af37;
}

.hero-gradient {
  background: linear-gradient(135deg, #600000 0%, #800000 50%, #900000 100%);
  overflow: hidden;
}

.border-gold-thin { border: 1px solid rgba(212, 175, 55, 0.4); }
.border-gold { border: 2px solid #d4af37; }

.shadow-text { text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); }

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 1;
}

.shape-1 { width: 300px; height: 300px; background: rgba(212, 175, 55, 0.3); top: -100px; right: -50px; }
.shape-2 { width: 350px; height: 350px; background: rgba(0, 0, 0, 0.25); bottom: -150px; left: -100px; }

.glass-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 35px 0 rgba(128, 0, 0, 0.06) !important;
}

.calc-card {
  background: #ffffff;
  box-shadow: 0 15px 40px rgba(128, 0, 0, 0.08) !important;
}

.stat-card { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 45px rgba(128, 0, 0, 0.1) !important;
  border-color: #d4af37;
}

.hover-scale { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(128, 0, 0, 0.12) !important;
  border-color: #d4af37;
}

.stat-icon-wrapper {
  width: 72px; height: 72px; border-radius: 20px; display: flex; align-items: center; justify-content: center;
}

.bg-maroon-light { background: rgba(128, 0, 0, 0.06); }
.bg-gold-light { background: rgba(212, 175, 55, 0.15); }
.gap-3 { gap: 12px; }
.lh-relaxed { line-height: 1.6; }
</style>
