<template>
<div>
    <div class="my-header">
        <img src="../../m-images/my-header-bg.jpg" />
        <a href="javascript:;" class="person">
            <img v-bind:src="person.headUrl" />
            <span v-html="person.nickName"></span>
        </a>
    </div>
    <div class="my-order">
        <div class="my-order-header">
            <span>我的订单</span>
            <router-link to="order?type=0"><span class="see-all-order">查看全部订单</span><i class="com-right-tip"></i></router-link>
        </div>
        <div class="my-header-con">
            <router-link to="order?type=1">
                <div class="img-box">
                    <img src="../../m-images/order-1.png" />
                    <span class="num" v-if="notPayCount!=0&&notPayCount<=99" v-html="notPayCount">0</span>
                    <span class="num" v-if="notPayCount>99">99+</span>
                </div>
                <p>待付款</p>
            </router-link>
            <router-link to="order?type=2">
                <div class="img-box">
                    <img src="../../m-images/order-2.png" />
                    <span class="num" v-if="notSendCount!=0&&notSendCount<=99" v-html="notSendCount">0</span>
                    <span class="num" v-if="notSendCount>99">99+</span>
                </div>
                <p>待发货</p>
            </router-link>
            <router-link to="order?type=3">
                <div class="img-box">
                    <img src="../../m-images/order-3.png" />
                    <span class="num" v-if="takeCount!=0&&takeCount<=99" v-html="takeCount">0</span>
                    <span class="num" v-if="takeCount>99">99+</span>
                </div>
                <p>待收货</p>
            </router-link>
            <router-link to="order?type=4">
                <div class="img-box">
                    <img src="../../m-images/order-4.png" />
                    <span class="num" v-if="finishCount!=0&&finishCount<=99" v-html="finishCount">0</span>
                    <span class="num" v-if="finishCount>99">99+</span>
                </div>
                <p>已完成</p>
            </router-link>
        </div>
    </div>
    <div class="my-items">
        <a href="/m-html/my/my-collection.html" class="items">
            <div class="item-bg-2">
                <span>我的收藏</span>
            </div>
            <div class="item-tips">
                <i class="com-right-tip"></i>
            </div>
        </a>
        <router-link class="items" to="/address">
            <div class="item-bg-3">
                <span>地址管理</span>
            </div>
            <div class="item-tips">
                <i class="com-right-tip"></i>
            </div>
        </router-link>
    </div>
    <a href="javascript:;" class="out-login" v-on:click="logOut()" v-cloak>退出登录</a>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name : 'my',

    data() {
        return {
            person : {},
            rerurnCount : '',
            takeCount : '',
            notPayCount : '',
            notSendCount : '',
            finishCount : '',
        }
    },

    // 被缓存的再次进入只会触发这个钩子
    activated() {
        this.getUserInfo();
        this.getTradeCount();
        this.changeComFooterFlag1(true);
        this.changeMy1();
    },

    // 被缓存离开才会触发这个钩子
    deactivated() {
        this.changeComFooterFlag1(false);
    },

    methods : {
        ...mapActions([
            'changeComFooterFlag1',
            'changeMy1',
            'changeIsLogin1',
            'changeCarCount1'
        ]),

        getUserInfo() {
            this.axios.post(this.API.checkUser)
            .then( (data) => {
                this.person = data.data.userInfo;
            });
        },

        getTradeCount() {
            this.axios.post(this.API.tradeCount)
            .then((data) => {
                console.log(data.data);
                var data = data.data;
                this.rerurnCount = data.rerurnCount;
                this.notPayCount = data.notPayCount;
                this.takeCount = data.takeCount;
                this.notSendCount = data.notSendCount;
                this.finishCount = data.finishCount;
            });
        },

        logOut() {
            this.axios.post(this.API.loginOut)
            .then( (data) => {
                if ( data.data.success ) {
                    this.changeIsLogin1(false);
                    this.axios.post(this.API.carCount).then( ( data ) => {
                        this.changeCarCount1(data.data.count);
                    });
                    this.$router.push('/');
                }
            });
        }
    }
}
</script>

