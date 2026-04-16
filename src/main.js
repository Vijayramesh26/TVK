import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueApexCharts from "vue3-apexcharts";

import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueApexCharts)

// Simple SEO management helper
router.afterEach((to) => {
  // Update Title
  const defaultTitle = 'தமிழக வெற்றிக் கழகம் | தளபதி விஜய்';
  document.title = to.meta.title || defaultTitle;

  // Update Meta Description
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute('content', to.meta.description || 'மதச்சார்பற்ற சமூக நீதி கொள்கையுடன் தமிழகத்தின் முன்னேற்றத்திற்காக தளபதி விஜய் அவர்களால் தொடங்கப்பட்ட அரசியல் கட்சி.');
  }

  // Update Canonical Link
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', 'https://myvetritamilnadu.org' + to.path);

  // Update Scroll Position
  window.scrollTo(0, 0);
});

app.mount('#app')
