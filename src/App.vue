<template>
  <v-app>
    <SplashScreen @finish="ready = true" />

    <v-fade-transition>
      <div v-if="ready" class="app-layout">
        <!-- Responsive Navigation Drawer -->
        <v-navigation-drawer
          v-model="drawer"
          color="#800000"
          theme="dark"
          :permanent="$vuetify.display.mdAndUp"
          :temporary="!$vuetify.display.mdAndUp"
          elevation="3"
        >
          <v-list-item class="py-6">
            <template v-slot:prepend>
              <v-avatar size="48" class="mr-2 border-gold">
                <v-img src="./assets/tvk-logo.png"></v-img>
              </v-avatar>
            </template>
            <v-list-item-title class="text-h6 font-weight-bold"
              >தமிழக வெற்றிக் கழகம்</v-list-item-title
            >
            <v-list-item-subtitle>தலைத்தமிழகம்</v-list-item-subtitle>
          </v-list-item>

          <v-divider class="mx-4 mb-2"></v-divider>

          <v-list nav class="px-3">
            <v-list-item prepend-icon="mdi-view-dashboard" title="தகவல் பலகை" to="/" exact class="mb-2 rounded-lg"></v-list-item>
            <v-list-item to="/create" title="போஸ்டர் உருவாக்கம்" class="mb-2 rounded-lg">
              <template v-slot:prepend>
                <v-avatar size="24" class="mr-3">
                  <v-img src="./assets/tvk-logo.png"></v-img>
                </v-avatar>
              </template>
            </v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="வேட்பாளர்கள்" to="/candidates" class="rounded-lg"></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-4 text-center">
              <div class="text-caption text-red-lighten-3 opacity-60">
                Created with 🚩 for My Vetri Tamilnadu
              </div>
            </div>
          </template>
        </v-navigation-drawer>

        <!-- App Bar for Mobile -->
        <v-app-bar
          v-if="!$vuetify.display.mdAndUp"
          color="#800000"
          theme="dark"
          flat
        >
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="font-weight-bold"
            >தமிழக வெற்றிக் கழகம்</v-toolbar-title
          >
        </v-app-bar>

        <v-main>
          <router-view v-slot="{ Component }">
            <v-fade-transition mode="out-in">
              <component :is="Component" />
            </v-fade-transition>
          </router-view>
        </v-main>
      </div>
    </v-fade-transition>
  </v-app>
</template>

<script>
import SplashScreen from "./components/SplashScreen.vue";

export default {
  name: "App",
  components: {
    SplashScreen,
  },
  data: () => ({
    ready: false,
    drawer: null,
  }),
  watch: {
    ready(val) {
      if (val) {
        // Set initial drawer state based on screen size
        this.drawer = this.$vuetify.display.mdAndUp;
      }
    },
  },
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
.v-list-item--active {
  background: rgba(212, 175, 55, 0.1) !important;
  color: #d4af37 !important;
}
</style>
