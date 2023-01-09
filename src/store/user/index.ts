import { defineStore } from 'pinia'
import { getToken } from '@/utils/cookies'

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

        setEmail(email: string) {
            this.email = email
        },
        resetToken() :void{
            this.token = ''
            this.roles = []
        },
        // 用户信息获取
        getUserInfo():void{
            // await userInfoRequest().then((res) => {
            //     if (res?.code === 0) {
            //       commit(UserMutationTypes.SET_ROLES, res.data.roles)
            //       commit(UserMutationTypes.SET_NAME, res.data.name)
            //       commit(UserMutationTypes.SET_AVATAR, res.data.avatar)
            //       commit(UserMutationTypes.SET_INTRODUCTION, res.data.introduction)
            //       commit(UserMutationTypes.SET_EMAIL, res.data.email)
            //       return res
            //     } else {
            //       throw Error('Verification failed, please Login again.')
            //     }
            //   })
        }
    }
})
