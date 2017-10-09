<template>
<div class="com-footer" v-show="comFooterFlag">
    <ul>
        <li>
            <router-link to="/" class="com-footer-index" :class="{'com-footer-index-active' : activeIndex }">首页</router-link>
        </li>
        <li>
            <router-link to="/class" class="com-footer-classify" :class="{'com-footer-classify-active' : activeClass }">分类</router-link>
        </li>
        <li>
            <router-link to="/my" class="com-footer-my" :class="{'com-footer-my-active' : activeMy }">我的</router-link>
        </li>
    </ul>
</div>
</template>

<script>
export default {

    name : 'comFooter',

    props : {
        comFooterFlag : {
            type : Boolean,
            default : false
        },
        activeIndex : {
            type : Boolean,
            default : false
        },
        activeClass : {
            type : Boolean,
            default : false
        },
        activeMy : {
            type : Boolean,
            default : false
        }
    }
}
</script>

<style scoped>
/*公共页脚开始*/
.com-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ebebeb;
    z-index: 999;
}
.com-footer ul {
    display: -webkit-flex;
    -webkit-justify-content: space-around;
    -webkit-align-items:center;
    height: 45px;
}
.com-footer li {
    width: 38px;
    padding-top: 2px;
}
.com-footer a {
    display: block;
    width: 100%;
    padding-top: 25px;
    font-size: 11px;
    text-align: center;
    color: #4c4c4c;
}
.com-footer .active {
    color: #9f2e33;
}
.com-footer .com-footer-index {
    background:url(../m-images/footer-index.png) no-repeat center top / 22px 22px;
}
.com-footer .com-footer-index-active {
    color: #9f2e33;
    background:url(../m-images/footer-index-active.png) no-repeat center top / 22px 22px;
}
.com-footer .com-footer-classify {
    background:url(../m-images/footer-classify.png) no-repeat center top / 22px 22px;
}
.com-footer .com-footer-classify-active {
    color: #9f2e33;
    background:url(../m-images/footer-classify-active.png) no-repeat center top / 22px 22px;
}
.com-footer .com-footer-my {
    background:url(../m-images/footer-my.png) no-repeat center top / 22px 22px;
}
.com-footer .com-footer-my-active {
    color: #9f2e33;
    background:url(../m-images/footer-my-active.png) no-repeat center top / 22px 22px;
}
/*公共页脚结束*/
</style>