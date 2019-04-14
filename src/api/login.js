import { postAction } from './common'
//根据用户名和密码登陆
export const loginByUserName = (loginParam) => postAction('upms/sys/user/login2', loginParam)
export const logoutServe = (token) => postAction('upms/sys/user/logout', token)
