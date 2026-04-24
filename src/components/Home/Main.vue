<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section position-relative d-flex align-center">
      <!-- Background Overlays -->
      <div class="hero-bg-image"></div>
      <div class="hero-gradient-overlay"></div>

      <!-- Particles / Abstract decor -->
      <div class="abstract-shape shape-glow-1"></div>
      <div class="abstract-shape shape-glow-2"></div>

      <v-container class="position-relative z-10 pt-16">
        <v-row align="center">
          <v-col cols="12" md="8" lg="7" class="text-center text-md-left">
            <v-chip
              color="#D4AF37"
              variant="outlined"
              class="mb-6 font-weight-bold tracking-wide px-4 py-2 border-gold-thin text-uppercase"
            >
              {{ t("hero.title") }}
            </v-chip>

            <h1
              class="hero-title text-white font-weight-black mb-4 lh-base"
              style="font-size: clamp(3rem, 6vw, 5.5rem)"
            >
              {{ t("hero.subtitle").split(" ")[0] }} <br />
              <span class="color-gold"
                >{{ t("hero.subtitle").split(" ").slice(1).join(" ") }}!</span
              >
            </h1>

            <p
              class="hero-subtitle text-white opacity-90 mb-10 text-h6 font-weight-regular max-w-lg mx-auto mx-md-0 lh-relaxed"
            >
              {{ t("hero.tagline") }}
            </p>

            <div
              class="d-flex flex-column flex-sm-row justify-center justify-md-start gap-4 mb-10"
            >
              <v-btn
                color="#D4AF37"
                size="x-large"
                class="rounded-pill font-weight-bold elevation-8 btn-join px-8"
                append-icon="mdi-arrow-right"
                href="https://tvk.family"
                target="_blank"
              >
                {{ t("hero.join") }}
              </v-btn>
              <v-btn
                color="white"
                variant="outlined"
                size="x-large"
                class="rounded-pill font-weight-bold px-8"
                to="/kolgai"
              >
                {{ t("hero.principles") }}
              </v-btn>
              <v-btn
                color="#800000"
                size="x-large"
                class="rounded-pill font-weight-bold px-8 text-white elevation-4"
                prepend-icon="mdi-file-pdf-box"
                href="/TVK_MANIFESTO_2026.pdf"
                target="_blank"
                download
              >
                {{ t("ideology.downloadManifesto").split("(")[0] }}
              </v-btn>
            </div>

            <!-- Membership Counter -->
            <div
              class="membership-counter d-flex align-center justify-center justify-md-start mt-10 mt-md-16 position-relative z-10"
            >
              <div class="text-center text-md-left">
                <div
                  class="text-h4 text-md-h3 font-weight-black text-white mb-1 glow-text"
                >
                  {{ formatNumber(displayCount) }}+
                </div>
                <div
                  class="text-overline font-weight-bold color-gold tracking-widest"
                >
                  {{ t("hero.membersJoined") }}
                </div>
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            md="4"
            lg="5"
            class="d-none d-md-flex justify-center position-relative"
          >
            <!-- Central Avatar holding the logo or leader image if available -->
            <v-avatar
              size="320"
              class="hero-avatar elevation-16 border-gold-thick"
              color="white"
            >
              <v-img
                :src="heroImage"
                cover
                alt="தமிழக வெற்றிக் கழகம் தலைவர் தளபதி விஜய்"
              ></v-img>
            </v-avatar>
            <!-- Decorative circle behind avatar -->
            <div class="hero-avatar-ring"></div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Scroll Indicator -->
      <div
        class="scroll-indicator d-flex flex-column align-center w-100 pb-8 text-white opacity-80"
      >
        <span
          class="text-caption mb-2 font-weight-bold letter-spacing-1 text-uppercase"
          >கீழே செல்லவும்</span
        >
        <v-icon class="animate-bounce">mdi-chevron-down</v-icon>
      </div>
    </section>

    <!-- Election Status & Results Banner -->
    <section
      class="election-banner position-relative overflow-hidden elevation-20"
    >
      <v-parallax
        :src="electionBg"
        scale="1.1"
        :height="isMobile ? 1100 : 850"
        class="py-10"
      >
        <div class="banner-overlay absolute-inset"></div>

        <v-container class="position-relative z-10 py-10">
          <v-row align="center" justify="space-between">
            <v-col cols="12" md="7" class="text-center text-md-left">
              <div
                class="d-flex align-center justify-center justify-md-start mb-6"
              >
                <v-chip
                  color="#D4AF37"
                  class="font-weight-black px-6 py-2 elevation-8 text-uppercase pulse-gold"
                  variant="elevated"
                >
                  {{ t("election.votingSummary") }} 2026
                </v-chip>
                <v-chip
                  variant="outlined"
                  color="white"
                  class="ml-4 border-white-thin d-none d-sm-flex"
                >
                  <v-icon start icon="mdi-shield-check"></v-icon>
                  {{ t("election.officialData") }}
                </v-chip>
              </div>

              <h2
                class="display-promo font-weight-black mb-6 glow-text lh-tight text-white mb-8"
                style="font-size: clamp(2.5rem, 6vw, 4.5rem); max-width: 900px"
              >
                {{ t("election.resultsInfo") }}
              </h2>

              <v-row class="mb-10 px-2" justify="center" justify-md="start">
                <v-col cols="12" sm="6" lg="5">
                  <div
                    class="stat-item glass-effect pa-6 rounded-xl border-white-thin"
                  >
                    <div class="text-overline color-gold font-weight-bold mb-1">
                      {{ isTamil ? "பதிவான வாக்குகள்" : "Votes Polled" }}
                    </div>
                    <div class="text-h3 font-weight-black text-white">
                      4.82 <span class="text-h5">Cr</span>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" lg="5">
                  <div
                    class="stat-item glass-effect pa-6 rounded-xl border-white-thin"
                  >
                    <div class="text-overline color-gold font-weight-bold mb-1">
                      {{ isTamil ? "மொத்த வாக்காளர்கள்" : "Total Voters" }}
                    </div>
                    <div class="text-h3 font-weight-black text-white">
                      5.67 <span class="text-h5">Cr</span>
                    </div>
                  </div>
                </v-col>
              </v-row>

              <div class="d-flex justify-center justify-md-start">
                <v-btn
                  to="/results"
                  size="x-large"
                  class="font-weight-black border-gold-thin rounded-pill px-10 elevation-12"
                  prepend-icon="mdi-poll"
                  color="#D4AF37"
                >
                  {{
                    isTamil ? "தொகுதி வாரியாகக் காண்க" : "View Detailed Results"
                  }}
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" md="5" class="d-none d-md-flex justify-end">
              <v-card
                variant="outlined"
                color="#D4AF37"
                class="rounded-circle pa-4 border-gold-thin pulse-gold"
              >
                <v-icon icon="mdi-vote" size="80" color="white"></v-icon>
              </v-card>
            </v-col>
          </v-row>

          <!-- Bottom Filling Area: Roadmap / Process -->
          <v-divider
            class="mt-16 mb-10 border-white-thin opacity-20"
          ></v-divider>

          <v-row class="px-4" justify="center">
            <v-col
              cols="12"
              sm="4"
              v-for="(phase, index) in [
                {
                  icon: 'mdi-vote',
                  label: isTamil ? 'வாக்குப்பதிவு' : 'Polling',
                  status: isTamil ? 'முடிந்தது' : 'Completed',
                  color: 'success',
                },
                {
                  icon: 'mdi-clipboard-list-outline',
                  label: isTamil ? 'சரிபார்ப்பு' : 'Verification',
                  status: isTamil ? 'நடைபெறுகிறது' : 'In Progress',
                  color: 'warning',
                },
                {
                  icon: 'mdi-trophy-variant',
                  label: isTamil ? 'தேர்தல் முடிவு' : 'Final Results',
                  status: 'May 04, 2026',
                  color: 'info',
                },
              ]"
              :key="index"
            >
              <div
                class="glass-effect pa-4 rounded-xl d-flex align-center border-white-thin h-100"
              >
                <v-avatar
                  size="48"
                  :color="phase.color"
                  variant="tonal"
                  class="mr-4"
                >
                  <v-icon :icon="phase.icon"></v-icon>
                </v-avatar>
                <div>
                  <div
                    class="text-caption font-weight-bold color-gold uppercase opacity-80"
                  >
                    {{ phase.label }}
                  </div>
                  <div class="text-subtitle-2 font-weight-black text-white">
                    {{ phase.status }}
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </section>

    <!-- Vision & Mission Stats / Pillars -->
    <section class="py-16 bg-white position-relative overflow-hidden">
      <v-container class="py-10">
        <div class="text-center mb-16">
          <h2 class="text-h3 font-weight-black color-maroon mb-4">
            {{
              currentLang() === "ta"
                ? "நமது தொலைநோக்கு"
                : "Our Vision & Mission"
            }}
          </h2>
          <div class="title-divider mx-auto bg-gold mb-6"></div>
          <p
            class="text-h6 text-grey-darken-2 font-weight-regular max-width-800 mx-auto"
          >
            {{
              currentLang() === "ta"
                ? "ஊழலற்ற, நேர்மையான, வெளிப்படையான, சாதிமத சார்பற்ற அரசாங்கத்தை தமிழக மக்களுக்கு வழங்குவதே எங்கள் தலையாய நோக்கம்."
                : "Our primary goal is to provide the people of Tamil Nadu with a corruption-free, honest, transparent, and secular government."
            }}
          </p>
        </div>

        <v-row class="mt-8">
          <v-col cols="12" md="4" v-for="(pillar, i) in pillars" :key="i">
            <v-card
              class="pillar-card h-100 rounded-xl pa-8 text-center glass-effect-light elevation-2 hover-lift border-transparent"
            >
              <div class="pillar-icon-wrapper mb-6 mx-auto bg-maroon-light">
                <v-icon :icon="pillar.icon" size="40" color="#800000"></v-icon>
              </div>
              <h3 class="text-h5 font-weight-bold color-maroon mb-3">
                {{
                  currentLang() === "ta"
                    ? pillar.id === "equality"
                      ? "சமத்துவம்"
                      : pillar.id === "governance"
                        ? "நேர்மையான நிர்வாகம்"
                        : "மக்களுக்கான அரசு"
                    : pillar.id === "equality"
                      ? "Equality"
                      : pillar.id === "governance"
                        ? "Honest Governance"
                        : "People's Government"
                }}
              </h3>
              <p class="text-body-1 text-grey-darken-2 lh-relaxed">
                {{
                  currentLang() === "ta"
                    ? pillar.id === "equality"
                      ? "பிறப்பொக்கும் எல்லா உயிர்க்கும் என்ற உயரிய தத்துவத்தின் அடிப்படையில் அனைவருக்கும் சம உரிமை, சம வாய்ப்பு உறுதி செய்தல்."
                      : pillar.id === "governance"
                        ? "தடை இல்லாத, வெளிப்படையான, ஊழலற்ற நல்லாட்சியை மக்களிடத்தில் கொண்டு சேர்ப்பது."
                        : "அடித்தட்டு மக்கள், விவசாயிகள் மற்றும் இளைஞர்களின் நலனை முன்னிறுத்தும் மக்கள் நல அரசு."
                    : pillar.id === "equality"
                      ? 'Ensuring equal rights and opportunities for all based on the noble principle "All are born equal".'
                      : pillar.id === "governance"
                        ? "Delivering transparent, corruption-free, and seamless good governance to the people."
                        : "A welfare government focused on the well-being of the common man, farmers, and youth."
                }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Candidates Highlights Section -->
    <section class="py-16 bg-grey-lighten-4">
      <v-container class="py-10">
        <v-row align="center">
          <v-col cols="12" md="6" class="pr-md-10 mb-8 mb-md-0">
            <v-img
              :src="sectionImage"
              class="rounded-xl elevation-10 w-100"
              aspect-ratio="1.5"
              cover
              alt="த.வெ.க 2026 சட்டமன்றத் தேர்தல் பிரச்சாரம்"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="text-h3 font-weight-black color-maroon mb-4">
              {{ t("nav.candidates") }} 2026
            </h2>
            <div class="title-divider bg-gold mb-6"></div>
            <p
              class="text-h6 text-grey-darken-2 font-weight-regular mb-8 lh-relaxed"
            >
              {{
                currentLang() === "ta"
                  ? "எதிர்வரும் 2026 தமிழ்நாடு சட்டமன்றத் தேர்தலில் த.வெ.க சார்பாக போட்டியிடும் வேட்பாளர்களின் அதிகாரப்பூர்வ பட்டியலை இங்கே காணலாம்."
                  : "Official list of TVK candidates contesting in the upcoming 2026 Tamil Nadu Assembly Elections."
              }}
            </p>
            <v-btn
              color="#800000"
              size="x-large"
              class="rounded-pill font-weight-bold px-8 elevation-4"
              prepend-icon="mdi-account-group"
              to="/candidates"
            >
              {{ t("nav.candidates") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- News Section -->
    <section class="py-16 bg-white overflow-hidden">
      <v-container>
        <div class="d-flex justify-space-between align-end mb-10">
          <div>
            <h2 class="text-h3 font-weight-black color-maroon mb-2">
              {{ t("sections.news") }}
            </h2>
            <div class="title-divider bg-gold"></div>
          </div>
          <v-btn
            variant="text"
            color="#800000"
            class="font-weight-bold p-0"
            append-icon="mdi-chevron-right"
          >
            {{ t("sections.viewAll") }}
          </v-btn>
        </div>

        <div class="news-scroll-container pb-6 hide-scrollbar">
          <div class="news-flex-row">
            <v-card
              v-for="(item, i) in sortedNews"
              :key="item.id"
              class="news-scroll-card rounded-xl overflow-hidden hover-lift border-transparent elevation-10 mx-3"
              @click="$router.push(`/news/${item.id}`)"
            >
              <v-img
                :src="item.image"
                height="260"
                cover
                class="position-relative"
              >
                <!-- Poster Gradient Overlay -->
                <div class="poster-gradient absolute-inset"></div>

                <!-- Dynamic Poster Overlay -->
                <div class="news-poster-overlay absolute-inset overflow-hidden">
                  <!-- Large Vijay Portrait (Standardized) -->
                  <v-img
                    :src="heroImage"
                    alt="Vijay"
                    class="poster-vijay-portrait"
                    width="140"
                    cover
                  ></v-img>

                  <!-- Poster Content -->
                  <div
                    class="absolute-inset d-flex flex-column justify-space-between pa-4 z-10"
                  >
                    <div class="d-flex justify-start">
                      <div
                        class="news-tag px-4 py-1 text-caption font-weight-bold text-white bg-maroon rounded-pill elevation-4"
                      >
                        {{ item.tag }}
                      </div>
                    </div>

                    <!-- Official Area Label -->
                    <div
                      class="news-official-label pa-3 rounded-lg elevation-10"
                    >
                      <div
                        class="text-caption font-weight-black color-gold text-uppercase tracking-widest mb-1"
                      >
                        {{ isTamil ? "தளபதி விஜய்" : "THALAPATHY VIJAY" }}
                      </div>
                      <div
                        class="text-h5 font-weight-black text-white letter-spacing-2"
                      >
                        {{ isTamil ? item.location : item.locationEn }}
                      </div>
                    </div>
                  </div>
                </div>
              </v-img>
              <v-card-text class="pa-6">
                <div
                  class="text-caption font-weight-bold text-grey-lighten-1 mb-2"
                >
                  {{ t(`news.item${item.id + 1}.date`) }}
                </div>
                <h3
                  class="text-h6 font-weight-bold color-maroon line-clamp-2 lh-tight"
                >
                  {{ t(`news.item${item.id + 1}.title`) }}
                </h3>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <!-- Scroll Indicators for Desktop -->
        <div class="text-center mt-4 d-none d-md-block">
          <div class="d-flex align-center justify-center gap-2">
            <v-icon
              icon="mdi-chevron-left"
              class="color-grey opacity-50"
            ></v-icon>
            <span class="text-caption font-weight-bold color-grey">{{
              isTamil ? "கிடைமட்டமாக உருட்டவும்" : "Scroll Horizontally"
            }}</span>
            <v-icon
              icon="mdi-chevron-right"
              class="color-grey opacity-50"
            ></v-icon>
          </div>
        </div>
      </v-container>
    </section>

    <!-- Ideological Guides Section -->
    <section class="py-16 bg-white overflow-hidden border-top">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-black color-maroon mb-2">
            {{ t("ideology.leadersTitle") }}
          </h2>
          <div class="title-divider mx-auto bg-gold mb-4"></div>
          <p class="text-h6 text-grey-darken-1 font-weight-regular">
            {{ t("ideology.leadersDesc") }}
          </p>
        </div>

        <div class="d-flex justify-center flex-wrap" style="gap: 40px">
          <div
            v-for="leader in leaders"
            :key="leader.id"
            class="leader-guide-card text-center"
          >
            <v-hover v-slot="{ isHovering, props }">
              <div v-bind="props" class="position-relative">
                <v-avatar
                  size="160"
                  class="leader-avatar elevation-12 border-gold-thick mb-4 transition-all"
                  :class="{ 'leader-avatar-hover': isHovering }"
                >
                  <v-img :src="leader.image" cover></v-img>
                </v-avatar>
                <div
                  class="leader-name-label font-weight-black color-maroon text-subtitle-1"
                >
                  {{ leader.name }}
                </div>
              </div>
            </v-hover>
          </div>
        </div>
      </v-container>
    </section>

    <!-- Gallery Section -->
    <section class="py-16 bg-grey-lighten-4 overflow-hidden">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-black color-maroon mb-2">
            {{ t("sections.gallery") }}
          </h2>
          <div class="title-divider mx-auto bg-gold mb-6"></div>
        </div>

        <v-row>
          <v-col v-for="img in gallery" :key="img.id" cols="6" md="3">
            <v-card
              class="gallery-card rounded-xl overflow-hidden elevation-2 cursor-pointer"
            >
              <v-img
                :src="img.image"
                aspect-ratio="1"
                cover
                class="transition-all hover-zoom"
              >
                <div
                  class="gallery-overlay d-flex align-center justify-center text-white opacity-0 transition-all"
                >
                  <v-icon size="32">mdi-magnify-plus</v-icon>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- Party Anthems Section -->
    <Anthems />

    <!-- Final Call to Action -->
    <section
      class="py-16 cta-section position-relative text-center d-flex align-center justify-center"
    >
      <!-- Gradient overlay -->
      <div class="cta-overlay absolute-inset"></div>
      <v-container class="position-relative z-10 py-10">
        <h2 class="text-h3 text-md-h2 font-weight-black text-white mb-6">
          {{ t("ctaHome.title") }}
        </h2>
        <p
          class="text-h6 text-white opacity-90 max-width-800 mx-auto mb-10 lh-relaxed"
        >
          {{ t("ctaHome.subtitle") }}
        </p>
        <v-btn
          color="#D4AF37"
          size="x-large"
          class="rounded-pill text-maroon font-weight-black px-12 elevation-8 heartbeat"
          href="https://tvk.family"
          target="_blank"
        >
          {{ t("hero.join") }}
        </v-btn>
      </v-container>
    </section>
  </div>
</template>

<script>
import heroImage from "../../assets/16170916.png";
import sectionImage from "../../assets/16170924.png";
import rallyImg from "../../assets/generated/refined_rally.png";
import governanceImg from "../../assets/generated/visionary_hub.png";
import villageImg from "../../assets/generated/village_development.png";
import visionImg from "../../assets/generated/vision.png";
import periyarImg from "../../assets/leaders/periyar.png";
import kamarajarImg from "../../assets/leaders/kamarajar.png";
import ambedkarImg from "../../assets/leaders/ambedkar.png";
import velunachiyarImg from "../../assets/leaders/velunachiyar.png";
import anjalaiammalImg from "../../assets/leaders/anjalaiammal.png";
import whistleImg from "../../assets/voteForWhistle.jpg";
import electionBg from "../../assets/generated/election_bg.png";
import { newsData } from "../../data/newsData";
import Anthems from "../Media/Anthems.vue";

export default {
  name: "Home",
  components: {
    Anthems,
  },
  inject: ["t", "currentLang"],
  data: () => ({
    heroImage,
    sectionImage,
    electionBg,
    newsData,
    displayCount: 0,
    targetCount: 15428670,

    leaders: [
      { id: "periyar", name: "தந்தை பெரியார்", image: periyarImg },
      { id: "kamarajar", name: "பெருந்தலைவர் காமராஜர்", image: kamarajarImg },
      { id: "ambedkar", name: "அண்ணல் அம்பேத்கர்", image: ambedkarImg },
      {
        id: "velunachiyar",
        name: "வீரமங்கை வேலுநாச்சியார்",
        image: velunachiyarImg,
      },
      {
        id: "anjalaiammal",
        name: "கடலூர் அஞ்சலையம்மாள்",
        image: anjalaiammalImg,
      },
    ],

    gallery: [
      {
        id: 1,
        title: "State Conference",
        image: rallyImg,
      },
      {
        id: 2,
        title: "Future Vision",
        image: visionImg,
      },
      {
        id: 3,
        title: "Transparent Governance",
        image: governanceImg,
      },
      {
        id: 4,
        title: "Village Progress",
        image: villageImg,
      },
    ],
    pillars: [
      {
        icon: "mdi-scale-balance",
        id: "equality",
      },
      {
        icon: "mdi-shield-check-outline",
        id: "governance",
      },
      {
        icon: "mdi-handshake-outline",
        id: "people",
      },
    ],
  }),
  computed: {
    isTamil() {
      return this.currentLang() === "ta";
    },
    sortedNews() {
      return [...this.newsData].sort(
        (a, b) => new Date(b.sortDate) - new Date(a.sortDate),
      );
    },
    isMobile() {
      return this.$vuetify.display.xs || this.$vuetify.display.sm;
    },
  },
  watch: {
    currentLang() {
      this.updateSEO();
    },
  },
  mounted() {
    this.animateCounter();
    this.updateSEO();
  },
  methods: {
    animateCounter() {
      const duration = 2000;
      const start = Date.now();
      const end = start + duration;
      const step = () => {
        const now = Date.now();
        const remaining = Math.max(0, end - now);
        const progress = 1 - remaining / duration;
        // Ease out quad
        const easedProgress = progress * (2 - progress);
        this.displayCount = Math.floor(easedProgress * this.targetCount);
        if (now < end) requestAnimationFrame(step);
      };
      step();
    },
    formatNumber(num) {
      return num.toLocaleString();
    },
    updateSEO() {
      const title = this.isTamil
        ? "Watch Now: தளபதி விஜய்யின் தவெக உரைகள் | 2026 தேர்தல் அறிக்கை & வேட்பாளர்கள்"
        : "Exclusive: Thalapathy Vijay TVK Speeches, 234 Candidate List & 2026 Manifesto";

      document.title = title;

      const description = this.isTamil
        ? "தமிழக வெற்றிக் கழகத்தின் அதிகாரப்பூர்வ இணையதளம். தளபதி விஜய்யின் எழுச்சிமிகு உரைகள், 2026 தேர்தல் அறிக்கை மற்றும் 234 வேட்பாளர்கள் பட்டியல் இப்போதே காண்க."
        : "Official TVK Platform: Access Thalapathy Vijay's powerful speeches, the 2026 Election Manifesto, and the full list of 234 assembly candidates.";

      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      }
    },
  },
};
</script>

<style scoped>
.home-container {
  overflow-x: hidden;
}

/* Typography & Colors */
.color-gold {
  color: #d4af37 !important;
}
.color-maroon {
  color: #800000 !important;
}
.text-maroon {
  color: #800000 !important;
}
.bg-gold {
  background-color: #d4af37 !important;
}
.bg-maroon-light {
  background-color: rgba(128, 0, 0, 0.05) !important;
}
.lh-base {
  line-height: 1.2 !important;
}
.lh-relaxed {
  line-height: 1.8 !important;
}
.letter-spacing-1 {
  letter-spacing: 1px;
}

/* Utility */
.max-w-lg {
  max-width: 600px;
}
.max-width-800 {
  max-width: 800px;
}
.gap-4 {
  gap: 16px;
}
.z-10 {
  z-index: 10;
}
.absolute-inset {
  position: absolute;
  inset: 0;
}

/* Hero Section */
.hero-section {
  min-height: calc(100vh - 64px); /* Minus app bar height */
  background-color: #800000;
}

.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top right,
    rgba(128, 0, 0, 0.9) 0%,
    #600000 100%
  );
  z-index: 1;
}

