import Vue from 'vue';
import App from '@/App';
import axios from 'axios';
import router from '@/router';
import store from '@/vuex';
import commonMthods from '@/js/common';
import '@/css/common.css';
import API from '@/js/api';

Vue.prototype.axios = axios;
Vue.prototype.API = API;

Vue.config.productionTip = false;

// 先获取用户登录状态
axios.post(API.checkUser).then( ( data ) => {
    store.dispatch('changeIsLogin1', data.data.flag);
    // 需要登录权限的组件权限控制
    router.beforeEach((to, from, next) => {
        let loginArr = ['my', 'shopCar', 'order'];
        // 下面是需要登录权限的组件
        if ( loginArr.join(",").indexOf(to.name) !==-1 && !store.state.isLogin  ) {
            next('login');
        }
        next();
    });

    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {
            App
        }
    });
});



