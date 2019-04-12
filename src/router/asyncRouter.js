import BasicLayout from '@/components/layouts/BasicLayout'

export default {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    hidden: true,
    children: [
        {
            path: 'home',
            name: 'home',
            component: () => import('@/views/test/Test')
        }
    ]
}