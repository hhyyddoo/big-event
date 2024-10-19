import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        /*  {
           path: '/',
           name: 'home',
           component: HomeView
         },
         {
           path: '/about',
           name: 'about',
           // route level code-splitting
           // this generates a separate chunk (About.[hash].js) for this route
           // which is lazy-loaded when the route is visited.
           component: () => import('../views/AboutView.vue')
         } */
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index.vue'),
            //二级路由
            children: [
                {
                    path: '/article/channel',
                    name: 'child11',
                    component: () => import('@/views/articleChannel.vue')
                },
                {
                    path: '/article/manage',
                    name: 'child2',
                    component: () => import('@/views/articleManage.vue')
                },
                {
                    path: '/user/profile',
                    name: 'child3',
                    component: () => import('@/views/profile.vue')
                },
                {
                    path: '/user/avatar',
                    name: 'child4',
                    component: () => import('@/views/avatar.vue')
                },
                {
                    path: '/user/password',
                    name: 'child5',
                    component: () => import('@/views/password.vue')
                },
            ]


        },
    ]
})

export default router
