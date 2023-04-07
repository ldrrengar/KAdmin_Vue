import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Login from '@/views/Login/login.vue'
import Layout from '@/views/Layout/Layout.vue'
import type { RouteRecordRaw } from 'vue-router';

export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/redecit',
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
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/Home.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: '#icondashboard',
          affix: true
        }
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
      title: '图表',
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
          title: '柱状图',
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
          title: '线性图',
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
          title: '混合图表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '错误页面',
      icon: '#icon404'
    },
    children: [
      {
        path: '401',
        component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
        name: '401',
        meta: {
          title: '401',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
        name: '404',
        meta: {
          title: '404',
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