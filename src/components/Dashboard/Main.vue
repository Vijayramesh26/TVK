<template>
  <v-container class="dashboard-container py-10" fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Header Section -->
        <div class="header-section mb-10 text-center">
          <h1 class="text-h5 text-sm-h4 text-sm-h3 font-weight-bold mb-2">தகவல் பலகை (Dashboard)</h1>
          <p class="text-subtitle-1 text-grey-darken-1">மொத்த போஸ்டர் பதிவிறக்கங்கள் மற்றும் தொகுதி வாரியான விவரங்கள்</p>
          
          <v-btn
            color="#800000"
            size="x-large"
            prepend-icon="mdi-plus-circle"
            class="mt-6 px-10 rounded-pill elevation-4"
            to="/create"
            flat
          >
            புதிய போஸ்டர் உருவாக்கு
          </v-btn>
        </div>

        <!-- Stats Overview -->
        <v-row class="mb-8">
          <v-col cols="12" sm="6" md="4">
            <v-card class="stat-card pa-6 text-center rounded-xl elevation-2 border-top-maroon">
              <v-icon color="#800000" size="48" class="mb-2">mdi-download-multiple</v-icon>
              <div class="text-overline">மொத்த பதிவிறக்கங்கள்</div>
              <div class="text-h5 text-sm-h4 text-sm-h3 font-weight-black color-maroon">{{ totalDownloads }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card class="stat-card pa-6 text-center rounded-xl elevation-2 border-top-gold">
              <v-icon color="#D4AF37" size="48" class="mb-2">mdi-map-marker-radius</v-icon>
              <div class="text-overline">தொகுதிகள்</div>
              <div class="text-h5 text-sm-h4 text-sm-h3 font-weight-black color-gold">{{ constituencyCount }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="stat-card pa-6 text-center rounded-xl elevation-2 border-top-maroon">
              <v-icon color="#800000" size="48" class="mb-2">mdi-trending-up</v-icon>
              <div class="text-overline">முன்னணி தொகுதி</div>
              <div class="text-h5 text-sm-h4 font-weight-bold pt-1">{{ topConstituency || 'N/A' }}</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- detailed list -->
        <v-card class="rounded-xl overflow-hidden elevation-3 mb-10">
          <v-toolbar color="#800000" dark flat>
            <v-toolbar-title class="font-weight-bold">தொகுதி வாரியான பதிவிறக்க விவரங்கள்</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="loadStats">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-toolbar>
          
          <v-data-table
            :headers="headers"
            :items="stats"
            :loading="loading"
            class="elevation-0"
            hover
          >
            <template v-slot:item.count="{ item }">
              <v-chip color="#800000" class="font-weight-bold white--text">
                {{ item.count }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>

      </v-col>
    </v-row>

    <!-- Logo Watermark -->
    <div class="logo-watermark">
      <img src="../../assets/voteForWhistle.jpg" alt="Watermark" />
    </div>
  </v-container>
</template>

<script>
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

export default {
  name: "Dashboard",
  data: () => ({
    loading: true,
    stats: [],
    headers: [
      { title: 'தொகுதி பெயர் (Constituency)', key: 'id', align: 'start', sortable: true },
      { title: 'பதிவிறக்கங்கள் (Count)', key: 'count', align: 'end', sortable: true },
    ]
  }),
  computed: {
    totalDownloads() {
      return this.stats.reduce((acc, curr) => acc + (curr.count || 0), 0);
    },
    constituencyCount() {
      return this.stats.length;
    },
    topConstituency() {
      if (this.stats.length === 0) return null;
      return [...this.stats].sort((a, b) => b.count - a.count)[0].id;
    }
  },
  mounted() {
    this.loadStats();
  },
  methods: {
    loadStats() {
      this.loading = true;
      const q = query(collection(db, "poster_stats"), orderBy("count", "desc"));
      
      onSnapshot(q, (snapshot) => {
        this.stats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.loading = false;
      }, (error) => {
        console.error("Firestore error:", error);
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.color-maroon { color: #800000; }
.color-gold { color: #D4AF37; }

.border-top-maroon { border-top: 6px solid #800000 !important; }
.border-top-gold { border-top: 6px solid #D4AF37 !important; }

.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.logo-watermark {
  position: fixed;
  bottom: -50px;
  right: -50px;
  opacity: 0.05;
  width: 400px;
  pointer-events: none;
  z-index: 0;
}

.logo-watermark img {
  width: 100%;
}
</style>
