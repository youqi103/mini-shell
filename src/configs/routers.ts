import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'
import Terminal from '@/pages/Terminal.vue'
const routes = [
  { path: '/', component: Terminal },
  { path: '/about', component: AboutView },
  { path: '/home', component: HomeView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
