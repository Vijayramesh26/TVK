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
            </div>

            <!-- Membership Counter -->
            <div
              class="membership-counter d-flex align-center justify-center justify-md-start"
            >
              <div class="text-center text-md-left">
                <div
                  class="text-h3 font-weight-black text-white mb-1 glow-text"
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
            md="5"
            lg="6"
            class="d-none d-md-flex justify-center align-end position-relative"
          >
            <!-- Redesigned Hero Leader Image -->
            <div class="hero-leader-wrapper">
              <v-img
                :src="heroImage"
                class="hero-leader-img"
                width="600"
                alt="தமிழக வெற்றிக் கழகம் தலைவர் தளபதி விஜய்"
              ></v-img>
              <div class="hero-leader-fade"></div>
            </div>
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

        <v-row>
          <v-col v-for="(item, i) in news" :key="i" cols="12" md="4">
            <v-card
              class="news-card h-100 rounded-xl overflow-hidden hover-lift border-transparent"
            >
              <v-img :src="item.image" height="240" cover>
                <div
                  class="news-tag px-4 py-1 text-caption font-weight-bold text-white bg-maroon"
                >
                  {{ item.tag }}
                </div>
              </v-img>
              <v-card-text class="pa-6">
                <div
                  class="text-caption font-weight-bold text-grey-lighten-1 mb-2"
                >
                  {{ t(`news.item${i + 1}.date`) }}
                </div>
                <h3
                  class="text-h6 font-weight-bold color-maroon line-clamp-2 lh-tight"
                >
                  {{ t(`news.item${i + 1}.title`) }}
                </h3>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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

        <div class="d-flex justify-center flex-wrap" style="gap: 40px;">
          <div v-for="leader in leaders" :key="leader.id" class="leader-guide-card text-center">
            <v-hover v-slot="{ isHovering, props }">
              <div v-bind="props" class="position-relative">
                <v-avatar 
                  size="160" 
                  class="leader-avatar elevation-12 border-gold-thick mb-4 transition-all"
                  :class="{ 'leader-avatar-hover': isHovering }"
                >
                  <v-img :src="leader.image" cover></v-img>
                </v-avatar>
                <div class="leader-name-label font-weight-black color-maroon text-subtitle-1">
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

export default {
  name: "Home",
  inject: ["t", "currentLang"],
  data: () => ({
    heroImage,
    sectionImage,
    displayCount: 0,
    targetCount: 15428670,

    leaders: [
      { id: "periyar", name: "தந்தை பெரியார்", image: periyarImg },
      { id: "kamarajar", name: "பெருந்தலைவர் காமராஜர்", image: kamarajarImg },
      { id: "ambedkar", name: "அண்ணல் அம்பேத்கர்", image: ambedkarImg },
      { id: "velunachiyar", name: "வீரமங்கை வேலுநாச்சியார்", image: velunachiyarImg },
      { id: "anjalaiammal", name: "கடலூர் அஞ்சலையம்மாள்", image: anjalaiammalImg },
    ],

    news: [
      {
        id: 1,
        tag: "Official",
        image: whistleImg,
      },
      {
        id: 2,
        tag: "Strategic",
        image: governanceImg,
      },
      {
        id: 3,
        tag: "Development",
        image: villageImg,
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
  mounted() {
    this.animateCounter();
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

/* News Section */
.news-card {
  transition: all 0.4s ease;
}
.news-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  border-radius: 4px;
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

/* Redesigned Hero Leader */
.hero-leader-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 2;
}

.hero-leader-img {
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4));
}

.hero-leader-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(to bottom, transparent, rgba(128, 0, 0, 0.7));
  z-index: 3;
}

/* Leader Guides */
.leader-guide-card {
  width: 180px;
  transition: all 0.3s ease;
}

.leader-avatar {
  border: 4px solid #D4AF37 !important;
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
  border: 3px solid #D4AF37 !important;
}

.border-gold-thin {
  border: 1px solid #D4AF37 !important;
}

.hover-zoom {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Responsive */
@media (max-width: 600px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
  .hero-leader-wrapper {
    max-width: 100%;
    margin-top: 2rem;
  }
}
</style>
