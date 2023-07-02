/*
 * 用户相关接口
 */
import { RootObject } from '@/model/rootObject'
import { UserInfoModel, Users } from '@/model/userModel'
import https from '@/utils/https'
import { LoginModel } from '@/model/loginModel'

// 登录
export const loginRequest = (userInfo: any) => {
  return https.post<RootObject<LoginModel>>('api/admin/login', userInfo)
}

// 获取用户信息
export const userInfoRequest = () => {
  return https.get<RootObject<UserInfoModel>>('api/admin/info')
}

// 登出
export const loginOut = () => {
  return https.post<RootObject<''>>('api/admin/logout')
}

export const getUsers = (user: any) => {
  return https.get<RootObject<Users>>('api/user/getUsers', user)
}
