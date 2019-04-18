"use strict";

import Vue from 'vue';
import axios from "axios";
import { Modal, notification } from 'ant-design-vue'
import { ACCESS_TOKEN } from "@/store/mutation-types"

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';

 axios.defaults.baseURL = 'http://192.168.1.119:8080/api'
 //axios.defaults.headers.common['Authorization'] = ACCESS_TOKEN;
 //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.baseURL = 'http://api.sweet.com/api'

axios.defaults.withCredentials =true

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
 // withCredentials: true, // Check cross-site Access-Control
  timeout: 60 * 1000,
  api: '${baseURL}/api'
};

const _axios = axios.create(config);

const err = (error) => {
  if (error.response) {
    let data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    console.log("------异常响应------", token)
    console.log("------异常响应------", error.response.status)
    switch (error.response.status) {
      case 403:
        notification.error({ message: '系统提示', description: '拒绝访问', duration: 4 })
        break
      case 500:
        //notification.error({ message: '系统提示', description:'Token失效，请重新登录!',duration: 4})
        if (data.message == "Token失效，请重新登录") {
          // update-begin- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
          // store.dispatch('Logout').then(() => {
          //     window.location.reload()
          // })
          Modal.error({
            title: '登录已过期',
            content: '很抱歉，登录已过期，请重新登录',
            okText: '重新登录',
            mask: false,
            onOk: () => {
              store.dispatch('Logout').then(() => {
                window.location.reload()
              })
            }
          })
          // update-end- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
        }
        break
      case 404:
        notification.error({ message: '系统提示', description: '很抱歉，资源未找到!', duration: 4 })
        break
      case 504:
        notification.error({ message: '系统提示', description: '网络超时' })
        break
      case 401:
        notification.error({ message: '系统提示', description: '未授权，请重新登录', duration: 4 })
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
        break
      default:
        notification.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
};


//request 拦截
_axios.interceptors.request.use(config => {
  console.log("----------请求login----------")
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    console.log("----- 携带的token {} -----",token)
   // config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, (error) => {
  console.log("----------请求错误----------", error)
  return Promise.reject(error)
}),

//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor 响应拦截
_axios.interceptors.response.use((response) => {
  console.log("-----------响应拦截----------")
  console.log("-------拦截返回的信息：-----", response.data)
  return response.data
//err ,调用上面定义的err
}, err),

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios;
      }
    },
    $axios: {
      get () {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
