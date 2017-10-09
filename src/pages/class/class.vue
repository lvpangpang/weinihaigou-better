<template>
<div class="classify-main clearfix">
    <div class="classify-tab">
        <ul>
            <li class="tab-item" v-for="data in oneClassList" v-html="data.classdesc" v-bind:id="data.classid" :class="{'active' : data.classid==categoryId}" @click="change($event)"></li>
        </ul>
    </div>
    <div class="classify-con">
        <div class="con-slide" >
            <div class="classify-items" v-for="data in twoClassList" v-if="twoClassList.length>0">
                <h2 v-html="data.name"></h2>
                <ul class="clearfix">
                    <li v-for="goods in data.threeCategoryList">
                        <router-link :to="'/goodsResult?twoCategoryId=' + goods.id +'&twoCategoryName=' + goods.threeName" class="link-items" v-bind:id="goods.id">
                            <img v-bind:data-src="goods.imgUrl" />
                            <p v-html="goods.threeName"></p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <com-loading :isLoading="isLoading"></com-loading>
        <com-no-num :isNoNum="noNum"></com-no-num>
    </div>
</div>
</template>
<script>
import { mapActions } from 'vuex';
import comLoading from '@/components/comLoading';
import comNoNum from '@/components/comNoNum';
import '@/js/imgLazy';

export default {
    name : 'class',

    data() {
        return {
            oneClassList : [],//一级分类数据
            twoClassList : [],//二级分类数据
            categoryId : '',//一级页面ID
            isLoading : true,
            noNum : false,
            stagingStation : {}
        }
    },

    mounted() {
        this.getOneClassList();
    },

    // 被缓存的再次进入只会触发这个钩子
    activated() {
        this.$nextTick(() => {
            new lazyImg();
        });
        this.changeComHeaderFlag(true);
        this.changeComFooterFlag(true);
        this.changeClass();
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
            changeClass : 'changeClass1',
        }),

        change(e) {
            var e = e.target;
            if( this.categoryId === e.id ) {
                return;
            }
            this.categoryId = e.id;
            this.noNum = false;
            if( this.stagingStation[this.categoryId] ) {
                this.twoClassList = this.stagingStation[this.categoryId];
                if( this.twoClassList.length===0 ) {
                    this.noNum = true;
                }
                this.$nextTick(() => {
                    new lazyImg();
                });
            } else {
                this.getTwoClassList(this.categoryId);
            }
        },

        getOneClassList() {
            this.axios.post(this.API.getCategory)
            .then( (data) => {
                var data = data.data;
                if( data.message ) {
                    this.oneClassList = data.classList;
                    this.categoryId = this.oneClassList[0].classid;
                    this.getTwoClassList(this.categoryId);
                }
            });
        },

        getTwoClassList(categoryId) {
            this.isLoading = true;
            this.noNum = false;
            this.twoClassList = [];
            this.axios.post(this.API.getCategoryTwo, $.param({ categoryId : categoryId }) )
            .then((data) => {
                var data = data.data;
                if( data.message ) {
                    this.twoClassList = data.classTwoList;
                    this.stagingStation[categoryId] = data.classTwoList;
                    this.isLoading = false;
                    if( this.twoClassList.length===0 ) {
                        this.noNum = true;
                    }
                    this.$nextTick(() => {
                        new lazyImg();
                    });
                }
            });
        }
    },

    components : {
        comLoading,
        comNoNum,
    }
}
</script>

<style scoped>
.classify-main {
    height: 100%;
    padding: 3.5rem 0 45px;
    overflow-y: hidden;
    background: #fff;
}

.classify-tab {
    float: left;
    padding-top: 20px;
    width: 25%;
    height: 100%;
    overflow:auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}
.classify-tab .tab-item {
    margin-bottom: 1.25rem;
    line-height: 1.75rem;
    border-left: 4px solid #fff;
    text-align: center;
    color: #4d4d4d;
    font-size: 1rem;
}
.classify-tab .active {
    border-left: 4px solid #aa4f53;
    color: #aa4f53;
}

.classify-con {
    float: right;
    width: 75%;
    height: 100%;
    overflow:hidden;
    overflow-y:auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    border-left: 1px solid #ebebeb;
}
.classify-con .con-slide {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    padding: 1rem 0.583rem;
}
.classify-con .con-header {
    display: block;
    height: 5.417rem;
    margin-bottom: 1.042rem;
    text-align: center;
    overflow:hidden;
}
.classify-con .con-header img {
    max-width: 100%;
    height: 100%;
}
.classify-con .classify-items {
    margin-top: 0.833rem;
}
.classify-con .classify-items h2 {
    font-size: 1.1rem;
    margin-bottom: .5rem;
}
.classify-con .classify-items li {
    float: left;
    margin-bottom: .5rem;
    width: 33.33%;
}
.classify-con .link-items {
    display: block;
    height: 7rem;
    text-align: center;
    color: #4d4d4d;
    font-size: 0.917rem;
    overflow:hidden;
}
.classify-con .link-items p {
    height: 2.4rem;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow:hidden;
    text-align: center;
}
.classify-con .link-items img {
    display: block;
    margin: 0 auto .3rem;
    width: 4rem;
    height: 4rem;
}
</style>