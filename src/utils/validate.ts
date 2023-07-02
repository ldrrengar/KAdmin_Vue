// 判断router地址
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

// 判断是否是数组
export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

// 判断url
export const isValidURL = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/** 手机号码正则 */
export const isPhone = (phone: string) => {
  const reg = /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/;
  return reg.test(phone)
}
  

/** 邮箱正则 */
export const isEmail = (mail: string) => {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(mail)
}

/** 密码正则(密码为6-18位数字/字符/符号的组合) */
export const testPwd = (pwd: string) => {
  const reg =  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;
  return reg.test(pwd)
} 

/** 6位数字验证码正则 */
export const isCodeSix = (code: string) => {
  const reg =  /^\d{6}$/;
  return reg.test(code)
} 

/** 4位数字验证码正则 */
export const isCodeFour = (code: string) => {
  const reg =  /^\d{4}$/;
  return reg.test(code)
} 

/** url链接正则 */
export const validURL = (url: string) => {
  const reg =  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(url)
} 
  
