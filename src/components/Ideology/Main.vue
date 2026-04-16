<template>
  <v-container fluid class="ideology-page pa-0">
    <!-- Hero Section -->
    <v-sheet
      color="#800000"
      height="450"
      class="d-flex align-center justify-center text-center px-4 hero-banner"
      dark
    >
      <div class="hero-content">
        <v-avatar size="100" class="mb-6 border-gold elevation-10">
          <v-img :src="logo"></v-img>
        </v-avatar>
        <h1 class="text-h2 font-weight-black color-gold mb-2 title-main">
          {{ t('ideology.title') }}
        </h1>
        <p class="text-h5 font-weight-medium color-white italic opacity-90">
          "{{ t('hero.subtitle') }}"
        </p>
        <v-divider color="#d4af37" class="mt-4 mx-auto" width="100" thickness="3"></v-divider>
      </div>
    </v-sheet>

    <v-container class="mt-n16">
      <!-- Main Philosophy Card -->
      <v-card class="elevation-12 rounded-xl glass-card pa-8 mb-12 border-gold-subtle">
        <div class="d-flex align-center mb-6">
          <v-icon color="#800000" size="40" class="mr-4">mdi-star-shooting</v-icon>
          <h2 class="text-h4 font-weight-black color-maroon">{{ t('ideology.philosophy') }}</h2>
        </div>
        <p class="text-h6 font-weight-medium line-height-relaxed color-grey">
          {{ t('ideology.philosophyDesc').split(',')[0] }}, <strong class="color-maroon">"{{ isTamil ? 'மதச்சார்பற்ற சமூக நீதி' : 'Secular Social Justice' }}"</strong> {{ t('ideology.philosophyDesc').split(',')[1] }}
        </p>
      </v-card>

      <!-- Principles Grid -->
      <v-row>
        <v-col
          v-for="(principle, i) in principles"
          :key="i"
          cols="12"
          md="4"
          class="d-flex"
        >
          <v-card
            class="principle-card rounded-xl border-maroon-thin pa-6 flex-grow-1 elevation-4 transition-card"
            hover
          >
            <div class="circle-icon mb-4">
              <v-icon color="white" size="30">{{ principle.icon }}</v-icon>
            </div>
            <h3 class="text-h5 font-weight-bold color-maroon mb-3">{{ principle.title }}</h3>
            <p class="color-grey-darken-1">{{ principle.desc }}</p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Manifesto Section -->
      <div class="text-center mt-16 mb-8">
        <h2 class="text-h4 font-weight-black color-maroon mb-2">{{ t('ideology.manifestoTitle') }}</h2>
        <p class="color-grey italic">{{ t('ideology.manifestoDesc') }}</p>
      </div>

      <v-card class="rounded-xl elevation-8 mb-16 overflow-hidden border-gold-subtle glass-card">
        <v-tabs
          v-model="manifestoTab"
          bg-color="transparent"
          color="#800000"
          grow
          class="manifesto-tabs"
        >
          <v-tab value="women" class="font-weight-black">
            <v-icon start>mdi-face-woman</v-icon> {{ t('ideology.tabs.women') }}
          </v-tab>
          <v-tab value="youth" class="font-weight-black">
            <v-icon start>mdi-account-school</v-icon> {{ t('ideology.tabs.youth') }}
          </v-tab>
          <v-tab value="farmers" class="font-weight-black">
            <v-icon start>mdi-sprout</v-icon> {{ t('ideology.tabs.farmers') }}
          </v-tab>
          <v-tab value="admin" class="font-weight-black">
            <v-icon start>mdi-shield-crown</v-icon> {{ t('ideology.tabs.admin') }}
          </v-tab>
          <v-tab value="tech" class="font-weight-black">
            <v-icon start>mdi-robot</v-icon> {{ t('ideology.tabs.tech') }}
          </v-tab>
          <v-tab value="fishers" class="font-weight-black">
            <v-icon start>mdi-anchor</v-icon> {{ t('ideology.tabs.fishers') }}
          </v-tab>
        </v-tabs>

        <v-window v-model="manifestoTab" class="pa-6">
          <v-window-item value="women">
            <h3 class="text-h5 color-maroon font-weight-black mb-4 d-flex align-center">
              <v-icon color="#800000" class="mr-2">mdi-butterfly</v-icon>
              {{ t('ideology.tabs.women') }} {{ isTamil ? 'நலன் மற்றும் அதிகாரம்' : 'Welfare & Empowerment' }}
            </h3>
            <v-row>
              <v-col v-for="(item, i) in manifesto.women" :key="i" cols="12" md="6">
                <v-list-item class="manifesto-item rounded-lg mb-3">
                  <template v-slot:prepend>
                    <v-avatar color="#800000" size="32" class="mr-3 shadow-small">
                      <v-icon color="white" size="18">mdi-check-bold</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="font-weight-bold color-grey-darken-3 text-wrap">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="youth">
            <h3 class="text-h5 color-maroon font-weight-black mb-4 d-flex align-center">
              <v-icon color="#800000" class="mr-2">mdi-lightning-bolt</v-icon>
              {{ t('ideology.tabs.youth') }} {{ isTamil ? 'மற்றும் வேலைவாய்ப்பு' : '& Employment' }}
            </h3>
            <v-row>
              <v-col v-for="(item, i) in manifesto.youth" :key="i" cols="12" md="6">
                <v-list-item class="manifesto-item rounded-lg mb-3">
                  <template v-slot:prepend>
                    <v-avatar color="#800000" size="32" class="mr-3 shadow-small">
                      <v-icon color="white" size="18">mdi-star</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="font-weight-bold color-grey-darken-3 text-wrap">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="farmers">
             <h3 class="text-h5 color-maroon font-weight-black mb-4 d-flex align-center">
              <v-icon color="#800000" class="mr-2">mdi-tractor</v-icon>
              {{ t('ideology.tabs.farmers') }} {{ isTamil ? 'மேம்பாடு' : 'Development' }}
            </h3>
            <v-row>
              <v-col v-for="(item, i) in manifesto.farmers" :key="i" cols="12" md="6">
                <v-list-item class="manifesto-item rounded-lg mb-3">
                  <template v-slot:prepend>
                    <v-avatar color="#800000" size="32" class="mr-3 shadow-small">
                      <v-icon color="white" size="18">mdi-leaf</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="font-weight-bold color-grey-darken-3 text-wrap">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="admin">
            <h3 class="text-h5 color-maroon font-weight-black mb-4 d-flex align-center">
              <v-icon color="#800000" class="mr-2">mdi-gavel</v-icon>
              {{ t('ideology.tabs.admin') }} {{ isTamil ? 'சீர்திருத்தம்' : 'Reform' }}
            </h3>
            <v-row>
              <v-col v-for="(item, i) in manifesto.societyAdmin" :key="i" cols="12" md="6">
                <v-list-item class="manifesto-item rounded-lg mb-3">
                  <template v-slot:prepend>
                    <v-avatar color="#800000" size="32" class="mr-3 shadow-small">
                      <v-icon color="white" size="18">mdi-check-all</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="font-weight-bold color-grey-darken-3 text-wrap">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="tech">
            <h3 class="text-h5 color-maroon font-weight-black mb-4 d-flex align-center">
              <v-icon color="#800000" class="mr-2">mdi-robot</v-icon>
              {{ t('ideology.tabs.tech') }} (AI)
            </h3>
            <v-row>
              <v-col v-for="(item, i) in manifesto.tech" :key="i" cols="12" md="6">
                <v-list-item class="manifesto-item rounded-lg mb-3">
                  <template v-slot:prepend>
                    <v-avatar color="#800000" size="32" class="mr-3 shadow-small">
                      <v-icon color="white" size="18">mdi-molecule</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="font-weight-bold color-grey-darken-3 text-wrap">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="fishers">
            <h3 class="text-h5 color-maroon font-weight-black mb-4 d-flex align-center">
              <v-icon color="#800000" class="mr-2">mdi-anchor</v-icon>
              {{ t('ideology.tabs.fishers') }} {{ isTamil ? 'நலன்' : 'Welfare' }}
            </h3>
            <v-row>
              <v-col v-for="(item, i) in manifesto.fishers" :key="i" cols="12" md="6">
                <v-list-item class="manifesto-item rounded-lg mb-3">
                  <template v-slot:prepend>
                    <v-avatar color="#800000" size="32" class="mr-3 shadow-small">
                      <v-icon color="white" size="18">mdi-waves</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="font-weight-bold color-grey-darken-3 text-wrap">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card>

      <!-- Download Manifesto PDF Button -->
      <div class="text-center mb-16">
        <v-btn
          color="#800000"
          size="x-large"
          class="rounded-pill font-weight-black px-12 elevation-10"
          prepend-icon="mdi-file-pdf-box"
          href="/TVK_MANIFESTO_2026.pdf"
          target="_blank"
          download
        >
          {{ t('ideology.downloadManifesto') }}
        </v-btn>
      </div>

      <!-- Ideological Leaders Section -->
      <div class="text-center mt-16 mb-8">
        <h2 class="text-h4 font-weight-black color-maroon mb-2">{{ t('ideology.leadersTitle') }}</h2>
        <p class="color-grey italic">{{ t('ideology.leadersDesc') }}</p>
      </div>

      <v-row class="mb-16" justify="center">
        <v-col v-for="leader in leaders" :key="leader.name" cols="6" md="2" class="text-center px-2">
          <v-hover v-slot="{ isHovering, props }">
            <div v-bind="props" :class="{ 'leader-scale': isHovering }" class="transition-all">
              <v-avatar size="130" class="elevation-10 mb-4 leader-avatar border-gold">
                <v-img :src="leader.img" cover :alt="leader.name + ' - ' + leader.legacy"></v-img>
              </v-avatar>
              <h4 class="text-subtitle font-weight-bold color-maroon line-height-tight mb-1">{{ leader.name }}</h4>
              <p class="text-caption font-weight-bold color-gold text-uppercase">{{ leader.legacy }}</p>
            </div>
          </v-hover>
        </v-col>
      </v-row>

      <!-- Call to Action -->
      <v-card color="#800000" class="rounded-xl pa-10 text-center mb-16 CTA-banner" dark>
        <h2 class="text-h3 font-weight-black color-gold mb-4">{{ t('ideology.ctaTitle') }}</h2>
        <p class="text-h6 mb-6 opacity-80">{{ t('ideology.ctaDesc') }}</p>
        <v-btn
          color="#d4af37"
          rounded="pill"
          size="x-large"
          class="font-weight-black elevation-8 text-black px-10"
          to="/create"
        >
          {{ isTamil ? 'கழக போஸ்டர் உருவாக்க' : 'Create Party Poster' }}
        </v-btn>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import logo from "../../assets/tvk-logo-premium.png";
