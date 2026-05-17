<template>
  <v-container class="voice-container py-md-10 py-6" fluid>
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
              <v-icon start icon="mdi-account-voice" size="small"></v-icon>
              {{ t("voice.badge") }}
            </v-chip>
            <h1 class="text-h3 text-md-h2 font-weight-black text-white mb-4 shadow-text">
              {{ t("voice.title") }}
            </h1>
            <p class="text-subtitle-1 text-md-h6 font-weight-regular text-white opacity-90 max-width-800 mx-auto mb-0">
              {{ t("voice.subtitle") }}
            </p>
            <!-- Abstract background shapes -->
            <div class="bg-shape shape-1"></div>
            <div class="bg-shape shape-2"></div>
          </div>
        </v-card>

        <!-- Stats Counters Banner -->
        <v-row class="mb-8">
          <v-col cols="12" md="4">
            <v-card class="glass-card rounded-xl pa-6 text-center stat-card hover-lift border-gold-thin">
              <div class="stat-icon-wrapper mx-auto mb-3 bg-maroon-light">
                <v-icon color="#800000" size="36">mdi-lightbulb-on-outline</v-icon>
              </div>
              <div class="text-h3 font-weight-black color-maroon mb-1">{{ ideasCount }}</div>
              <div class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ t("voice.statIdeas") }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="glass-card rounded-xl pa-6 text-center stat-card hover-lift border-gold-thin">
              <div class="stat-icon-wrapper mx-auto mb-3 bg-gold-light">
                <v-icon color="#D4AF37" size="36">mdi-check-decagram-outline</v-icon>
              </div>
              <div class="text-h3 font-weight-black color-gold mb-1">{{ resolvedCount }}</div>
              <div class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ t("voice.statResolved") }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="glass-card rounded-xl pa-6 text-center stat-card hover-lift border-gold-thin">
              <div class="stat-icon-wrapper mx-auto mb-3 bg-maroon-light">
                <v-icon color="#800000" size="36">mdi-clock-fast</v-icon>
              </div>
              <div class="text-h3 font-weight-black color-maroon mb-1">{{ activeCount }}</div>
              <div class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ t("voice.statActive") }}</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Main Form & Tab Navigation -->
        <v-card class="glass-card rounded-xl elevation-5 overflow-hidden border-gold-thin">
          <v-tabs
            v-model="activeTab"
            bg-color="#800000"
            color="#D4AF37"
            slider-color="#D4AF37"
            align-tabs="center"
            height="64"
            class="elevation-3 font-weight-bold"
          >
            <v-tab value="ideas" class="text-h6 text-none px-md-8">
              <v-icon start icon="mdi-lightbulb-on" class="mr-2"></v-icon>
              {{ t("voice.tabIdeas") }}
            </v-tab>
            <v-tab value="complaints" class="text-h6 text-none px-md-8">
              <v-icon start icon="mdi-file-document-alert" class="mr-2"></v-icon>
              {{ t("voice.tabComplaints") }}
            </v-tab>
          </v-tabs>

          <v-card-text class="pa-md-10 pa-6">
            <v-window v-model="activeTab">
              <!-- IDEAS TAB -->
              <v-window-item value="ideas">
                <div class="text-center mb-8">
                  <p class="text-h6 font-weight-regular text-grey-darken-2">
                    {{ t("voice.ideasDesc") }}
                  </p>
                  <div class="title-divider mx-auto bg-gold mb-6"></div>
                </div>

                <v-form ref="ideaForm" v-model="validIdea" @submit.prevent="submitIdea">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataIdea.name"
                        :label="t('voice.formName')"
                        prepend-inner-icon="mdi-account"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataIdea.phone"
                        :label="t('voice.formPhone')"
                        prepend-inner-icon="mdi-phone"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required', v => /^\d{10}$/.test(v) || 'Enter valid 10-digit number']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataIdea.district"
                        :label="t('voice.formDist')"
                        prepend-inner-icon="mdi-map-marker"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="formDataIdea.category"
                        :items="ideaCategories"
                        :label="t('voice.formCategoryIdea')"
                        prepend-inner-icon="mdi-shape"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="formDataIdea.description"
                        :label="t('voice.formDesc')"
                        prepend-inner-icon="mdi-message-text"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        rows="5"
                        :rules="[v => !!v || 'Required', v => v.length >= 20 || 'Minimum 20 characters required']"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="formDataIdea.attachment"
                        :label="t('voice.formAttach')"
                        prepend-icon=""
                        prepend-inner-icon="mdi-cloud-upload"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        show-size
                      ></v-file-input>
                    </v-col>
                  </v-row>

                  <div class="text-center mt-8">
                    <v-btn
                      type="submit"
                      color="#800000"
                      size="x-large"
                      class="rounded-pill px-12 py-4 font-weight-bold text-white elevation-4 text-h6"
                      :loading="submitting"
                    >
                      <v-icon start icon="mdi-send-circle" size="large"></v-icon>
                      {{ t("voice.btnSubmitIdea") }}
                    </v-btn>
                  </div>
                </v-form>
              </v-window-item>

              <!-- COMPLAINTS / GRIEVANCE TAB -->
              <v-window-item value="complaints">
                <div class="text-center mb-8">
                  <p class="text-h6 font-weight-regular text-grey-darken-2">
                    {{ t("voice.complaintsDesc") }}
                  </p>
                  <div class="title-divider mx-auto bg-gold mb-6"></div>
                </div>

                <v-form ref="complaintForm" v-model="validComplaint" @submit.prevent="submitComplaint">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataComplaint.name"
                        :label="t('voice.formName')"
                        prepend-inner-icon="mdi-account"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formDataComplaint.phone"
                        :label="t('voice.formPhone')"
                        prepend-inner-icon="mdi-phone"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required', v => /^\d{10}$/.test(v) || 'Enter valid 10-digit number']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="formDataComplaint.district"
                        :label="t('voice.formDist')"
                        prepend-inner-icon="mdi-map-marker"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        v-model="formDataComplaint.category"
                        :items="complaintCategories"
                        :label="t('voice.formCategory')"
                        prepend-inner-icon="mdi-alert-octagon"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        v-model="formDataComplaint.priority"
                        :items="priorityLevels"
                        :label="t('voice.formPriority')"
                        prepend-inner-icon="mdi-flag-triangle"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="formDataComplaint.description"
                        :label="t('voice.formDesc')"
                        prepend-inner-icon="mdi-message-alert"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        rows="5"
                        :rules="[v => !!v || 'Required', v => v.length >= 20 || 'Minimum 20 characters required']"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="formDataComplaint.attachment"
                        :label="t('voice.formAttach')"
                        prepend-icon=""
                        prepend-inner-icon="mdi-camera-plus"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        show-size
                      ></v-file-input>
                    </v-col>
                  </v-row>

                  <div class="text-center mt-8">
                    <v-btn
                      type="submit"
                      color="#800000"
                      size="x-large"
                      class="rounded-pill px-12 py-4 font-weight-bold text-white elevation-4 text-h6"
                      :loading="submitting"
                    >
                      <v-icon start icon="mdi-shield-check" size="large"></v-icon>
                      {{ t("voice.btnSubmitComplaint") }}
                    </v-btn>
                  </div>
                </v-form>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>

        <!-- Success Dialog -->
        <v-dialog v-model="successDialog" max-width="600" persistent>
          <v-card class="rounded-xl pa-8 text-center border-gold-thick">
            <div class="mx-auto mb-6 bg-gold-light pa-6 rounded-circle d-inline-block">
              <v-icon color="#D4AF37" size="64">mdi-check-decagram</v-icon>
            </div>
            <h2 class="text-h4 font-weight-black color-maroon mb-4">
              {{ t("voice.successTitle") }}
            </h2>
            <p class="text-h6 font-weight-regular text-grey-darken-2 mb-6">
              {{ activeTab === 'ideas' ? t("voice.successIdea") : t("voice.successComplaint") }}
            </p>
            <v-card class="bg-grey-lighten-4 py-4 px-6 rounded-lg mb-8 border-gold-thin">
              <div class="text-caption text-grey-darken-1 font-weight-bold text-uppercase mb-1">
                {{ t("voice.trackingId") }}
              </div>
              <div class="text-h4 font-weight-black color-maroon tracking-box">
                {{ trackingReference }}
              </div>
            </v-card>
            <div class="d-flex justify-center gap-4">
              <v-btn
                color="#800000"
                size="large"
                class="rounded-pill px-8 font-weight-bold text-white"
                @click="closeSuccess"
              >
                {{ t("voice.btnClose") }}
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { apiService } from "../../services/api";

