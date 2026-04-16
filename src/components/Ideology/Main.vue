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
          கொள்கைகள்
        </h1>
        <p class="text-h5 font-weight-medium color-white italic opacity-90">
          "பிறப்பொக்கும் எல்லா உயிர்க்கும்"
        </p>
        <v-divider color="#d4af37" class="mt-4 mx-auto" width="100" thickness="3"></v-divider>
      </div>
    </v-sheet>

    <v-container class="mt-n16">
      <!-- Main Philosophy Card -->
      <v-card class="elevation-12 rounded-xl glass-card pa-8 mb-12 border-gold-subtle">
        <div class="d-flex align-center mb-6">
          <v-icon color="#800000" size="40" class="mr-4">mdi-star-shooting</v-icon>
          <h2 class="text-h4 font-weight-black color-maroon">அடிப்படை சித்தாந்தம்</h2>
        </div>
        <p class="text-h6 font-weight-medium line-height-relaxed color-grey">
          தமிழக வெற்றிக் கழகம், <strong class="color-maroon">"மதச்சார்பற்ற சமூக நீதி"</strong> எனும் உயரிய கருத்தியலைத் தனது முதன்மைக் கொள்கையாகக் கொண்டுள்ளது. 
          அனைத்துத் துறைகளிலும் சமத்துவத்தையும், சமூக நீதியையும் நிலைநாட்டுவதே எமது கட்சியின் லட்சியம்.
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
        <h2 class="text-h4 font-weight-black color-maroon mb-2">தேர்தல் வாக்குறுதிகள் 2026</h2>
        <p class="color-grey italic">தமிழகத்தின் ஒளிமயமான எதிர்காலத்திற்கான எமது திட்டங்கள்</p>
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
            <v-icon start>mdi-face-woman</v-icon> மகளிர்
          </v-tab>
          <v-tab value="youth" class="font-weight-black">
            <v-icon start>mdi-account-school</v-icon> இளைஞர்கள்
          </v-tab>
          <v-tab value="farmers" class="font-weight-black">
            <v-icon start>mdi-sprout</v-icon> விவசாயம்
          </v-tab>
          <v-tab value="admin" class="font-weight-black">
            <v-icon start>mdi-shield-crown</v-icon> நிர்வாகம்
          </v-tab>
          <v-tab value="tech" class="font-weight-black">
            <v-icon start>mdi-robot</v-icon> AI
          </v-tab>
          <v-tab value="fishers" class="font-weight-black">
            <v-icon start>mdi-anchor</v-icon> மீனவர்கள்
          </v-tab>
        </v-tabs>

        <v-window v-model="manifestoTab" class="pa-6">
          <v-window-item value="women">
            <h3 class="text-h5 color-maroon font-weight-black mb-4 d-flex align-center">
              <v-icon color="#800000" class="mr-2">mdi-butterfly</v-icon>
              மகளிர் நலன் மற்றும் அதிகாரம்
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
              இளைஞர் மற்றும் வேலைவாய்ப்பு
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
              விவசாயிகள் மேம்பாடு
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
              நிர்வாக சீர்திருத்தம்
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
              தொழில்நுட்பம் (AI)
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
              மீனவர்கள் நலன்
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

      <!-- Ideological Leaders Section -->
      <div class="text-center mt-16 mb-8">
        <h2 class="text-h4 font-weight-black color-maroon mb-2">எமது கருத்தியல் வழிகாட்டிகள்</h2>
        <p class="color-grey italic">அவர்கள் காட்டிய வழியில் மக்கள் பணி தொடரும்</p>
      </div>

      <v-row class="mb-16" justify="center">
        <v-col v-for="leader in leaders" :key="leader.name" cols="6" md="2" class="text-center px-2">
          <v-hover v-slot="{ isHovering, props }">
            <div v-bind="props" :class="{ 'leader-scale': isHovering }" class="transition-all">
              <v-avatar size="130" class="elevation-10 mb-4 leader-avatar border-gold">
                <v-img :src="leader.img" cover></v-img>
              </v-avatar>
              <h4 class="text-subtitle font-weight-bold color-maroon line-height-tight mb-1">{{ leader.name }}</h4>
              <p class="text-caption font-weight-bold color-gold text-uppercase">{{ leader.legacy }}</p>
            </div>
          </v-hover>
        </v-col>
      </v-row>

      <!-- Call to Action -->
      <v-card color="#800000" class="rounded-xl pa-10 text-center mb-16 CTA-banner" dark>
        <h2 class="text-h3 font-weight-black color-gold mb-4">புதியதொரு தமிழகம் செய்வோம்!</h2>
        <p class="text-h6 mb-6 opacity-80">இனைவோம் தமிழக வெற்றிக் கழகத்தில் - மக்கள் உரிமைகளை மீட்டெடுக்க</p>
        <v-btn
          color="#d4af37"
          rounded="pill"
          size="x-large"
          class="font-weight-black elevation-8 text-black px-10"
          to="/create"
        >
          கழக போஸ்டர் உருவாக்க
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
  data: () => ({
    logo,
    manifestoTab: "women",
    principles: [
      {
        title: "மதச்சார்பற்ற சமூக நீதி",
        icon: "mdi-balance-scale",
        desc: "சாதி, மதம், மொழி கடந்த மனிதநேயமே எமது கட்சியின் அடித்தளம். அனைவருக்கும் சமமான வாய்ப்பு மற்றும் அதிகாரம்."
      },
      {
        title: "சமத்துவம்",
        icon: "mdi-account-group",
        desc: "'பிறப்பொக்கும் எல்லா உயிர்க்கும்' என்ற வள்ளுவர் வாக்குப்படி எவ்வித ஏற்றத்தாழ்வுகளும் அற்ற சமுதாயம்."
      },
      {
        title: "பெண்கள் மேம்பாடு",
        icon: "mdi-face-woman",
        desc: "பெண்களின் கல்வி, அரசியல் அதிகாரம் மற்றும் பொருளாதார சுதந்திரத்திற்கு முழு முதலுரிமை."
      },
      {
        title: "மாநில சுயாட்சி",
        icon: "mdi-map-marker-radius",
        desc: "கூட்டாட்சி தத்துவத்தின் அடிப்படையில் மாநிலங்களின் உரிமைகளை மீட்டெடுத்தல் மற்றும் கல்வி மாநிலப் பட்டியலுக்கு."
      },
      {
        title: "மொழி உணர்வு",
        icon: "mdi-translate",
        desc: "அன்னைத் தமிழைப் பாதுகாத்தல் மற்றும் இருமொழிக் கொள்கையில் உறுதியான நிலைப்பாடு."
      },
      {
        title: "ஊழலற்ற நிர்வாகம்",
        icon: "mdi-shield-check",
        desc: "மக்களுக்கான அதிகாரத்தை மக்களுக்கே வழங்கும் வெளிப்படையான மற்றும் ஊழலற்ற நேர்மையான ஆட்சி."
      }
    ],
    manifesto: {
      women: [
        "குடும்பத் தலைவிகளுக்கு மாதம் ரூ.2,500 உதவித்தொகை மற்றும் 6 இலவச சிலிண்டர்கள்.",
        "திருமணத்தின் போது ஒரு பவுன் தங்கம் மற்றும் பட்டுப் புடவை உதவி.",
        "புதிதாக கருவுற்ற பெண்களுக்கு சத்துணவு பெட்டகம் மற்றும் நிதியுதவி.",
        "அரசுப் பேருந்துகளில் பெண்களுக்கு 100% இலவசப் பயணம் மற்றும் முன்னுரிமை.",
        "பெண்கள் பாதுகாப்பிற்காக அனைத்துக் காவல் நிலையங்களிலும் சிறப்புப் பிரிவு.",
        "பெண்கள் சுயஉதவி குழுக்களின் கடன்கள் முழுமையாகத் தள்ளுபடி செய்யப்படும்.",
        "கைவிடப்பட்ட பெண்கள் மற்றும் விதவைகளுக்கு முன்னுரிமை அடிப்படையில் அரசு வேலை."
      ],
      youth: [
        "பட்டதாரிகளுக்கு மாதம் ரூ.4,000 மற்றும் டிப்ளோமா மாணவர்களுக்கு ரூ.2,000 உதவித்தொகை.",
        "வேலை வாய்ப்பில் 75% தமிழர்களுக்கே முன்னுரிமை வழங்க சட்டம் இயற்றப்படும்.",
        "ரூ.20 லட்சம் வரை பிணையமில்லா (Collateral-free) வட்டி இல்லாக் கல்வி கடன்.",
        "தொழில் தொடங்க ரூ.25 லட்சம் வரை வட்டி இல்லாக் அரசு கடன் உதவி.",
        "ஆண்டுக்கு 5 லட்சம் இளைஞர்களுக்கு தரமான பயிற்சி (Internship) மற்றும் உதவித்தொகை.",
        "அனைத்து மாவட்டங்களிலும் உயர்மட்ட விளையாட்டு மைதானங்கள் மற்றும் பயிற்சி மையங்கள்.",
        "அரசு காலிப் பணியிடங்கள் 100% வெளிப்படையான முறையில் நிரப்பப்படும்."
      ],
      farmers: [
        "நெல்லுக்கு குவிண்டாலுக்கு ரூ.3,500 மற்றும் கரும்புக்கு டன்னுக்கு ரூ.4,500 விலை.",
        "5 ஏக்கருக்கும் குறைவான விவசாயிகளின் கூட்டுறவு வங்கிக் கடன்கள் முழுமையாகத் தள்ளுபடி.",
        "சிறு மற்றும் குறு விவசாயிகள் குடும்பத்தின் உயர்கல்விச் செலவை அரசே ஏற்கும்.",
        "விவசாயத்திற்கு தடையற்ற 24 மணிநேர மும்முனை மின்சாரம் இலவசமாக வழங்கப்படும்.",
        "நெசவாளர்களுக்கு 50% நூல் மற்றும் சாயம் மானியம், 5 ஆண்டுகள் மின்வரி விலக்கு.",
        "நெசவாளர் கடன் உதவிக்காக ரூ.15,000 கோடி அரசு உத்தரவாத நிதி."
      ],
      societyAdmin: [
        "போதைப்பொருள் அற்ற தமிழகத்தை உருவாக்க 'Zero Tolerance' கொள்கை மற்றும் கண்காணிப்பு.",
        "5 ஆண்டுகளுக்கும் மேலாக பணியாற்றும் தற்காலிக ஆசிரியர்கள் மற்றும் பணியாளர்கள் பணி நிரந்தரம்.",
        "காவல்துறை பணியாளர்களுக்கு ஊதிய உயர்வு மற்றும் தனியான மருத்துவமனை வசதி.",
        "மாநில சுயாட்சி - கல்வி அதிகாரத்தை மீண்டும் மாநிலப் பட்டியலுக்கு மாற்ற முயற்சி.",
        "வெளிப்படையான மற்றும் ஊழலற்ற நேர்மையான 'Paperless' அரசு நிர்வாகம்.",
        "ஆளுநர் பதவி நீக்கம் மற்றும் மக்கள் நலத் திட்டங்களுக்கு நேரடி நிதி ஒதுக்கீடு."
      ],
      tech: [
        "நாட்டிலேயே முதல்முறையாக செயற்கை நுண்ணறிவுக்கென (AI) தனி அமைச்சகம் அமல்.",
        "தமிழகத்தை டிஜிட்டல் தலைநகராக மாற்ற 'AI சிட்டி' (AI City) மற்றும் ஹப் உருவாக்கம்.",
        "அனைத்து அரசு சேவைகளையும் ஒரே இடத்தில் பெற 'வெற்றி தமிழ்நாடு சூப்பர் ஆப்'.",
        "நிர்வாக வெளிப்படைத்தன்மைக்கு 'Real-time Governance Dashboard' வசதி.",
        "மதுரை, கோவை உள்ளிட்ட நகரங்களில் 1,000 தொழில்நுட்ப புத்தாக்க மையங்கள்.",
        "அரசுத் தேர்வுகள் உரிய காலத்தில் எவ்வித முறைகேடும் இன்றி நடத்தப்படும்."
      ],
      fishers: [
        "கச்சத்தீவை மீட்டெடுத்து மீனவர்களின் பாரம்பரிய மீன்பிடி உரிமைகள் காக்கப்படும்.",
        "மீனவர்களின் விசைப்படகு மற்றும் வலைகளுக்கு 50% மானியம் வழங்கப்படும்.",
        "கடலோரப் பகுதிகளில் மீனவக் கிராமங்களில் சுனாமி மற்றும் புயல் பாதுகாப்பு இல்லங்கள்.",
        "மீன்பிடித் தடைக்கால நிவாரணத் தொகை ரூ.10,000 ஆக உயர்த்தப்படும்."
      ]
    },
    leaders: [
      { name: "பெரியார் ஈ.வெ.ரா", legacy: "சமூக நீதி", img: periyarImg },
      { name: "அம்பேத்கர்", legacy: "சமத்துவம்", img: ambedkarImg },
      { name: "கே. காமராஜர்", legacy: "கல்வித் தந்தை", img: kamarajarImg },
      { name: "அஞ்சலை அம்மாள்", legacy: "சமூக வீரம்", img: anjalaiAmmalImg },
      { name: "வேலு நாச்சியார்", legacy: "வீரமங்கை", img: veluNachiyarImg }
    ]
  })
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
