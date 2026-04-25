<template>
  <v-container fluid class="pa-0 poster-creator">
    <v-row no-gutters class="creator-row">
      <!-- Sidebar Controls -->
      <v-col cols="12" md="4" class="pa-6 controls-panel">
        <!-- Official TVK Header Section -->
        <div class="official-header mb-4">
          <div class="d-flex align-center justify-space-between mb-1">
            <div class="header-text-group">
              <h1 class="party-name text-h6 font-weight-black color-maroon mb-0">
                தமிழக வெற்றிக் கழகம்
              </h1>
              <div class="party-slogan text-caption color-gold font-weight-bold italic">
                மின்னணு சுவரொட்டி உருவாக்குநர்
              </div>
            </div>
            <v-avatar size="50" class="elevation-2 border-gold">
              <v-img :src="logoPremium"></v-img>
            </v-avatar>
          </div>
          <v-divider class="my-1" color="#800000"></v-divider>
        </div>

        <!-- Section 1: Photos & Candidates -->
        <div class="settings-group mb-4">
          <div class="section-title mb-3">
            <v-icon color="#800000" size="small" class="mr-2">mdi-camera-outline</v-icon>
            புகைப்படங்கள் / Visuals
          </div>
          <v-card variant="flat" border class="pa-4 bg-white rounded-lg">
            <v-row dense>
              <v-col cols="6">
                <div class="field-label mb-1">பிரச்சாரம் / Event</div>
                <v-file-input
                  v-model="imageFiles"
                  variant="outlined"
                  multiple
                  chips
                  accept="image/*"
                  density="compact"
                  class="neat-field"
                  hide-details
                  @change="onFilesChange"
                ></v-file-input>
              </v-col>
              <v-col cols="6">
                <div class="field-label mb-1">வேட்பாளர் / Candidate</div>
                <v-file-input
                  v-model="candidateFile"
                  variant="outlined"
                  chips
                  accept="image/*"
                  density="compact"
                  class="neat-field"
                  hide-details
                  @change="onCandidateChange"
                ></v-file-input>
              </v-col>
              <v-col cols="12" class="mt-2">
                <div class="field-label mb-1">நிர்வாகி / Leader</div>
                <v-file-input
                  v-model="vattarFile"
                  variant="outlined"
                  chips
                  accept="image/*"
                  density="compact"
                  class="neat-field"
                  hide-details
                  @change="onVattarChange"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <!-- Section 2: Info & Details -->
        <div class="content-group mb-4">
          <div class="section-title mb-3">
            <v-icon color="#800000" size="small" class="mr-2">mdi-text-box-search-outline</v-icon>
            தகவல்கள் / Information
          </div>
          <v-card variant="flat" border class="pa-4 bg-white rounded-lg">
            <v-row dense>
              <v-col cols="12">
                <div class="field-label mb-1">தலைப்பு / Headline</div>
                <v-text-field
                  v-model="textTop"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="4" class="mt-3">
                <div class="field-label mb-1">எண்</div>
                <v-text-field
                  v-model="constituencyNo"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="8" class="mt-3">
                <div class="field-label mb-1">தொகுதி / Name</div>
                <v-autocomplete
                  v-model="constituency"
                  :items="constituencies"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                  auto-select-first
                ></v-autocomplete>
              </v-col>

              <v-col cols="5" class="mt-3">
                <div class="field-label mb-1">பாகம் எண்</div>
                <v-text-field
                  v-model="partNo"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="7" class="mt-3">
                <div class="field-label mb-1">தேதி / Date</div>
                <v-text-field
                  v-model="date"
                  type="date"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-3">
                <div class="field-label mb-1">இடம் / Location</div>
                <v-text-field
                  v-model="streetName"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-3">
                <div class="field-label mb-1">விவரம் / Message</div>
                <v-textarea
                  v-model="textContent"
                  variant="outlined"
                  rows="3"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <v-btn
          color="#800000"
          block
          size="large"
          prepend-icon="mdi-download"
          class="elegant-btn rounded-xl color-white elevation-4"
          @click="downloadPoster"
        >
          Download Poster
        </v-btn>

        <div class="mt-auto pt-6 pb-2 text-center text-caption color-grey">
          TVK Digital Center • 2026
        </div>
      </v-col>

      <!-- Preview Area -->
      <v-col
        cols="12"
        md="8"
        class="preview-panel"
      >
        <div class="canvas-wrapper">
          <PosterCanvas
            ref="posterCanvas"
            :image-urls="imageUrls"
            :candidate-url="candidateUrl"
            :text-top="textTop"
            :text-content="textContent"
            :constituency-no="constituencyNo"
            :constituency="constituencyDisplay"
            :part-no="partNo"
            :street-name="streetName"
            :date="date"
            :vattar-url="vattarUrl"
            :badge-url="badgeUrl"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PosterCanvas from "./Canvas.vue";
import headerPremium from "../../assets/header-premium.png";
import logoPremium from "../../assets/tvk-logo-premium.png";
import periyarImg from "../../assets/leaders/periyar.png";
import ambedkarImg from "../../assets/leaders/ambedkar.png";
import kamarajarImg from "../../assets/leaders/kamarajar.png";
import veluNachiyarImg from "../../assets/leaders/velunachiyar.png";
import anjalaiAmmalImg from "../../assets/leaders/anjalaiammal.png";
import candidateImage from "../../assets/candidate.jpg";

