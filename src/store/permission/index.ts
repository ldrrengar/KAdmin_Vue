import { defineStore } from 'pinia'
import { defaultRoutes } from '@/router/router'
import { RouteRecordRaw } from 'vue-router'

export interface PermissionState {
    routes: RouteRecordRaw[]
    dynamicRoutes: RouteRecordRaw[]
}

// 定义store
export const permission = defineStore('permission', {
    state: (): PermissionState => {
        return {
            routes: [],
            dynamicRoutes: []
        }
    },
    actions: {
      setRoutes(routes: RouteRecordRaw[]) :void{
        this.routes = defaultRoutes.concat(routes)
        this.dynamicRoutes = routes
      }
    }
})


export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
      const r = { ...route }
      if (hasPermission(roles, r)) {
        if (r.children) {
          r.children = filterAsyncRoutes(r.children, roles)
        }
        res.push(r)
      }
    })
    return res
  }

  const hasPermission = (roles: string[], route: RouteRecordRaw) => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => {
        if (route.meta?.roles !== undefined) {
          return route.meta.roles.includes(role)
        }
      })
    } else {
      return true
    }
  }