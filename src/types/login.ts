import type { FormInstance } from 'element-plus'
import {ref} from 'vue'
export interface LoginFormInt {
    userName: string,
    passWord: string,
    remember: boolean
}

export class InitData{
    loginForm: LoginFormInt = {
        userName: 'admin',
        passWord: '123456',
        remember: false
    }
    loginFormRef = ref<FormInstance>()
}