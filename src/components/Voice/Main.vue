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
            <v-tab value="community" class="text-h6 text-none px-md-8">
              <v-icon start icon="mdi-account-group" class="mr-2"></v-icon>
              {{ t("voice.tabCommunity") || (isTamil ? 'மக்கள் குரல் கருத்துக்கள்' : 'Community Ideas') }}
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
                    <v-col cols="12">
                      <v-text-field
                        v-model="formDataIdea.title"
                        :label="isTamil ? 'திட்டத்தின் தலைப்பு / சுருக்கம்' : 'Idea Title / Headline'"
                        prepend-inner-icon="mdi-format-title"
                        variant="outlined"
                        color="#800000"
                        bg-color="white"
                        rounded="lg"
                        :rules="[v => !!v || 'Required']"
                      ></v-text-field>
                    </v-col>
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

              <!-- COMMUNITY IDEAS FEED TAB -->
              <v-window-item value="community">
                <div class="text-center mb-8">
                  <h2 class="text-h4 font-weight-black color-maroon mb-2">
                    {{ t("voice.communityTitle") || (isTamil ? 'பொதுமக்கள் பரிந்துரைத்த திட்டங்கள்' : 'Citizen Suggested Governance Ideas') }}
                  </h2>
                  <p class="text-subtitle-1 text-grey-darken-2 max-width-700 mx-auto">
                    {{ t("voice.communitySubtitle") || (isTamil ? 'தமிழக மக்கள் சமர்ப்பித்துள்ள சிறந்த யோசனைகளை ஆதரியுங்கள் (Upvote).' : 'Browse and upvote innovative policy ideas submitted by fellow citizens across Tamil Nadu.') }}
                  </p>
                  <div class="title-divider mx-auto bg-gold mb-8"></div>
                </div>

                <v-row justify="center" class="mb-8">
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="searchIdeas"
                      :placeholder="t('voice.searchPlaceholder') || (isTamil ? 'யோசனைகளைத் தேடுங்கள்...' : 'Search suggested ideas...')"
                      prepend-inner-icon="mdi-magnify"
                      variant="outlined"
                      color="#800000"
                      bg-color="white"
                      rounded="pill"
                      hide-details
                      clearable
                      class="elevation-2"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div v-if="loadingIdeas" class="text-center py-12">
                  <v-progress-circular indeterminate color="#800000" size="64"></v-progress-circular>
                </div>

                <v-row v-else>
                  <v-col cols="12" md="6" v-for="idea in filteredIdeas" :key="idea.id">
                    <v-card class="rounded-xl pa-6 h-100 d-flex flex-column hover-lift border-gold-thin position-relative overflow-hidden elevation-3" bg-color="white">
                      <div class="d-flex align-items-center justify-space-between mb-3">
                        <v-chip color="rgba(128, 0, 0, 0.1)" text-color="#800000" class="font-weight-bold" size="small">
                          <v-icon start icon="mdi-shape" size="x-small"></v-icon>
                          {{ idea.category ? idea.category.split('/')[0] : 'General' }}
                        </v-chip>
                        <span class="text-caption text-grey font-weight-medium">
                          <v-icon icon="mdi-calendar-clock" size="x-small" class="mr-1"></v-icon>
                          {{ formatDate(idea.timestamp) }}
                        </span>
                      </div>

                      <h3 class="text-h6 font-weight-bold color-maroon mb-2">
                        {{ idea.title || idea.description.substring(0, 60) + '...' }}
                      </h3>

                      <p class="text-body-1 text-grey-darken-2 mb-6 flex-grow-1">
                        {{ idea.description }}
                      </p>

                      <div class="d-flex align-items-center justify-space-between pt-4 mt-auto" style="border-top: 1px solid #eee;">
                        <div class="d-flex align-items-center">
                          <v-avatar size="36" color="#800000" class="text-white text-caption font-weight-bold mr-2 elevation-1">
                            {{ idea.name ? idea.name.charAt(0).toUpperCase() : 'C' }}
                          </v-avatar>
                          <div>
                            <div class="text-subtitle-2 font-weight-bold text-grey-darken-3 mb-0">{{ idea.name || 'Citizen' }}</div>
                            <div class="text-caption text-grey mt-n1">{{ idea.district || 'Tamil Nadu' }}</div>
                          </div>
                        </div>

                        <v-btn
                          :color="upvotedIdeas.includes(idea.id) ? '#D4AF37' : '#800000'"
                          :variant="upvotedIdeas.includes(idea.id) ? 'flat' : 'elevated'"
                          class="rounded-pill px-6 py-2 font-weight-bold text-white text-subtitle-2 elevation-2"
                          :loading="upvotingId === idea.id"
                          :disabled="upvotedIdeas.includes(idea.id)"
                          @click="upvoteIdea(idea.id)"
                        >
                          <v-icon start :icon="upvotedIdeas.includes(idea.id) ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'" size="small"></v-icon>
                          {{ idea.likes || 0 }} {{ upvotedIdeas.includes(idea.id) ? (t('voice.upvoted') || (isTamil ? 'ஆதரித்தீர்கள்' : 'Upvoted')) : (t('voice.btnUpvote') || (isTamil ? 'ஆதரி (Upvote)' : 'Upvote')) }}
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
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
    searchIdeas: "",
    communityIdeas: [],
    loadingIdeas: false,
    upvotingId: null,
    upvotedIdeas: [],
    formDataIdea: {
      title: "",
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
    this.fetchIdeasFeed();
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
    filteredIdeas() {
      if (!this.searchIdeas) return this.communityIdeas;
      const s = this.searchIdeas.toLowerCase();
      return this.communityIdeas.filter(i =>
        (i.title && i.title.toLowerCase().includes(s)) ||
        (i.description && i.description.toLowerCase().includes(s)) ||
        (i.category && i.category.toLowerCase().includes(s)) ||
        (i.district && i.district.toLowerCase().includes(s)) ||
        (i.name && i.name.toLowerCase().includes(s))
      );
    },
  },
  methods: {
    async fetchIdeasFeed() {
      this.loadingIdeas = true;
      try {
        const res = await apiService.getVoiceIdeasFeed();
        if (res && res.data && Array.isArray(res.data)) {
          this.communityIdeas = res.data;
        }
      } catch (e) {} finally {
        this.loadingIdeas = false;
      }
    },
    async upvoteIdea(id) {
      this.upvotingId = id;
      try {
        const res = await apiService.upvoteIdea(id);
        if (res && res.data) {
          const idx = this.communityIdeas.findIndex(i => i.id === id);
          if (idx !== -1) {
            this.communityIdeas[idx].likes = res.data.likes;
          }
          this.upvotedIdeas.push(id);
        }
      } catch (e) {} finally {
        this.upvotingId = null;
      }
    },
    formatDate(d) {
      if (!d) return "";
      const date = new Date(d);
      return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    },
    async submitIdea() {
      const { valid } = await this.$refs.ideaForm.validate();
      if (!valid) return;

      this.submitting = true;
      const res = await apiService.submitIdea(this.formDataIdea);
      this.trackingReference = res.trackingId || `TVK-2026-ID-${Math.floor(100000 + Math.random() * 900000)}`;
      this.ideasCount++;

      // Instantly add to community feed at top
      const newIdea = {
        id: this.trackingReference,
        title: this.formDataIdea.title || this.formDataIdea.description.substring(0, 50) + "...",
        category: this.formDataIdea.category,
        description: this.formDataIdea.description,
        name: this.formDataIdea.name,
        district: this.formDataIdea.district,
        timestamp: new Date().toISOString(),
        likes: 1,
      };
      this.communityIdeas.unshift(newIdea);

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
      if (this.activeTab === "ideas") {
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
