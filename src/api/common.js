import { stringify } from 'qs'
//post method= {post | put}
export function httpAction (url, params, method) {
    return axios.request({
        url: url,
        method: method,
        data: stringify(params)
    })
}

//Post Request
export function postAction (url, params) {
    return axios.request({
        url: url,
        method: 'post',
        data: stringify(params)
    })
}
//put Request
export function putAction (url, params) {
    return axios.request({
        url: url,
        method: 'put',
        data: stringify(params)
    })
}
// id == 0 add     post
// id != 0 update  put
export function saveService (params) {
    return axios.request({
        url: api.service,
        method: params.id == 0 ? 'post' : 'put',
        data: stringify(params)
    })
}

//get
export function getAction (url) {
    return axios.request({
        url: url,
        method: 'get',
    })
}
//get whith params
export function getActionByParam (url, params) {
    return axios.request({
        url: url,
        method: 'get',
        params: stringify(params)
    })
}
//deleteAction
export function deleteAction (url, params) {
    return axios.request({
        url: url,
        method: 'delete',
        params: params
    })
}


