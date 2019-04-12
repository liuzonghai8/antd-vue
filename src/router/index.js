import Vue from 'vue'
import Router from 'vue-router'
import constRouter from './constRouter'
import asyncRouter from './asyncRouter'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    constRouter,
    asyncRouter
  ]
})
