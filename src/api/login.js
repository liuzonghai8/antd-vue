import { postAction } from './common'
//根据用户名和密码登陆
//export const loginByUserName = (loginParam) => postAction('auth/login', loginParam)
export const loginByUserName = (loginParam) => postAction('upms/sys/user/query', loginParam)
export const logoutServe = (token) => postAction('upms/sys/user/logout', token)
