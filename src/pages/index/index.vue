<template>
<div>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="data in indexData.bannerList">
                <a v-bind:href="data.adUrl">
                    <img v-bind:src='data.adImgUrl'>
                </a>
            </div>
        </div>
        <div class="pagination"></div>
    </div>

    <div class="nav clearfix">
        <a href="javascript:;" class="nav-item"><img src="../../m-images/index-top.png">TOP榜</a>
        <a href="javascript:;" class="nav-item"><img src="../../m-images/index-new.png">每周上新</a>
        <a href="javascript:;" class="nav-item"><img src="../../m-images/index-support.png">唯妮保障</a>
        <a href="javascript:;" class="nav-item"><img src="../../m-images/index-gift.png">邀请有礼</a>
    </div>

    <div class="hot clearfix" v-if="indexData!={}" v-cloak>
        <h2><a href="javascript:;">Hot<span class="no-explan">热门推荐</span></a></h2>
        <ul class="clearfix">
            <li v-for="data in indexData.subject">
                <router-link :to="'/hot?themeId=' + data.id">
                    <img v-bind:data-src="data.url" />
                </router-link>
            </li>
        </ul>
    </div>

    <div class="global-selection">
        <h2><a href="javascript:;">Global<span class="explan">全球精选好货</span></a></h2>
        <ul class="clearfix com-goods-list">
            <goods-item v-for="(data, index) in indexData.goodsType" :goodsItem="data" :key="data.goodsNo"></goods-item>
        </ul>
    </div>

</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import '@/js/swiper';
import '@/js/imgLazy';
import goodsItem from '@/components/goodsItem';

export default {
    name : 'index',

    data() {
        return {
            indexData : {}
        }
    },

    created() {
       this.getData();
    },

    // 被缓存进入才会触发这个钩子
    activated() {
        setTimeout( () => {
            new lazyImg({
                extendHeight: 0
            });
        }, 200);

        this.changeComHeaderFlag(true);
        this.changeComFooterFlag(true);
        this.changeIndex();
    },

    // 被缓存离开才会触发这个钩子
    deactivated() {
        this.changeComHeaderFlag(false);
        this.changeComFooterFlag(false);
    },

    methods : {
        ...mapActions({
            changeComHeaderFlag : 'changeComHeaderFlag1',
            changeComFooterFlag : 'changeComFooterFlag1',
            changeIndex : 'changeIndex1',
            changeIsLoading : 'changeIsLoading1',
            changeIsEnd : 'changeIsEnd1'
        }),

        getData() {
            this.changeIsLoading(true);
            this.axios.post(this.API.indexMo).then( ( data ) => {
                this.indexData = data.data;
                this.changeIsLoading(false);
                this.$nextTick( () => {
                    let mySwiper = new Swiper('.swiper-container',{
                        loop:true,
                        grabCursor: true,
                        paginationClickable: true,
                        pagination: '.pagination',
                        autoplay: 5000
                    });
                });
            });
        }
    },

    components : {
        goodsItem
    }
}
</script>

<style scoped>
@import '../../css/swiper.min.css';
.swiper-container {
    margin-top: 3.5rem;
}
/*nav开始*/
.nav {
    display: -webkit-flex;
    -webkit-justify-content:space-around;
    justify-content: space-around;
    -webkit-align-items:center;
    align-items: center;
    padding: 0.75rem 0;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
}
.nav .nav-item {
    width: 25%;
    text-align: center;
    color: #000;
}
.nav img {
    display: block;
    margin: 0 auto .25rem;
    width: 2.083rem;
}
/*nav结束*/

/*热门推荐开始*/
.global-selection {
    margin-bottom: 55px;
}
.flash-sale,
.hot,
.global-selection {
    margin-top:17px;
    background-color: #fff;
    border-top: 1px solid #ebebeb;
    background-color: #fff;
}
.flash-sale h2,
.hot h2,
.global-selection h2 {
    height: 3.125rem;
    text-align: center;
    font-size: 1.167rem;
    border-bottom: 1px solid #ebebeb;
    color: #f2f2f2;
    font-size: 1.667rem;
}
.flash-sale .no-bottom {
    border-bottom: none;
}
.flash-sale h2 a,
.hot h2 a,
.global-selection h2 a {
    display: block;
    width: 10rem;
    height: 100%;
    margin: 0 auto;
    position: relative;
    color: #f2f2f2;
}
.explan,
.no-explan {
    position: absolute;
    left: 0;
    right: 0;
    top: 0.833rem;
    margin: auto;
    min-width: 5.708rem;
    font-size: 1.3rem;
    color: #000;
}
.explan:after {
    content:'';
    display: inline-block;
    margin-left: .5rem;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 7px solid #1c1b21;
    border-bottom: 5px solid transparent;
}
.hot li {
    float: left;
    width: 50%;
    height: 5.75rem;
    padding: .25rem 0;
    margin-left: -1px;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    overflow:hidden;
}
.hot li a {
    display: block;
    height: 100%;
    overflow:hidden;
    background-color: #fff;
}
.hot li a img {
    display: block;
    margin:0 auto;
    width: 99%;
    height: 100%;
}
/*热门推荐结束*/
</style>