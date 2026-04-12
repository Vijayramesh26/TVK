<template>
  <v-container fluid class="pa-0 fill-height workspace">
    <v-row no-gutters class="fill-height">
      <!-- Sidebar Controls -->
      <v-col cols="12" md="4" class="pa-6 controls-panel">
        <h2 class="text-h4 font-weight-bold mb-6 primary--text">
          Poster Creator
        </h2>

        <v-file-input
          v-model="imageFiles"
          label="Upload Multiple Images"
          prepend-icon="mdi-camera-burst"
          accept="image/*"
          variant="outlined"
          multiple
          chips
          @change="onFilesChange"
          @click:clear="imageUrls = []"
        ></v-file-input>

        <v-text-field
          v-model="textTop"
          label="Headline Text"
          variant="outlined"
          class="mt-4"
        ></v-text-field>

        <v-row dense class="mt-2">
          <v-col cols="6">
            <v-text-field
              v-model="constituencyNo"
              label="Constituency No"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="constituency"
              label="Constituency"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="6">
            <v-text-field
              v-model="partNo"
              label="Part No"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="date"
              label="Date"
              type="date"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          v-model="streetName"
          label="Street Name"
          variant="outlined"
          density="compact"
        ></v-text-field>

        <v-textarea
          v-model="textContent"
          label="Description Content"
          variant="outlined"
          auto-grow
          rows="3"
          class="mt-2"
        ></v-textarea>

        <v-btn
          block
          size="x-large"
          color="primary"
          class="mt-8 download-btn"
          prepend-icon="mdi-download"
          @click="downloadPoster"
        >
          Download Poster
        </v-btn>
      </v-col>

      <!-- Preview Area -->
      <v-col
        cols="12"
        md="8"
        class="preview-panel d-flex align-center justify-center"
      >
        <PosterCanvas
          ref="posterCanvas"
          :image-urls="imageUrls"
          :text-top="textTop"
          :text-content="textContent"
          :constituency-no="constituencyNo"
          :constituency="constituency"
          :part-no="partNo"
          :street-name="streetName"
          :date="date"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PosterCanvas from "./Canvas.vue";

export default {
  name: "PosterCreator",
  components: { PosterCanvas },
  data: () => ({
    imageFiles: [],
    imageUrls: [],
    textTop: "இன்று நமது தேர்தல் பிரச்சாரம்",
    textContent:
      "இன்று ஞாயிற்றுக்கிழமை மாலை 4 மணி அளவில் நமது களப்பணிகளை தொடர்ந்து செயலாற்ற கழகத் தோழர்கள் உறுப்பினர்கள் அனைவரும் திரண்டு வர வேண்டும் என்று அன்புடன் கேட்டுக்கொள்கிறோம்.",
    constituencyNo: "152",
    constituency: "வளசரவாக்கம்",
    partNo: "12",
    streetName: "காந்தி வீதி",
    date: new Date().toISOString().substr(0, 10),
  }),
  methods: {
    async onFilesChange() {
      if (!this.imageFiles || this.imageFiles.length === 0) {
        this.imageUrls = [];
        return;
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
    downloadPoster() {
      const dataUrl = this.$refs.posterCanvas.exportAsImage();
      const link = document.createElement("a");
      link.download = "tvk-poster.png";
      link.href = dataUrl;
      link.click();
    },
  },
};
</script>

<style scoped>
.workspace {
  background: #fafafa;
}
.controls-panel {
  background: white;
  border-right: 1px solid #e0e0e0;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.02);
  z-index: 10;
}
.preview-panel {
  background: #eceff1;
}
.download-btn {
  background: linear-gradient(45deg, #800000, #a52a2a) !important;
  color: white !important;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