export default {
  name: "VoicePortal",
  inject: ["t", "currentLang"],
  data: () => ({
    activeTab: "ideas",
    validIdea: false,
    validComplaint: false,
    submitting: false,
    successDialog: false,
    trackingReference: "",
    formDataIdea: {
      name: "",
      phone: "",
      district: "",
      category: null,
      description: "",
      attachment: null,
    },
    formDataComplaint: {
      name: "",
      phone: "",
      district: "",
      category: null,
      priority: null,
      description: "",
      attachment: null,
    },
    ideasCount: 14285,
    resolvedCount: 9840,
    activeCount: 1240,
  }),
  async created() {
    const stats = await apiService.getStats();
    if (stats && stats.ideasCount) {
      this.ideasCount = stats.ideasCount;
      this.resolvedCount = stats.resolvedCount;
      this.activeCount = stats.activeCount;
    }
  },
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    ideaCategories() {
      const items = this.t("voice.categoriesIdea");
      return Array.isArray(items) ? items : [
        "தொழில்நுட்பம் மற்றும் டிஜிட்டல் அரசு / Technology & Digital",
        "சுற்றுச்சூழல் மற்றும் பசுமை தமிழகம் / Environment & Green TN",
        "பள்ளிக் கல்வி மற்றும் உயர்கல்வி / Education",
        "விவசாயம் மற்றும் நீர்ப்பாசனம் / Agriculture",
        "பொருளாதாரம் மற்றும் தொழில் வளர்ச்சி / Economy & Industry",
        "கிராமப்புற மேம்பாடு / Rural Development"
      ];
    },
    complaintCategories() {
      const items = this.t("voice.categoriesComplaint");
      return Array.isArray(items) ? items : [
        "சாலை மற்றும் போக்குவரத்து / Roads & Transport",
        "மின்சாரம் மற்றும் தெருவிளக்கு / Electricity",
        "குடிநீர் மற்றும் சுகாதாரம் / Drinking Water",
        "லஞ்ச ஒழிப்பு / Anti-Corruption",
        "பெண்கள் மற்றும் குழந்தைகள் பாதுகாப்பு / Women & Child Safety",
        "வேலைவாய்ப்பு / Youth & Employment",
        "இதர குறைகள் / Others"
      ];
    },
    priorityLevels() {
      const items = this.t("voice.priorities");
      return Array.isArray(items) ? items : [
        "சாதாரண / Normal",
        "அவசரம் / High Priority",
        "மிக அவசரம் / Urgent"
      ];
    },
  },
  methods: {
    async submitIdea() {
      const { valid } = await this.$refs.ideaForm.validate();
      if (!valid) return;

      this.submitting = true;
      const res = await apiService.submitIdea(this.formDataIdea);
      this.trackingReference = res.trackingId || `TVK-2026-ID-${Math.floor(100000 + Math.random() * 900000)}`;
      this.ideasCount++;
      this.submitting = false;
      this.successDialog = true;
    },
    async submitComplaint() {
      const { valid } = await this.$refs.complaintForm.validate();
      if (!valid) return;

      this.submitting = true;
      const res = await apiService.submitGrievance(this.formDataComplaint);
      this.trackingReference = res.trackingId || `TVK-2026-GR-${Math.floor(100000 + Math.random() * 900000)}`;
      this.activeCount++;
      this.submitting = false;
      this.successDialog = true;
    },
    closeSuccess() {
      this.successDialog = false;
      if (this.activeTab === 'ideas') {
        this.$refs.ideaForm.reset();
      } else {
        this.$refs.complaintForm.reset();
      }
    },
  },
};
</script>

