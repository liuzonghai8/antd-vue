import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import router from '@/router'
import store from '@/store'

const whiteList = ['/user/login', '/user/register', '/user/register-result'] // no redirect whitelist
router.beforeEach((to, from, next) => {
    NProgress.start()
    const token = store.getters.token// 获取token
    console.log("token= ", store.getters.token)
    if (token) {
        if (to.path === '/user/login') {
            next({ path: '/' })
            console.log("-------if ddd/---")
            NProgress.done()
        } else {
            //拉去用户信息
            console.log("-----else ------")
            next()
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