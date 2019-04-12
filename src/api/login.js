import { postAction } from './common'
import { stringify } from 'qs'
//根据用户名和密码登陆
export const loginByUserName = (loginParam) => postAction('upms/sys/user/login', loginParam)


// export function login2 (params) {
//     postAction2('upms/sys/user/login', params)
//     // return axios.request({
//     //     url: 'upms/sys/user/login',
//     //     method: 'post',
//     //     data: stringify(params)
//     // })
// }