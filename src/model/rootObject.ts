/**
 * 通用请求返回数据接口
 */
export interface RootObject<T>{
    code: number
    msg: string
    data: T
  }