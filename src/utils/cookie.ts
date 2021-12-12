/**
 * js-cookie的封装
 */
import Cookies from 'js-cookie'

const TokenKey: string = 'token'
const RefreshTokenkey: string = 'refresh-token'

function getTokenKey(){
    return TokenKey
}

function getRefreshTokenkey(){
    return RefreshTokenkey
}

function getToken(): any{
    return Cookies.get(TokenKey)
}

function setToken(token: any): any {
    return Cookies.set(TokenKey, token)
}

function getRefreshToken(): any {
    return Cookies.get(RefreshTokenkey)
}

function setRefreshToken(refreshToken: any): any {
    return Cookies.set(RefreshTokenkey, refreshToken)
}

function removeToken() {
    Cookies.remove(TokenKey)
    Cookies.remove(RefreshTokenkey)
  }
export {
    getTokenKey,
    getRefreshTokenkey,
    getToken,
    setToken,
    getRefreshToken,
    setRefreshToken,
    removeToken
}