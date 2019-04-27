import { postAction ,getAction} from './common'
import { stringify } from 'qs'
//post method= {post | put}
export function httpAction (url, params, method) {
    return axios.request({
        url: url,
        method: method,
        data: stringify(params)
    })
}


// export function fetchAction (params) {
//     return axios.request({
//         url: 'upms/sys/user/page',
//         method: 'get',
//         params: params
//     })
// }

export const fetchAction = (params) => getAction('upms/sys/user/page',params)
export const gerUser = () => getAction('auth/verity')