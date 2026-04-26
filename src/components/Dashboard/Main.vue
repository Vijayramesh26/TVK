<template>
  <v-container class="dashboard-container py-md-10 py-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="11" lg="10">
        <!-- Premium Hero Section -->
        <v-card
          class="hero-card rounded-xl overflow-hidden elevation-10 mb-8 border-gold"
          dark
        >
          <div
            class="hero-gradient pa-8 pa-md-12 d-flex flex-column flex-md-row align-center justify-space-between"
          >
            <div class="text-center text-md-left z-10">
              <v-chip
                color="rgba(212, 175, 55, 0.2)"
                text-color="#D4AF37"
                class="mb-4 font-weight-bold"
                variant="flat"
              >
                <v-icon start icon="mdi-party-popper" size="small"></v-icon>
                அதிகாரப்பூர்வ பக்கம்
              </v-chip>
              <h1
                class="text-h4 text-md-h3 font-weight-black text-white mb-2"
                style="line-height: 1.2"
              >
                தமிழக வெற்றிக் கழகம்
              </h1>
              <p
                class="text-subtitle-1 text-md-h6 font-weight-regular text-white opacity-90 mb-6"
              >
                தொகுதி வாரியான செயல்பாடுகள் மற்றும் டிஜிட்டல் வளர்ச்சி (Digital
                Momentum)
              </p>
              <v-btn
                color="#D4AF37"
                size="x-large"
                prepend-icon="mdi-brush"
                class="rounded-pill font-weight-bold elevation-4 text-maroon"
                to="/create"
              >
                புதிய போஸ்டர் உருவாக்கு
              </v-btn>
            </div>

            <!-- Floating Decorative Icon -->
            <div class="hero-icon-container d-none d-md-flex z-10">
              <v-avatar
                size="160"
                class="elevation-10 border-gold-thick"
                style="background-color: white"
              >
                <v-img src="../../assets/tvk-logo.png" alt="TVK Logo"></v-img>
              </v-avatar>
            </div>

            <!-- Animated Background shapes -->
            <div class="bg-shape shape-1"></div>
            <div class="bg-shape shape-2"></div>
          </div>
        </v-card>

        <!-- KPI KPI Cards Row -->
        <v-row class="mb-8">
          <v-col cols="12" sm="4">
            <v-card
              class="glass-card stat-card rounded-xl pa-6 d-flex flex-column"
              hover
            >
              <div class="d-flex justify-space-between align-center mb-4">
                <div class="stat-icon-wrapper bg-maroon-light">
                  <v-icon color="#800000" size="32"
                    >mdi-download-multiple</v-icon
                  >
                </div>
                <v-chip
                  size="small"
                  color="success"
                  variant="flat"
                  prepend-icon="mdi-trending-up"
                  >+{{ Math.round((totalDownloads || 0) * 0.1) }}</v-chip
                >
              </div>
              <div
                class="text-overline text-grey-darken-1 font-weight-bold mb-1"
              >
                மொத்த பதிவிறக்கங்கள்
              </div>
              <div
                class="text-h3 font-weight-black color-maroon d-flex align-center"
              >
                {{ totalDownloads }}
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  size="24"
                  class="ml-3"
                  color="#800000"
                ></v-progress-circular>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-card
              class="glass-card stat-card rounded-xl pa-6 d-flex flex-column"
              hover
            >
              <div class="d-flex justify-space-between align-center mb-4">
                <div class="stat-icon-wrapper bg-gold-light">
                  <v-icon color="#D4AF37" size="32"
                    >mdi-map-marker-radius</v-icon
                  >
                </div>
                <!-- Mini sparkline could go here, for now just static -->
              </div>
              <div
                class="text-overline text-grey-darken-1 font-weight-bold mb-1"
              >
                செயல்பாட்டில் உள்ள தொகுதிகள்
              </div>
              <div class="text-h3 font-weight-black color-gold">
                {{ constituencyCount }}
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-card
              class="glass-card stat-card rounded-xl pa-6 d-flex flex-column"
              hover
            >
              <div class="d-flex justify-space-between align-center mb-4">
                <div class="stat-icon-wrapper bg-maroon-light">
                  <v-icon color="#800000" size="32">mdi-account-group</v-icon>
                </div>
                <!-- Mini sparkline could go here, for now just static -->
              </div>
              <div
                class="text-overline text-grey-darken-1 font-weight-bold mb-1"
              >
                அறிவிக்கப்பட்ட வேட்பாளர்கள்
              </div>
              <div class="text-h3 font-weight-black color-maroon">
                {{ candidatesCount }}
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Main Content Area -->
        <v-row>
          <!-- Charts Section -->
          <v-col cols="12" md="8">
            <v-card
              class="glass-card rounded-xl elevation-2 overflow-hidden h-100"
            >
              <div
                class="pa-6 border-bottom-light d-flex align-center justify-space-between"
              >
                <div>
                  <h2 class="text-h6 font-weight-bold color-maroon mb-0">
                    முன்னணி தொகுதிகள்
                  </h2>
                  <div class="text-caption text-grey-darken-1">
                    அதிக போஸ்டர்கள் பதிவிறக்கம் செய்த டாப் 10 தொகுதிகள்
                  </div>
                </div>
                <v-btn
                  icon
                  variant="tonal"
                  color="#800000"
                  size="small"
                  @click="loadStats"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </div>
              <v-card-text class="pa-4 pt-6 position-relative">
                <div
                  v-if="loading"
                  class="d-flex justify-center align-center py-12"
                >
                  <v-progress-circular
                    indeterminate
                    color="#800000"
                    size="64"
                  ></v-progress-circular>
                </div>
                <apexchart
                  v-else-if="stats.length > 0"
                  type="bar"
                  height="350"
                  :options="chartOptions"
                  :series="chartSeries"
                ></apexchart>
                <div v-else class="text-center py-12 text-grey-darken-1">
                  தரவுகள் இல்லை
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Quick Actions & Top Leaderboard -->
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12">
                <v-card class="glass-card rounded-xl elevation-2 h-100 pa-6">
                  <h3 class="text-h6 font-weight-bold color-maroon mb-4">
                    விரைவு வழிகள்
                  </h3>
                  <v-list class="bg-transparent pa-0">
                    <v-list-item
                      to="/candidates"
                      class="quick-action-item rounded-lg mb-3"
                      prepend-icon="mdi-account-tie"
                      append-icon="mdi-chevron-right"
                    >
                      <v-list-item-title class="font-weight-bold"
                        >வேட்பாளர்கள் 2026</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >234 தொகுதிகள் பட்டியல்</v-list-item-subtitle
                      >
                    </v-list-item>

                    <v-list-item
                      to="/kolgai"
                      class="quick-action-item rounded-lg mb-3"
                      prepend-icon="mdi-book-open-variant"
                      append-icon="mdi-chevron-right"
                    >
                      <v-list-item-title class="font-weight-bold"
                        >கட்சியின் கொள்கைகள்</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >நமது கனவு தமிழ்நாடு</v-list-item-subtitle
                      >
                    </v-list-item>

                    <v-list-item
                      href="https://tvk.family"
                      target="_blank"
                      class="quick-action-item rounded-lg"
                      prepend-icon="mdi-web"
                      append-icon="mdi-open-in-new"
                    >
                      <v-list-item-title class="font-weight-bold"
                        >அதிகாரப்பூர்வ தளம்</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >tvk.family காணவும்</v-list-item-subtitle
                      >
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { candidatesData } from "../../data/candidates";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Dashboard",
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    loading: true,
    stats: [],
    allStats: [],
    candidatesCount: candidatesData ? candidatesData.length : 0,
  }),
  computed: {
    totalDownloads() {
      return this.allStats.reduce((acc, curr) => acc + (curr.count || 0), 0);
    },
    constituencyCount() {
      return this.allStats.length;
    },
    topConstituency() {
      if (this.stats.length === 0) return null;
      return [...this.stats].sort((a, b) => b.count - a.count)[0].id;
    },
    chartSeries() {
      return [
        {
          name: "போஸ்டர் பதிவிறக்கங்கள்",
          data: this.stats.slice(0, 10).map((s) => s.count),
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "bar",
          fontFamily: "Inter, sans-serif",
          toolbar: { show: false },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 6,
            horizontal: true,
            distributed: true,
            barHeight: "70%",
          },
        },
        colors: [
          "#800000",
          "#900000",
          "#A00000",
          "#B00000",
          "#C00000",
          "#D4AF37",
          "#DEB841",
          "#E8C14B",
          "#F2CA55",
          "#FCC35F",
        ],
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: { colors: ["#fff"] },
          offsetX: 0,
          dropShadow: { enabled: true },
        },
        stroke: { width: 0 },
        xaxis: {
          categories: this.stats.slice(0, 10).map((s) => s.id),
          labels: {
            style: {
              fontWeight: 600,
              colors: "#666",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontWeight: "bold",
              colors: "#333",
              fontSize: "13px",
            },
          },
        },
        tooltip: {
          theme: "light",
          y: {
            formatter: function (val) {
              return val + " Downloads";
            },
          },
        },
        legend: { show: false },
      };
    },
  },
  mounted() {
    this.loadStats();
  },
  methods: {
    loadStats() {
      this.loading = true;
      const q = query(collection(db, "poster_stats"), orderBy("count", "desc"));

      onSnapshot(
        q,
        (snapshot) => {
          const fullData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.allStats = fullData;
          this.stats = fullData; // used for charts
          this.loading = false;
        },
        (error) => {
          console.error("Firestore error:", error);
          this.loading = false;
        },
      );
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f8fafc;
  background-image:
    radial-gradient(at 0% 0%, hsla(0, 100%, 25%, 0.04) 0px, transparent 50%),
    radial-gradient(at 100% 100%, hsla(46, 65%, 52%, 0.06) 0px, transparent 50%);
  position: relative;
}

/* Typography & Colors */
.color-maroon {
  color: #800000;
}
.color-gold {
  color: #d4af37;
}
.text-maroon {
  color: #800000 !important;
}

/* Hero Section */
.hero-card {
  position: relative;
  background-color: #800000;
}

.hero-gradient {
  background: linear-gradient(135deg, #600000 0%, #800000 50%, #900000 100%);
  position: relative;
  overflow: hidden;
}

.border-gold {
  border: 2px solid #d4af37;
}
.border-gold-thick {
  border: 4px solid #d4af37;
}
.z-10 {
  z-index: 10;
  position: relative;
}

/* Abstract shapes for hero background */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 1;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: rgba(212, 175, 55, 0.4);
  top: -100px;
  right: -50px;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: rgba(0, 0, 0, 0.3);
  bottom: -200px;
  left: -100px;
}

/* Glassmorphism Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(128, 0, 0, 0.05) !important;
}

/* Stat Cards */
.stat-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(128, 0, 0, 0.08) !important;
}

.stat-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
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

/* Quick Actions */
.quick-action-item {
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  background: white;
}

.quick-action-item:hover {
  background: rgba(128, 0, 0, 0.03) !important;
  border-color: rgba(128, 0, 0, 0.2);
  transform: translateX(4px);
}

.border-bottom-light {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
