import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import DocsView from '../views/DocsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search/:keyword',
      name: 'search',
      component: SearchView
    },
    {
      path: '/docs',
      name: 'docs',
      component: DocsView
    }
  ]
})

export default router
