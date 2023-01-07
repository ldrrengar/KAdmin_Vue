import { defineStore } from 'pinia'
import { appTypes } from './actions'
import { appState, deviceType } from './state'
import { getSidebarStatus, getSize, setLanguage, setSidebarStatus, setSize } from '@/utils/cookies'

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
        [appTypes.TOGGLE_SIDEBAR](withoutAnimation: boolean) {
            this.sidebar.opened = !this.sidebar.opened
            this.sidebar.withoutAnimation = withoutAnimation
            if (this.sidebar.opened) {
              setSidebarStatus('opened')
            } else {
              setSidebarStatus('closed')
            }
          },
        
          [appTypes.CLOSE_SIDEBAR](withoutAnimation: boolean) {
            this.sidebar.opened = false
            this.sidebar.withoutAnimation = withoutAnimation
            setSidebarStatus('closed')
          },
        
          [appTypes.TOGGLE_DEVICE](device: deviceType) {
            this.device = device
          },
        
        //   [appTypes.SET_LANGUAGE](language: string) {
        //     this.language = language
        //     setLanguage(this.language)
        //   },
        
          [appTypes.SET_SIZE](size: string) {
            this.size = size
            setSize(this.size)
          }
    }
})
