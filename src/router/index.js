import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard/Main.vue'
import PosterCreator from '../components/PosterCreator/Main.vue'
import Candidates from '../components/Candidates/Main.vue'

const routes = [
  {
    path: '/',
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
