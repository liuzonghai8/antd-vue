import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import router from '@/router'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import asyncRouter from '@/router/asyncRouter'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // no redirect whitelist
//
router.beforeEach((to, from, next) => {
    NProgress.start()
    //判断是否已经登录
    console.log("token:", Vue.ls.get(ACCESS_TOKEN))
    if (Vue.ls.get(ACCESS_TOKEN)) {
        // has token
        if (to.path === '/user/login') {
            //转到首页
            next({ path: '/' })
            NProgress.done()
        } else {
            //拉去用户信息
            console.log("-----else ------")
            console.log("to: ",to)
            console.log("from:",from)
            next()
            //生成页面菜单
            //添加可访问的路由
            //router.addRoutes(store.getters.addRouters)
           // router.addRouters(asyncRouter)
           //  const redirect = decodeURIComponent(from.query.redirect || to.path)
           //  if (to.path === redirect) {
           //      // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
           //     console.log("to-path:",to.path)
           //      next({ ...to, replace: true })
           //  } else {
           //      // 跳转到目的路由
           //      next({ path: redirect })
           //  }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }

    router.afterEach(() => {
        NProgress.done() // finish progress bar
    })


})