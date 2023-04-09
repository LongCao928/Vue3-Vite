
export default [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/base/not-found.vue'),
        meta: {
            title: 'NotFound',
            showHeader: false
        }
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/home/index.vue') ,
        meta: {
            title: '首页',
            showHeader: false
        }
    }
]