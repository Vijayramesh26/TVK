<template>
  <v-container fluid class="pa-0 letter-creator">
    <v-row no-gutters class="creator-row">
      <!-- Letter Sidebar -->
      <v-col cols="12" md="4" class="pa-4 controls-panel">
        <div class="official-header mb-4">
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
                பத்திரிகைச் செய்தி உருவாக்குநர்
              </div>
            </div>
            <v-avatar size="50" class="elevation-2 border-gold">
              <v-img :src="logoPremium"></v-img>
            </v-avatar>
          </div>
          <v-divider class="my-1" color="#800000"></v-divider>
        </div>

        <!-- Document Settings Card -->
        <div class="settings-group mb-4">
          <div class="section-title mb-3">
            <v-icon color="#800000" size="small" class="mr-2">mdi-cog</v-icon>
            ஆவண அமைப்புகள் / Settings
          </div>
          <v-card variant="flat" border class="pa-4 bg-white rounded-lg">
            <v-row dense>
              <v-col cols="6">
                <v-switch
                  v-model="showPressReleaseTitle"
                  label="Title"
                  density="compact"
                  hide-details
                  color="#800000"
                  inset
                  class="compact-switch"
                ></v-switch>
              </v-col>
              <v-col cols="6">
                <v-switch
                  v-model="showRef"
                  label="Ref No"
                  density="compact"
                  hide-details
                  color="#800000"
                  inset
                  class="compact-switch"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <!-- Primary Content Card -->
        <div class="content-group mb-4">
          <div class="section-title mb-3">
            <v-icon color="#800000" size="small" class="mr-2"
              >mdi-fountain-pen-tip</v-icon
            >
            செய்தி விவரங்கள் / Details
          </div>
          <v-card variant="flat" border class="pa-4 bg-white rounded-lg">
            <v-row dense>
              <v-col cols="12">
                <div class="field-label mb-1">தலைப்பு / Headline</div>
                <v-text-field
                  v-model="letterTitle"
                  variant="outlined"
                  density="compact"
                  placeholder="செய்தியின் தலைப்பு..."
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="6" class="mt-3">
                <div class="field-label mb-1">தேதி / Date</div>
                <v-text-field
                  v-model="letterDate"
                  type="date"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="6" class="mt-3">
                <div class="field-label mb-1">வ.எண் / Ref</div>
                <v-text-field
                  v-model="letterRef"
                  variant="outlined"
                  density="compact"
                  placeholder="TVK/PR/26/01"
                  class="neat-field"
                  hide-details
                  :disabled="!showRef"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-3">
                <div class="field-label mb-1">புகைப்படம் / Media</div>
                <v-file-input
                  v-model="letterImageFile"
                  variant="outlined"
                  accept="image/*"
                  density="compact"
                  prepend-icon=""
                  prepend-inner-icon="mdi-camera"
                  placeholder="Upload Image"
                  class="neat-field"
                  hide-details
                  @change="onLetterImageChange"
                ></v-file-input>
              </v-col>

              <v-col cols="12" class="mt-3">
                <div class="field-label mb-1">
                  கையெழுத்து பெயர் / Signatory Name
                </div>
                <v-text-field
                  v-model="letterSignatoryName"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-3">
                <div class="field-label mb-1">பதவி / Posting</div>
                <v-text-field
                  v-model="letterSignatoryPosting"
                  variant="outlined"
                  density="compact"
                  class="neat-field"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-3">
                <div class="field-label mb-1">உள்ளடக்கம் / Body Content</div>
                <v-textarea
                  v-model="letterContent"
                  variant="outlined"
                  rows="10"
                  density="compact"
                  placeholder="Type message here..."
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
          prepend-icon="mdi-file-download"
          class="elegant-btn rounded-xl color-white elevation-4"
          @click="downloadLetter"
        >
          Download Press Release
        </v-btn>

        <div class="mt-auto pt-6 pb-2 text-center text-caption color-grey">
          TVK Digital Media Center • 2026
        </div>
      </v-col>

      <!-- Letter Preview Area -->
      <v-col cols="12" md="8" class="preview-area">
        <div class="canvas-wrapper" style="max-height: 95%">
          <LetterCanvas
            ref="letterCanvas"
            :title="letterTitle"
            :textContent="letterContent"
            :date="letterDate"
            :reference-no="letterRef"
            :image-url="letterImageUrl"
            :show-main-title="showPressReleaseTitle"
            :show-ref="showRef"
            :signatory-name="letterSignatoryName"
            :signatory-posting="letterSignatoryPosting"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LetterCanvas from "../PosterCreator/LetterCanvas.vue";
import logoPremium from "../../assets/tvk-logo-premium.png";

export default {
  name: "LetterCreator",
  components: { LetterCanvas },
  inject: ["t", "currentLang"],
  data: () => ({
    logoPremium,
    letterTitle: "மதுரவாயல் தொகுதி தகவல்",
    letterContent:
      "தமிழக வெற்றிக் கழகத்தின் சார்பாக நடைபெற உள்ள முக்கிய செய்திகள் இங்கே இடம்பெறும்...",
    letterDate: new Date().toISOString().substr(0, 10),
    letterRef: "TVK/PR/2026/01",
    letterImageFile: null,
    letterImageUrl: null,
    showPressReleaseTitle: false,
    showRef: false,
    letterSignatoryName: "ஆகாஷ் R",
    letterSignatoryPosting: "155-வது வட்டக் கழகச் செயலாளர்",
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
  },
  methods: {
    async onLetterImageChange() {
      if (!this.letterImageFile) {
        this.letterImageUrl = null;
        return;
      }
      this.letterImageUrl = await this.readFile(
        this.letterImageFile[0] || this.letterImageFile,
      );
    },
    readFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    },
    downloadLetter() {
      const dataUrl = this.$refs.letterCanvas.exportAsImage();
      const link = document.createElement("a");
      link.download = `tvk-press-release-${this.letterDate}.png`;
      link.href = dataUrl;
      link.click();
    },
  },
};
</script>

<style scoped>
.letter-creator {
  background: #f8f5f0;
}

.creator-row {
  min-height: calc(100vh - 64px);
}

.controls-panel {
  background: #fffcf9 !important;
  border-right: 1px solid #e8e4db;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
}

.official-header {
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #e8e4db;
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

.field-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #800000;
  text-transform: uppercase;
}

.classic-field {
  border-radius: 6px;
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

.neat-field :deep(.v-field) {
  border-radius: 10px !important;
  background: white !important;
  transition: all 0.2s ease;
}

.neat-field :deep(.v-field--focused) {
  border-color: #800000 !important;
  box-shadow: 0 0 0 3px rgba(128, 0, 0, 0.1);
}

.compact-switch :deep(.v-label) {
  font-size: 0.75rem;
  font-weight: 700;
  color: #666;
}

/* Desktop Only: Improved scroll and height management */
@media (min-width: 960px) {
  .letter-creator {
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

  .preview-area {
    height: 100%;
    overflow-y: auto;
    padding: 40px;
    background: #4a4a4a; /* Darker background for better contrast in preview */
  }

  .canvas-wrapper {
    height: auto;
    min-height: min-content;
    padding-bottom: 40px;
  }
}

.preview-area {
  display: flex;
  align-items: flex-start; /* Start from top to allow scrolling */
  justify-content: center;
}

.canvas-wrapper {
  width: 100%;
  max-width: 800px; /* Constrain preview width for better UX */
}

.elegant-btn {
  font-weight: 800;
  letter-spacing: 1px;
}
</style>
