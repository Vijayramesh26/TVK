<template>
  <v-container class="connect-container py-md-10 py-6" fluid>
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
              <v-icon start icon="mdi-account-group-outline" size="small"></v-icon>
              {{ t("connect.badge") }}
            </v-chip>
            <h1 class="text-h3 text-md-h2 font-weight-black text-white mb-4 shadow-text">
              {{ t("connect.title") }}
            </h1>
            <p class="text-subtitle-1 text-md-h6 font-weight-regular text-white opacity-90 max-width-800 mx-auto mb-0 lh-relaxed">
              {{ t("connect.subtitle") }}
            </p>
            <div class="bg-shape shape-1"></div>
            <div class="bg-shape shape-2"></div>
          </div>
        </v-card>

        <!-- Constituency Selector Bar -->
        <v-card class="glass-card rounded-xl pa-8 mb-10 elevation-6 border-gold">
          <v-row align="center">
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="selectedConstituency"
                :items="constituenciesList"
                item-title="name"
                item-value="id"
                :label="t('connect.searchPlaceholder')"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                color="#800000"
                bg-color="white"
                rounded="lg"
                hide-details
                return-object
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props" :subtitle="item.raw.district">
                    <template v-slot:prepend>
                      <v-avatar color="#800000" size="36" class="text-white text-caption font-weight-bold mr-3">
                        {{ item.raw.id }}
                      </v-avatar>
                    </template>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" class="text-md-right text-center">
              <div class="text-caption text-grey-darken-1 font-weight-bold mb-1">
                {{ t("connect.constituencyLabel") }}
              </div>
              <h2 class="text-h4 font-weight-black color-maroon">
                {{ selectedConstituency.name }}
              </h2>
              <v-chip color="rgba(128, 0, 0, 0.08)" text-color="#800000" class="mt-1 font-weight-bold" size="small">
                {{ t("connect.districtLabel") }}: {{ selectedConstituency.district }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card>

        <!-- Community Hub Content -->
        <v-row>
          <!-- Left Column: Contact & Channels -->
          <v-col cols="12" md="6">
            <v-card class="glass-card rounded-xl pa-8 elevation-4 border-gold-thin mb-8 h-100 d-flex flex-column justify-space-between">
              <div>
                <div class="d-flex align-center mb-6">
                  <v-avatar color="#800000" size="56" class="mr-4">
                    <v-icon color="#D4AF37" size="28">mdi-card-account-phone-outline</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h5 font-weight-black color-maroon">
                      {{ selectedConstituency.name }} TVK Office
                    </h3>
                    <div class="text-caption text-grey-darken-1 font-weight-bold">Official Regional Secretariat</div>
                  </div>
                </div>

                <v-list class="bg-transparent pa-0 mb-6">
                  <v-list-item class="px-0 py-3 border-bottom">
                    <template v-slot:prepend>
                      <v-icon color="#800000" class="mr-4">mdi-account-tie</v-icon>
                    </template>
                    <v-list-item-subtitle class="text-caption text-grey-darken-1">{{ t("connect.secName") }}</v-list-item-subtitle>
                    <v-list-item-title class="font-weight-bold text-body-1">{{ selectedConstituency.secretary }}</v-list-item-title>
                  </v-list-item>

                  <v-list-item class="px-0 py-3 border-bottom">
                    <template v-slot:prepend>
                      <v-icon color="#800000" class="mr-4">mdi-phone</v-icon>
                    </template>
                    <v-list-item-subtitle class="text-caption text-grey-darken-1">{{ t("connect.secPhone") }}</v-list-item-subtitle>
                    <v-list-item-title class="font-weight-bold text-body-1">+91 {{ selectedConstituency.phone }}</v-list-item-title>
                  </v-list-item>

                  <v-list-item class="px-0 py-3">
                    <template v-slot:prepend>
                      <v-icon color="#800000" class="mr-4">mdi-map-marker-radius</v-icon>
                    </template>
                    <v-list-item-subtitle class="text-caption text-grey-darken-1">{{ t("connect.mlaOffice") }}</v-list-item-subtitle>
                    <v-list-item-title class="font-weight-bold text-body-1">TVK High Command Regional Office, {{ selectedConstituency.district }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>

              <!-- Digital Channels Join Buttons -->
              <div class="d-flex flex-column gap-3 pt-4">
                <v-btn
                  color="#25D366"
                  size="x-large"
                  class="rounded-pill px-8 font-weight-bold text-white text-body-1 elevation-3"
                  prepend-icon="mdi-whatsapp"
                  @click="joinGroup('WhatsApp')"
                >
                  {{ t("connect.btnWhatsapp") }}
                </v-btn>
                <v-btn
                  color="#0088cc"
                  size="large"
                  class="rounded-pill px-8 font-weight-bold text-white text-body-1 elevation-2"
                  prepend-icon="mdi-telegram"
                  @click="joinGroup('Telegram')"
                >
                  {{ t("connect.btnTelegram") }}
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <!-- Right Column: Regional Events & Gatherings -->
          <v-col cols="12" md="6">
            <v-card class="glass-card rounded-xl pa-8 elevation-4 border-gold-thin h-100">
              <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center">
                  <v-avatar color="#800000" size="56" class="mr-4">
                    <v-icon color="#D4AF37" size="28">mdi-calendar-multiselect</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h5 font-weight-black color-maroon">
                      {{ t("connect.eventsTitle") }}
                    </h3>
                    <div class="text-caption text-grey-darken-1 font-weight-bold">Live Constituency Schedule</div>
                  </div>
                </div>
                <v-chip color="rgba(212, 175, 55, 0.2)" text-color="#800000" class="font-weight-bold">
                  {{ selectedConstituency.name }}
                </v-chip>
              </div>

              <div class="events-list">
                <v-card class="bg-maroon-light pa-5 rounded-xl border-gold-thin mb-4 hover-lift">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <v-chip color="#800000" text-color="white" size="small" class="font-weight-bold">
                      <v-icon start icon="mdi-alarm" size="x-small"></v-icon> Upcoming
                    </v-chip>
                    <span class="text-caption font-weight-bold text-grey-darken-1">Ward 14 Center</span>
                  </div>
                  <div class="text-h6 font-weight-bold color-maroon mb-1">
                    {{ t("connect.event1") }}
                  </div>
                  <p class="text-caption text-grey-darken-2 mb-0">Led by District Coordinator & Booth Agents.</p>
                </v-card>

                <v-card class="bg-maroon-light pa-5 rounded-xl border-gold-thin mb-4 hover-lift">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <v-chip color="#D4AF37" text-color="#800000" size="small" class="font-weight-bold">
                      <v-icon start icon="mdi-account-plus" size="x-small"></v-icon> Mega Camp
                    </v-chip>
                    <span class="text-caption font-weight-bold text-grey-darken-1">Main Bazaar</span>
                  </div>
                  <div class="text-h6 font-weight-bold color-maroon mb-1">
                    {{ t("connect.event2") }}
                  </div>
                  <p class="text-caption text-grey-darken-2 mb-0">Open for all youth and supporters. Instant Supporter ID printing.</p>
                </v-card>

                <v-card class="bg-maroon-light pa-5 rounded-xl border-gold-thin hover-lift">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <v-chip color="#800000" text-color="white" size="small" class="font-weight-bold">
                      <v-icon start icon="mdi-star" size="x-small"></v-icon> High Command
                    </v-chip>
                    <span class="text-caption font-weight-bold text-grey-darken-1">Constituency HQ</span>
                  </div>
                  <div class="text-h6 font-weight-bold color-maroon mb-1">
                    {{ t("connect.event3") }}
                  </div>
                  <p class="text-caption text-grey-darken-2 mb-0">Focusing on Women's Security Brigade and welfare outreach.</p>
                </v-card>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Simulated Channel Join Snackbar -->
        <v-snackbar v-model="snackbar" color="#800000" timeout="2500" rounded="pill">
          <span class="text-white font-weight-bold">
            <v-icon start icon="mdi-check-circle" color="#D4AF37"></v-icon>
            {{ joinMsg }}
          </span>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { candidatesData } from "../../data/candidates";

export default {
  name: "ConnectPortal",
  inject: ["t", "currentLang"],
  data: () => ({
    selectedConstituency: null,
    snackbar: false,
    joinMsg: "",
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    constituenciesList() {
      return candidatesData.map(c => ({
        id: c.id,
        name: this.isTamil ? c.name : c.constituency,
        district: c.district,
        secretary: this.isTamil ? `${c.name} (தொகுதிப் பொறுப்பாளர்)` : `${c.nameEn} (Constituency In-Charge)`,
        phone: "9842" + Math.floor(100000 + Math.random() * 900000),
      }));
    },
  },
  created() {
    this.selectedConstituency = this.constituenciesList[0] || {
      id: 1, name: "Gummidipoondi", district: "Thiruvallur", secretary: "District Organizer", phone: "9842000000"
    };
  },
  watch: {
    isTamil() {
      const currentId = this.selectedConstituency.id;
      const found = this.constituenciesList.find(c => c.id === currentId);
      if (found) this.selectedConstituency = found;
    },
  },
  methods: {
    joinGroup(platform) {
      this.joinMsg = `Opening ${this.selectedConstituency.name} TVK ${platform} channel...`;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.connect-container {
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

.bg-maroon-light { background: rgba(128, 0, 0, 0.05); }

.border-bottom { border-bottom: 1px solid rgba(128, 0, 0, 0.1); }

.hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(128, 0, 0, 0.08) !important;
  border-color: #d4af37;
}

.gap-3 { gap: 12px; }
.lh-relaxed { line-height: 1.6; }
</style>
