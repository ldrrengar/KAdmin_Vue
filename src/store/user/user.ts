import { defineStore } from 'pinia'
import { userTypes } from './actions'
import { userState } from './state'
import { getToken } from '@/utils/cookies'

// 定义store
export const tagsView = defineStore('tagsView', {
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
        [userTypes.SET_TOKEN](token: string) {
            this.token = token
        },

        [userTypes.SET_NAME](name: string) {
            this.name = name
        },

        [userTypes.SET_AVATAR](avatar: string) {
            this.avatar = avatar
        },

        [userTypes.SET_INTRODUCTION](introduction: string) {
            this.introduction = introduction
        },

        [userTypes.SET_ROLES](roles: string[]) {
            this.roles = roles
        },

        [userTypes.SET_EMAIL](email: string) {
            this.email = email
        }
    }
})
