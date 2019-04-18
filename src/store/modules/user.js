import { set, toggle } from '@/utils/vuex'
import { loginByUserName, logoutServe } from '@/api/login'
import { ACCESS_TOKEN, USER_NAME, USER_INFO } from "@/store/mutation-types"
import { welcome } from "@/utils/util"
import Vue from 'vue'

export default {
    state: {
        token: '',
        username: '',
        realname: '',
        welcome: '',
        avatar: '',
        permissionList: [],
        info: {}
    },
    mutations: {
        SET_TOKEN: set('token'),
        SET_AVATAR:set('avatar'),
        SET_PERMISSIONLIST: set('permissionList'),
        SET_INFO: set('info'),

        SET_NAME: (state, { username, realname, welcome }) => {
         state.username = username
         state.realname = realname
         state.welcome = welcome }

    },

    actions: {
        Login ({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUserName(userInfo)
                    .then(resp => {
                        console.log("-------store user 返回resp-------", resp)
                        if (resp.code === 0) {
                            const result = resp
                           // const userInfo = result.userInfo
                            Vue.ls.set(ACCESS_TOKEN, resp.data, 7 * 24 * 60 * 60 * 1000)
                           // Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
                           // Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
                            commit('SET_TOKEN', result.token)
                            commit('SET_INFO', userInfo)
                            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
                            commit('SET_AVATAR', userInfo.avatar)

                            resolve()
                        } else {
                            reject(resp)
                        }
                    })
                    .catch(error => reject(error))
            })
        },
        // 获取用户信息
        GetPermissionList({ commit }) {
            return new Promise((resolve, reject) => {
                let username = Vue.ls.get(USER_NAME);
                let params = {username:username};
                queryPermissionsByUser(params).then(resp => {
                    const menuData = resp.result;
                    if (menuData && menuData.length > 0) {
                        commit('SET_PERMISSIONLIST', menuData)
                    } else {
                        reject('getPermissionList: permissions must be a non-null array !')
                    }
                    resolve(resp)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        Logout ({ commit, state }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                commit('SET_PERMISSIONLIST', [])
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