.hero-bg-image {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  z-index: 0;
}

.hero-title {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.border-gold-thin {
  border: 1px solid rgba(212, 175, 55, 0.4);
}
.border-gold-thick {
  border: 6px solid #d4af37;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.4) !important;
}

/* Abstract Shapes */
.abstract-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 2;
  opacity: 0.6;
}
.shape-glow-1 {
  width: 40vw;
  height: 40vw;
  background: #d4af37;
  top: -10vw;
  left: -10vw;
}
.shape-glow-2 {
  width: 30vw;
  height: 30vw;
  background: #ff4747;
  bottom: 10%;
  right: -5vw;
}

.hero-avatar-ring {
  position: absolute;
  width: 360px;
  height: 360px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: spin 30s linear infinite;
  z-index: 0;
}

@keyframes spin {
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 0;
  z-index: 10;
}
.animate-bounce {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* UI Elements */
.title-divider {
  width: 80px;
  height: 4px;
  border-radius: 2px;
}

.pillar-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hover-lift {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(128, 0, 0, 0.1) !important;
  border-bottom: 3px solid #800000 !important;
}

/* Counter & Glow */
.glow-text {
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}
.tracking-widest {
  letter-spacing: 3px !important;
}

/* News Section Horizontal Scroll */
.news-scroll-container {
  overflow-x: auto;
  scroll-behavior: smooth;
  margin: 0 -15px;
  padding: 0 15px;
}

.news-flex-row {
  display: flex !important;
  flex-wrap: nowrap !important;
  padding-bottom: 20px;
}

.news-scroll-card {
  min-width: 380px;
  width: 380px;
  flex: 0 0 auto;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 600px) {
  .news-scroll-card {
    min-width: 300px;
    width: 300px;
  }
}

.bg-maroon {
  background-color: #800000;
}

/* Gallery Section */
.hover-zoom {
  transition: transform 0.6s ease !important;
}
.gallery-card:hover .hover-zoom {
  transform: scale(1.1);
}
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(128, 0, 0, 0.6);
}
.gallery-card:hover .gallery-overlay {
  opacity: 1 !important;
}

