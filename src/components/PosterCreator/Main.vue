<template>
  <v-container fluid class="pa-0 poster-creator">
    <v-row no-gutters class="fill-height">
      <!-- Sidebar Controls -->
      <v-col cols="12" md="4" class="pa-4 controls-panel">
        <!-- Official TVK Header Section -->
        <div class="official-header mb-3">
          <div class="d-flex align-center justify-space-between mb-1">
            <div class="header-text-group">
              <h1
                class="party-name text-h6 font-weight-black color-maroon mb-0"
              >
                தமிழக வெற்றிக் கழகம்
              </h1>
              <div
                class="party-slogan text-caption color-gold font-weight-bold italic"
              >
                பிறப்பொக்கும் எல்லா உயிர்க்கும்!
              </div>
            </div>
            <v-avatar size="60" class="elevation-2 border-gold">
              <v-img :src="logoPremium"></v-img>
            </v-avatar>
          </div>
          <v-divider class="my-1" color="#800000"></v-divider>
          <div
            class="address-text text-center color-maroon"
            style="font-size: 0.6rem; line-height: 1.1"
          >
            பிளாட் எண்: 275, சி ஷோர் டவுன், 8வது அவென்யூ, பனையூர், சென்னை -
            600119.
          </div>
          <v-divider class="my-1" color="#800000"></v-divider>
        </div>

        <!-- Form Grid -->
        <v-row dense>
          <!-- Photos Section -->
          <v-col cols="6">
            <div class="field-label mb-1">புகைப்படங்கள்</div>
            <v-file-input
              v-model="imageFiles"
              variant="outlined"
              multiple
              chips
              accept="image/*"
              density="compact"
              class="classic-field"
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
              class="classic-field"
              hide-details
              @change="onCandidateChange"
            ></v-file-input>
          </v-col>

          <!-- NEW: Guide Leaders Selection -->
          <v-col cols="12">
            <div class="field-label mb-1">வழிகாட்டி தலைவர்கள் / Guiding Leaders</div>
            <v-select
              v-model="selectedLeader"
              :items="leaderOptions"
              item-title="name"
              item-value="img"
              variant="outlined"
              density="compact"
              class="classic-field"
              hide-details
              placeholder="தலைவரைத் தேர்ந்தெடுக்கவும்"
              clearable
              @update:model-value="onLeaderSelect"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :prepend-avatar="item.raw.img" :title="item.raw.name"></v-list-item>
              </template>
            </v-select>
          </v-col>

          <!-- Headline -->
          <v-col cols="12" class="mt-2">
            <div class="field-label mb-1">தலைப்பு / Headline</div>
            <v-text-field
              v-model="textTop"
              variant="outlined"
              density="compact"
              class="classic-field"
              hide-details
            ></v-text-field>
          </v-col>

          <!-- Constituency Info -->
          <v-col cols="4" class="mt-2">
            <div class="field-label mb-1">எண்</div>
            <v-text-field
              v-model="constituencyNo"
              variant="outlined"
              density="compact"
              class="classic-field"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="8" class="mt-2">
            <div class="field-label mb-1">பெயர் / Name</div>
            <v-autocomplete
              v-model="constituency"
              :items="constituencies"
              item-title="title"
              item-value="value"
              variant="outlined"
              density="compact"
              class="classic-field"
              hide-details
              no-data-text="தொகுதி காணப்படவில்லை"
              auto-select-first
            ></v-autocomplete>
          </v-col>

          <!-- Administrative Info -->
          <v-col cols="5" class="mt-2">
            <div class="field-label mb-1">பாகம் எண்</div>
            <v-text-field
              v-model="partNo"
              variant="outlined"
              density="compact"
              class="classic-field"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="7" class="mt-2">
            <div class="field-label mb-1">தேதி / Date</div>
            <v-text-field
              v-model="date"
              type="date"
              variant="outlined"
              density="compact"
              class="classic-field"
              hide-details
            ></v-text-field>
          </v-col>

          <!-- Location & Description -->
          <v-col cols="12" class="mt-2">
            <div class="field-label mb-1">தெரு/இடம் (Street/Location)</div>
            <v-text-field
              v-model="streetName"
              variant="outlined"
              density="compact"
              class="classic-field"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-2">
            <div class="field-label mb-1">விவரம் / Description</div>
            <v-textarea
              v-model="textContent"
              variant="outlined"
              rows="5"
              density="compact"
              class="classic-field"
              hide-details
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <div class="field-label mb-1">நிர்வாகி / Leader</div>
            <v-file-input
              v-model="vattarFile"
              variant="outlined"
              chips
              accept="image/*"
              density="compact"
              class="classic-field"
              hide-details
              @change="onVattarChange"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-btn
          color="#800000"
          block
          size="large"
          prepend-icon="mdi-download"
          class="mt-4 elegant-btn rounded-lg color-white"
          @click="downloadPoster"
        >
          Download Poster
        </v-btn>

        <div
          class="mt-2 text-center developer-credit"
          style="font-size: 0.7rem"
        >
          Created By <strong>VIJAY</strong> with
          <v-icon color="#D4AF37" size="x-small">mdi-heart</v-icon>
        </div>
      </v-col>

      <!-- Preview Area -->
      <v-col
        cols="12"
        md="8"
        class="preview-panel d-flex align-center justify-center"
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

