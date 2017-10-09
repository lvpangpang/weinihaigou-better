<template>
<div class="com-header" v-show="comHeaderFlag">
    <router-link to="search" class="search-logo"></router-link>
    <router-link to="shopCar" class="shopping-logo"><span v-html="carCount"></span></router-link>
    <h1><img src="../m-images/logo.png" /></h1>
</div>
</template>

<script>
export default {

    name : 'comHeader',

    props : {
        comHeaderFlag : {
            type : Boolean,
            default : false
        },
        carCount : {
            type : Number,
            default : 0
        }
    }
}
</script>

<style scoped>
.com-header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 2rem;
    padding: .75rem 0;
    -webkit-box-sizing:content-box;
    box-sizing:content-box;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
}
.com-header h1 {
    margin: auto;
    font-size: 1.333rem;
    text-align: center;
    color: #9f2e33;
    font-weight: 700;
    height: 100%;
    line-height: 2rem;
    color: #000;
    font-weight: 400;
}
.com-header h1 img {
    width: 6.042rem;
    vertical-align: middle;
}
.com-header .search-logo,
.com-header .shopping-logo,
.com-header .home-logo {
    position: absolute;
    right: 4.586rem;
    top: .9rem;
    width: 1.667rem;
    height: 1.667rem;
    background:url(../m-images/header-search.png) no-repeat;
    background-size: 1.667rem 1.667rem;
}
.com-header .shopping-logo {
    right: 1.5rem;
    background:url(../m-images/header-shopping.png) no-repeat;
    background-size: 1.667rem 1.667rem;
}
.com-header .home-logo {
    background:url(../m-images/header-home.png) no-repeat;
    background-size: 1.667rem 1.667rem;
}
.com-header .com-header-back,
.com-header .com-header-back-white {
    position: absolute;
    top: 1rem;
    left: 0.875rem;
    width: 1.4rem;
    height: 1.4rem;
    background:url(../m-images/header-back.png) no-repeat center/ 1.3rem 1.3rem;
}
.com-header .com-header-back-white {
    background:url(../m-images/header-back-white.png) no-repeat center/ 1.3rem 1.3rem;
}
.com-header .shopping-logo span {
    display: block;
    text-align: center;
    line-height: 1.667rem;
    font-size: 0.75rem;
    color: #9f2e33;
}
</style>