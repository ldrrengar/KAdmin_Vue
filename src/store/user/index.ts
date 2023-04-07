import { defineStore } from 'pinia'
import { loginRequest, userInfoRequest } from '@/apis/user'
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
        async login(userInfo: { userName: string, passWord: string }){
            let { userName, passWord } = userInfo
            userName = userName.trim()
            await loginRequest({ userName, passWord }).then(async(res) => {
              if (res?.code === 0 && res.data.accessToken) {
                this.setToken(res.data.accessToken)
                setToken(res.data.accessToken)
              }
            }).catch((err) => {
              console.log(err)
            })
            
        },

        setToken(token: string) {
            this.token = token
        },

        setName(name: string) {
            this.name = name
        },

        setAvatat(avatar: string) {
            this.avatar = avatar
        },

        setIntroduction(introduction: string){
            this.introduction = introduction
        },

        setRoles(roles: string[]) {
            this.roles = roles
        },

        setEmail(email: string) :void {
            this.email = email
        },
        resetToken() :void{
            this.token = ''
            this.roles = []
            removeToken()
        },
        // 用户信息获取
        async getUserInfo(){
            await userInfoRequest().then((res) => {
                if (res?.code === 0) {
                    this.setRoles(res.data.roles)
                    this.setName(res.data.name)
                    this.setAvatat(res.data.avatar)
                    this.setIntroduction(res.data.introduction)
                    this.setEmail(res.data.email)
                }
              })
        }
    }
})
