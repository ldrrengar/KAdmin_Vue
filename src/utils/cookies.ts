/**
 * js-cookie的封装
 */
import Keys from '@/constant/key'
import Cookies from 'js-cookie'

const TokenKey: string = 'token'
const RefreshTokenkey: string = 'refresh-token'

// function getTokenKey(){
//     return TokenKey
// }
export const getTokenKey = () => TokenKey

export const getRefreshTokenkey = () => RefreshTokenkey
// function getRefreshTokenkey(){
//     return RefreshTokenkey
// }

// function getToken(): any{
//     return Cookies.get(TokenKey)
// }

// function setToken(token: any): any {
//     return Cookies.set(TokenKey, token)
// }

export const getRefreshToken = () => Cookies.get(RefreshTokenkey)
// function getRefreshToken(): any {
//     return Cookies.get(RefreshTokenkey)
// }
export const setRefreshToken = (refreshToken: string) => Cookies.set(RefreshTokenkey, refreshToken)
// function setRefreshToken(refreshToken: any): any {
//     return Cookies.set(RefreshTokenkey, refreshToken)
// }

// function removeToken() {
//     Cookies.remove(TokenKey)
//     Cookies.remove(RefreshTokenkey)
//   }

  export const getSidebarStatus = () => Cookies.get(Keys.sidebarStatusKey)
  export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(Keys.sidebarStatusKey, sidebarStatus)
  
  export const getLanguage = () => Cookies.get(Keys.languageKey)
  export const setLanguage = (language: string) => Cookies.set(Keys.languageKey, language)
  
  export const getSize = () => Cookies.get(Keys.sizeKey)
  export const setSize = (size: string) => Cookies.set(Keys.sizeKey, size)
  
  export const getToken = () => Cookies.get(Keys.tokenKey)
  export const setToken = (token: string) => Cookies.set(Keys.tokenKey, token)
  export const removeToken = () => Cookies.remove(Keys.tokenKey)
