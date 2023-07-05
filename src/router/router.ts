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
          icon: '#icon-yibiaopan',
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'Charts',
    meta: {
      title: '图表',
      icon: '#icon-chartcolumn'
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
          icon: '#icon-chartcolumn',
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
          icon: '#icon-tubiao-zhexiantu',
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
          icon: '#icon-chartmixed',
          noCache: true
        }
      }
    ]
  }, 
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '系统管理',
      icon: '#icon-xitongguanli1'
    },
    name: 'System',
    children: [
      {
        path: 'dictManage',
        component: () => import(/* webpackChunkName: "dict" */ '@/views/system/dict/dict.vue'),
        name: 'dictManage',
        meta: {
          title: '字典管理',
          icon: '#icon-dictionary',
          noCache: true
        }
      },
      {
        path: 'personInfo',
        component: () => import(/* webpackChunkName: "personInfo" */ '@/views/system/dict/dict.vue'),
        name: 'personInfo',
        meta: {
          title: '个人信息',
          icon: '#icon-gerenxinxi',
          noCache: true
        }
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '错误页面',
      icon: '#icon-icon-test1'
    },
    children: [
      {
        path: '401',
        component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
        name: '401',
        meta: {
          title: '401',
          icon: '#icon-icon-test',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
        name: '404',
        meta: {
          title: '404',
          icon: '#icon-40401',
          noCache: true
        }
      }
    ]
  },
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