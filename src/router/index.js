import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home/Main.vue'
import Dashboard from '../components/Dashboard/Main.vue'
import PosterCreator from '../components/PosterCreator/Main.vue'
import Candidates from '../components/Candidates/Main.vue'
import Ideology from '../components/Ideology/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'முகப்பு | தமிழக வெற்றிக் கழகம்',
      description: 'தமிழகத்தின் முன்னேற்றத்திற்காக தளபதி விஜய் அவர்களால் தொடங்கப்பட்ட அரசியல் கட்சி.'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'நிர்வாகம் | தமிழக வெற்றிக் கழகம்',
      description: 'த.வெ.க நிர்வாகக் குழு மற்றும் புள்ளிவிவரங்கள்.'
    }
  },
  {
    path: '/create',
    name: 'PosterCreator',
    component: PosterCreator,
    meta: {
      title: 'போஸ்டர் உருவாக்கம் | தமிழக வெற்றிக் கழகம்',
      description: 'தமிழக வெற்றிக் கழகத்தின் அதிகாரப்பூர்வ தேர்தல் பிரச்சார போஸ்டர்களை உருவாக்குங்கள்.'
    }
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: Candidates,
    meta: {
      title: 'வேட்பாளர்கள் | தமிழக வெற்றிக் கழகம்',
      description: '2026 சட்டமன்றத் தேர்தலுக்கான த.வெ.க வேட்பாளர்களின் பட்டியல்.'
    }
  },
  {
    path: '/kolgai',
    name: 'Ideology',
    component: Ideology,
    meta: {
      title: 'கொள்கைகள் & வாக்குறுதிகள் | தமிழக வெற்றிக் கழகம்',
      description: 'த.வெ.க-வின் அதிகாரப்பூர்வ கொள்கைகள் மற்றும் தேர்தல் வாக்குறுதிகள் 2026.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
