/**
 * 根据大小变化重新布局
 */

import { app, deviceType } from '@/store/app'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
// const app() = app()
const WIDTH = 992 // refer to Bootstrap's responsive design

export default function() {
  const device = computed(() => {
    return app().device
  })

  const sidebar = computed(() => {
    return app().sidebar
  })

  const currentRoute = useRoute()
  const watchRouter = watch(() => currentRoute.name, () => {
    if (app().device === deviceType.Mobile && app().sidebar.opened) {
      app().closeSidebar(false)
    }
  })

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeMounted = () => {
    if (isMobile()) {
      app().toggleDevice(deviceType.Mobile)
      app().closeSidebar(true)
    }
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      app().toggleDevice(isMobile() ? deviceType.Mobile : deviceType.Desktop)
      if (isMobile()) {
        app().closeSidebar(true)
      }
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    device,
    sidebar,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter
  }
}
