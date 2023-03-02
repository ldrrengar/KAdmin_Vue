import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Login from '@/views/Login/login.vue'
import Layout from '@/views/Layout/Layout.vue'
import type { RouteRecordRaw } from 'vue-router';

export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'redecit',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/Home.vue'),
        name: 'home',
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'Charts',
    meta: {
      title: 'charts',
      icon: '#iconchart1'
    },
    children: [
      {
        path: 'bar-chart',
        component: () =>
          import(
            /* webpackChunkName: "BarChart" */ '@/views/charts/BarChartDemo.vue'
          ),
        name: 'BarChartDemo',
        meta: {
          title: 'barChart',
          noCache: true
        }
      },
      {
        path: 'line-chart',
        component: () =>
          import(
            /* webpackChunkName: "LineChart" */ '@/views/charts/LineChartDemo.vue'
          ),
        name: 'LineChartDemo',
        meta: {
          title: 'lineChart',
          noCache: true
        }
      },
      {
        path: 'mixed-chart',
        component: () =>
          import(
            /* webpackChunkName: "MixedChat" */ '@/views/charts/MixedChatDemo.vue'
          ),
        name: 'MixedChartDemo',
        meta: {
          title: 'mixedChart',
          noCache: true
        }
      }
    ]
  }
]
// createWebHistory 是history模式  createWebHashHistory是hash模式
const router = createRouter({
  history: createWebHistory(),
  routes: [...defaultRoutes],
})

export function resetRouter() {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router