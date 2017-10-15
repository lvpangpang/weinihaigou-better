<template>
    <div id="app">

        <!-- 公共提示组件 -->
        <toast></toast>

        <!-- 公共页头组件 -->
        <com-header :comHeaderFlag="comHeaderFlag" :carCount="carCount"></com-header>

        <!-- 主要内容 -->
        <transition name="fade">
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
            setTimeout(function() {
                document.body.scrollTop = 0;
            }, 0);
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
.fade-enter-active {
    transition: all 1.2s ease;
}
.fade-enter {
    opacity: 0;
}
</style>
