import { getSidebarStatus, getSize } from '@/utils/cookies'
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

