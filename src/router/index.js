import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home/Main.vue'
import Dashboard from '../components/Dashboard/Main.vue'
import PosterCreator from '../components/PosterCreator/Main.vue'
import Candidates from '../components/Candidates/Main.vue'
import Ideology from '../components/Ideology/Main.vue'
import Results from '../components/Results/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'TVK Official Page | தமிழக வெற்றிக் கழகம் | Thalapathy Vijay',
      description: 'The official website of TVK (தமிழக வெற்றிக் கழகம்). Led by Thalapathy Vijay, aiming for secular social justice and development. | தளபதி விஜய் அவர்களின் த.வெ.க அதிகாரப்பூர்வ தளம்.'
    }
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    meta: {
      title: 'TVK Election Results 2026 | தேர்தல் முடிவுகள் | Official Polling Stats',
      description: 'Official 2026 Tamil Nadu Election results and polling statistics for TVK. Explore constituency-wise voting data. | த.வெ.க 2026 தேர்தல் முடிவுகள் மற்றும் புள்ளிவிவரங்கள்.'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'TVK Dashboard | த.வெ.க நிர்வாகக் குழு & Stats | High-Command',
      description: 'Official TVK administration and statistics dashboard. Explore the growth of Tamilaga Vettri Kazhagam. | த.வெ.க நிர்வாகம் மற்றும் புள்ளிவிவரங்கள்.'
    }
  },
  {
    path: '/create',
    name: 'PosterCreator',
    component: PosterCreator,
    meta: {
      title: 'TVK Canvas Poster Creator | போஸ்டர் உருவாக்கம் | Official Materials',
      description: 'Design official TVK campaign posters with our Canvas Creator. Supporting Thalapathy Vijay 2026. | த.வெ.க அதிகாரப்பூர்வ தேர்தல் போஸ்டர் உருவாக்கம்.'
    }
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: Candidates,
    meta: {
      title: 'TVK 2026 Candidates List | த.வெ.க வேட்பாளர்கள் | Assembly Nominees',
      description: 'List of TVK candidates for the 2026 Tamil Nadu Assembly Elections. Meet our representatives. | 2026 சட்டமன்றத் தேர்தலுக்கான த.வெ.க வேட்பாளர் பட்டியல்.'
    }
  },
  {
    path: '/kolgai',
    name: 'Ideology',
    component: Ideology,
    meta: {
      title: 'TVK Manifesto (Kolgai) 2026 | கொள்கைகள் & வாக்குறுதிகள் | TVK Policies',
      description: 'Official TVK Manifesto (கொள்கை) 2026. Social justice, economy, and education vision. | த.வெ.க-வின் அதிகாரப்பூர்வ கொள்கைகள் மற்றும் வாக்குறுதிகள்.'
    }
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('../components/News/Detail.vue'),
    props: true,
    meta: {
      title: 'TVK News | த.வெ.க செய்திகள் | Press Release',
      description: 'Detailed official news and press releases from Tamilaga Vettri Kazhagam. Speech transcripts and meeting updates. | த.வெ.க-வின் அதிகாரப்பூர்வ செய்திகள்.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
