import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/saveweight',
      name: 'Save Weight',

      component: () => import('../views/SaveWeightView.vue')
    },
    {
      path: '/showweight',
      name: 'Show Weight',

      component: () => import('../views/ShowWeightView.vue')
    }

  ]
})

export default router
