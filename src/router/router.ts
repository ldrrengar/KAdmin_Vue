import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import home from '@/views/Home/home.vue'
import Login from '@/views/Login/login.vue'

// createWebHistory 是history模式  createWebHashHistory是hash模式
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'redecit',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default Router