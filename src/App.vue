<template>
  <v-app>
    <SplashScreen @finish="ready = true" />

    <v-fade-transition>
      <div v-if="ready" class="app-layout">
        <!-- Mobile Navigation Drawer -->
        <v-navigation-drawer
          v-model="drawer"
          location="left"
          temporary
          color="#800000"
          theme="dark"
          class="border-gold-left"
        >
          <div class="pa-6 text-center">
            <v-avatar size="80" class="mb-4 border-gold border-3 elevation-4">
              <v-img :src="logo"></v-img>
            </v-avatar>
            <div class="text-h6 font-weight-black color-gold">த.வெ.க</div>
            <div class="text-caption opacity-70 mt-1">தமிழக வெற்றிக் கழகம்</div>
          </div>

          <v-divider color="#d4af37" class="mb-2"></v-divider>

          <v-list nav class="drawer-list px-4">
            <v-list-item
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              active-color="#d4af37"
              rounded="lg"
              class="mb-2 py-3 drawer-item"
              :active-class="'drawer-item-active'"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" size="24" class="mr-4"></v-icon>
              </template>
              <v-list-item-title class="font-weight-bold text-subtitle-1">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          
          <template v-slot:append>
            <div class="pa-6 text-center opacity-50 text-caption">
              © 2026 தமிழக வெற்றிக் கழகம்
            </div>
          </template>
        </v-navigation-drawer>

        <!-- Persistent Top Navigation Bar -->
        <v-app-bar 
          color="#800000" 
          theme="dark" 
          elevation="4" 
          class="px-4 px-md-8"
          height="64"
        >
          <!-- Hamburger Menu (Mobile Only) -->
          <v-app-bar-nav-icon 
            @click="drawer = !drawer" 
            color="#d4af37"
            class="d-md-none mr-2"
          ></v-app-bar-nav-icon>

          <!-- Branding -->
          <div
            class="d-flex align-center cursor-pointer"
            @click="$router.push('/')"
          >
            <v-avatar size="38" class="mr-3 border-gold elevation-2">
              <v-img :src="logo"></v-img>
            </v-avatar>
            <div class="d-flex flex-column">
              <!-- Show short name on mobile, full name on desktop -->
              <span class="text-h6 font-weight-black lh-1 mb-0 d-sm-none">த.வெ.க</span>
              <span class="text-subtitle-1 font-weight-black lh-1 mb-0 d-none d-sm-block">தமிழக வெற்றிக் கழகம்</span>
              <span class="text-caption opacity-70 lh-1 mt-1 d-none d-sm-block">
                பிறப்பொக்கும் எல்லா உயிர்க்கும்!
              </span>
            </div>
          </div>

          <v-spacer></v-spacer>

          <!-- Desktop Navigation Items (Hidden on Mobile) -->
          <div class="d-none d-md-flex align-center">
            <v-btn
              v-for="item in navItems"
              :key="item.to"
              variant="text"
              :to="item.to"
              exact
              class="mx-1 nav-btn"
              :active-class="'nav-btn-active'"
            >
              <v-icon class="mr-md-2">{{ item.icon }}</v-icon>
              <span>{{ item.text }}</span>
            </v-btn>
          </div>

          <div class="mr-2"></div>
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
            <div class="w-100 px-4 px-md-10 py-10" style="max-width: 1400px; margin: 0 auto;">
              <v-row>
                <!-- Company Info -->
                <v-col cols="12" md="4" class="mb-6 mb-md-0">
                  <div class="d-flex align-center mb-4">
                    <v-avatar size="48" class="border-gold mr-3" color="white">
                      <v-img :src="logo" cover></v-img>
                    </v-avatar>
                    <div>
                      <h3 class="text-h6 font-weight-black lh-1" style="color: #D4AF37;">த.வெ.க</h3>
                      <div class="text-caption opacity-70">தலைமையகம்</div>
                    </div>
                  </div>
                  <p class="text-body-2 text-grey-lighten-1 mb-4 pr-md-6 lh-relaxed">
                    தமிழக வெற்றிக் கழகம், பிறப்பொக்கும் எல்லா உயிர்க்கும் என்ற அடிப்படை கொள்கையுடன் செயல்படும் அரசியல் கட்சி.
                  </p>
                  <div class="d-flex" style="gap: 8px;">
                    <v-btn icon="mdi-facebook" variant="text" size="small" color="#D4AF37"></v-btn>
                    <v-btn icon="mdi-twitter" variant="text" size="small" color="#D4AF37"></v-btn>
                    <v-btn icon="mdi-instagram" variant="text" size="small" color="#D4AF37"></v-btn>
                    <v-btn icon="mdi-youtube" variant="text" size="small" color="#D4AF37"></v-btn>
                  </div>
                </v-col>

                <!-- Contact Info -->
                <v-col cols="12" md="4" class="mb-6 mb-md-0">
                  <h3 class="text-subtitle-1 font-weight-bold mb-4 pb-2 d-inline-block footer-title">தொடர்புக்கு</h3>
                  <div class="d-flex align-start mb-3">
                    <v-icon color="#D4AF37" class="mr-3 mt-1">mdi-map-marker</v-icon>
                    <div class="text-body-2 text-grey-lighten-1">
                      எண் 12, பனையூர் பிரதான சாலை,<br>
                      பனையூர், சென்னை - 600119<br>
                      தமிழ்நாடு, இந்தியா.
                    </div>
                  </div>
                  <div class="d-flex align-center mb-3">
                    <v-icon color="#D4AF37" class="mr-3">mdi-email</v-icon>
                    <div class="text-body-2 text-grey-lighten-1">contact@tvk.party</div>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon color="#D4AF37" class="mr-3">mdi-phone</v-icon>
                    <div class="text-body-2 text-grey-lighten-1">+91 044-24567890</div>
                  </div>
                </v-col>

                <!-- Useful Links -->
                <v-col cols="12" md="4">
                  <h3 class="text-subtitle-1 font-weight-bold mb-4 pb-2 d-inline-block footer-title">முக்கிய இணைப்புகள்</h3>
                  <div class="d-flex flex-column" style="gap: 12px;">
                    <router-link to="/kolgai" class="footer-link text-body-2 text-grey-lighten-1 text-decoration-none">கட்சியின் கொள்கைகள்</router-link>
                    <router-link to="/candidates" class="footer-link text-body-2 text-grey-lighten-1 text-decoration-none">வேட்பாளர்கள் பட்டியல்</router-link>
                    <router-link to="/dashboard" class="footer-link text-body-2 text-grey-lighten-1 text-decoration-none">நிர்வாகம்</router-link>
                    <a href="https://tvk.party" target="_blank" class="footer-link text-body-2 text-grey-lighten-1 text-decoration-none">உறுப்பினர் சேர்க்கை</a>
                  </div>
                </v-col>
              </v-row>
            </div>

            <div class="w-100 py-4 text-center text-caption mx-auto" style="background-color: #111;">
              <span class="text-grey">&copy; 2026 தமிழக வெற்றிக் கழகம். All rights reserved.</span>
            </div>
          </v-footer>
        </v-main>
      </div>
    </v-fade-transition>
  </v-app>
