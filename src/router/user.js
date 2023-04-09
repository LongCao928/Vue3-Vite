
export default [
    {
        path: '/user',
        name:'user',
        component: () => import('@/pages/user/index.vue'),
        meta: {
            title: '个人信息'
        }
    }
]