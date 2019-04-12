import LoginLayout from '@/components/layouts/LoginLayout'

export default {
    path: '/user',
    component: LoginLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
        {
            path: 'login',
            name: 'login',
            component: () => import('@/views/login/Login')
        }
    ]
}