<template>
  <v-app>
    <div class="bg-flag-wave"></div>
    <SplashScreen @finish="ready = true" />

    <v-fade-transition>
      <div v-if="ready" class="app-layout">
        <!-- Unified Navigation Drawer -->
        <v-navigation-drawer
          v-model="drawer"
          location="left"
          :temporary="true"
          scroll-strategy="block"
          color="#800000"
          theme="dark"
          class="border-gold-right elevation-10"
          width="280"
        >
          <div class="pa-5 text-center branding-drawer">
            <v-avatar size="72" class="mb-3 border-gold border-3 elevation-8 glow-avatar" @click="$router.push('/')">
              <v-img :src="logo" alt="தமிழக வெற்றிக் கழகம் லோகோ"></v-img>
            </v-avatar>
            <div class="text-h6 font-weight-black color-gold letter-spacing-2">த.வெ.க</div>
            <div class="text-caption opacity-70 mt-1 font-weight-bold">
              {{ t("hero.title") }}
            </div>
          </div>

          <v-divider color="#d4af37" class="mx-4 mb-2 opacity-30"></v-divider>

          <v-list nav class="drawer-list px-4 py-0">
            <v-list-item
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              active-color="#d4af37"
              rounded="xl"
              class="mb-1 py-2 drawer-item transition-swing"
              :active-class="'drawer-item-active'"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" size="20" class="mr-3"></v-icon>
              </template>
              <v-list-item-title class="font-weight-black text-body-2">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-4 text-center">
               <v-btn
                variant="outlined"
                color="#D4AF37"
                block
                size="small"
                class="rounded-pill font-weight-black mb-3"
                @click="toggleLang"
              >
                {{ currentLang === "ta" ? "English" : "தமிழ்" }}
              </v-btn>
              <div class="opacity-40 text-tiny font-weight-bold">
                © 2026 TVK OFFICIAL
              </div>
            </div>
          </template>
        </v-navigation-drawer>

        <!-- Minimal Top App Bar -->
        <v-app-bar
          color="#800000"
          theme="dark"
          elevation="2"
          class="px-4"
          height="64"
        >
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            color="#d4af37"
            class="mr-2"
          ></v-app-bar-nav-icon>

          <div
            class="d-flex align-center cursor-pointer"
            @click="$router.push('/')"
          >
            <v-avatar size="36" class="mr-3 border-gold">
              <v-img :src="logo"></v-img>
            </v-avatar>
            <span class="text-h6 font-weight-black">
              {{ currentLang === 'ta' ? 'த.வெ.க' : 'TVK' }}
            </span>
          </div>

          <v-spacer></v-spacer>

          <div class="d-flex align-center">
            <v-chip
              v-if="$vuetify.display.smAndUp"
              color="#D4AF37"
              variant="outlined"
              class="mr-4 font-weight-black d-none d-sm-flex"
            >
              <v-icon start icon="mdi-shield-check"></v-icon>
              {{ t("hero.officialPlatform") }}
            </v-chip>
            
            <v-btn
              icon="mdi-translate"
              color="#D4AF37"
              class="mr-2"
              @click="toggleLang"
            ></v-btn>
          </div>
        </v-app-bar>

        <v-main>
          <router-view v-slot="{ Component }">
            <v-fade-transition mode="out-in">
              <component :is="Component" />
            </v-fade-transition>
          </router-view>

          <!-- Premium Footer -->
          <v-footer
            v-if="$route.path !== '/create'"
            class="bg-grey-darken-4 text-white d-flex flex-column pa-0 mt-auto"
          >
            <div
              class="w-100 px-4 px-md-10 py-10"
              style="max-width: 1400px; margin: 0 auto"
            >
              <v-row>
                <!-- Company Info -->
                <v-col cols="12" md="4" class="mb-6 mb-md-0">
                  <div class="d-flex align-center mb-4">
                    <v-avatar size="48" class="border-gold mr-3" color="white">
                      <v-img :src="logo" cover alt="தமிழக வெற்றிக் கழகம் லோகோ"></v-img>
                    </v-avatar>
                    <div>
                      <h3
                        class="text-h6 font-weight-black lh-1"
                        style="color: #d4af37"
                      >
                        த.வெ.க
                      </h3>
                      <div class="text-caption opacity-70">
                        {{ t("footer.headquarters") }}
                      </div>
                    </div>
                  </div>
                  <p
                    class="text-body-2 text-grey-lighten-1 mb-4 pr-md-6 lh-relaxed"
                  >
                    {{ t("hero.tagline") }}
                  </p>
                  <div class="d-flex" style="gap: 8px">
                    <v-btn
                      icon="mdi-facebook"
                      variant="text"
                      size="small"
                      color="#D4AF37"
                      href="https://facebook.com/tvkvijayhq"
                      target="_blank"
                    ></v-btn>
                    <v-btn
                      icon="mdi-twitter"
                      variant="text"
                      size="small"
                      color="#D4AF37"
                      href="https://twitter.com/tvkvijayhq"
                      target="_blank"
                    ></v-btn>
                    <v-btn
                      icon="mdi-instagram"
                      variant="text"
                      size="small"
                      color="#D4AF37"
                      href="https://instagram.com/tvkvijayhq"
                      target="_blank"
                    ></v-btn>
                    <v-btn
                      icon="mdi-youtube"
                      variant="text"
                      size="small"
                      color="#D4AF37"
                      href="https://youtube.com/@TVKVijayHQ-Offl"
                      target="_blank"
                    ></v-btn>
                  </div>
                </v-col>

                <!-- Contact Info -->
                <v-col cols="12" md="4" class="mb-6 mb-md-0">
                  <h3
                    class="text-subtitle-1 font-weight-bold mb-4 pb-2 d-inline-block footer-title"
                  >
                    {{ t("footer.contact") }}
                  </h3>
                  <div class="d-flex align-start mb-3">
                    <v-icon color="#D4AF37" class="mr-3 mt-1"
                      >mdi-map-marker</v-icon
                    >
                    <div class="text-body-2 text-grey-lighten-1">
                      {{ t("footer.address") }}
                    </div>
                  </div>
                  <div class="d-flex align-center mb-3">
                    <v-icon color="#D4AF37" class="mr-3">mdi-email</v-icon>
                    <div class="text-body-2 text-grey-lighten-1">
                      contact@tvkitwing.com
                    </div>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon color="#D4AF37" class="mr-3">mdi-phone</v-icon>
                    <div class="text-body-2 text-grey-lighten-1">
                      +91 044-24567890
                    </div>
                  </div>
                </v-col>

                <!-- Useful Links -->
                <v-col cols="12" md="4">
                  <h3
                    class="text-subtitle-1 font-weight-bold mb-4 pb-2 d-inline-block footer-title"
                  >
                    {{ t("footer.links") }}
                  </h3>
                  <div class="d-flex flex-column" style="gap: 12px">
                    <router-link
                      to="/kolgai"
                      class="footer-link text-body-2 text-grey-lighten-1 text-decoration-none"
                      >{{ t("nav.kolgai") }}</router-link
                    >
                    <router-link
                      to="/candidates"
                      class="footer-link text-body-2 text-grey-lighten-1 text-decoration-none"
                      >{{ t("nav.candidates") }}</router-link
                    >
                    <router-link
                      to="/dashboard"
                      class="footer-link text-body-2 text-grey-lighten-1 text-decoration-none"
                      >{{ t("nav.dashboard") }}</router-link
                    >
                    <a
                      href="https://tvk.party"
                      target="_blank"
                      class="footer-link text-body-2 text-grey-lighten-1 text-decoration-none"
                      >{{ t("hero.join") }}</a
                    >
                  </div>
                </v-col>
              </v-row>
            </div>

            <div
              class="w-100 py-4 text-center text-caption mx-auto d-flex flex-column align-center"
              style="background-color: #111"
            >
              <div class="mb-1">
                <span class="text-grey"
                  >&copy; 2026 {{ t("footer.rights") }}</span
                >
              </div>
              <div class="d-flex align-center">
                <v-icon size="14" color="#d4af37" class="mr-1"
                  >mdi-code-tags</v-icon
                >
                <span class="text-grey-darken-1">Designed & Managed by</span>
                <a
                  href="https://rameshvijay-portfolio.web.app/"
                  target="_blank"
                  class="font-weight-black ml-1 text-decoration-none"
                  style="color: #d4af37; letter-spacing: 0.5px"
                  >VIJAY RAMESH</a
                >
              </div>
            </div>
          </v-footer>
        </v-main>
        <ChatBot />
      </div>
    </v-fade-transition>
  </v-app>