import { doc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { constituenciesMap } from "../../data/constituencies";
import badge155 from "../../assets/155.png";

export default {
  name: "PosterCreator",
  components: { PosterCanvas },
  inject: ["t", "currentLang"],
  data: () => ({
    logoPremium,
    headerPremium,
    imageFiles: [],
    imageUrls: [],
    candidateFile: null,
    candidateUrl: candidateImage, // Initialize with the requested candidate image
    vattarFile: null,
    vattarUrl: null,
    badgeUrl: badge155,
    textTop: "இன்று நமது தேர்தல் பிரச்சாரம்",
    textContent:
      "இன்று ஞாயிற்றுக்கிழமை மாலை 4 மணி அளவில் நமது களப்பணிகளை தொடர்ந்து செயலாற்ற கழகத் தோழர்கள் உறுப்பினர்கள் அனைவரும் திரண்டு வர வேண்டும் என்று அன்புடன் கேட்டுக்கொள்கிறோம்.",
    constituencyNo: "155",
    constituency: "Maduravoyal",
    partNo: "215",
    streetName: "பெரியார் சாலை",
    date: new Date().toISOString().substr(0, 10),
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    constituencies() {
      // Sort keys (English names) alphabetically
      const sortedKeys = Object.keys(constituenciesMap).sort();
      return sortedKeys.map(enName => ({
        title: constituenciesMap[enName],
        value: enName,
        tamil: constituenciesMap[enName]
      }));
    },
    constituencyDisplay() {
      // Return ONLY the Tamil name for the poster canvas
      return constituenciesMap[this.constituency] || this.constituency;
    }
  },
  methods: {
    async onCandidateChange() {
      if (!this.candidateFile) {
        this.candidateUrl = candidateImage;
        return;
      }
      this.candidateUrl = await this.readFile(
        this.candidateFile[0] || this.candidateFile,
      );
    },
    async onVattarChange() {
      if (!this.vattarFile) {
        this.vattarUrl = null;
        return;
      }
      this.vattarUrl = await this.readFile(
        this.vattarFile[0] || this.vattarFile,
      );
    },
    async onFilesChange() {
      if (!this.imageFiles || this.imageFiles.length === 0) {
        this.imageUrls = [];
        return;
      }

      // Restrict to at most 6 images
      if (this.imageFiles.length > 6) {
        alert(
          "நீங்கள் அதிகபட்சமாக 6 புகைப்படங்களை மட்டுமே தேர்ந்தெடுக்க முடியும். (You can select at most 6 images)",
        );
        this.imageFiles = this.imageFiles.slice(0, 6);
      }

      const newUrls = [];
      for (const file of this.imageFiles) {
        const url = await this.readFile(file);
        newUrls.push(url);
      }
      this.imageUrls = newUrls;
    },
    readFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    },
    async downloadPoster() {
      // Record download in Firestore
      try {
        const statsRef = doc(
          db,
          "poster_stats",
          this.constituency || "Unknown",
        );
        await setDoc(
          statsRef,
          {
            count: increment(1),
            last_downloaded: new Date().toISOString(),
          },
          { merge: true },
        );
      } catch (e) {
        console.error("Error recording stats:", e);
      }

      const dataUrl = this.$refs.posterCanvas.exportAsImage();
      const link = document.createElement("a");
      link.download = `tvk-poster-${this.constituency}.png`;
      link.href = dataUrl;
      link.click();
    },
  },
};
</script>

<style scoped>
.poster-creator {
  background: #f8f5f0;
}

.creator-row {
  min-height: calc(100vh - 64px);
}

.controls-panel {
  background: #fffcf9 !important;
  border-right: 1px solid #e8e4db;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.03);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.official-header {
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #e8e4db;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.address-text {
  font-weight: 500;
  letter-spacing: 0.3px;
}

.preview-panel {
  background: #eceff1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.color-maroon {
  color: #800000;
}
.color-gold {
  color: #d4af37;
}
.color-white {
  color: white !important;
}
.italic {
  font-style: italic;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 900;
  color: #800000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
}

.field-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #800000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.neat-field :deep(.v-field) {
  border-radius: 10px !important;
  background: white !important;
  transition: all 0.2s ease;
}

.neat-field :deep(.v-field--focused) {
  border-color: #800000 !important;
  box-shadow: 0 0 0 3px rgba(128, 0, 0, 0.1);
}

/* Desktop Only: Improved scroll and height management */
@media (min-width: 960px) {
  .poster-creator {
    height: calc(100vh - 64px);
    overflow: hidden;
  }
  
  .creator-row {
    height: 100%;
    overflow: hidden;
  }

  .controls-panel {
    height: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #800000 transparent;
  }
  
  .preview-panel {
    height: 100%;
    overflow-y: auto;
    padding: 40px;
    background: #4a4a4a;
  }

  .canvas-wrapper {
    height: auto;
    min-height: min-content;
    padding-bottom: 40px;
  }
}

.preview-panel {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.canvas-wrapper {
  width: 100%;
  max-width: 800px;
}

.elegant-btn {
  font-weight: 800;
  letter-spacing: 1px;
}
</style>
