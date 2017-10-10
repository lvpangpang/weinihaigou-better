<template>
    <div id="app">

        <!-- 公共提示组件 -->
        <toast></toast>

        <!-- 公共页头组件 -->
        <com-header :comHeaderFlag="comHeaderFlag" :carCount="carCount"></com-header>

        <!-- 主要内容 -->
        <transition :name="slideFade">
            <!-- exclude指定不用缓存的组件 -->
            <keep-alive :include="['index','class','my']">
                <router-view></router-view>
            </keep-alive>
        </transition>

        <!-- 公共页脚组件 -->
        <com-footer :activeIndex="activeIndex" :activeClass="activeClass" :activeMy="activeMy" :comFooterFlag="comFooterFlag"></com-footer>

    </div>
</template>

<script>
import toast from '@/components/toast';
import comFooter from '@/components/comFooter';
import comHeader from '@/components/comHeader';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'app',
    data() {
        return {
            slideFade : 'slide-fade'
        }
    },
    computed : {
        ...mapState([
            'comHeaderFlag',
            'comFooterFlag',
            'activeIndex',
            'activeClass',
            'activeMy',
            'carCount'
        ])
    },

    // 在APP.vue里面可以监听组件的切换从而可以给每个组件都定制不同的过度效果
    watch: {
        '$route' (to, from) {
            let toPage = to.name,
                transitionName = 'slide-fade';
            switch(toPage) {
                case 'shopCar':
                transitionName = 'slide-fade1';
                case 'order':
                transitionName = 'slide-fade1';
            }
            this.slideFade = transitionName;
        }
    },

    mounted() {

        this.axios.post(this.API.checkUser).then( ( data ) => {
            this.changeIsLogin(data.data.flag);
        });

        this.axios.post(this.API.carCount).then( ( data ) => {
            this.changeCarCount(data.data.count);
        });
    },

    components: {
        toast,
        comFooter,
        comHeader
    },

    methods : {
        ...mapActions({
            changeIsLogin : 'changeIsLogin1',
            changeCarCount : 'changeCarCount1'
        })
    }
}
</script>

<style>
.slide-fade-enter-active,
.slide-fade1-enter-active {
    transition: all .2s ease;
}
.slide-fade-enter {
    transform: translateX(40px);
    opacity: 0;
}
.slide-fade1-enter {
    transform: translateY(100px);
}
</style>
