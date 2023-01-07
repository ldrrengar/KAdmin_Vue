/**
 * js-cookie的封装
 */
import Keys from '@/constant/key'
import Cookies from 'js-cookie'

const TokenKey: string = 'token'
const RefreshTokenkey: string = 'refresh-token'

export const getTokenKey = () => TokenKey

export const getRefreshTokenkey = () => RefreshTokenkey

export const getRefreshToken = () => Cookies.get(RefreshTokenkey)

export const setRefreshToken = (refreshToken: string) => Cookies.set(RefreshTokenkey, refreshToken)


  export const getSidebarStatus = () => Cookies.get(Keys.sidebarStatusKey)
  export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(Keys.sidebarStatusKey, sidebarStatus)
  
  export const getLanguage = () => Cookies.get(Keys.languageKey)
  export const setLanguage = (language: string) => Cookies.set(Keys.languageKey, language)
  
  export const getSize = () => Cookies.get(Keys.sizeKey)
  export const setSize = (size: string) => Cookies.set(Keys.sizeKey, size)
  
  export const getToken = () => Cookies.get(Keys.tokenKey)
  export const setToken = (token: string) => Cookies.set(Keys.tokenKey, token)
  export const removeToken = () => Cookies.remove(Keys.tokenKey)