import { defineStore } from 'pinia'
import { loginRequest, userInfoRequest} from '@/apis/user'
import { getToken, setToken, removeToken } from '@/utils/cookies'

export interface userState{
    token: string
    name: string
    avatar: string
    introduction: string
    roles: string[]
    email: string
}

// 定义store
export const user = defineStore('user', {
    state: (): userState => {
        return {
            token: getToken() || '',
            name: '',
            avatar: '',
            introduction: '',
            roles: [],
            email: ''
        }
    },
    actions: {
        // 登录方法
        async login(userInfo: { userName: string, passWord: string }){
            let { userName, passWord } = userInfo
            userName = userName.trim()
            await loginRequest({ userName, passWord }).then(async(res: any) => {
              if (res?.code === 0 && res.data.token) {
                this.setToken(res.data.token)
              }
            }).catch((err) => {
              console.log(err)
            })
        },

        // 保存token
        setToken(token: string) {
            this.token = token
            setToken(token)
        },

        // 保存名称
        setName(name: string) {
            this.name = name
        },

        // 保存头像
        setAvatar(avatar: string) {
            this.avatar = avatar
        },

        // 登录用户信息
        setIntroduction(introduction: string){
            this.introduction = introduction
        },

        // 登录用户权限
        setRoles(roles: string[]) {
            this.roles = roles
        },

        // 账户邮箱
        setEmail(email: string) :void {
            this.email = email
        },

        // 退出登录时删除token
        resetToken() :void{
            this.token = ''
            this.roles = []
            removeToken()
        },

        // 用户信息获取
        async getUserInfo(){
            await userInfoRequest().then((res: any) => {
                if (res?.code === 0) {
                    this.setRoles(res.data.roles)
                    this.setName(res.data.name)
                    this.setAvatar(res.data.avatar)
                    this.setIntroduction(res.data.introduction)
                    this.setEmail(res.data.email)
                }
              })
        }
    }
})
