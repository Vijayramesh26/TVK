<template>
  <v-container class="py-16">
    <!-- Header -->
    <div class="text-center mb-12">
      <v-avatar size="100" class="mb-4 border-gold-thick elevation-10">
        <v-img :src="leaderImage" cover></v-img>
      </v-avatar>
      <h1 class="text-h3 font-weight-black color-maroon mb-2">
        {{ isTamil ? 'தளபதி ஆவணக் காப்பகம் (AI)' : 'Thalapathy Archive AI' }}
      </h1>
      <p class="text-h6 text-grey-darken-1">
        {{ isTamil ? 'தளபதியின் உரைகள் மற்றும் கொள்கைகளைத் தேடுங்கள்.' : 'Search through Thalapathy’s speeches, policies, and vision.' }}
      </p>
    </div>

    <!-- Search Box -->
    <v-card class="max-w-md mx-auto rounded-xl elevation-12 mb-12 border-gold-thin overflow-hidden">
      <v-toolbar color="#800000" density="comfortable">
        <v-icon start class="ml-4">mdi-robot-outline</v-icon>
        <v-toolbar-title class="text-subtitle-1 font-weight-bold">
          {{ isTamil ? 'ஏதேனும் கேளுங்கள்...' : 'Ask anything...' }}
        </v-toolbar-title>
      </v-toolbar>
      
      <v-card-text class="pa-6">
        <v-text-field
          v-model="searchQuery"
          @keyup.enter="performSearch"
          :placeholder="isTamil ? 'எ.கா: கல்வி, சமூக நீதி, விவசாயம்...' : 'e.g., Education, Social Justice, Agriculture...'"
          variant="outlined"
          color="#800000"
          prepend-inner-icon="mdi-magnify"
          hide-details
          class="mb-4"
        ></v-text-field>

        <div class="d-flex flex-wrap gap-2">
          <v-chip v-for="tag in suggestedTags" :key="tag" 
                  size="small" color="#D4AF37" variant="outlined" 
                  @click="searchWithTag(tag)" class="cursor-pointer">
            {{ tag }}
          </v-chip>
        </div>
      </v-card-text>

      <v-divider></v-divider>
      
      <v-btn block color="#800000" size="large" rounded="0" @click="performSearch" :loading="searching">
        {{ isTamil ? 'தேடு' : 'Search AI' }}
      </v-btn>
    </v-card>

    <!-- Search Results -->
    <div v-if="results.length > 0" class="results-container">
      <h3 class="text-h5 font-weight-bold mb-6 color-maroon d-flex align-center">
        <v-icon color="#800000" class="mr-2">mdi-text-search</v-icon>
        {{ isTamil ? 'தேடல் முடிவுகள்' : 'Search Results' }} ({{ results.length }})
      </h3>

      <v-row>
        <v-col v-for="(result, idx) in results" :key="idx" cols="12" md="6">
          <v-card class="result-card rounded-xl border-gold-thin elevation-4 h-100">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-chip size="x-small" color="#800000" class="mr-2">{{ result.event_date }}</v-chip>
                <span class="text-caption font-weight-bold text-grey">{{ result.event_title }}</span>
              </div>
              
              <div class="quote-text mb-4">
                <v-icon color="#D4AF37" size="small" class="mr-2">mdi-format-quote-open</v-icon>
                <span class="text-body-1 font-weight-medium">"{{ isTamil ? result.quote_ta : result.quote_en }}"</span>
              </div>

              <div class="text-caption text-grey-darken-1 mb-4 italic">
                {{ isTamil ? result.context_ta : result.context_en }}
              </div>

              <v-btn v-if="result.video_url" 
                     :href="result.video_url" target="_blank"
                     variant="tonal" color="#800000" size="small" prepend-icon="mdi-youtube">
                {{ isTamil ? 'காணொளியைக் காண்க' : 'Watch Video' }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- No Results / Initial State -->
    <div v-else-if="searched && results.length === 0" class="text-center py-12">
      <v-icon size="80" color="grey-lighten-1">mdi-alert-circle-outline</v-icon>
      <p class="text-h6 text-grey mt-4">
        {{ isTamil ? 'மன்னிக்கவும், முடிவுகள் எதுவும் இல்லை.' : 'Sorry, no results found for your query.' }}
      </p>
    </div>
  </v-container>
</template>

<script>
import speechesData from "../../../tvk_vijay_speeches.json";
import leaderImage from "../../assets/leaders/vijay-leader.png";

export default {
  name: "AISearch",
  inject: ["currentLang"],
  data: () => ({
    leaderImage,
    searchQuery: "",
    searching: false,
    searched: false,
    results: [],
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    suggestedTags() {
      return this.isTamil 
        ? ["கல்வி", "சமூக நீதி", "விவசாயம்", "திராவிடம்", "மாற்றம்"] 
        : ["Education", "Social Justice", "Agriculture", "Dravidian", "Change"];
    }
  },
  methods: {
    searchWithTag(tag) {
      this.searchQuery = tag;
      this.performSearch();
    },
    async performSearch() {
      if (!this.searchQuery.trim()) return;

      this.searching = true;
      this.searched = false;
      
      // Simulate AI Processing Delay
      await new Promise(r => setTimeout(r, 800));

      const query = this.searchQuery.toLowerCase();
      const allResults = [];

      speechesData.speeches.forEach(speech => {
        if (!speech.key_quotes) return;
        speech.key_quotes.forEach(q => {
          const textMatch = 
            q.quote_en.toLowerCase().includes(query) || 
            q.quote_ta.includes(query) ||
            q.context_en.toLowerCase().includes(query) ||
            q.context_ta.includes(query) ||
            speech.context.en.toLowerCase().includes(query) ||
            speech.context.ta.includes(query) ||
            speech.title.toLowerCase().includes(query) ||
            speech.title_ta.includes(query);

          if (textMatch) {
            allResults.push({
              event_title: this.isTamil ? speech.title_ta : speech.title,
              event_date: speech.date,
              quote_en: q.quote_en,
              quote_ta: q.quote_ta,
              context_en: q.context_en,
              context_ta: q.context_ta,
              video_url: speech.video_url
            });
          }
        });
      });

      this.results = allResults;
      this.searching = false;
      this.searched = true;
    }
  }
};
</script>

<style scoped>
.color-maroon { color: #800000; }
.border-gold-thick { border: 4px solid #D4AF37 !important; }
.border-gold-thin { border: 1px solid rgba(212, 175, 55, 0.3) !important; }

.result-card {
  transition: transform 0.3s ease;
}

.result-card:hover {
  transform: translateY(-5px);
}

.quote-text {
  border-left: 4px solid #D4AF37;
  padding-left: 16px;
}

.max-w-md { max-width: 600px; }
.italic { font-style: italic; }
</style>
