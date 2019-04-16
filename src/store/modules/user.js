import { set, toggle } from '@/utils/vuex'
import { loginByUserName, logoutServe } from '@/api/login'
import { ACCESS_TOKEN, USER_NAME, USER_INFO } from "@/store/mutation-types"
import { welcome } from "@/utils/util"
import Vue from 'vue'

export default {
    state: {
        token: '',
        username: ''
    },
    mutations: {
        SET_TOKEN: set('token'),

        SET_NAME: set('username')
    },
    actions: {
        Login ({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUserName(userInfo)
                    .then(resp => {
                        console.log("-------resp-------", resp)
                        if (resp.status === 200) {
                            ///设置token ,cookie, userinfo 相关信息
                            Vue.ls.set(ACCESS_TOKEN, resp.data.records, 7 * 24 * 60 * 60 * 1000)
                            // Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
                            // Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
                            commit('SET_TOKEN', resp.data.records)
                            // TODO 
                            resolve()
                        } else {
                            reject(resp)
                        }
                    })
                    .catch(error => reject(error))
            })
        },
        Logout ({ commit, state }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                // commit('SET_PERMISSIONLIST', [])
                Vue.ls.remove(ACCESS_TOKEN)

                logoutServe(state.token).then(() => {
                    resolve()
                }).catch(() => {
                    resolve()
                })
            })
        }

    },
    getters: {}
}