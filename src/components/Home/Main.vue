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
              தமிழக வெற்றிக் கழகம்
            </v-chip>

            <h1
              class="hero-title text-white font-weight-black mb-4 lh-base"
              style="font-size: clamp(3rem, 6vw, 5.5rem)"
            >
              பிறப்பொக்கும் <br />
              <span class="color-gold">எல்லா உயிர்க்கும்!</span>
            </h1>

            <p
              class="hero-subtitle text-white opacity-90 mb-10 text-h6 font-weight-regular max-w-lg mx-auto mx-md-0 lh-relaxed"
            >
              சாதி, மதம், இனம், மொழி என எந்த பாகுபாடும் இன்றி, அனைவரும் சமம்
              என்ற ஒற்றைக் கொள்கையுடன் ஒரு புதிய அரசியல் பயணம்.
            </p>

            <div
              class="d-flex flex-column flex-sm-row justify-center justify-md-start gap-4"
            >
              <v-btn
                color="#D4AF37"
                size="x-large"
                class="rounded-pill font-weight-bold elevation-8 btn-join px-8"
                append-icon="mdi-arrow-right"
                href="https://tvk.family"
                target="_blank"
              >
                உறுப்பினர் ஆகுங்கள்
              </v-btn>
              <v-btn
                color="white"
                variant="outlined"
                size="x-large"
                class="rounded-pill font-weight-bold px-8"
                to="/kolgai"
              >
                எங்கள் கொள்கை
              </v-btn>
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
              <v-img :src="heroImage" cover></v-img>
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

    <!-- Vision & Mission Stats / Pillars -->
    <section class="py-16 bg-white position-relative overflow-hidden">
      <v-container class="py-10">
        <div class="text-center mb-16">
          <h2 class="text-h3 font-weight-black color-maroon mb-4">
            நமது தொலைநோக்கு
          </h2>
          <div class="title-divider mx-auto bg-gold mb-6"></div>
          <p
            class="text-h6 text-grey-darken-2 font-weight-regular max-width-800 mx-auto"
          >
            ஊழலற்ற, நேர்மையான, வெளிப்படையான, சாதிமத சார்பற்ற அரசாங்கத்தை தமிழக
            மக்களுக்கு வழங்குவதே எங்கள் தலையாய நோக்கம்.
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
                {{ pillar.title }}
              </h3>
              <p class="text-body-1 text-grey-darken-2 lh-relaxed">
                {{ pillar.desc }}
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
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="text-h3 font-weight-black color-maroon mb-4">
              2026 சட்டமன்றத் தேர்தல்
            </h2>
            <div class="title-divider bg-gold mb-6"></div>
            <p
              class="text-h6 text-grey-darken-2 font-weight-regular mb-8 lh-relaxed"
            >
              எதிர்வரும் 2026 தமிழ்நாடு சட்டமன்றத் தேர்தலில் த.வெ.க சார்பாக
              போட்டியிடும் வேட்பாளர்களின் அதிகாரப்பூர்வ பட்டியலை இங்கே காணலாம்.
              புதிய தலைமுறைக்கான சிறந்த தலைவர்களை தேர்ந்தெடுப்போம்.
            </p>
            <v-btn
              color="#800000"
              size="x-large"
              class="rounded-pill font-weight-bold px-8 elevation-4"
              prepend-icon="mdi-account-group"
              to="/candidates"
            >
              வேட்பாளர் பட்டியல்
            </v-btn>
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
          மாற்றத்திற்கான நேரமிது!
        </h2>
        <p
          class="text-h6 text-white opacity-90 max-width-800 mx-auto mb-10 lh-relaxed"
        >
          இனி ஒரு விதி செய்வோம்! தமிழக அரசியலில் புதிய சகாப்தத்தை உருவாக்க
          எங்களுடன் இணையுங்கள்.
        </p>
        <v-btn
          color="#D4AF37"
          size="x-large"
          class="rounded-pill text-maroon font-weight-black px-12 elevation-8 heartbeat"
          href="https://tvk.family"
          target="_blank"
        >
          கட்சியில் இணைக
        </v-btn>
      </v-container>
    </section>
  </div>
</template>

<script>
import heroImage from "../../assets/16170916.png";
import sectionImage from "../../assets/16170924.png";

export default {
  name: "Home",
  data: () => ({
    heroImage,
    sectionImage,
    pillars: [
      {
        icon: "mdi-scale-balance",
        title: "சமத்துவம்",
        desc: "பிறப்பொக்கும் எல்லா உயிர்க்கும் என்ற உயரிய தத்துவத்தின் அடிப்படையில் அனைவருக்கும் சம உரிமை, சம வாய்ப்பு உறுதி செய்தல்.",
      },
      {
        icon: "mdi-shield-check-outline",
        title: "நேர்மையான நிர்வாகம்",
        desc: "தடை இல்லாத, வெளிப்படையான, ஊழலற்ற நல்லாட்சியை மக்களிடத்தில் கொண்டு சேர்ப்பது.",
      },
      {
        icon: "mdi-handshake-outline",
        title: "மக்களுக்கான அரசு",
        desc: "அடித்தட்டு மக்கள், விவசாயிகள் மற்றும் இளைஞர்களின் நலனை முன்னிறுத்தும் மக்கள் நல அரசு.",
      },
    ],
  }),
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

/* CTA Section */
.cta-section {
  background-color: #800000;
  background-image: url("../../assets/voteForWhistle.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Parallax effect */
}
.cta-overlay {
  background: linear-gradient(
    0deg,
    rgba(96, 0, 0, 0.9) 0%,
    rgba(128, 0, 0, 0.85) 100%
  );
}
.heartbeat {
  animation: heartbeat 2s infinite;
}
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.05);
  }
  20% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
