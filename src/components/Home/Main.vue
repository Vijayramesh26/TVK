<template>
  <div class="home-container">
    <NewsTicker />
    <!-- Hero Section -->
    <section class="hero-section position-relative d-flex align-center">
      <!-- Background Overlays -->
      <div class="hero-bg-image"></div>
      <div class="hero-gradient-overlay"></div>

      <!-- Particles / Abstract decor -->
      <div class="abstract-shape shape-glow-1"></div>
      <div class="abstract-shape shape-glow-2"></div>

      <v-container class="position-relative z-10 pt-0 pb-0">
        <v-row align="center">
          <v-col
            cols="12"
            md="9"
            class="text-center text-md-left position-relative z-10"
          >
            <v-chip
              color="#D4AF37"
              variant="outlined"
              class="mb-2 font-weight-bold tracking-wide px-4 py-2 border-gold-thin text-uppercase"
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
              class="hero-subtitle text-white opacity-90 mb-6 mb-md-10 text-h6 font-weight-regular max-w-lg mx-auto mx-md-0 lh-relaxed"
            >
              {{ t("hero.tagline") }}
            </p>

            <div
              class="d-flex flex-column flex-sm-row justify-center justify-md-start gap-4 mb-6 mb-md-10"
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
                class="rounded-pill font-weight-bold px-8 text-white elevation-4 btn-multiline"
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
              class="membership-counter d-flex align-center justify-center justify-md-start mt-6 mt-md-8 mb-4 mb-md-6 position-relative z-10"
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
            md="3"
            class="d-none d-md-flex justify-end position-relative z-1 mt-n16"
          >
            <!-- Central Avatar holding the logo or leader image if available -->
            <v-avatar
              size="360"
              class="hero-avatar border-gold-thick"
              color="white"
            >
              <v-img
                :src="heroImage"
                cover
                eager
                alt="தமிழக வெற்றிக் கழகம் தலைவர் தளபதி விஜய்"
              ></v-img>
            </v-avatar>
            <!-- Decorative circle behind avatar -->
            <div class="hero-avatar-ring"></div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Centered Scroll Indicator -->
      <div
        class="scroll-indicator-wrap d-flex flex-column align-center mt-4 text-white opacity-80 w-100"
      >
        <span
          class="text-caption mb-2 font-weight-bold letter-spacing-1 text-uppercase"
          >{{ isTamil ? 'கீழே செல்லவும்' : 'Scroll Down' }}</span
        >
        <v-icon class="animate-bounce">mdi-chevron-down</v-icon>
      </div>
    </section>

    <!-- Explore All Features & Portals Section -->
    <v-container class="my-8 position-relative z-20 py-10">
      <div class="text-center mb-12">
        <v-chip color="#D4AF37" variant="outlined" class="mb-3 font-weight-bold tracking-widest text-uppercase">
          <v-icon start icon="mdi-star-circle" size="small" color="#D4AF37"></v-icon>
          {{ isTamil ? "அனைத்து டிஜிட்டல் சேவைகளும்" : "Explore All Digital Portals" }}
        </v-chip>
        <h2 class="text-h3 font-weight-black color-maroon mb-3">
          {{ isTamil ? "நமது டிஜிட்டல் சேவைகள் & மக்கள் களங்கள்" : "Flagship Services & Interactive Portals" }}
        </h2>
        <p class="text-subtitle-1 text-grey-darken-1 max-w-lg mx-auto mb-0">
          {{ isTamil ? "தளபதி விஜய் தலைமையிலான தமிழக வெற்றிக் கழகத்தின் மக்கள் நலத் திட்டங்கள் மற்றும் டிஜிட்டல் வசதிகள் அனைத்தையும் ஒரே இடத்தில் அணுகுங்கள்." : "Access all flagship portals, citizen welfare tools, and digital governance features of Tamilaga Vettri Kazhagam in one unified hub." }}
        </p>
      </div>

      <v-row align="stretch">
        <!-- Card 1: Voter Booth Slip -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/voter-slip" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column bg-maroon-lighten">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-card-bulleted-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" text-color="white" size="x-small" class="font-weight-bold mb-1" variant="flat">
                  {{ isTamil ? "முக்கிய சேவை" : "FLAGSHIP" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "வாக்காளர் பூத் சீட்டு" : "Voter Booth Slip" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-2 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "உங்கள் வாக்குச்சாவடி, பாகம் எண் & பூத் ஏஜென்ட் வாட்ஸ்அப் தொடர்பு." : "Instantly check polling station details and connect with local booth agent." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 2: Vision 2026 -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/vision-2026" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column bg-gold-lighten">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-flag-star</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#D4AF37" text-color="#800000" size="x-small" class="font-weight-bold mb-1" variant="flat">
                  {{ isTamil ? "100 நாள் திட்டம்" : "EXECUTIVE" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "விஷன் 2026 செயல்திட்டம்" : "Vision 2026 Roadmap" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-2 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "முதல்வர் தளபதியின் 100 நாள் திட்டங்கள் & நேரடி மக்கள் ஆதரவு மீட்டர்." : "Explore Chief Minister Thalapathy's First 100 Days action plan and backing meter." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 3: Connect Portal -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/connect" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-account-group-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "களப்பணி" : "COMMUNITY" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "தொகுதி & MLA களம்" : "Constituency Connect" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "உங்கள் தொகுதி அலுவலகம், MLA விவரம் & வாட்ஸ்அப் குழுவில் இணைய." : "Connect with local TVK secretariat, MLA representatives & WhatsApp channels." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 4: Welfare Schemes -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/schemes" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-hand-coin-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "அரசு திட்டங்கள்" : "WELFARE" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "மக்கள் நலத்திட்டங்கள்" : "Welfare Schemes" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "இலவச மின்சாரம், சிங்கப்பெண் படை & அரசு திட்டங்களின் தகுதி சரிபார்ப்பு." : "Explore flagship government schemes and check your eligibility instantly." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 5: Citizen Voice -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/voice" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column bg-gold-lighten">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-account-voice</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#D4AF37" text-color="#800000" size="x-small" class="font-weight-bold mb-1" variant="flat">
                  {{ isTamil ? "முதல்வர் தனிப்பிரிவு" : "GRIEVANCE" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "மக்கள் களம் (குரல்)" : "Citizen Voice" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-2 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "உங்கள் ஆக்கப்பூர்வமான யோசனைகள் & குறைகளை முதல்வரிடம் நேரடியாக தெரிவிக்க." : "Submit governance ideas and file official grievances with CM Special Cell." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 5B: Grievance Dashboard -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/grievances" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column bg-maroon-lighten">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-crosshairs-gps</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" text-color="white" size="x-small" class="font-weight-bold mb-1" variant="flat">
                  {{ isTamil ? "கண்காணிப்பு" : "TRACKING" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "குறைதீர்வு மையம்" : "Grievance Dashboard" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-2 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "உங்கள் புகார்களின் நேரடி தீர்வு நிலை மற்றும் அரசு அதிகாரிகளின் நடவடிக்கையை அறிய." : "Track real-time resolution status and official actions taken on citizen grievances." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 6: Volunteer Brigade -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/volunteer" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-account-multiple-plus-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "இளைஞர் படை" : "ACTION SQUAD" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "தன்னார்வலர் படை" : "Volunteer Brigade" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "களப்பணியில் இணைந்து மக்கள் சேவை செய்ய & லீடர்போர்டு தாக்கம் அறிய." : "Join grassroots action force, volunteer for initiatives and track leaderboard." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 7: Poster Creator -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/create" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-palette-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "வடிவமைப்பு" : "CANVAS" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "போஸ்டர் உருவாக்கி" : "AI Poster Creator" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "தளபதி விஜயுடன் உங்கள் புகைப்படம் இணைத்து அதிகாரப்பூர்வ போஸ்டர் உருவாக்க." : "Generate customized high-resolution campaign posters with CM Thalapathy." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 8: CM Letter Creator -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/letter" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-script-text-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "வாழ்த்து" : "GREETINGS" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "முதல்வர் கடிதம்" : "CM Letter Creator" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "உங்கள் பெயரில் தளபதியின் கையொப்பமிட்ட வாழ்த்து கடிதம் பெற." : "Generate personalized appreciation letters signed by Chief Minister Vijay." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 9: AI Archive Search -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/search" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-archive-search-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "செயற்கை நுண்ணறிவு" : "AI ENGINE" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "ஆர்க்கைவ் தேடல்" : "AI Speech Search" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "தளபதியின் வரலாற்றுச் சிறப்புமிக்க உரைகளை சொற்கள் வாரியாக தேட." : "Search across thousands of speech transcripts and YouTube highlights." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 10: Supporter ID Card -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/supporter-card" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-card-account-details-star-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "உறுப்பினர்" : "MEMBERSHIP" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "ஆதரவாளர் அட்டை" : "Supporter ID Card" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "உங்கள் புகைப்படத்துடன் கூடிய அதிகாரப்பூர்வ டிஜிட்டல் அடையாள அட்டை." : "Create your official digital supporter identity card with QR verification." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 11: Ideology & Principles -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/kolgai" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-book-open-page-variant-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "கொள்கை" : "MANIFESTO" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "கட்சி கொள்கைகள்" : "Ideology & Pillars" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "தவெக-வின் இருமொழிக் கொள்கை, மாநில சுயாட்சி & மதச்சார்பற்ற சமூக நீதி." : "Explore TVK's core ideological pillars, state autonomy & social justice." }}
            </p>
          </v-card>
        </v-col>

        <!-- Card 12: Election Results & Stats -->
        <v-col cols="12" sm="6" md="3">
          <v-card to="/results" class="tool-card pa-6 rounded-xl elevation-10 border-gold hover-lift h-100 d-flex flex-column">
            <div class="d-flex align-center mb-3">
              <v-avatar color="#800000" size="56" class="mr-4 elevation-4 flex-shrink-0">
                <v-icon color="#D4AF37" size="28">mdi-vote-outline</v-icon>
              </v-avatar>
              <div>
                <v-chip color="#800000" variant="outlined" size="x-small" class="font-weight-bold mb-1">
                  {{ isTamil ? "தேர்தல் 2026" : "ELECTION 2026" }}
                </v-chip>
                <h3 class="text-h6 font-weight-black color-maroon mb-0">
                  {{ isTamil ? "தேர்தல் முடிவுகள்" : "Election Results Map" }}
                </h3>
              </div>
            </div>
            <p class="text-caption text-grey-darken-1 mb-0 font-weight-medium mt-auto">
              {{ isTamil ? "234 தொகுதிகளின் வெற்றி நிலவரம், வாக்கு சதவீதம் & விரிவான புள்ளிவிவரங்கள்." : "Explore 234 constituency win data, vote share map & detailed statistics." }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Election Status & Results Banner -->
    <section class="election-banner position-relative elevation-20 z-30">
      <!-- Use static div for mobile, parallax for desktop to save memory -->
      <div
        v-if="isMobile"
        class="py-16 banner-static-bg"
        :style="{ backgroundImage: `url(${electionBg})` }"
      >
        <div class="banner-overlay absolute-inset"></div>
        <v-container class="position-relative z-10 py-16">
          <!-- Content remains the same -->
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
                      {{ isTamil ? "த.வெ.க வென்ற இடங்கள்" : "TVK Seats Won" }}
                    </div>
                    <div class="text-h3 font-weight-black text-white">
                      108 <span class="text-h5">/ 234</span>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" lg="5">
                  <div
                    class="stat-item glass-effect pa-6 rounded-xl border-white-thin"
                  >
                    <div class="text-overline color-gold font-weight-bold mb-1">
                      {{ isTamil ? "வாக்குப்பதிவு சதவீதம்" : "Voter Turnout" }}
                    </div>
                    <div class="text-h3 font-weight-black text-white">
                      85.15 <span class="text-h5">%</span>
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
          </v-row>

          <!-- Bottom Filling Area: Roadmap / Process -->
          <v-row class="px-4 mt-8" justify="center">
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
                  label: isTamil ? 'சரிபார்ப்பு' : 'Counting',
                  status: isTamil ? 'முடிந்தது' : 'Completed',
                  color: 'success',
                },
                {
                  icon: 'mdi-trophy-variant',
                  label: isTamil ? 'தேர்தல் முடிவு' : 'Results Declared',
                  status: isTamil ? 'த.வெ.க வெற்றி!' : 'TVK Wins!',
                  color: 'success',
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
      </div>

      <v-parallax
        v-else
        :src="electionBg"
        scale="1.1"
        height="1000"
        class="py-16"
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
                      {{ isTamil ? "த.வெ.க வென்ற இடங்கள்" : "TVK Seats Won" }}
                    </div>
                    <div class="text-h3 font-weight-black text-white">
                      108 <span class="text-h5">/ 234</span>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" lg="5">
                  <div
                    class="stat-item glass-effect pa-6 rounded-xl border-white-thin"
                  >
                    <div class="text-overline color-gold font-weight-bold mb-1">
                      {{ isTamil ? "வாக்குப்பதிவு சதவீதம்" : "Voter Turnout" }}
                    </div>
                    <div class="text-h3 font-weight-black text-white">
                      85.15 <span class="text-h5">%</span>
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
          </v-row>

          <!-- Bottom Filling Area: Roadmap / Process -->
          <v-row class="px-4 mt-8" justify="center">
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
                  label: isTamil ? 'சரிபார்ப்பு' : 'Counting',
                  status: isTamil ? 'முடிந்தது' : 'Completed',
                  color: 'success',
                },
                {
                  icon: 'mdi-trophy-variant',
                  label: isTamil ? 'தேர்தல் முடிவு' : 'Results Declared',
                  status: isTamil ? 'த.வெ.க வெற்றி!' : 'TVK Wins!',
                  color: 'success',
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

    <!-- Digital Engagement & Volunteer Impact Section [NEW] -->
    <section class="py-16 bg-white overflow-hidden">
      <v-container>
        <div class="text-center mb-12">
          <v-chip
            color="#D4AF37"
            variant="elevated"
            class="mb-4 font-weight-black"
            >TVK DIGITAL 2026</v-chip
          >
          <h2 class="text-h2 font-weight-black color-maroon mb-4">
            {{
              currentLang() === "ta"
                ? "டிஜிட்டல் புரட்சி & தொண்டர்கள் தடம்"
                : "Digital Revolution & Volunteer Impact"
            }}
          </h2>
          <p class="text-h6 text-grey-darken-1 max-w-lg mx-auto">
            {{
              currentLang() === "ta"
                ? "நமது கட்சியின் தொழில்நுட்ப முன்னெடுப்புகள் மற்றும் தொண்டர்களின் பங்களிப்பை இங்கே காணலாம்."
                : "Explore our digital tools and the massive impact created by our grassroots volunteers."
            }}
          </p>
        </div>

        <v-row>
          <!-- Tool 1: AI Search -->
          <v-col cols="12" md="4">
            <v-card
              class="rounded-xl elevation-10 pa-6 h-100 border-gold-thin hover-lift"
              to="/search"
            >
              <v-icon color="#800000" size="48" class="mb-4"
                >mdi-robot-outline</v-icon
              >
              <h3 class="text-h5 font-weight-bold color-maroon mb-2">
                {{
                  currentLang() === "ta"
                    ? "தளபதி AI ஆவணக்காப்பகம்"
                    : "Thalapathy AI Archive"
                }}
              </h3>
              <p class="text-body-1 text-grey-darken-2 mb-4">
                {{
                  currentLang() === "ta"
                    ? "தளபதியின் உரைகள் மற்றும் கொள்கைகளை AI மூலம் தேடுங்கள்."
                    : "Search through Thalapathy’s speeches and vision using AI-powered search."
                }}
              </p>
              <v-btn
                variant="text"
                color="#D4AF37"
                class="pa-0 font-weight-bold"
                append-icon="mdi-arrow-right"
              >
                {{
                  currentLang() === "ta" ? "இப்போதே தேடுங்கள்" : "Search Now"
                }}
              </v-btn>
            </v-card>
          </v-col>

          <!-- Tool 2: Timeline -->
          <v-col cols="12" md="4">
            <v-card
              class="rounded-xl elevation-10 pa-6 h-100 border-gold-thin hover-lift"
              to="/journey"
            >
              <v-icon color="#800000" size="48" class="mb-4"
                >mdi-timeline-clock-outline</v-icon
              >
              <h3 class="text-h5 font-weight-bold color-maroon mb-2">
                {{
                  currentLang() === "ta"
                    ? "வரலாற்றுப் பயணம்"
                    : "The Party Journey"
                }}
              </h3>
              <p class="text-body-1 text-grey-darken-2 mb-4">
                {{
                  currentLang() === "ta"
                    ? "த.வெ.க-வின் முக்கிய மைல்கற்களைப் பாராது ஒரு வரலாற்றுப் பயணம்."
                    : "A vertical journey through the key milestones of Tamilaga Vettri Kazhagam."
                }}
              </p>
              <v-btn
                variant="text"
                color="#D4AF37"
                class="pa-0 font-weight-bold"
                append-icon="mdi-arrow-right"
              >
                {{
                  currentLang() === "ta" ? "பயணத்தைத் தொடங்கு" : "Start Journey"
                }}
              </v-btn>
            </v-card>
          </v-col>

          <!-- Volunteer Impact Card -->
          <v-col cols="12" md="4">
            <v-card
              class="rounded-xl elevation-10 pa-6 h-100 bg-maroon text-white border-gold-glow"
            >
              <div class="d-flex align-center justify-space-between mb-4">
                <v-icon color="#D4AF37" size="48"
                  >mdi-account-group-outline</v-icon
                >
                <v-chip
                  color="#D4AF37"
                  size="small"
                  class="text-white font-weight-bold"
                  >LIVE</v-chip
                >
              </div>
              <h3 class="text-h5 font-weight-bold mb-2">
                {{
                  currentLang() === "ta"
                    ? "தொண்டர்களின் பங்களிப்பு"
                    : "Volunteer Impact"
                }}
              </h3>
              <div class="mb-4">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-caption opacity-80">{{
                    currentLang() === "ta"
                      ? "டிஜிட்டல் அட்டைகள்"
                      : "ID Cards Created"
                  }}</span>
                  <span class="text-caption font-weight-bold">8.4M+</span>
                </div>
                <v-progress-linear
                  model-value="85"
                  color="#D4AF37"
                  height="8"
                  rounded
                ></v-progress-linear>
              </div>
              <div class="mb-4">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-caption opacity-80">{{
                    currentLang() === "ta"
                      ? "போஸ்டர்கள் உருவாக்கப்பட்டவை"
                      : "Posters Designed"
                  }}</span>
                  <span class="text-caption font-weight-bold">1.2M+</span>
                </div>
                <v-progress-linear
                  model-value="65"
                  color="#D4AF37"
                  height="8"
                  rounded
                ></v-progress-linear>
              </div>
              <v-divider class="my-4 opacity-20"></v-divider>
              <div class="activity-ticker">
                <div
                  v-for="(act, idx) in liveActivities"
                  :key="idx"
                  class="ticker-item text-caption mb-1"
                >
                  <v-icon size="10" color="#D4AF37" class="mr-1"
                    >mdi-circle</v-icon
                  >
                  {{ act }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
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
            to="/news"
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
            >
              <!-- Video Embed (Anthems Style) -->
              <div v-if="item.youtubeId" class="video-container">
                <iframe
                  :src="`https://www.youtube.com/embed/${item.youtubeId}`"
                  title="TVK News Video"
                  frameborder="0"
                  allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share;
                  "
                  allowfullscreen
                ></iframe>
              </div>

              <!-- Poster Image (Fallback if no video) -->
              <v-img
                v-else
                :src="item.image"
                height="260"
                cover
                class="position-relative"
                @click="$router.push(`/news/${item.id}`)"
              >
                <div class="poster-gradient absolute-inset"></div>
                <div class="news-poster-overlay absolute-inset overflow-hidden">
                  <v-img
                    :src="heroImage"
                    alt="Vijay"
                    class="poster-vijay-portrait"
                    width="140"
                    cover
                  ></v-img>
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

              <v-card-text
                class="pa-6"
                @click="$router.push(`/news/${item.slug}`)"
              >
                <div
                  class="text-caption font-weight-bold text-grey-lighten-1 mb-2"
                >
                  {{ formatDate(item.date) }}
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
import NewsTicker from "./NewsTicker.vue";

export default {
  name: "Home",
  components: {
    Anthems,
    NewsTicker,
  },
  inject: ["t", "currentLang"],
  data: () => ({
    heroImage,
    sectionImage,
    electionBg,
    newsData,
    displayCount: 0,
    targetCount: 15428670,
    liveActivities: [
      "Member #4829 joined from Madurai",
      "Supporter Card #1293 created in Chennai",
      "Volunteer milestone reached: 1M posters",
      "New speech transcript added: Vikkiravandi 2025",
    ],
    tickerInterval: null,
    ready: false,

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
    leaders() {
      return [
        { id: "periyar", name: this.isTamil ? "தந்தை பெரியார்" : "Thanthai Periyar", image: periyarImg },
        { id: "kamarajar", name: this.isTamil ? "பெருந்தலைவர் காமராஜர்" : "Perunthalaivar Kamarajar", image: kamarajarImg },
        { id: "ambedkar", name: this.isTamil ? "அண்ணல் அம்பேத்கர்" : "Annal Ambedkar", image: ambedkarImg },
        {
          id: "velunachiyar",
          name: this.isTamil ? "வீரமங்கை வேலுநாச்சியார்" : "Veeramangai Velunachiyar",
          image: velunachiyarImg,
        },
        {
          id: "anjalaiammal",
          name: this.isTamil ? "கடலூர் அஞ்சலையம்மாள்" : "Cuddalore Anjalaiammal",
          image: anjalaiammalImg,
        },
      ];
    },
    sortedNews() {
      return [...newsData].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateB - dateA !== 0) {
          return dateB - dateA;
        }
        // Fallback to id descending for items on the same date
        return b.id - a.id;
      });
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
    this.startActivityTicker();
    this.animateCounter();
    this.updateSEO();
  },
  beforeUnmount() {
    if (this.tickerInterval) clearInterval(this.tickerInterval);
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },
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
    startActivityTicker() {
      const locations = [
        "Chennai",
        "Madurai",
        "Trichy",
        "Salem",
        "Coimbatore",
        "Nellai",
        "Vellore",
        "Erode",
      ];
      const activities = [
        "joined the revolution",
        "created a Supporter Card",
        "shared the 2026 Manifesto",
        "completed volunteer training",
        "verified their constituency",
      ];

      this.tickerInterval = setInterval(() => {
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const act = activities[Math.floor(Math.random() * activities.length)];
        const num = Math.floor(Math.random() * 9000) + 1000;
        const newAct = `Member #${num} from ${loc} ${act}`;

        this.liveActivities.unshift(newAct);
        if (this.liveActivities.length > 4) this.liveActivities.pop();
      }, 4000);
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
.banner-static-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

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
  height: calc(100vh - 104px);
  min-height: calc(100vh - 104px);
  background-color: #800000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overflow: hidden;
}


@media (max-width: 959px) {
  .hero-section {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    height: calc(100vh - 104px);
    min-height: calc(100vh - 104px);
  }
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
.scroll-indicator-wrap {
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: 0 !important;
}

.btn-multiline {
  height: auto !important;
  min-height: 52px;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}

.btn-multiline :deep(.v-btn__content) {
  white-space: normal !important;
  text-align: center;
  line-height: 1.2;
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
    90deg,
    rgba(128, 0, 0, 0.95) 0%,
    rgba(128, 0, 0, 0.6) 100%
  );
}

.display-promo {
  font-size: clamp(3rem, 8vw, 5rem);
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
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
  min-width: 160px;
  flex: 1;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.stat-item:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
  border-color: rgba(212, 175, 55, 0.5) !important;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.bg-maroon-lighten { background: rgba(128, 0, 0, 0.03) !important; }
.bg-gold-lighten { background: rgba(212, 175, 55, 0.06) !important; }

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

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  background: #000;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* Animations */

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