<style scoped>
.voice-container {
  min-height: 100vh;
  background-color: #f8fafc;
  background-image:
    radial-gradient(at 0% 0%, hsla(0, 100%, 25%, 0.04) 0px, transparent 50%),
    radial-gradient(at 100% 100%, hsla(46, 65%, 52%, 0.06) 0px, transparent 50%);
  position: relative;
}

/* Colors & Typography */
.color-maroon {
  color: #800000;
}
.color-gold {
  color: #d4af37;
}

/* Hero Section */
.hero-card {
  background-color: #800000;
  border: 2px solid #d4af37;
}

.hero-gradient {
  background: linear-gradient(135deg, #600000 0%, #800000 50%, #900000 100%);
  overflow: hidden;
}

.border-gold-thin {
  border: 1px solid rgba(212, 175, 55, 0.4);
}
.border-gold-thick {
  border: 3px solid #d4af37;
}

.shadow-text {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Abstract shapes */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 1;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: rgba(212, 175, 55, 0.3);
  top: -100px;
  right: -50px;
}

.shape-2 {
  width: 350px;
  height: 350px;
  background: rgba(0, 0, 0, 0.25);
  bottom: -150px;
  left: -100px;
}

/* Glassmorphism Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 35px 0 rgba(128, 0, 0, 0.06) !important;
}

/* Stat Cards */
.stat-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 45px rgba(128, 0, 0, 0.1) !important;
  border-color: #d4af37;
}

.stat-icon-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-maroon-light {
  background: rgba(128, 0, 0, 0.08);
}
.bg-gold-light {
  background: rgba(212, 175, 55, 0.15);
}

.title-divider {
  width: 80px;
  height: 4px;
  border-radius: 2px;
}
.bg-gold {
  background-color: #d4af37;
}

.tracking-box {
  letter-spacing: 2px;
  word-break: break-all;
}
</style>
