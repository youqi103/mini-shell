import { createMemoryHistory, createRouter } from 'vue-router'
import indexPage from '@/pages/indexPage.vue'
const routes = [
  { path: '/', component: indexPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