import periyarImg from "../../assets/leaders/periyar.png";
import ambedkarImg from "../../assets/leaders/ambedkar.png";
import kamarajarImg from "../../assets/leaders/kamarajar.png";
import veluNachiyarImg from "../../assets/leaders/velunachiyar.png";
import anjalaiAmmalImg from "../../assets/leaders/anjalaiammal.png";

export default {
  name: "IdeologyPage",
  inject: ['t', 'currentLang'],
  data: () => ({
    logo,
    manifestoTab: "women",
  }),
  computed: {
    isTamil() {
      return this.currentLang() === 'ta';
    },
    principles() {
      return [
        {
          title: this.isTamil ? "மதச்சார்பற்ற சமூக நீதி" : "Secular Social Justice",
          icon: "mdi-balance-scale",
          desc: this.isTamil 
            ? "சாதி, மதம், மொழி கடந்த மனிதநேயமே எமது கட்சியின் அடித்தளம். அனைவருக்கும் சமமான வாய்ப்பு மற்றும் அதிகாரம்."
            : "Humanity beyond caste, religion, and language is the foundation of our party. Equal opportunity and power for all."
        },
        {
          title: this.isTamil ? "விகிதாச்சார இடப்பங்கீடு" : "Proportional Representation",
          icon: "mdi-chart-pie",
          desc: this.isTamil
            ? "சாதி ஒழியும் வரை அனைத்துப் பிரிவினருக்கும் அனைத்துத் துறைகளிலும் விகிதாச்சார அடிப்படையில் பிரதிநிதித்துவம் அளிப்பது."
            : "Providing representation across all sectors based on population proportion until caste is abolished."
        },
        {
          title: this.isTamil ? "மதச்சார்பின்மை" : "Secularism",
          icon: "mdi-hands-pray",
          desc: this.isTamil
            ? "அனைத்து மதத்தவரையும் மத நம்பிக்கையற்றவரையும் சமமாக நடத்தும் அரசு நிர்வாகம். தனிப்பட்ட நம்பிக்கைகளில் தலையிடாமை."
            : "A government administration that treats all religions and non-believers equally. Non-interference in personal beliefs."
        },
        {
          title: this.isTamil ? "மாநிலத் தன்னாட்சி" : "State Autonomy",
          icon: "mdi-map-marker-radius",
          desc: this.isTamil
            ? "கூட்டாட்சி தத்துவத்தின் அடிப்படையில் மாநிலங்களின் தன்னாட்சி உரிமைகளை மீட்டெடுத்தல் மற்றும் நிலைநாட்டுதல்."
            : "Reclaiming and establishing the autonomous rights of states based on the principle of federalism."
        },
        {
          title: this.isTamil ? "இருமொழிக் கொள்கை" : "Two-Language Policy",
          icon: "mdi-translate",
          desc: this.isTamil
            ? "தாய்மொழியான தமிழ் மற்றும் உலக இணைப்பு மொழியான ஆங்கிலம் ஆகிய இரு மொழிக் கொள்கையில் உறுதியான நிலைப்பாடு."
            : "A firm stand on the two-language policy: mother tongue Tamil and global link language English."
        },
        {
          title: this.isTamil ? "தமிழ் ஆட்சி மொழி" : "Tamil as Official Language",
          icon: "mdi-alphabet-latin",
          desc: this.isTamil
            ? "தமிழே ஆட்சிமொழி, நீதிமன்ற வழக்காடு மொழி மற்றும் வழிபாட்டு மொழியாக இருக்க வேண்டும் என்பதே எமது இலக்கு."
            : "Our goal is for Tamil to be the official language, the language of the courts, and the language of worship."
        },
        {
          title: this.isTamil ? "போதை இல்லாத் தமிழகம்" : "Drug-Free Tamil Nadu",
          icon: "mdi-pill-off",
          desc: this.isTamil
            ? "போதைப்பொருள் அற்ற ஆரோக்கியமான தமிழகத்தை உருவாக்குவதற்கான 'Zero Tolerance' மற்றும் கடுமையான சட்ட அமுலாக்கம்."
            : "Creating a healthy, drug-free Tamil Nadu through zero tolerance and strict law enforcement."
        },
        {
          title: this.isTamil ? "பெண்கள் மேம்பாடு" : "Women’s Empowerment",
          icon: "mdi-face-woman",
          desc: this.isTamil
            ? "பெண்களின் கல்வி, அரசியல் அதிகாரம் மற்றும் பொருளாதார சுதந்திரத்திற்கு முழு முதலுரிமை மற்றும் பாதுகாப்பு."
            : "Top priority and protection for women's education, political power, and economic independence."
        },
        {
          title: this.isTamil ? "ஊழலற்ற நிர்வாகம்" : "Corruption-Free Administration",
          icon: "mdi-shield-check",
          desc: this.isTamil
            ? "லஞ்ச லாவண்யம் இல்லாத, அரசியல் தலையீடு அற்ற வெளிப்படையான மற்றும் நேர்மையான மக்கள் நல அரசு நிர்வாகம்."
            : "A transparent and honest people's welfare administration free from bribes and political interference."
        },
        {
          title: this.isTamil ? "சமநிலைச் சமூகம்" : "Egalitarian Society",
          icon: "mdi-account-group",
          desc: this.isTamil
            ? "'பிறப்பொக்கும் எல்லா உயிர்க்கும்' என்ற தத்துவத்தின் அடிப்படையில் ஏற்றத்தாழ்வுகளற்ற சமமான சமுதாயம் படைத்தல்."
            : "Creating an equal society without disparities based on the philosophy 'All are born equal'."
        }
      ]
    },
    manifesto() {
      if (this.isTamil) {
        return {
          women: [
            "ரூ.20 லட்சம் வரை பிணையமில்லா (Collateral-free) வட்டி இல்லாக் கல்வி கடன்.",
            "தொழில் தொடங்க ரூ.25 லட்சம் வரை வட்டி இல்லாக் அரசு கடன் உதவி.",
            "ஆண்டுக்கு 5 லட்சம் இளைஞர்களுக்கு தரமான பயிற்சி (Internship) மற்றும் ஊக்கத்தொகை (பட்டதாரிகளுக்கு ரூ.10,000).",
            "படைப்பாளர்களையும் புதிய தொழில்முனைவோரையும் ஊக்குவிக்க 'Creative Entrepreneurs Scheme'.",
            "அரசு காலிப் பணியிடங்கள் 100% வெளிப்படையான முறையில் நிரப்பப்படும்."
          ],
          farmers: [
            "நெல் குவிண்டாலுக்கு ரூ.3,500 மற்றும் கரும்பு டன்னுக்கு ரூ.4,500 கொள்முதல் விலை.",
            "5 ஏக்கருக்குக் குறைவான விவசாயிகளின் கூட்டுறவு வங்கிக் கடன்கள் முழுமையாகத் தள்ளுபடி.",
            "விவசாயத்திற்கு தடையற்ற 24 மணிநேர மும்முனை மின்சாரம் இலவசம்.",
            "விவசாயிகளின் பிள்ளைகளுக்கான முழு உயர்கல்விச் செலவையும் அரசே ஏற்கும்.",
            "விவசாய காப்பீடு மற்றும் தொழில்நுட்பப் பண்ணை மையங்கள் உருவாக்கம்.",
            "மீனவர்களுக்கு மீன்பிடித் தடைக்கால நிவாரணம் ரூ.27,000 ஆக உயர்வு.",
            "மீனவர்களுக்கான ஆயுள் காப்பீடு ரூ.25 லட்சம் உறுதி."
          ],
          societyAdmin: [
            "கல்வி மற்றும் உயர்பார்வையில் மாநில சுயாட்சியை மீட்டெடுக்க தீவிர நடவடிக்கை.",
            "பள்ளி, கல்லூரிகளில் 'போதை அற்ற மண்டலங்கள்' மற்றும் கடுமையான சட்ட அமுலாக்கம்.",
            "ஊழலற்ற, வெளிப்படையான, முழுமையான 'Paperless' டிஜிட்டல் அரசு நிர்வாகம்.",
            "ஆண்டுக்கு 200 யூனிட் வரை இலவச மின்சாரம் மற்றும் அனைவருக்கும் கான்கிரீட் வீடுகள்.",
            "சுற்றுச்சூழல் பாதுகாப்பு மற்றும் 'பசுமைத் தமிழகம்' - 100 கோடி மரக்கன்றுகள்.",
            "காவல்துறை மற்றும் அரசுப் பணியாளர்களுக்கு ஊதிய உயர்வு மற்றும் சலுகைகள்."
          ],
          tech: [
            "இந்தியாவிலேயே முதல்முறையாக செயற்கை நுண்ணறிவுக்கான (AI) தனி அமைச்சகம்.",
            "தமிழகத்தை உலக தொழில்நுட்ப மையமாக மாற்ற 'AI சிட்டி' (AI City) உருவாக்கம்.",
            "அனைத்து அரசு சேவைகளையும் அணுக 'வெற்றி தமிழ்நாடு சூப்பர் ஆப்'.",
            "1,000 தொழில்நுட்பப் புத்தாக்க மையங்கள் மற்றும் 'Startup Hub'.",
            "பிளாக்செயின் (Blockchain) மூலம் வெளிப்படையான டெண்டர் மற்றும் நிர்வாகம்.",
            "அரசுப் பள்ளிகளில் உலகத்தரம் வாய்ந்த கணினி மற்றும் கோடிங் பயிற்சி."
          ],
          fishers: [
            "கச்சத்தீவை மீட்டெடுத்து மீனவர்களின் பாரம்பரிய மீன்பிடி உரிமைகள் காக்கப்படும்.",
            "மீனவர்களின் விசைப்படகு மற்றும் வலைகளுக்கு 50% மானியம் வழங்கப்படும்.",
            "கடலோரப் பகுதிகளில் மீனவக் கிராமங்களில் சுனாமி மற்றும் புயல் பாதுகாப்பு இல்லங்கள்.",
            "மீன்பிடித் தடைக்கால நிவாரணத் தொகை ரூ.10,000 ஆக உயர்த்தப்படும்."
          ]
        }
      } else {
        return {
          women: [
            "Monthly assistance of ₹2,500 for women breadwinners (Vettri Magalir scheme).",
            "One sovereign of gold and a silk saree marriage assistance for poor families.",
            "6 free LPG cooking cylinders annually for every family.",
            "Interest-free loans up to ₹5 lakh for women's Self-Help Groups (SHGs).",
            "₹15,000 annual assistance for childcare and education for mothers.",
            "100% free and safe travel for women in government buses.",
            "Full fee exemption for girls in higher education to encourage learning."
          ],
          youth: [
            "Monthly stipend of ₹4,000 for graduates and ₹2,000 for diploma students.",
            "Reservation of 75% of local jobs for Tamil residents by legislation.",
            "Collateral-free, zero-interest loans up to ₹25 lakh for young entrepreneurs.",
            "Quality internships with ₹10,000 stipend for 5 lakh youth annually.",
            "Setting up 'Kamarajar Schools of Excellence' (Residential) in every district.",
            "Zero-interest education loans up to ₹20 lakh and frequent job fairs.",
            "Filling of all government job vacancies within 6 months."
          ],
          farmers: [
            "Procurement price of ₹3,500 per quintal for paddy and ₹4,500 per tonne for sugarcane.",
            "Full waiver of cooperative bank loans for farmers owning less than 5 acres.",
            "Uninterrupted 24-hour free three-phase electricity for agriculture.",
            "Full support for higher education costs of children from small farming families.",
            "Creation of crop insurance and technology-based farm support centers.",
            "Increased fishing ban period relief fund to ₹27,000.",
            "Life insurance coverage of ₹25 lakh for every fisherman."
          ],
          societyAdmin: [
            "Serious measures to reclaim State Autonomy in Education and Governance.",
            "Establishment of 'Anti-drug Protection Zones' in schools and colleges.",
            "A fully transparent, corruption-free, and 'Paperless' digital administration.",
            "200 units of free electricity and concrete houses for all homeless citizens.",
            "Environment protection and 'Green Tamil Nadu' - planting 100 crore saplings.",
            "Salary hikes and better welfare benefits for Police and Government staff."
          ],
          tech: [
            "India's first-ever separate Ministry for Artificial Intelligence (AI).",
            "Development of 'AI City' to transform TN into a global technology hub.",
            "'Vetri Tamil Nadu Super App' to provide all government services in one place.",
            "Establishment of 1,000 technology innovation centers and a 'Startup Hub'.",
            "Blockchain-based administration for transparent tenders and governance.",
            "World-class computer science and coding training in government schools."
          ],
          fishers: [
            "Separate Ministry and modern cold-storage facilities for fisherman welfare.",
            "50% subsidy on trawlers and nets for deep-sea fishing.",
            "Comprehensive accident insurance and permanent medical aid for fishers.",
            "Diplomatic measures to reclaim Katchatheevu and traditional fishing rights."
          ]
        }
      }
    },
    leaders() {
      return [
        { name: this.isTamil ? "பெரியார் ஈ.வெ.ரா" : "Periyar E.V.R.", legacy: this.isTamil ? "சமூக நீதி" : "Social Justice", img: periyarImg },
        { name: this.isTamil ? "அம்பேத்கர்" : "Ambedkar", legacy: this.isTamil ? "சமத்துவம்" : "Equality", img: ambedkarImg },
        { name: this.isTamil ? "கே. காமராஜர்" : "K. Kamarajar", legacy: this.isTamil ? "கல்வித் தந்தை" : "Father of Education", img: kamarajarImg },
        { name: this.isTamil ? "அஞ்சலை அம்மாள்" : "Anjalai Ammal", legacy: this.isTamil ? "சமூக வீரம்" : "Social Bravery", img: anjalaiAmmalImg },
        { name: this.isTamil ? "வேலு நாச்சியார்" : "Velu Nachiyar", legacy: this.isTamil ? "வீரமங்கை" : "Brave Woman", img: veluNachiyarImg }
      ]
    }
  }
};
</script>