<style scoped>
.my-header {
    position: relative;
    height: 10.125rem;
}
.person {
    position: absolute;
    left: 1.667rem;
    top: 1.958rem;
}
.person img {
    width: 5.625rem;
    height: 5.625rem;
    border-radius: 50%;
    vertical-align: middle;
}
.person span {
    margin-left: 5px;
    vertical-align: middle;
    color: #fff;
    font-size: 1.167rem;
}

.notice-wrap {
    height: 20px;
    padding: 7px 0;
    background: #fff url(../../m-images/icon2.png) no-repeat 20px -314px;
    background-size: 400px 400px;
    overflow:hidden;
    box-sizing: content-box;
}
.notice-wrap .notice-slide-box {
    margin-top: 5px;
    line-height: 12px;
    height: 12px;
    overflow:hidden;
    font-size: 12px;
}
.notice-wrap .notice-slide {
    margin-left: 45px;
}
.notice-wrap .notice-slide li {
    line-height:12px;
}
.notice-wrap .notice-slide a {
    display: block;
    width: 20.0rem;
    color: #4d4d4d;
}

.my-order {
    margin-top: 0.708rem;
    border-top:1px solid #ebebeb;
    border-bottom:1px solid #ebebeb;
    background-color: #fff;
}
.my-order .my-order-header {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    height: 2.708rem;
    padding: 0 1.042rem;
    border-bottom: 1px solid #ebebeb;
    font-size: 1.167rem;
}
.see-all-order {
    vertical-align: middle;
}
.my-order .my-order-header a {
    font-size: 1rem;
    color: #b5b6b6;
}
.my-order .my-header-con {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-align-items: center;
    align-items: center;
    height: 4.625rem;
    padding: 0 1.458rem;
}
.my-order .my-header-con a {
    color: #4d4d4d;
    text-align: center;
    font-size: 0.917rem;
}
.my-order .img-box {
    position: relative;
    margin-bottom: 4px;
}
.my-order .img-box img {
    margin: 0 auto;
    width: 2.0rem;
}
.my-order .num {
    position: absolute;
    right: -0.1rem;
    top: -0.1rem;
    width: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    border-radius: 50%;
    background-color: #9f2e33;
    color: #fff;
    font-size: 12px;
    transform: scale(.8,.8);
}

.my-items {
    margin-top: 0.708rem;
    background-color: #fff;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    padding: 0 1.167rem;
}
.my-items a {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    height: 3.125rem;
    border-bottom: 1px solid #ebebeb;
    color: #000;
}
.my-items img {
    width: 2.0rem;
    vertical-align: middle;
}
.my-items a:last-child {
    border-bottom: none;
}
.my-items span {
    line-height: 1.7rem;
}
.my-items .item-bg-1,
.my-items .item-bg-2,
.my-items .item-bg-3,
.my-items .item-bg-4,
.my-items .item-bg-5 {
    padding-left: 2.3rem;
    height: 1.5rem;
    background: url(../../m-images/order-items.png) no-repeat 0.417rem .2rem;
    background-size:1.667rem 10.0rem;
}
.my-items .item-bg-2 {
    background-position: .417rem -1.75rem;
}
.my-items .item-bg-3 {
    background-position: .417rem -3.8rem;
}
.my-items .item-bg-4 {
    background-position: .417rem -5.9rem;
}
.my-items .item-bg-5 {
    background-position: .417rem -7.9rem;
}
.my-items .item-tips span {
    color: #999;
    vertical-align: middle;
}
.my-items .item-bg-6 {
    padding-left: 2.3rem;
    height: 1.5rem;
    background: url(../../m-images/icon3.png) no-repeat 0.417rem .2rem / 4.167rem 20.833rem;
}

.out-login {
    display: block;
    line-height: 3.542rem;
    background-color: #fff;
    margin: 0.708rem 0;
    font-size: 1.25rem;
    text-align: center;
    color: #939393;
}
</style>