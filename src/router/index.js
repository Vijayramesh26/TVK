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
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/create',
    name: 'PosterCreator',
    component: PosterCreator
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: Candidates
  },
  {
    path: '/kolgai',
    name: 'Ideology',
    component: Ideology
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