<style scoped>
.ideology-page {
  background-color: #fcfbf9;
  font-family: 'Inter', sans-serif;
}

.hero-banner {
  background: linear-gradient(135deg, #800000 0%, #a00000 100%);
  position: relative;
  overflow: hidden;
}

.hero-banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 80%);
  pointer-events: none;
}

.title-main {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.principle-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #eee;
  background: white !important;
}

.principle-card:hover {
  transform: translateY(-8px);
  border-color: #d4af37;
  background-color: #fffdf9 !important;
}

.circle-icon {
  width: 60px;
  height: 60px;
  background: #800000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(128, 0, 0, 0.2);
}

.color-maroon { color: #800000; }
.color-gold { color: #d4af37; }
.color-white { color: #ffffff; }
.color-grey { color: #555555; }

.border-maroon-thin {
  border: 1px solid rgba(128, 0, 0, 0.1);
}

.border-gold {
  border: 3px solid #d4af37;
}

.leader-avatar {
  border: 4px solid #d4af37;
  padding: 4px;
  background: white;
  transition: all 0.5s ease;
}

.leader-scale {
  transform: scale(1.05);
}

.transition-all {
  transition: all 0.3s ease;
}

.line-height-relaxed {
  line-height: 1.6;
}

.manifesto-tabs {
  border-bottom: 2px solid rgba(128, 0, 0, 0.05);
}

.manifesto-item {
  background: rgba(128, 0, 0, 0.02);
  border: 1px solid rgba(128, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.manifesto-item:hover {
  background: white;
  box-shadow: 0 4px 15px rgba(128, 0, 0, 0.08);
  border-color: #d4af37;
  transform: translateX(5px);
}

.CTA-banner {
  background: linear-gradient(rgba(128, 0, 0, 0.9), rgba(128, 0, 0, 0.9)), 
              url('https://www.transparenttextures.com/patterns/cubes.png');
}

.shadow-small {
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

@media (max-width: 600px) {
  .title-main {
    font-size: 2.5rem !important;
  }
  .hero-banner {
    height: 350px;
  }
}
</style>
