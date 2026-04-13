<template>
  <v-container fluid class="pa-0 poster-creator">
    <v-row no-gutters class="fill-height">
      <!-- Sidebar Controls -->
      <v-col cols="12" md="4" class="pa-10 controls-panel">
        <h2 class="classic-title mb-8">போஸ்டர் கிரியேட்டர் / Poster Creator</h2>

        <div class="field-label mb-1">புகைப்படங்கள் / Photos</div>
        <v-file-input
          v-model="imageFiles"
          variant="outlined"
          multiple
          chips
          persistent-hint
          hint="அதிகபட்சமாக 6 புகைப்படங்கள் (Max 6 photos)"
          class="classic-field mb-4"
          prepend-inner-icon="mdi-camera-burst"
          prepend-icon=""
          @change="onFilesChange"
          @click:clear="imageUrls = []"
        ></v-file-input>

        <div class="field-label mb-1">
          வேட்பாளர் புகைப்படம் / Candidate Photo
        </div>
        <v-file-input
          v-model="candidateFile"
          variant="outlined"
          chips
          class="classic-field mb-6"
          prepend-inner-icon="mdi-account-circle"
          prepend-icon=""
          @change="onCandidateChange"
          @click:clear="candidateUrl = null"
        ></v-file-input>

        <div class="field-label mb-1">தலைப்பு / Headline</div>
        <v-text-field
          v-model="textTop"
          variant="outlined"
          class="classic-field mb-4"
        ></v-text-field>

        <v-row dense>
          <v-col cols="6">
            <div class="field-label mb-1">தொகுதி எண் / Const. No</div>
            <v-text-field
              v-model="constituencyNo"
              variant="outlined"
              density="compact"
              class="classic-field"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <div class="field-label mb-1">பெயர் / Name</div>
            <v-text-field
              v-model="constituency"
              variant="outlined"
              density="compact"
              class="classic-field"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense class="mt-2">
          <v-col cols="6">
            <div class="field-label mb-1">பாகம் எண் / Part No</div>
            <v-text-field
              v-model="partNo"
              variant="outlined"
              density="compact"
              class="classic-field"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <div class="field-label mb-1">தேதி / Date</div>
            <v-text-field
              v-model="date"
              type="date"
              variant="outlined"
              density="compact"
              class="classic-field"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="field-label mb-1 mt-4">தெரு / இடம் (Street / Location)</div>
        <v-text-field
          v-model="streetName"
          variant="outlined"
          density="compact"
          class="classic-field"
        ></v-text-field>

        <div class="field-label mb-1 mt-4">விவரம் / Description</div>
        <v-textarea
          v-model="textContent"
          variant="outlined"
          rows="3"
          class="classic-field"
        ></v-textarea>

        <v-btn
          color="primary"
          block
          size="x-large"
          prepend-icon="mdi-download"
          class="mt-8 elegant-btn"
          @click="downloadPoster"
        >
          பதிவிறக்கம் / Download
        </v-btn>

        <div class="mt-auto pt-8 text-center developer-credit">
          Created By <strong>VIJAY</strong> with
          <v-icon color="#D4AF37" size="small">mdi-heart</v-icon>
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
            :constituency="constituency"
            :part-no="partNo"
            :street-name="streetName"
            :date="date"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PosterCanvas from "./Canvas.vue";
import candidateImg from "../../assets/candidate.jpg";
import { db } from "../../firebase";
import { doc, setDoc, increment } from "firebase/firestore";

export default {
  name: "PosterCreator",
  components: { PosterCanvas },
  data: () => ({
    imageFiles: [],
    imageUrls: [],
    candidateFile: null,
    candidateUrl: candidateImg,
    textTop: "இன்று நமது தேர்தல் பிரச்சாரம்",
    textContent:
      "இன்று ஞாயிற்றுக்கிழமை மாலை 4 மணி அளவில் நமது களப்பணிகளை தொடர்ந்து செயலாற்ற கழகத் தோழர்கள் உறுப்பினர்கள் அனைவரும் திரண்டு வர வேண்டும் என்று அன்புடன் கேட்டுக்கொள்கிறோம்.",
    constituencyNo: "155",
    constituency: "மதுரவாயல்",
    partNo: "215",
    streetName: "பெரியார் சாலை",
    date: new Date().toISOString().substr(0, 10),
  }),
  methods: {
    async onCandidateChange() {
      if (!this.candidateFile) {
        this.candidateUrl = null;
        return;
      }
      this.candidateUrl = await this.readFile(
        this.candidateFile[0] || this.candidateFile,
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
        const statsRef = doc(db, "poster_stats", this.constituency || "Unknown");
        await setDoc(statsRef, {
          count: increment(1),
          last_downloaded: new Date().toISOString()
        }, { merge: true });
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
  height: 100vh;
  background: #f8f5f0; /* Soft paper background */
  font-family: "Merriweather", serif;
}

.classic-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 50px;
  height: 3px;
  background: #d4af37; /* Classic Gold */
}

.controls-panel {
  background: white !important;
  border-right: 1px solid #e8e4db;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.03);
  z-index: 10;
  display: flex;
  flex-direction: column;
  color: #800000 !important;
  font-weight: 600;
}

.classic-field {
  border-radius: 8px;
}

:deep(.classic-field .v-field__outline) {
  --v-field-border-opacity: 0.3;
  border-color: #800000 !important;
}

:deep(.classic-field.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 1;
  border-color: #d4af37 !important;
  border-width: 2px !important;
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
  overflow-y: auto;
}

.download-btn {
  background: linear-gradient(45deg, #800000, #a52a2a) !important;
  color: white !important;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