</template>

<script>
import SplashScreen from "./components/SplashScreen.vue";
import ChatBot from "./components/Chat/ChatBot.vue";
import logo from "./assets/tvk-logo.png";
import translations from "./data/translations";

export default {
  name: "App",
  components: {
    SplashScreen,
    ChatBot,
  },
  provide() {
    return {
      currentLang: () => this.currentLang,
      t: this.t.bind(this),
    };
  },
  data: () => ({
    logo,
    ready: false,
    drawer: false,
    currentLang: "ta",
  }),
  computed: {
    navItems() {
      return [
        { text: this.t("nav.home"), to: "/", icon: "mdi-home" },
        {
          text: this.t("nav.poster"),
          to: "/create",
          icon: "mdi-palette-outline",
        },
        {
          text: this.t("nav.letter"),
          to: "/letter",
          icon: "mdi-email-edit-outline",
        },
        { text: this.t("nav.kolgai"), to: "/kolgai", icon: "mdi-script-text" },
        { text: this.t("nav.results"), to: "/results", icon: "mdi-poll" },
        {
          text: this.isTamil ? "வேட்பாளர்கள்" : "Candidates",
          to: "/candidates",
          icon: "mdi-account-group",
        },
        {
          text: this.isTamil ? "நிர்வாகம்" : "Admin",
          to: "/dashboard",
          icon: "mdi-view-dashboard",
        },
        {
          text: this.isTamil ? "AI தேடல்" : "AI Search",
          to: "/search",
          icon: "mdi-robot-outline",
        },
        {
          text: this.isTamil ? "பொன்மொழிகள்" : "Quotes",
          to: "/quotes",
          icon: "mdi-format-quote-open",
        },
        {
          text: this.isTamil ? "ஆதரவாளர் அட்டை" : "Supporter Card",
          to: "/supporter-card",
          icon: "mdi-card-account-details-star-outline",
        },
        {
          text: this.isTamil ? "வரலாற்றுப் பயணம்" : "Journey",
          to: "/journey",
          icon: "mdi-timeline-clock-outline",
        },
      ];
    },
  },
  methods: {
    t(path) {
      if (!path) return '';
      const keys = path.split(".");
      const lang = this.currentLang || 'ta';
      
      // Fallback to top-level object
      let current = translations[lang];
      if (!current) return path;

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return path;
        }
      }
      return typeof current === 'string' ? current : path;
    },
    toggleLang() {
      this.currentLang = this.currentLang === "ta" ? "en" : "ta";
    },
    isTamil() {
      return this.currentLang === "ta";
    }
  },
};
</script>

