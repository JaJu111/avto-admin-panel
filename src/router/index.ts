import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from '@/views/HomeView.vue';
import HomePage from '@/components/pages/HomePage.vue';
import ProductsPage from '@/components/pages/ProductsPage.vue';
import ProductsInfoPage from '@/components/pages/ProductsInfoPage.vue';
import CarInfo from '@/components/pages/CarInfo.vue';

import LoginPage from '@/components/pages/LoginPage.vue';
import RegisterPage from '@/components/pages/RegisterPage.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        component: HomeComponent,
        children: [
            {
                path: '/home',
                component: HomePage
            },
            {
                path: '/products',
                component: ProductsPage 
            },
            {
                path: '/products/info',
                component: ProductsInfoPage,
            },
            {
                path: '/home/car-info',
                component: CarInfo
            }
        ]
    },
    {
        path: '/',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
