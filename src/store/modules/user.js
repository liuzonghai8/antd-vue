import { set, toggle } from '@/utils/vuex'
import { loginByUserName, logoutServe } from '@/api/login'
export default {
    state: {
        token: '',
        username: ''
    },
    mutations: {
        SET_TOKEN: set('token'),
        // SET_TOKEN: (state, token) => {
        //     state.token = token
        // },
        SET_NAME: set('username')
    },
    actions: {
        login ({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUserName(userInfo)
                    .then(resp => {
                        console.log("-------resp-------", resp.status)
                        if (resp.status === 200) {
                            ///设置token ,cookie, userinfo 相关信息
                            console.log("--------设置token-----")
                            commit('SET_TOKEN', 'result.token')
                            resolve()
                        } else {
                            reject(resp)
                        }
                    })
                    .catch(error => reject(error))
            })
        },
        logout ({ commit, state }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                // commit('SET_PERMISSIONLIST', [])
                // Vue.ls.remove(ACCESS_TOKEN)

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