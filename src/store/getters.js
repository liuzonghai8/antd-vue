
export default {
    token: state => state.user.token,
    addRouters: state => state.permission.addRouters,
    nickname: state => state.user.realname,
    avatar: state => state.user.avatar
}