<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <div class="text-center mb-8">
          <h1 class="text-h3 font-weight-black color-maroon mb-2">
            {{ isTamil ? 'உறுப்பினர் அடையாள அட்டை' : 'Digital Supporter Card' }}
          </h1>
          <p class="text-subtitle-1 text-grey-darken-1">
            {{ isTamil ? 'தமிழக வெற்றிக் கழகத்தின் அதிகாரப்பூர்வ ஆதரவாளர் அட்டையை நீங்களே உருவாக்கி மகிழுங்கள்.' : 'Create your official TVK supporter identity card and share it with pride.' }}
          </p>
        </div>

        <v-row>
          <!-- Controls -->
          <v-col cols="12" md="6">
            <v-card class="pa-6 rounded-xl elevation-4 border-gold">
              <div class="field-group mb-4">
                <label class="d-block mb-1 font-weight-bold color-maroon">பெயர் / FULL NAME</label>
                <v-text-field
                  v-model="name"
                  placeholder="Enter your name"
                  variant="outlined"
                  density="comfortable"
                  class="rounded-lg"
                  hide-details
                ></v-text-field>
              </div>

              <v-row dense>
                <v-col cols="12" sm="6">
                  <div class="field-group mb-4">
                    <label class="d-block mb-1 font-weight-bold color-maroon text-truncate">மாவட்டம் / DISTRICT</label>
                    <v-autocomplete
                      v-model="district"
                      :items="uniqueDistricts"
                      placeholder="Select District"
                      variant="outlined"
                      density="comfortable"
                      class="rounded-lg"
                      hide-details
                      @update:model-value="onDistrictChange"
                    ></v-autocomplete>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="field-group mb-4">
                    <label class="d-block mb-1 font-weight-bold color-maroon text-truncate">தொகுதி / CONSTITUENCY</label>
                    <v-autocomplete
                      v-model="constituency"
                      :items="filteredConstituencies"
                      placeholder="Select Constituency"
                      variant="outlined"
                      density="comfortable"
                      class="rounded-lg"
                      hide-details
                      @update:model-value="onConstituencyChange"
                    ></v-autocomplete>
                  </div>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12">
                  <div class="field-group mb-4">
                    <label class="d-block mb-1 font-weight-bold color-maroon">இரத்த வகை / BLOOD GROUP</label>
                    <v-select
                      v-model="bloodGroup"
                      :items="['A +ve', 'A -ve', 'B +ve', 'B -ve', 'O +ve', 'O -ve', 'AB +ve', 'AB -ve']"
                      variant="outlined"
                      density="comfortable"
                      class="rounded-lg"
                      hide-details
                    ></v-select>
                  </div>
                </v-col>
              </v-row>

              <div class="field-group mb-8">
                <label class="d-block mb-2 font-weight-bold color-maroon">புகைப்படம் / PHOTO</label>
                <v-file-input
                  v-model="photoFile"
                  accept="image/*"
                  prepend-icon=""
                  prepend-inner-icon="mdi-camera"
                  variant="outlined"
                  label="Upload your photo"
                  class="rounded-lg custom-file-input"
                  hide-details
                  @change="onPhotoChange"
                ></v-file-input>
              </div>

              <v-btn
                block
                color="#800000"
                size="x-large"
                class="rounded-pill font-weight-black text-white mb-4"
                prepend-icon="mdi-download"
                @click="downloadCard"
              >
                DOWNLOAD ID CARD
              </v-btn>
              
              <v-btn
                block
                variant="outlined"
                color="#800000"
                size="large"
                class="rounded-pill font-weight-bold"
                prepend-icon="mdi-share-variant"
                @click="shareCard"
              >
                SHARE WITH FRIENDS
              </v-btn>
            </v-card>
            
            <div class="pa-4 text-center">
              <p class="text-caption text-grey">
                * This is a digital supporter card for personal use and social media sharing. 
                It does not represent official party membership unless registered formally.
              </p>
            </div>
          </v-col>

          <!-- Preview -->
          <v-col cols="12" md="6" class="d-flex justify-center align-start">
            <div class="preview-wrapper">
              <IDCardCanvas
                ref="idCanvas"
                :name="name"
                :district="district"
                :constituency="constituency"
                :blood-group="bloodGroup"
                :photo-url="photoUrl"
                :member-id="memberId"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import IDCardCanvas from "./Canvas.vue";
import { votingData } from "../../data/votingData";

export default {
  name: "IDCardCreator",
  components: { IDCardCanvas },
  inject: ["t", "currentLang"],
  data: () => ({
    name: "",
    district: "",
    constituency: "",
    bloodGroup: "O +ve",
    photoFile: null,
    photoUrl: null,
    memberId: "",
    allData: votingData
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    uniqueDistricts() {
      return [...new Set(this.allData.map(v => v.district))].sort();
    },
    filteredConstituencies() {
      if (!this.district) return this.allData.map(v => v.name).sort();
      return this.allData
        .filter(v => v.district === this.district)
        .map(v => v.name)
        .sort();
    }
  },
  mounted() {
    this.generateId();
    // Default selection
    this.district = "Chennai";
    this.constituency = "Perambur";
  },
  methods: {
    onDistrictChange() {
      // Clear constituency if it doesn't belong to the new district
      const belongs = this.allData.find(v => v.name === this.constituency && v.district === this.district);
      if (!belongs) {
        this.constituency = this.filteredConstituencies[0] || "";
      }
    },
    onConstituencyChange(val) {
      if (!val) return;
      const found = this.allData.find(v => v.name === val);
      if (found && found.district !== this.district) {
        this.district = found.district;
      }
    },
    generateId() {
      const year = 2026;
      const ts = Date.now().toString().slice(-4);
      const random = Math.floor(1000 + Math.random() * 9000);
      this.memberId = `TVK-${year}-${ts}-${random}`;
    },
    async onPhotoChange() {
      if (!this.photoFile) {
        this.photoUrl = null;
        return;
      }
      const file = Array.isArray(this.photoFile) ? this.photoFile[0] : this.photoFile;
      if (file) {
        this.photoUrl = await this.readFile(file);
      }
    },
    readFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    },
    downloadCard() {
      const dataUrl = this.$refs.idCanvas.exportAsImage();
      const link = document.createElement("a");
      link.download = `tvk-supporter-${this.name || 'card'}.png`;
      link.href = dataUrl;
      link.click();
    },
    async shareCard() {
      if (navigator.share) {
        const dataUrl = this.$refs.idCanvas.exportAsImage();
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'tvk-card.png', { type: 'image/png' });
        try {
          await navigator.share({
            files: [file],
            title: 'My TVK Supporter Card',
            text: 'I just created my TVK Digital Supporter Card! Join the movement at tvk.party',
          });
        } catch (err) {
          console.error("Share failed:", err);
        }
      } else {
        this.downloadCard();
        alert("Share not supported. Image downloaded successfully!");
      }
    }
  }
};
</script>

<style scoped>
.preview-wrapper {
  width: 100%;
  max-width: 400px;
  position: sticky;
  top: 100px;
}

.color-maroon {
  color: #800000;
}

.border-gold {
  border: 2px solid #d4af37 !important;
}

label {
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.9;
}

:deep(.v-field__input) {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  min-height: 48px !important;
}
</style>
