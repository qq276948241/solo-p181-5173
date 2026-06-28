import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DetailPage from '@/pages/DetailPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/book/:id',
    name: 'detail',
    component: DetailPage,
    props: true,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
