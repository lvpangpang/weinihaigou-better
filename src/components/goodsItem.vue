<template>
<li>
    <router-link :to="'/goodsDetails?goodsNo=' + goodsItem.goodsNo">
        <div v-if="goodsItem.count==0" class="no-goods">已抢光</div>
        <div class="goods-img">
            <img v-bind:data-src="goodsItem.imgUrl" width="100%" />
        </div>
        <p class="goods-der"><span class="activity" v-html="goodsItem.couponPolicyName" v-if="goodsItem.couponPolicyName &&getNowTime(goodsItem.nowTime) > getNowTime(goodsItem.startTime) && getNowTime(goodsItem.nowTime) < getNowTime(goodsItem.endTime)"></span><span v-html="goodsItem.goodsName"></span></p>
        <div class="goods-price">
            <ins class="current-price">¥<span v-html="parseFloat(goodsItem.mallPrice).toFixed(2)"></span></ins>
            <del class="original-price">¥<span v-html="parseFloat(goodsItem.marketPrice).toFixed(2)"></span></del>
        </div>
    </router-link>
</li>
</template>

<script>
export default {

    name : 'goodsItem',

    props : {
        goodsItem : {
            required : true,
            type : Object
        }
    },

    methods : {
        getNowTime(nowTime) {
            return new Date(nowTime).getTime();
        }
    }
}
</script>

<style scoped>
/*公共商品列表开始*/
.com-goods-list li {
    position: relative;
    float: left;
    width: 50%;
    height: 6.25rem;
    border-bottom: 1px solid #ebebeb;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 18.5rem;
}
.com-goods-list li:nth-child(odd) {
    margin-left: -1px;
    border-right: 1px solid #ebebeb;
}
.com-goods-list .goods-img {
    position: relative;
    width: 11rem;
    height: 11rem;
    margin: 0.833rem auto;
    overflow:hidden;
}
.com-goods-list .tips-box {
    position: absolute;
    left: 0;
    top: 0;
}
.com-goods-list .tips-box img {
    width: 2.792rem;
}
.com-goods-list .goods-img img {
    max-width: 100%;
}
.com-goods-list .goods-der {
    height: 2.7rem;
    line-height: 1.4rem;
    padding: 0 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #4d4d4d;
}
.goods-der .activity {
    margin-right: 2px;
    color: #a54144;
    border:1px solid #a54144;
    padding: 1px 1px;
    font-size: 0.75rem;
    line-height: 1.5;
}
.com-goods-list .goods-price {
    margin-top: 0.417rem;
    padding: 0 0.75rem;
}
.com-goods-list .current-price {
    color: #f34f34;
    font-size: 1.2rem;
    margin-right: 3px;
    text-decoration: none;
    vertical-align: middle;
}
.com-goods-list .original-price {
    color: #b6bbc1;
    text-orientation: none;
    vertical-align: middle;
}
.com-goods-list li a {
    display: block;
}
.com-goods-list .com-none {
    opacity: 0;
}
.com-goods-list .no-goods {
    position: absolute;
    z-index: 1;
    left: 4.5rem;
    top: 4.5rem;
    width: 3.958rem;
    height: 3.958rem;
    line-height: 3.958rem;
    background-color: #999;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    opacity: .8;
}
/*公共商品列表结束*/
</style>

