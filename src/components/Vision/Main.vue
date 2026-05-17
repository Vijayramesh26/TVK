<template>
  <v-container fluid class="pa-0 vision-page">
    <!-- Premium Hero Banner -->
    <div class="banner-wrapper position-relative overflow-hidden bg-gradient-maroon text-white py-14 px-6 text-center">
      <div class="bg-flag-wave opacity-25"></div>
      <v-container class="position-relative z-1" max-width="950">
        <v-chip color="#D4AF37" variant="outlined" class="mb-6 font-weight-black text-caption px-6 py-2 border-gold rounded-pill">
          <v-icon start icon="mdi-shield-crown" color="#D4AF37"></v-icon>
          {{ isTamil ? 'முதலமைச்சர் தனிப்பிரிவு நேரடி ஆவணம்' : 'Chief Minister Special Executive Action Plan' }}
        </v-chip>
        <h1 class="text-h3 text-md-h2 font-weight-black color-gold mb-4 line-height-1 text-wrap">
          {{ t("vision.title") || (isTamil ? 'முதலமைச்சர் தளபதியின் தொலைநோக்கு 2026 - 2030' : "Chief Minister Thalapathy's Vision 2026 - 2030") }}
        </h1>
        <p class="text-h6 font-weight-regular opacity-90 max-width-800 mx-auto mb-8">
          {{ t("vision.subtitle") || (isTamil ? 'தமிழகத்தின் வளர்ச்சிக்காக முதலமைச்சர் தளபதி விஜய் அவர்கள் முன்வைத்த முதல் 100 நாள் செயல் திட்டங்கள்.' : 'Explore Chief Minister Thalapathy Vijay\'s First 100 Days Executive Action Plan and key flagship governance pillars.') }}
        </p>

        <!-- Overall Public Approval Meter -->
        <v-card class="bg-gold-light pa-6 rounded-2xl border-gold max-width-600 mx-auto elevation-10" backdrop-filter="blur(10px)">
          <div class="d-flex align-center justify-space-between mb-2">
            <span class="text-subtitle-1 font-weight-bold color-gold">{{ isTamil ? 'ஒட்டுமொத்த மக்கள் ஆதரவு குறியீடு' : 'Overall Public Backing Index' }}</span>
            <span class="text-h5 font-weight-black color-gold">98.4%</span>
          </div>
          <v-progress-linear model-value="98.4" height="14" color="#D4AF37" rounded class="mb-2 bg-maroon-dark"></v-progress-linear>
          <div class="text-caption opacity-80 font-weight-medium">
            <v-icon icon="mdi-account-multiple-check" size="small" class="mr-1"></v-icon>
            {{ Number(totalVotes).toLocaleString('en-IN') }} {{ isTamil ? 'குடிமக்கள் ஆதரவு அளித்துள்ளனர்' : 'citizens have endorsed these policies' }}
          </div>
        </v-card>
      </v-container>
    </div>

    <!-- Vision Pillars Grid -->
    <v-container max-width="1300" class="py-12 px-4">
      <div class="text-center mb-12">
        <h2 class="text-h4 font-weight-black color-maroon mb-2">
          {{ isTamil ? 'முக்கிய தொலைநோக்குத் தூண்கள்' : 'Core Governance Pillars' }}
        </h2>
        <div class="title-divider mx-auto bg-gold"></div>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="pillar in currentPillars" :key="pillar.id">
          <v-card class="vision-pillar-card rounded-2xl pa-8 h-100 d-flex flex-column hover-scale border-gold-thin bg-white elevation-4 overflow-hidden position-relative">
            <div class="pillar-number bg-maroon text-gold font-weight-black rounded-circle d-flex align-center justify-center elevation-3">
              0{{ pillar.id }}
            </div>

            <div class="mb-4 pt-4">
              <v-chip color="rgba(212, 175, 55, 0.2)" text-color="#800000" class="font-weight-black mb-3 px-4 py-1" size="small">
                <v-icon start icon="mdi-bank" size="x-small"></v-icon>
                {{ pillar.budget }}
              </v-chip>
              <h3 class="text-h5 font-weight-black color-maroon mb-3 line-height-1_3">
                {{ pillar.title }}
              </h3>
              <p class="text-body-1 text-grey-darken-2 mb-6 flex-grow-1 line-height-1_6">
                {{ pillar.desc }}
              </p>
            </div>

            <div class="mt-auto pt-6 border-top-light">
              <div class="d-flex align-center justify-space-between mb-3">
                <span class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">
                  <v-icon icon="mdi-thumb-up" color="#D4AF37" size="small" class="mr-1"></v-icon>
                  {{ t("vision.pledgeTitle") || (isTamil ? 'மக்கள் ஆதரவு மீட்டர்' : 'Public Backing Meter') }}
                </span>
                <span class="text-subtitle-2 font-weight-black color-maroon">{{ Number(pillar.votes).toLocaleString('en-IN') }}</span>
              </div>
              <v-progress-linear :model-value="Math.min(100, (pillar.votes / 300000) * 100)" height="8" color="#800000" rounded class="mb-4 bg-grey-lighten-3"></v-progress-linear>

              <v-btn
                :color="supportedIds.includes(pillar.id) ? '#25D366' : '#800000'"
                block
                size="large"
                class="rounded-pill py-3 font-weight-bold text-white elevation-2 text-subtitle-1"
                :disabled="supportedIds.includes(pillar.id)"
                @click="supportPillar(pillar.id)"
              >
                <v-icon start :icon="supportedIds.includes(pillar.id) ? 'mdi-check-all' : 'mdi-hand-front-left'" size="small"></v-icon>
                {{ supportedIds.includes(pillar.id) ? (t('vision.supported') || (isTamil ? 'ஆதரவு அளித்தீர்கள்' : 'Endorsed Successfully!')) : (t('vision.btnSupport') || (isTamil ? 'இந்தத் திட்டத்தை நான் ஆதரிக்கிறேன்' : 'I Support This Policy')) }}
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Executive Action Footer Guarantee -->
      <v-card class="bg-maroon text-white rounded-2xl pa-10 mt-16 text-center border-gold-thick position-relative overflow-hidden elevation-12">
        <div class="bg-flag-wave opacity-15"></div>
        <div class="position-relative z-1 max-width-800 mx-auto">
          <v-avatar size="72" class="border-gold mb-4 elevation-6" color="white">
            <v-img :src="logo" alt="TVK"></v-img>
          </v-avatar>
          <h2 class="text-h4 font-weight-black color-gold mb-4">
            {{ isTamil ? 'சொன்னதைச் செய்வோம்! செய்வதைத் தான் சொல்வோம்!' : 'Absolute Commitment to Secular Social Justice & Transparent Governance' }}
          </h2>
          <p class="text-h6 font-weight-regular opacity-90 mb-8">
            {{ isTamil ? 'தமிழக மக்களின் ஒவ்வொரு ஓட்டும் ஊழலற்ற, சமத்துவமான, வலிமையான புதிய தமிழகத்தை உருவாக்கும் ஆயுதம்.' : 'Every vote cast for TVK is a powerful weapon to build an uncorrupted, egalitarian, and progressive Tamil Nadu.' }}
          </p>
          <v-btn
            color="#D4AF37"
            variant="flat"
            size="x-large"
            class="rounded-pill px-10 py-4 font-weight-black text-maroon text-h6 elevation-8"
            to="/volunteer"
          >
            <v-icon start icon="mdi-account-group" size="large"></v-icon>
            {{ isTamil ? 'களப்பணியில் இணையுங்கள்' : 'Join Our Grassroots Movement' }}
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import logo from "../../assets/tvk-logo.png";

