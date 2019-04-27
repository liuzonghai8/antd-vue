import TabLayout from '@/components/layouts/TabLayout'

export default {
    path: '/',
    component: TabLayout,
    redirect: '/home',
    hidden: true,
    children: [
        {
            path: 'home',
            name: 'home',
            component: () => import('@/views/Home')
        },
        {
            path: 'sys/user',
            name: 'user',
            component: () => import('@/views/system/user/User')
        },

    ]

}