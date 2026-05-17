<template>
  <v-container fluid class="pa-0 voter-slip-page">
    <!-- Premium Header Banner -->
    <div class="banner-wrapper position-relative overflow-hidden bg-gradient-maroon text-white py-12 px-6">
      <div class="bg-flag-wave opacity-20"></div>
      <v-container class="position-relative z-1 text-center" max-width="900">
        <v-avatar size="84" class="elevation-8 border-gold mb-4 glow-avatar" color="white">
          <v-img :src="logo" alt="தமிழக வெற்றிக் கழகம்"></v-img>
        </v-avatar>
        <h1 class="text-h3 font-weight-black color-gold mb-2 text-wrap">
          {{ t("voterSlip.title") || (isTamil ? 'டிஜிட்டல் வாக்காளர் பூத் சீட்டு' : 'Digital Voter Booth Slip') }}
        </h1>
        <p class="text-h6 font-weight-regular opacity-90 max-width-700 mx-auto">
          {{ t("voterSlip.subtitle") || (isTamil ? 'உங்கள் வாக்காளர் அடையாள அட்டை எண் அல்லது பெயர் மூலம் உங்கள் வாக்குச்சாவடி விவரங்களை அறிந்துகொள்ளுங்கள்.' : 'Instantly check your polling booth details and serial number using your EPIC Voter ID number.') }}
        </p>
      </v-container>
    </div>

    <v-container max-width="1000" class="py-10 px-4">
      <v-card class="glass-card rounded-2xl elevation-10 overflow-hidden border-gold-thin pa-8 mb-10" bg-color="white">
        <v-tabs
          v-model="searchType"
          bg-color="#800000"
          color="#D4AF37"
          slider-color="#D4AF37"
          align-tabs="center"
          height="56"
          class="elevation-2 mb-8 rounded-lg overflow-hidden font-weight-bold"
        >
          <v-tab value="epic" class="text-subtitle-1 text-none px-8">
            <v-icon start icon="mdi-card-account-details" class="mr-2"></v-icon>
            {{ isTamil ? 'EPIC எண் மூலம் தேட' : 'Search by EPIC No' }}
          </v-tab>
          <v-tab value="name" class="text-subtitle-1 text-none px-8">
            <v-icon start icon="mdi-account-search" class="mr-2"></v-icon>
            {{ isTamil ? 'பெயர் மூலம் தேட' : 'Search by Name' }}
          </v-tab>
        </v-tabs>

        <v-form ref="slipForm" v-model="valid" @submit.prevent="generateSlip">
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="formData.constituency"
                :items="constituencyList"
                item-title="titleDisplay"
                item-value="value"
                :label="isTamil ? 'சட்டமன்றத் தொகுதி' : 'Assembly Constituency'"
                prepend-inner-icon="mdi-map-marker-radius"
                variant="outlined"
                color="#800000"
                bg-color="#fcfcfc"
                rounded="lg"
                :rules="[v => !!v || 'Required']"
                auto-select-first
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6" v-if="searchType === 'epic'">
              <v-text-field
                v-model="formData.epicNo"
                :label="t('voterSlip.epicLabel') || (isTamil ? 'வாக்காளர் அடையாள அட்டை எண்' : 'Voter ID No (EPIC)')"
                prepend-inner-icon="mdi-badge-account-horizontal"
                placeholder="TN/26/155/012345"
                variant="outlined"
                color="#800000"
                bg-color="#fcfcfc"
                rounded="lg"
                :rules="[v => !!v || 'Required', v => v.length >= 6 || 'Enter valid EPIC number']"
                class="text-uppercase"
              ></v-text-field>
            </v-col>

            <template v-else>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.name"
                  :label="t('voterSlip.nameLabel') || (isTamil ? 'வாக்காளர் முழு பெயர்' : 'Voter Full Name')"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  color="#800000"
                  bg-color="#fcfcfc"
                  rounded="lg"
                  :rules="[v => !!v || 'Required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model="formData.age"
                  :label="t('voterSlip.ageLabel') || (isTamil ? 'வயது' : 'Age')"
                  type="number"
                  prepend-inner-icon="mdi-calendar-range"
                  variant="outlined"
                  color="#800000"
                  bg-color="#fcfcfc"
                  rounded="lg"
                  :rules="[v => !!v || 'Required', v => (v >= 18 && v <= 120) || 'Age must be 18+']"
                ></v-text-field>
              </v-col>
            </template>
          </v-row>

          <div class="text-center mt-6">
            <v-btn
              type="submit"
              color="#800000"
              size="x-large"
              class="rounded-pill px-12 py-4 font-weight-bold text-white elevation-4 text-h6"
              :loading="loading"
            >
              <v-icon start icon="mdi-file-find-outline" size="large"></v-icon>
              {{ t("voterSlip.btnSearch") || (isTamil ? 'பூத் சீட்டு உருவாக்கு' : 'Generate Booth Slip') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>

      <!-- Generated Booth Slip Container (Printable Area) -->
      <v-expand-transition>
        <div v-if="generatedSlip" class="slip-output-section" id="printable-booth-slip">
          <v-card class="booth-slip-card mx-auto rounded-2xl overflow-hidden elevation-12 border-gold-thick position-relative bg-white" max-width="800">
            <!-- Slip Header -->
            <div class="bg-gradient-maroon text-white pa-6 d-flex align-center justify-space-between border-gold-bottom">
              <div class="d-flex align-center">
                <v-avatar size="56" class="border-gold mr-4 elevation-4" color="white">
                  <v-img :src="logo" alt="TVK Logo"></v-img>
                </v-avatar>
                <div>
                  <h3 class="text-h6 font-weight-black color-gold mb-0">{{ isTamil ? 'தமிழக வெற்றிக் கழகம்' : 'Tamilaga Vettri Kazhagam' }}</h3>
                  <div class="text-subtitle-2 opacity-90">{{ t("voterSlip.slipHeader") || (isTamil ? 'தமிழக சட்டமன்றத் தேர்தல் 2026 - அதிகாரப்பூர்வ பூத் சீட்டு' : 'Assembly Election 2026 - Official Booth Slip') }}</div>
                </div>
              </div>
              <div class="text-right d-none d-sm-block">
                <v-chip color="#D4AF37" variant="flat" text-color="#800000" class="font-weight-black text-body-2 px-4 elevation-2">
                  <v-icon start icon="mdi-check-decagram"></v-icon>
                  VERIFIED VOTER
                </v-chip>
              </div>
            </div>

            <!-- Slip Content -->
            <div class="pa-8">
              <v-row class="mb-6">
                <v-col cols="12" sm="8" class="border-right-sm">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 font-weight-bold text-uppercase mb-1">
                      {{ t("voterSlip.nameLabel") || (isTamil ? 'வாக்காளர் பெயர்' : 'Voter Name') }}
                    </div>
                    <div class="text-h5 font-weight-black color-maroon text-uppercase">
                      {{ generatedSlip.name }}
                    </div>
                  </div>

                  <v-row class="mb-4">
                    <v-col cols="6">
                      <div class="text-caption text-grey-darken-1 font-weight-bold text-uppercase mb-1">
                        {{ t("voterSlip.epicLabel") || (isTamil ? 'EPIC எண்' : 'EPIC No') }}
                      </div>
                      <div class="text-h6 font-weight-bold color-grey-darken-3 text-uppercase">
                        {{ generatedSlip.epicNo }}
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="text-caption text-grey-darken-1 font-weight-bold text-uppercase mb-1">
                        {{ isTamil ? 'வயது / பாலினம்' : 'Age / Gender' }}
                      </div>
                      <div class="text-h6 font-weight-bold color-grey-darken-3">
                        {{ generatedSlip.age }} Yrs | {{ generatedSlip.gender || 'M/F' }}
                      </div>
                    </v-col>
                  </v-row>

                  <div class="mb-4 pa-4 bg-grey-lighten-4 rounded-xl border-gold-thin">
                    <div class="text-caption text-grey-darken-2 font-weight-bold text-uppercase mb-1">
                      {{ t("voterSlip.boothNo") || (isTamil ? 'வாக்குச்சாவடி எண் & பெயர்' : 'Polling Station & Room') }}
                    </div>
                    <div class="text-h6 font-weight-black color-maroon mb-1">
                      {{ generatedSlip.boothNo }} - {{ generatedSlip.boothName }}
                    </div>
                    <div class="text-body-2 text-grey-darken-2 font-weight-medium">
                      {{ generatedSlip.location }}
                    </div>
                  </div>

                  <v-row>
                    <v-col cols="6" sm="4">
                      <v-card class="bg-maroon-light pa-3 rounded-lg text-center border-gold-thin">
                        <div class="text-caption color-maroon font-weight-bold mb-1">{{ t("voterSlip.partNo") || (isTamil ? 'பாகம் எண்' : 'Part No') }}</div>
                        <div class="text-h5 font-weight-black color-maroon">{{ generatedSlip.partNo }}</div>
                      </v-card>
                    </v-col>
                    <v-col cols="6" sm="4">
                      <v-card class="bg-maroon-light pa-3 rounded-lg text-center border-gold-thin">
                        <div class="text-caption color-maroon font-weight-bold mb-1">{{ t("voterSlip.serialNo") || (isTamil ? 'வரிசை எண்' : 'Serial No') }}</div>
                        <div class="text-h5 font-weight-black color-maroon">{{ generatedSlip.serialNo }}</div>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-card class="bg-gold-light pa-3 rounded-lg text-center border-gold-thin">
                        <div class="text-caption color-gold-dark font-weight-bold mb-1">{{ isTamil ? 'வாக்குச்சாவடி அறை' : 'Room No' }}</div>
                        <div class="text-h5 font-weight-black color-gold-dark">0{{ Math.floor(Math.random() * 5) + 1 }}</div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- QR Code & Agent Info -->
                <v-col cols="12" sm="4" class="d-flex flex-column align-center justify-center text-center">
                  <div class="qr-container pa-3 bg-white rounded-xl border-gold elevation-2 mb-4">
                    <!-- Simulated high-fidelity SVG QR Code -->
                    <svg width="120" height="120" viewBox="0 0 100 100">
                      <rect width="100" height="100" fill="#ffffff" />
                      <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z M20,20 h10 v10 h-10 z" fill="#800000" />
                      <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z M70,20 h10 v10 h-10 z" fill="#800000" />
                      <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z M20,70 h10 v10 h-10 z" fill="#800000" />
                      <rect x="50" y="10" width="5" height="15" fill="#800000" />
                      <rect x="50" y="30" width="5" height="5" fill="#800000" />
                      <rect x="50" y="50" width="20" height="5" fill="#800000" />
                      <rect x="80" y="50" width="10" height="15" fill="#800000" />
                      <rect x="60" y="65" width="15" height="5" fill="#800000" />
                      <rect x="50" y="80" width="10" height="10" fill="#800000" />
                      <rect x="75" y="75" width="15" height="15" fill="#800000" />
                    </svg>
                  </div>
                  <div class="text-caption font-weight-bold color-maroon mb-2">SCAN TO VERIFY BOOTH SLIP</div>

                  <v-divider class="w-100 my-2"></v-divider>

                  <div class="agent-box w-100 text-left pa-3 bg-grey-lighten-4 rounded-lg mt-2 border-gold-thin">
                    <div class="text-caption font-weight-bold color-gold-dark d-flex align-center mb-1">
                      <v-icon size="small" color="#D4AF37" class="mr-1">mdi-account-hard-hat</v-icon>
                      {{ t("voterSlip.incharge") || (isTamil ? 'த.வெ.க பூத் முகவர்' : 'TVK Booth Agent') }}
                    </div>
                    <div class="text-subtitle-2 font-weight-black text-grey-darken-3">{{ generatedSlip.agentName }}</div>
                    <div class="text-caption font-weight-bold text-grey-darken-2 d-flex align-center justify-space-between mt-1">
                      <span>{{ generatedSlip.agentPhone }}</span>
                      <v-btn
                        size="small"
                        color="#25D366"
                        variant="flat"
                        class="text-white px-2 py-0 text-caption rounded-pill font-weight-bold"
                        :href="`https://wa.me/91${generatedSlip.agentPhone}?text=வணக்கம், நான் ${generatedSlip.name} (${generatedSlip.epicNo}). எனது வாக்குச்சாவடி தொடர்பான உதவி தேவை.`"
                        target="_blank"
                      >
                        <v-icon start icon="mdi-whatsapp" size="small"></v-icon> Chat
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>

              <!-- Slip Footer Timing -->
              <div class="pa-4 bg-maroon-light rounded-xl text-center border-gold-thin font-weight-bold color-maroon d-flex align-center justify-center">
                <v-icon icon="mdi-calendar-clock" color="#800000" class="mr-2"></v-icon>
                {{ t("voterSlip.date") || (isTamil ? 'வாக்குப்பதிவு நாள்: மே 2026 (காலை 7:00 - மாலை 6:00)' : 'Polling Date: May 2026 (7:00 AM - 6:00 PM)') }}
              </div>
            </div>
          </v-card>

          <!-- Action Buttons -->
          <div class="d-flex flex-wrap justify-center gap-4 mt-8 no-print">
            <v-btn
              color="#800000"
              size="large"
              class="rounded-pill px-8 font-weight-bold text-white elevation-4"
              @click="printBoothSlip"
            >
              <v-icon start icon="mdi-printer" size="large"></v-icon>
              {{ t("voterSlip.btnPrint") || (isTamil ? 'அச்சிடு / PDF பதிவிறக்கம்' : 'Print / Save PDF') }}
            </v-btn>
            <v-btn
              color="#25D366"
              size="large"
              class="rounded-pill px-8 font-weight-bold text-white elevation-4"
              @click="shareWhatsapp"
            >
              <v-icon start icon="mdi-whatsapp" size="large"></v-icon>
              {{ t("voterSlip.btnWhatsapp") || (isTamil ? 'வாட்ஸ்அப் மூலம் பகிர்' : 'Share via WhatsApp') }}
            </v-btn>
          </div>
        </div>
      </v-expand-transition>
    </v-container>
  </v-container>
</template>

<script>
import logo from "../../assets/tvk-logo.png";
import { constituenciesMap } from "../../data/constituencies";

export default {
  name: "VoterSlipPortal",
  inject: ["t", "currentLang"],
  data: () => ({
    logo,
    valid: false,
    loading: false,
    searchType: "epic",
    formData: {
      constituency: "Gummidipoondi",
      epicNo: "",
      name: "",
      age: "28",
    },
    generatedSlip: null,
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    constituencyList() {
      return Object.keys(constituenciesMap).map(key => ({
        titleDisplay: `${key} / ${constituenciesMap[key]}`,
        value: key,
      }));
    },
  },
  methods: {
    generateSlip() {
      this.loading = true;
      setTimeout(() => {
        const tamilName = constituenciesMap[this.formData.constituency] || this.formData.constituency;
        const randomBoothNo = Math.floor(Math.random() * 250) + 1;
        const randomPartNo = Math.floor(Math.random() * 300) + 10;
        const randomSerialNo = Math.floor(Math.random() * 900) + 100;
        
        const boothNames = [
          "அரசு மேல்நிலைப்பள்ளி / Govt Hr Sec School",
          "ஊராட்சி ஒன்றியத் தொடக்கப்பள்ளி / Panchayat Union Primary School",
          "நகராட்சி உயர்நிலைப்பள்ளி / Municipal High School",
          "சமுதாய நலக்கூடம் / Community Hall",
          "புனித அந்தோனியார் மெட்ரிக் பள்ளி / St. Antony Matric School"
        ];
        const randomBoothName = boothNames[Math.floor(Math.random() * boothNames.length)];

        const agentNames = ["விஜயகுமார் (Vijayakumar)", "செந்தில்குமார் (Senthilkumar)", "அருண் தளபதி (Arun Thalapathy)", "கார்த்திக் (Karthik)", "ரமேஷ் (Ramesh)"];
        const randomAgent = agentNames[Math.floor(Math.random() * agentNames.length)];

        this.generatedSlip = {
          name: this.searchType === 'epic' ? (this.formData.epicNo ? `வாக்காளர் / Voter (${this.formData.epicNo.substring(this.formData.epicNo.length - 4)})` : "விஜய் குமார்") : this.formData.name,
          epicNo: this.searchType === 'epic' ? this.formData.epicNo.toUpperCase() : `TN/26/${Math.floor(100 + Math.random()*899)}/${Math.floor(100000 + Math.random()*899999)}`,
          age: this.searchType === 'epic' ? Math.floor(Math.random() * 45) + 21 : this.formData.age,
          gender: "Male / ஆண்",
          constituencyEn: this.formData.constituency,
          constituencyTa: tamilName,
          boothNo: randomBoothNo,
          boothName: randomBoothName,
          location: `${this.formData.constituency} பிரதான சாலை, தமிழ்நாடு / Main Road, TN`,
          partNo: randomPartNo,
          serialNo: randomSerialNo,
          agentName: randomAgent,
          agentPhone: "9840" + Math.floor(100000 + Math.random() * 900000),
        };
        this.loading = false;
      }, 800);
    },
    printBoothSlip() {
      window.print();
    },
    shareWhatsapp() {
      if (!this.generatedSlip) return;
      const text = `🗳️ *தமிழக சட்டமன்றத் தேர்தல் 2026 - த.வெ.க டிஜிட்டல் பூத் சீட்டு*\n\n👤 *வாக்காளர்:* ${this.generatedSlip.name}\n🆔 *EPIC எண்:* ${this.generatedSlip.epicNo}\n📍 *தொகுதி:* ${this.generatedSlip.constituencyTa}\n🏫 *வாக்குச்சாவடி எண்:* ${this.generatedSlip.boothNo}\n🔢 *பாகம் எண்:* ${this.generatedSlip.partNo} | *வரிசை எண்:* ${this.generatedSlip.serialNo}\n\n*நமது வாக்கு வெற்றிக்கு! தளபதி விஜய்க்கு!* 🚩`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    },
  },
};
</script>

<style scoped>
.voter-slip-page {
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
  border: 1px solid rgba(212, 175, 55, 0.4);
}

.border-gold-thick {
  border: 3px solid #D4AF37;
}

.border-gold-bottom {
  border-bottom: 3px solid #D4AF37;
}

.color-gold {
  color: #D4AF37;
}

.color-gold-dark {
  color: #b8960b;
}

.color-maroon {
  color: #800000;
}

.bg-maroon-light {
  background-color: rgba(128, 0, 0, 0.06);
}

.bg-gold-light {
  background-color: rgba(212, 175, 55, 0.12);
}

.glow-avatar {
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
}

@media (min-width: 600px) {
  .border-right-sm {
    border-right: 1px dashed #ccc;
  }
}

@media print {
  body * {
    visibility: hidden;
  }
  #printable-booth-slip, #printable-booth-slip * {
    visibility: visible;
  }
  #printable-booth-slip {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .no-print {
    display: none !important;
  }
}
</style>
