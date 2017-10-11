<template>
<div class="goods-box">

    <!-- 商品关键词搜索 -->
    <div class="search-wrap" v-if="$route.query.keyword">
        <div class="search-main">
            <a href="javascript:history.back()" class="header-back"></a>
            <router-link to="search"><div class="search-box search-tips" v-html="$route.query.keyword"></div></router-link>
        </div>
    </div>

    <!-- 分类搜索 -->
    <com-navigation v-if="$route.query.twoCategoryId" :headerName="$route.query.twoCategoryName"></com-navigation>

    <!-- 品牌搜索 -->
    <com-navigation v-if="$route.query.brandId" :headerName="$route.query.brandName"></com-navigation>

    <div class="goods-sort-box">
        <div class="com-goods-sort">
            <a href="javascript:;" class="items" data-sort="xl">销量</a>
            <a href="javascript:;" class="items" data-sort="sj">售价</a>
            <a href="javascript:;" class="items" data-sort="kc">库存量</a>
            <a href="javascript:;" class="items" data-sort="sjsj">上架时间</a>
        </div>
    </div>

    <ul class="clearfix com-goods-list">
        <goods-item v-for="(data, index) in goodsList" :goodsItem="data" :key="index"></goods-item>
    </ul>

    <com-loading :isLoading="isLoading"></com-loading>
    <com-no-num :isNoNum="isNoNum"></com-no-num>

</div>
</template>

<script>
import goodsItem from '@/components/goodsItem';
import comLoading from '@/components/comLoading';
import comNoNum from '@/components/comNoNum';
import comNavigation from '@/components/comNavigation';
import '@/js/imgLazy';

export default {

    name : 'goodsResult',

    data () {
        return {
            queryParams : {
                pageNum : 1,//第几页
                sort : 'empty',//排序类型
                order : '',//1：升；0：降
                name : this.$route.query.keyword,
                threeCategory : this.$route.query.twoCategoryId,
                brandId: this.$route.query.brandId
            },
            goodsList : [],
            isLoading : true,
            isNoNum : false,
        }
    },

    mounted() {
        let oThis = this;
        this.getGoodsList();
        $(window).scroll(() => {
            this.scrollGetData();
        });
        this.$nextTick( () => {
            new lazyImg();
        });

        // 条件筛选
        $('.com-goods-sort a').click(function() {
            var that = $(this),
                flag = 0,
                sort = that.attr('data-sort');
            oThis.queryParams.pageNum = 1;
            oThis.queryParams.sort = sort;

            // 升降序
            if( that.hasClass('up') ) {
                flag = 1;
                oThis.queryParams.order = 0;
            } else if ( that.hasClass('down') ) {
                flag = 2;
                oThis.queryParams.order = 1;
            } else {
                oThis.queryParams.order = 0;
            }

            if ( sort=='xl'&&flag==2 ) {
                return;
            }

            // 样式控制
            $('.com-goods-sort a').removeClass('active up down');
            if ( flag===1&&sort!='xl' ) {
                that.addClass('active down');
            } else if ( flag===2 ) {
                that.addClass('active up');
            } else {
                that.addClass('active down');
            }
            oThis.getGoodsList();
        });
    },

    methods : {

        scrollGetData() {
            if( $(window).scrollTop() + 500 >= $(document).height() - $(window).height() ) {
                if (  this.pageTotal>0 && this.queryParams.pageNum<this.pageTotal+1 && this.runing ) {
                    this.getGoodsList();
                }
            }
        },

        getGoodsList() {
            if( this.queryParams.pageNum===1 ) {
                this.goodsList = [];
                $('.com-loading').addClass('margin-top1');
                $(window).scrollTop(0);
            }
            this.isLoading = true;
            this.end = false;
            this.runing = false;
            this.isNoNum = false;

            this.axios.post( this.API.searchGoods, $.param(this.queryParams) )
            .then( (data) => {
                console.log(data.data);
                var data = data.data;
                if( data.message ) {
                    //第一次加载
                    if( this.queryParams.pageNum===1 ) {
                        this.goodsList = data.list;
                        this.pageTotal = data.pages;
                        // 没有数据
                        if( this.goodsList.length===0 ) {
                            this.isLoading = false;
                            this.isNoNum  = true;
                        }
                    } else {
                        this.goodsList = this.goodsList.concat(data.list);
                    }

                    this.$nextTick( () => {
                        new lazyImg();
                    });
                    this.nowTime = data.nowTime;
                    this.runing = true;
                    this.queryParams.pageNum++;

                    // 数据加载完毕
                    if( this.queryParams.pageNum===this.pageTotal+1 ) {
                        this.end = true;
                        this.isLoading = false;
                    }
                }
            });
        }
    },

    components : {
        goodsItem,
        comLoading,
        comNoNum,
        comNavigation
    }
}
</script>

