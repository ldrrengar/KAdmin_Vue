import { defineStore } from 'pinia'
import { getSidebarStatus, getSize, setLanguage, setSidebarStatus, setSize } from '@/utils/cookies'
// import { getLocale } from '@/locales'

export enum deviceType {
  Mobile,
  Desktop,
}

export interface appState {
  device: deviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  //   language: string
  size: string
}



// 定义store
export const app = defineStore('app', {
  state: (): appState => {
    return {
      device: deviceType.Desktop,
      sidebar: {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false
      },
      //   language: getLocale(),
      size: getSize() || 'medium'
    }
  },
  actions: {
    toggleSidebar(withoutAnimation: boolean): void {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
      if (this.sidebar.opened) {
        setSidebarStatus('opened')
      } else {
        setSidebarStatus('closed')
      }
    },
    closeSidebar(withoutAnimation: boolean): void {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      setSidebarStatus('closed')
    },

    toggleDevice(device: deviceType): void {
      this.device = device
    },

    // setLanguage(language: string) :void {
    //   this.language = language
    //   setLanguage(this.setLanguage)
    // },
    setSize(size: string): void {
      this.size = size
      setSize(this.size)
    }
  }
})
