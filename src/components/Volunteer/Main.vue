<template>
  <v-container class="volunteer-container py-md-10 py-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Premium Header Banner -->
        <v-card class="hero-card rounded-xl overflow-hidden elevation-10 mb-8 border-gold" dark>
          <div class="hero-gradient pa-8 pa-md-12 text-center position-relative">
            <v-chip
              color="rgba(212, 175, 55, 0.2)"
              text-color="#D4AF37"
              class="mb-4 font-weight-bold"
              variant="flat"
            >
              <v-icon start icon="mdi-shield-crown" size="small"></v-icon>
              {{ t("volunteer.badge") }}
            </v-chip>
            <h1 class="text-h3 text-md-h2 font-weight-black text-white mb-4 shadow-text">
              {{ t("volunteer.title") }}
            </h1>
            <p class="text-subtitle-1 text-md-h6 font-weight-regular text-white opacity-90 max-width-800 mx-auto mb-0 lh-relaxed">
              {{ t("volunteer.subtitle") }}
            </p>
            <div class="bg-shape shape-1"></div>
            <div class="bg-shape shape-2"></div>
          </div>
        </v-card>

        <!-- Main Registration Form -->
        <v-card class="glass-card rounded-xl pa-md-10 pa-6 elevation-5 border-gold-thin mb-8">
          <v-form ref="form" v-model="valid" @submit.prevent="submitVolunteer">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.name"
                  :label="t('volunteer.formName')"
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
                  v-model="formData.phone"
                  :label="t('volunteer.formPhone')"
                  prepend-inner-icon="mdi-whatsapp"
                  variant="outlined"
                  color="#800000"
                  bg-color="white"
                  rounded="lg"
                  :rules="[v => !!v || 'Required', v => /^\d{10}$/.test(v) || 'Enter valid 10-digit number']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.age"
                  :label="t('volunteer.formAge')"
                  type="number"
                  prepend-inner-icon="mdi-calendar-range"
                  variant="outlined"
                  color="#800000"
                  bg-color="white"
                  rounded="lg"
                  :rules="[v => !!v || 'Required', v => (v >= 18 && v <= 100) || 'Must be 18 or older']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.gender"
                  :items="genderList"
                  :label="t('volunteer.formGender')"
                  prepend-inner-icon="mdi-gender-male-female"
                  variant="outlined"
                  color="#800000"
                  bg-color="white"
                  rounded="lg"
                  :rules="[v => !!v || 'Required']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.district"
                  :label="t('volunteer.formDist')"
                  prepend-inner-icon="mdi-map-marker"
                  variant="outlined"
                  color="#800000"
                  bg-color="white"
                  rounded="lg"
                  :rules="[v => !!v || 'Required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.booth"
                  :label="t('volunteer.formBooth')"
                  prepend-inner-icon="mdi-home-group"
                  variant="outlined"
                  color="#800000"
                  bg-color="white"
                  rounded="lg"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="formData.skills"
                  :items="skillsList"
                  :label="t('volunteer.formSkill')"
                  prepend-inner-icon="mdi-star-circle"
                  variant="outlined"
                  color="#800000"
                  bg-color="white"
                  rounded="lg"
                  multiple
                  chips
                  :rules="[v => v.length > 0 || 'Select at least one skill']"
                ></v-select>
              </v-col>
              <v-col cols="12" class="py-4">
                <v-card class="bg-maroon-light pa-6 rounded-xl border-gold-thin">
                  <v-checkbox
                    v-model="formData.pledge"
                    color="#800000"
                    hide-details
                  >
                    <template v-slot:label>
                      <span class="font-weight-bold color-maroon text-body-1 ml-2">
                        {{ t("volunteer.pledge") }}
                      </span>
                    </template>
                  </v-checkbox>
                </v-card>
              </v-col>
            </v-row>

            <div class="text-center mt-8">
              <v-btn
                type="submit"
                color="#800000"
                size="x-large"
                class="rounded-pill px-12 py-4 font-weight-bold text-white elevation-4 text-h6"
                :disabled="!formData.pledge"
                :loading="submitting"
              >
                <v-icon start icon="mdi-hand-heart" size="large"></v-icon>
                {{ t("volunteer.btnRegister") }}
              </v-btn>
            </div>
          </v-form>
        </v-card>

        <!-- Success Dialog & Rank Badge -->
        <v-dialog v-model="successDialog" max-width="550" persistent>
          <v-card class="rounded-xl pa-8 text-center border-gold-thick">
            <div class="mx-auto mb-6 bg-gold-light pa-6 rounded-circle d-inline-block">
              <v-icon color="#D4AF37" size="64">mdi-shield-crown</v-icon>
            </div>
            <h2 class="text-h4 font-weight-black color-maroon mb-2">
              {{ t("volunteer.successTitle") }}
            </h2>
            <p class="text-body-1 font-weight-regular text-grey-darken-2 mb-6 px-4">
              {{ t("volunteer.successDesc") }}
            </p>
            <v-card class="bg-grey-lighten-4 py-6 px-8 rounded-2xl mb-8 border-gold-thin shadow-inner">
              <div class="text-caption text-grey-darken-1 font-weight-bold text-uppercase mb-2">
                {{ t("volunteer.rankBadge") }}
              </div>
              <div class="text-h3 font-weight-black color-maroon tracking-box">
                {{ memberId }}
              </div>
            </v-card>
            <div class="d-flex justify-center">
              <v-btn
                color="#800000"
                size="large"
                class="rounded-pill px-10 font-weight-bold text-white text-h6"
                @click="closeSuccess"
              >
                {{ t("volunteer.btnClose") }}
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
  name: "VolunteerPortal",
  inject: ["t", "currentLang"],
  data: () => ({
    valid: false,
    submitting: false,
    successDialog: false,
    memberId: "",
    formData: {
      name: "",
      phone: "",
      age: null,
      gender: null,
      district: "",
      booth: "",
      skills: [],
      pledge: false,
    },
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    skillsList() {
      const items = this.t("volunteer.skills");
      return Array.isArray(items) ? items : [
        "சமூக வலைத்தளப் பிரச்சாரம் / Social Media",
        "பூத் கமிட்டி மேலாண்மை / Booth Management",
        "களப்பணி மற்றும் நிகழ்வு ஏற்பாடு / Event Organizer",
        "மாணவர் மற்றும் இளைஞர் அணி / Youth Wing",
        "மகளிர் மேம்பாட்டுப் பணி / Women Empowerment",
        "சட்ட உதவி மற்றும் ஆலோசனை / Legal Aid"
      ];
    },
    genderList() {
      const items = this.t("volunteer.genders");
      return Array.isArray(items) ? items : [
        "ஆண் / Male",
        "பெண் / Female",
        "மூன்றாம் பாலினத்தவர் / Transgender"
      ];
    },
  },
  methods: {
    async submitVolunteer() {
      const { valid } = await this.$refs.form.validate();
      if (!valid || !this.formData.pledge) return;

      this.submitting = true;
      const res = await apiService.registerVolunteer(this.formData);
      this.memberId = res.memberId || `TVK-VOL-${Math.floor(1000000 + Math.random() * 9000000)}`;
      this.submitting = false;
      this.successDialog = true;
    },
    closeSuccess() {
      this.successDialog = false;
      this.$refs.form.reset();
      this.formData.pledge = false;
    },
  },
};
</script>

<style scoped>
.volunteer-container {
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
.border-gold-thick { border: 3px solid #d4af37; }

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

.bg-maroon-light { background: rgba(128, 0, 0, 0.06); }
.bg-gold-light { background: rgba(212, 175, 55, 0.15); }

.shadow-inner { box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.06); }
.tracking-box { letter-spacing: 2px; }
.lh-relaxed { line-height: 1.6; }
</style>