/* CTA Section */
.cta-section {
  background-color: #800000;
  background-image: url("../../assets/voteForWhistle.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 400px;
}
.cta-overlay {
  background: linear-gradient(
    to bottom,
    rgba(128, 0, 0, 0.85),
    rgba(128, 0, 0, 0.95)
  );
}
.heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
}
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.1);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(1);
  }
}

.title-divider {
  width: 60px;
  height: 4px;
  border-radius: 2px;
}

/* Hero Section Leader */
.hero-avatar {
  border: 12px solid #d4af37 !important;
  background: white;
  z-index: 2;
}

.hero-avatar-ring {
  position: absolute;
  width: 380px;
  height: 380px;
  border: 2px dashed rgba(212, 175, 55, 0.4);
  border-radius: 50%;
  z-index: 1;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Leader Guides */
.leader-guide-card {
  width: 180px;
  transition: all 0.3s ease;
}

.leader-avatar {
  border: 4px solid #d4af37 !important;
  background-color: white;
}

.leader-avatar-hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4) !important;
}

.leader-name-label {
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.border-gold-thick {
  border: 3px solid #d4af37 !important;
}

.border-gold-thin {
  border: 1px solid #d4af37 !important;
}

.hover-zoom {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Responsive */
@media (max-width: 600px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
}
.election-banner {
  min-height: 250px;
  background-color: #800000;
}

.banner-overlay {
  background: linear-gradient(
    135deg,
    rgba(128, 0, 0, 0.95) 0%,
    rgba(128, 0, 0, 0.7) 100%
  );
}

.display-promo {
  font-size: clamp(3rem, 8vw, 5rem);
  line-height: 1;
}

.whistle-pulse {
  animation: pulse-gold 2s infinite;
}

@keyframes pulse-gold {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 0px #d4af37);
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 15px #d4af37);
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0px #d4af37);
  }
}

.glow-text {
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.stats-grid {
  display: flex;
  width: 100%;
}

.stat-item {
  min-width: 180px;
  flex: 1;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15) !important;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.border-white-thin {
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}

.whistle-icon-glow {
  filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6));
}