</template>

<script>
import SplashScreen from "./components/SplashScreen.vue";
import logo from "./assets/tvk-logo.png";

export default {
  name: "App",
  components: {
    SplashScreen,
  },
  data: () => ({
    logo,
    ready: false,
    drawer: false,
    navItems: [
      { text: "முகப்பு", to: "/", icon: "mdi-home" },
      { text: "கொள்கைகள்", to: "/kolgai", icon: "mdi-script-text" },
      { text: "வேட்பாளர்கள்", to: "/candidates", icon: "mdi-account-group" },
      { text: "நிர்வாகம்", to: "/dashboard", icon: "mdi-view-dashboard-outline" },
    ]
  }),
};
</script>

<style>
.app-layout {
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.border-gold {
  border: 2px solid #d4af37;
}

.lh-1 {
  line-height: 1;
}

.nav-btn {
  border-radius: 8px !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  text-transform: none !important;
  transition: all 0.3s ease;
}

.nav-btn-active {
  background: rgba(212, 175, 55, 0.15) !important;
  color: #d4af37 !important;
  border: 1px solid rgba(212, 175, 55, 0.3) !important;
}

.drawer-item {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.drawer-item-active {
  background: rgba(212, 175, 55, 0.2) !important;
  color: #d4af37 !important;
  border: 1px solid rgba(212, 175, 55, 0.4) !important;
}

.border-3 {
  border-width: 3px !important;
}

.v-main {
  background-color: #fcfcfc;
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
  border-bottom: 2px solid #D4AF37;
  display: inline-block;
}

.footer-link {
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #D4AF37 !important;
  transform: translateX(4px);
}
</style>
