import { set, toggle } from '@/utils/vuex'
import { loginByUserName, logoutServe,gerUserInfo } from '@/api/login'
import { ACCESS_TOKEN, USER_NAME, USER_INFO } from "@/store/mutation-types"
import { welcome } from "@/utils/util"
import Vue from 'vue'
import { getToken, setToken, removeToken } from '@/utils/auth'


export default {
    state: {
        token: getToken(),
        username: '',
        realname: '真名',
        welcome: '',
        avatar: './assets/logo.png',
        permissionList: [],
        info: {}
    },
    mutations: {
        SET_TOKEN: set('token'),
        SET_REALNAME: set('realname'),
        SET_AVATAR: set('avatar'),
        SET_PERMISSIONLIST: set('permissionList'),
        SET_INFO: set('info'),

        SET_NAME: (state, { username, realname, welcome }) => {
            state.username = username
            state.realname = realname
            state.welcome = welcome
        }

    },

    actions: {
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUserName(userInfo)
                    .then(resp => {
                        console.log("-------store user 返回resp-------", resp)
                        if (resp.code === 0) {
                            const result = resp
                             console.log("vue.ls token", resp)
                            //验证用户名和密码成功后，设置token 本地存储一天的有效时间 前端
                            Vue.ls.set(ACCESS_TOKEN, resp.data,  24*60 * 60 * 1000)
                            commit('SET_TOKEN', result.data)
                            //存储token吗？
                            //setToken(resp.data)
                            // commit('SET_INFO', userInfo)
                            // commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
                            // commit('SET_AVATAR', userInfo.avatar)

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
                let params = { username: username };
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
        //获取用户信息
        GetUserInfo(){
            return new Promise((resolve, reject) => {
            gerUserInfo()
                .then(resp=>{
                    console.log("getUserInfo:",resp.data)
                    //1.设置用户名称、头像等信息
                    //2.设置权限表
                    //3.
                })
                .catch(err=>reject(err))
            })
        },
        Logout({ commit, state }) {
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                commit('SET_PERMISSIONLIST', [])
                // removeToken()
                //                 //logoutServe(state.token)
                Vue.ls.remove(ACCESS_TOKEN)
                logoutServe()
                .then((resp) => {
                    console.log("-----logout:-----", resp)
                    commit('SET_TOKEN', '')
                    commit('SET_PERMISSIONLIST', [])
                     removeToken()
                    resolve()
                }).catch(() => {
                    resolve()
                })
            })
        }

    },
    getters: {}
}