export default {
  name: "VisionPortal",
  inject: ["t", "currentLang"],
  data: () => ({
    logo,
    supportedIds: [],
    localPillars: null,
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    currentPillars() {
      if (this.localPillars) return this.localPillars;
      const translated = this.t("vision.pillars");
      return Array.isArray(translated) ? translated : [
        {
          id: 1,
          title: "Two-Language Policy & State Autonomy",
          desc: "Tamil and English will continue as the sole official languages in Tamil Nadu. There will be absolutely no place for Hindi imposition by the Central Government. State autonomy will be resolutely protected.",
          budget: "₹1,500 Crore Allocation",
          votes: 142850
        },
        {
          id: 2,
          title: "NEET Abolition & Right to Education",
          desc: "To protect the medical aspirations of Tamil Nadu students, a special enactment will be passed in the State Assembly to permanently abolish the NEET examination.",
          budget: "₹5,000 Crore Special Fund",
          votes: 198420
        },
        {
          id: 3,
          title: "Women Welfare & 200 Units Free Electricity",
          desc: "200 units of free electricity for all households and ₹1,500 monthly basic income for all women heads of families without any restrictive eligibility conditions.",
          budget: "₹18,000 Crore Allocation",
          votes: 254100
        },
        {
          id: 4,
          title: "Special Task Force for Women & Child Safety",
          desc: "A dedicated 24/7 'Pink Task Force' and rapid response helpline will be set up within the police department to ensure absolute safety for women and children.",
          budget: "₹2,500 Crore Allocation",
          votes: 165400
        },
        {
          id: 5,
          title: "Green Tamil Nadu 2030 (1 Crore Trees)",
          desc: "A massive state-wide afforestation drive to plant 1 crore saplings over the next 4 years to combat climate change and raise forest cover to 33%.",
          budget: "₹1,200 Crore Allocation",
          votes: 112000
        },
        {
          id: 6,
          title: "Zero-Corruption Digital Governance",
          desc: "To completely eliminate bribery in government offices, 'e-Sevai 2.0' will be launched to deliver all certificates and public services directly to citizens' doorsteps.",
          budget: "₹3,000 Crore Allocation",
          votes: 189500
        }
      ];
    },
    totalVotes() {
      return this.currentPillars.reduce((acc, p) => acc + p.votes, 0);
    },
  },
  methods: {
    supportPillar(id) {
      if (!this.localPillars) {
        this.localPillars = JSON.parse(JSON.stringify(this.currentPillars));
      }
      const idx = this.localPillars.findIndex(p => p.id === id);
      if (idx !== -1) {
        this.localPillars[idx].votes += 1;
        this.supportedIds.push(id);
      }
    },
  },
  watch: {
    currentLang() {
      // Refresh local copy when language toggles to ensure translated text updates while keeping like count increments
      const translated = this.t("vision.pillars");
      if (Array.isArray(translated)) {
        if (this.localPillars) {
          this.localPillars.forEach((p, index) => {
            if (translated[index]) {
              p.title = translated[index].title;
              p.desc = translated[index].desc;
              p.budget = translated[index].budget;
            }
          });
        } else {
          this.localPillars = JSON.parse(JSON.stringify(translated));
        }
      }
    },
  },
  created() {
    this.localPillars = JSON.parse(JSON.stringify(this.currentPillars));
  },
};
</script>

<style scoped>
.vision-page {
  min-height: 100vh;
  background-color: #fcfcfc;
}

.bg-gradient-maroon {
  background: linear-gradient(135deg, #800000 0%, #4a0000 100%);
}

.border-gold {
  border: 2px solid #D4AF37 !important;
}

.border-gold-thin {
  border: 1px solid rgba(212, 175, 55, 0.3);
}

.border-gold-thick {
  border: 3px solid #D4AF37;
}

.color-gold {
  color: #D4AF37;
}

.color-maroon {
  color: #800000;
}

.bg-maroon {
  background-color: #800000;
}

.text-gold {
  color: #D4AF37;
}

.bg-gold-light {
  background-color: rgba(212, 175, 55, 0.15);
}

.bg-maroon-dark {
  background-color: rgba(0, 0, 0, 0.3);
}

.border-top-light {
  border-top: 1px solid #f0ecf4;
}

.pillar-number {
  position: absolute;
  top: -20px;
  right: 24px;
  width: 50px;
  height: 50px;
  font-size: 1.25rem;
  border: 2px solid #D4AF37;
}

.hover-scale {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.hover-scale:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(128, 0, 0, 0.12) !important;
  border-color: #D4AF37;
}

.line-height-1_3 {
  line-height: 1.3;
}

.line-height-1_6 {
  line-height: 1.6;
}
</style>