<style>
.app-layout {
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
html {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.border-gold {
  border: 2px solid #d4af37;
}

.border-gold-right {
  border-right: 2px solid #d4af37 !important;
}

.glow-avatar {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.glow-avatar:hover {
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
  transform: scale(1.05);
}

.drawer-list {
  background: transparent !important;
  flex-grow: 1;
  overflow-y: auto;
}

.drawer-item {
  transition: all 0.3s ease;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.85) !important;
  min-height: 44px !important;
}

.text-tiny {
  font-size: 0.65rem;
  letter-spacing: 0.5px;
}

.drawer-item:hover {
  background: rgba(212, 175, 55, 0.1) !important;
  color: #d4af37 !important;
  transform: translateX(5px);
}

.drawer-item-active {
  background: linear-gradient(90deg, rgba(212, 175, 55, 0.25) 0%, transparent 100%) !important;
  color: #d4af37 !important;
  border-left: 4px solid #d4af37 !important;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
}

.branding-drawer {
  flex-shrink: 0;
}

.lh-1 {
  line-height: 1;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}

.v-main {
  background-color: #fcfcfc;
  transition: padding 0.3s ease;
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #800000;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a00000;
}

/* Footer Styles */
.footer-title {
  border-bottom: 2px solid #d4af37;
  display: inline-block;
}

.footer-link {
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #d4af37 !important;
  transform: translateX(4px);
}
</style>