.pulse-gold {
  animation: pulse-gold-box 2.5s infinite;
}

@keyframes pulse-gold-box {
  0% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
  }
  70% {
    box-shadow: 0 0 0 25px rgba(212, 175, 55, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
  }
}

.voting-badge {
  width: 260px;
  height: 260px;
  border: 6px solid #d4af37;
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(128, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  position: relative;
  z-index: 5;
}

.inner-badge {
  width: 100%;
  height: 100%;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.color-gold {
  color: #d4af37 !important;
}

.on-hover {
  transform: translateY(-8px);
}

/* News Poster Overlay Styles */
.poster-gradient {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );
  z-index: 1;
  transition: background 0.3s ease;
}

.news-poster-overlay {
  z-index: 2;
}

.glass-effect-dark {
  background: rgba(0, 0, 0, 0.35) !important;
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.zoom-on-hover {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.news-scroll-card:hover .zoom-on-hover {
  transform: scale(1.1) rotate(3deg);
}

.news-scroll-card:hover .news-poster-overlay {
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  pointer-events: none;
}

.poster-vijay-portrait {
  position: absolute;
  right: -20px;
  bottom: 0;
  height: 100% !important;
  opacity: 0.95;
  filter: drop-shadow(-10px 0 20px rgba(0, 0, 0, 0.5));
  z-index: 5;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.news-scroll-card:hover .poster-vijay-portrait {
  transform: translateX(-10px) scale(1.05);
}

.news-official-label {
  background: linear-gradient(
    135deg,
    rgba(128, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.9) 100%
  );
  border-left: 4px solid #d4af37;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 10;
  max-width: 85%;
}

.news-official-label-alt {
  /* Ensuring uniqueness and plain ASCII name */
  opacity: 1;
}

.news-location-label {
  transition: transform 0.3s ease;
}

.news-scroll-card:hover .news-location-label {
  transform: translateX(5px);
}
</style>
