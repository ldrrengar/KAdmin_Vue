import { defineStore } from 'pinia'
import { settingsTypes } from './actions'
import elementVariables from '@/styles/element-variables.scss'
import layoutSettings from '@/config/default/layout'
import { settingsState } from './state'

// 定义store
export const settings = defineStore('settings', {
    state: (): settingsState => {
        return {
            theme: elementVariables.theme,
            fixedHeader: layoutSettings.fixedHeader,
            showSettings: layoutSettings.showSettings,
            showTagsView: layoutSettings.showTagsView,
            showSidebarLogo: layoutSettings.showSidebarLogo,
            sidebarTextTheme: layoutSettings.sidebarTextTheme
        }
    },
    actions: {
        [settingsTypes.CHANGE_SETTING](payload: { key: string, value: any }) {
            const { key, value } = payload
            switch (key) {
              case 'theme':
                this.theme = value
                break
              case 'fixedHeader':
                this.fixedHeader = value
                break
              case 'showSettings':
                this.showSettings = value
                break
              case 'showSidebarLogo':
                this.showSidebarLogo = value
                break
              case 'showTagsView':
                this.showTagsView = value
                break
              case 'sidebarTextTheme':
                this.sidebarTextTheme = value
                break
              default:
                break
            }
          }
    }
})
