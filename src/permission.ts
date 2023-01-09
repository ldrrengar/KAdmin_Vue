/*
 * @Description: 权限
 * @Author: ZY
 * @Date: 2020-12-28 09:12:46
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 19:36:01
 */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { useI18n } from 'vue-i18n'
import router from '@/router/router'
import { RouteLocationNormalized } from 'vue-router'
import { user } from './store/user'
import { permission } from './store/permission'
import { ElMessage } from 'element-plus'
import whiteList from './config/default/whitelist'
NProgress.configure({ showSpinner: false })

router.beforeEach(async(to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()
  if (user().token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (user().roles.length === 0) {
        try {
          await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
          const roles = user().roles
          permission().setRoutes(roles)
          permission().dynamicRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (err) {
            user().resetToken()
          ElMessage.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  console.log(to)
  NProgress.done()

})
