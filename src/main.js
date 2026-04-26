import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)

// Simple SEO management helper
router.afterEach((to) => {
  // Update Title
  const defaultTitle = 'தமிழக வெற்றிக் கழகம் | தளபதி விஜய்';
  const newTitle = to.meta.title || defaultTitle;
  document.title = newTitle;

  // Update Meta Description
  const defaultDesc = 'மதச்சார்பற்ற சமூக நீதி கொள்கையுடன் தமிழகத்தின் முன்னேற்றத்திற்காக தளபதி விஜய் அவர்களால் தொடங்கப்பட்ட அரசியல் கட்சி.';
  const newDesc = to.meta.description || defaultDesc;
  
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute('content', newDesc);
  }

  // Update OG & Twitter Meta Tags dynamically
  const metaUpdates = [
    { selector: 'meta[property="og:title"]', content: newTitle },
    { selector: 'meta[property="og:description"]', content: newDesc },
    { selector: 'meta[property="twitter:title"]', content: newTitle },
    { selector: 'meta[property="twitter:description"]', content: newDesc },
    { selector: 'meta[property="og:url"]', content: 'https://myvetritamilnadu.org' + to.path },
    { selector: 'meta[property="twitter:url"]', content: 'https://myvetritamilnadu.org' + to.path }
  ];

  metaUpdates.forEach(m => {
    let el = document.querySelector(m.selector);
    if (!el) {
      if (m.selector.startsWith('meta[property="og:')) {
        el = document.createElement('meta');
        el.setAttribute('property', m.selector.match(/"([^"]+)"/)[1]);
        document.head.appendChild(el);
      } else if (m.selector.startsWith('meta[property="twitter:')) {
        el = document.createElement('meta');
        el.setAttribute('property', m.selector.match(/"([^"]+)"/)[1]);
        document.head.appendChild(el);
      }
    }
    if (el) el.setAttribute('content', m.content);
  });

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

// Handle ChunkLoadError (common after new deployments)
router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module') || 
      error.message.includes('Importing a module script failed')) {
    if (!window.location.hash.includes('reloaded')) {
      window.location.hash = 'reloaded';
      window.location.reload();
    }
  }
});

app.mount('#app')