import { doc, setDoc, increment } from "firebase/firestore";

export default {
  name: "PosterCreator",
  components: { PosterCanvas },
  data: () => ({
    logoPremium,
    headerPremium,
    imageFiles: [],
    imageUrls: [],
    candidateFile: null,
    candidateUrl: null, // Start empty or with leader
    vattarFile: null,
    vattarUrl: null,
    badgeUrl: badge155,
    selectedLeader: null,
    leaderOptions: [
      { name: "பெரியார் ஈ.வெ.ரா", img: periyarImg },
      { name: "அம்பேத்கர்", img: ambedkarImg },
      { name: "கே. காமராஜர்", img: kamarajarImg },
      { name: "அஞ்சலை அம்மாள்", img: anjalaiAmmalImg },
      { name: "வேலு நாச்சியார்", img: veluNachiyarImg }
    ],
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
    constituencies() {
      // Sort keys (English names) alphabetically
      const sortedKeys = Object.keys(constituenciesMap).sort();
      return sortedKeys.map(enName => ({
        title: `${enName} | ${constituenciesMap[enName]}`,
        value: enName,
        tamil: constituenciesMap[enName]
      }));
    },
    constituencyDisplay() {
      const tamilName = constituenciesMap[this.constituency];
      return tamilName ? `${this.constituency} | ${tamilName}` : this.constituency;
    }
  },
  methods: {
    async onCandidateChange() {
      if (!this.candidateFile) {
        this.candidateUrl = this.selectedLeader || null;
        return;
      }
      this.candidateUrl = await this.readFile(
        this.candidateFile[0] || this.candidateFile,
      );
      this.selectedLeader = null; // Clear leader if manual photo uploaded
    },
    onLeaderSelect(img) {
      if (img) {
        this.candidateUrl = img;
        this.candidateFile = null;
      }
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
  min-height: calc(100vh - 64px);
  background: #f8f5f0; /* Soft paper background */
  font-family: "Merriweather", serif;
}

@media (min-width: 960px) {
  .poster-creator {
    height: calc(100vh - 64px);
    overflow: hidden; /* Lock the main screen only on desktop */
  }
}

.official-header {
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #e8e4db;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
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
.ls-1 {
  letter-spacing: 1px;
}

.controls-panel {
  background: #fffcf9 !important;
  border-right: 1px solid #e8e4db;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.03);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

@media (min-width: 960px) {
  .controls-panel {
    height: 100%;
    overflow-y: auto; /* Internal sidebar scroll only on desktop */
  }
}

.field-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #800000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.classic-field {
  border-radius: 6px;
}

:deep(.classic-field .v-field__outline) {
  --v-field-border-opacity: 0.2;
}

:deep(.classic-field.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 1;
  border-color: #d4af37 !important;
}

:deep(.classic-field .v-field__input) {
  background: white !important;
  border-radius: 8px;
}

:deep(.custom-field.v-field--focused .v-label) {
  color: #ffd700 !important;
}

:deep(.custom-field .v-field__input) {
  font-weight: 500;
  color: #1a1a1a;
}

.preview-panel {
  background: #eceff1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

@media (min-width: 960px) {
  .preview-panel {
    height: 100%;
    padding: 32px;
    overflow: hidden;
  }
}

.canvas-wrapper {
  width: 100%;
  height: 100%;
  max-width: 800px; /* Prevent it from getting too massive on very large mobile screens */
  display: flex;
  align-items: center;
  justify-content: center;
}

.elegant-btn {
  font-weight: 800;
  letter-spacing: 1px;
}
</style>