<style scoped>
.com-no-num {
    margin-top: 8rem;
}
/*搜索框开始*/
.search-wrap {
    position:fixed;
    z-index: 66;
    width: 100%;
    left: 0;
    top: 0;
    height:3.417rem;
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
.search-wrap .header-back {
    position: absolute;
    top: 1rem;
    left: 0.875rem;
    width: 1.4rem;
    height: 1.4rem;
    background: url(../../m-images/header-back.png) no-repeat center / 1.3rem 1.3rem;
}
.search-wrap .search-main {
    position: relative;
    max-width: 640px;
    margin: 0 auto;
}
.search-wrap .search-box {
    position: absolute;
    left: 3rem;
    top: .56rem;
    width: 21rem;
    height: 2.292rem;
    background: #f4f4f4;
    border-radius: 4px;
    color: #333;
    line-height: 2.292rem;
}
.search-wrap .search {
    width: 80%;
    margin-top: .4rem;
    margin-left: 1rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border:none;
    background: #f4f4f4;
}
.search-wrap .search-btn {
    float: right;
    margin-right: .8rem;
    margin-top: 1.2rem;
    width: 1.167rem;
    height: 1.167rem;
    background: url(../../m-images/icon2.png) no-repeat 0 0;
    background-size:400px 400px;
    vertical-align: middle;
}
.search-wrap .response-box {
    position: absolute;
    left: 0;
    top: 3.417rem;
    width: 100%;
    background-color: #fff;
}
.search-wrap .response-box li {
    padding-left: 1rem;
    border-bottom: 1px solid #ebebeb;
}
.search-wrap .response-box a {
    display: block;
    line-height: 2.708rem;
    color: #000;
}
.search-wrap .empty-search {
    float: right;
    margin-top: .5rem;
    margin-right: 1rem;
    width: 1.4rem;
    height: 1.4rem;
    background:  url(../../m-images/icon2.png) no-repeat 0 -3.958rem;
    background-size: 33.333rem 33.333rem;
}
/*搜索框结束*/

/*搜索结果页面*/
.com-goods-list {
    padding-top: 6.5rem;
}
.goods-sort-box {
    position: fixed;
    z-index: 66;
    left: 0;
    top: 3.417rem;
    width: 100%;
    background-color: #fff;
}
.search-wrap .search-tips {
    padding-left: 2.5rem;
    background: #f4f4f4 url(../../m-images/icon2.png) no-repeat 0.625rem 0.5rem;
    background-size: 33.333rem 33.333rem;
    line-height: 2.4rem;
}

/*公共排序开始*/
.goods-sort-box {
    background-color: #fff;
}
.com-goods-sort {
    background-color: #fff;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-align-items:center;
    align-items: center;
    height: 3.125rem;
    border-bottom: 1px solid #ebebeb;
}
.com-goods-sort a {
    color: #666;
}
.com-goods-sort .items:after {
    content: '';
    display: inline-block;
    margin-left: 0.208rem;
    width: 0.917rem;
    height: 1.0rem;
    background:url(../../m-images/icon-week.png) no-repeat -2.083rem 0;
    background-size: 8.333rem 8.333rem;
    vertical-align: middle;
}
.com-goods-sort .up:after {
    background-position: 0 0;
}
.com-goods-sort .down:after {
    background-position: -1.042rem 0;
}
.com-goods-sort .active {
    color: #a54144;
}
.com-goods-brand  {
    display: none;
    height: 12rem;
    background-color: #fff;
    /*transform: translateY(-1.5rem);*/
}
.com-goods-brand .brand-items ul {
    height: 8.333rem;
    padding: 10px 20px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}
.com-goods-brand .brand-items li {
    float: left;
    width: 50%;
}
.com-goods-brand .brand-items a {
    float: left;
    width: 100%;
    color: #000;
    line-height: 1.5;
}
.com-goods-brand .brand-items .active {
    color: #a54144;
}
.com-goods-brand .brand-items .active:after {
    content:'';
    display: inline-block;
    vertical-align: middle;
    margin-left: .3rem;
    width: 0.75rem;
    height: 0.417rem;
    background:url(../../m-images/icon-week.png) no-repeat -3.25rem 0;
    background-size: 8.333rem 8.333rem;
}
.com-goods-brand .make-box {
    border-top: 1px solid #ebebeb;
    line-height: 3.75rem;
    background-color: #fff;
    box-shadow: 2px 2px 3px #000;
}
.com-goods-brand .make-box a {
    float: left;
    width: 50%;
    text-align: center;
    color: #000;
    font-size: 1.25rem;
}
.com-goods-brand .make-box .sure {
    background-color: #a54144;
    color: #fff;
}
.com-list-top {
    margin-top: 6.542rem !important;
}
/*公共排序结束*/
</style>

