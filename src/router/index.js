import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
        },
        {
            path: '/class',
            name: 'class',
            component: resolve => require(['../pages/class/class.vue'], resolve)
        },
        {
            path: '/my',
            name: 'my',
            component: resolve => require(['../pages/my/my.vue'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../pages/login/login.vue'], resolve)
        },
        {
            path: '/search',
            name: 'search',
            component: resolve => require(['../pages/goods/search.vue'], resolve)
        },
        {
            path: '/goodsResult',
            name: 'goodsResult',
            component: resolve => require(['../pages/goods/goodsResult.vue'], resolve)
        },
        {
            path: '/goodsDetails',
            name: 'goodsDetails',
            component: resolve => require(['../pages/goods/goodsDetails.vue'], resolve)
        },
        {
            path: '/shopCar',
            name: 'shopCar',
            component: resolve => require(['../pages/goods/shopCar.vue'], resolve)
        },
        {
            path: '/surePay',
            name: 'surePay',
            component: resolve => require(['../pages/goods/surePay.vue'], resolve)
        },
        {
            path: '/address',
            name: 'address',
            component: resolve => require(['../pages/my/address.vue'], resolve)
        },
        {
            path: '/addAddress',
            name: 'addAddress',
            component: resolve => require(['../pages/my/addAddress.vue'], resolve)
        },
        {
            path: '/order',
            name: 'order',
            component: resolve => require(['../pages/my/order.vue'], resolve)
        },
    ]
});

