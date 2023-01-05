/*
 * vuex暴露设置
 */
import { createStore, createLogger } from 'vuex'
// import { store as app, AppStore, AppState } from '@/store/modules/app'
// import { store as settings, SettingStore, SettingsState } from '@/store/modules/settings'
// import { store as permission, PermissionStore, PermissionState } from '@/store/modules/permission'
import { store as user, UserStore, UserState } from '@/store/modules/user'
import { store as tagViews, TagsStore, TagsViewState } from '@/store/modules/tag'

export interface RootState {
  // app: AppState
  // settings: SettingsState
  // permission: PermissionState
  user: UserState
  tagViews: TagsViewState
}

export type Store = UserStore<Pick<RootState, 'user'>>

// export type Store = AppStore<Pick<RootState, 'app'>> & SettingStore<Pick<RootState, 'settings'>>
// & PermissionStore<Pick<RootState, 'permission'>> & UserStore<Pick<RootState, 'user'>>
// & TagsStore<Pick<RootState, 'tagViews'>>

const debug = process.env.NODE_ENV !== 'production'
// 开发模式使用日志，非开发不使用
const plugins = debug ? [createLogger({})] : []

export const store = createStore({
  plugins,
  modules: {
    // app,
    // settings,
    // permission,
    user,
    // tagViews
  }
})

export function useStore(): Store {
  return store as Store
}
