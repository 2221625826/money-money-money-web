import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MoneyView from '../views/MoneyView.vue'
import AnalyseView from '../views/AnalyseView.vue'

const routes = [{
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },
    {
        path: '/money',
        name: 'money',
        component: MoneyView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/analyse',
        name: 'analyse',
        component: AnalyseView
    },
    {
        path: '/',
        redirect: '/money'
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//当当前token为空时，不允许访问其他页面，直接跳转到登录页面
router.beforeEach((to, from, next) => {
    next() //调试
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('token');
        if (token === null || token === '') {
            next('/login');
        } else {
            next()
        }
    }
})

export default router