import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Login from '@/views/Login/login.vue'
import Layout from '@/views/Layout/Layout.vue'
import type { RouteRecordRaw } from 'vue-router';

export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'redecit',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Home/Home.vue'),
        name: 'index',
        meta: { title: 'index' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
// createWebHistory 是history模式  createWebHashHistory是hash模式
const Router = createRouter({
  history: createWebHistory(),
  routes: [...defaultRoutes],
})

export default Router