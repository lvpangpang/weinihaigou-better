<template>
<div>
    <com-navigation headerName="确认支付"></com-navigation>

    <div class="top-box"></div>

    <div class="address-box">
        <router-link to="address?fromAddress=1" class="has-address" v-if="addrList[0]">
            <div class="address-left">
                <p class="name-phone" v-if="addrList[0]">
                    <span v-html="addrList[0].person_name"></span>
                    <span v-html="addrList[0].serv_num"></span>
                </p>
                <div class="address-tips" v-if="addrList[0]">
                        <i></i>
                     <span><label v-html="addrList[0].area_name.split(' ')[0]"></label><label v-html="addrList[0].area_name.split(' ')[1]"></label><label v-html="addrList[0].area_name.split(' ')[2]"></label><label v-html="addrList[0].address"></label></span>
                </div>
            </div>
            <i class="com-right-tip"></i>
        </router-link>
        <router-link to="address?fromAddress=1" class="no-address" v-else>
            <div class="add-address">添加收货地址</div>
            <i class="com-right-tip"></i>
        </router-link>
    </div>
    <div class="goods-items">
        <div class="item" v-for="data in shopList">
            <div class="img-box"><img v-bind:src="data.imgUrl" /></div>
            <div class="details">
                <p class="goods-name" v-html="data.goodsName2"></p>
                <p class="norms">规格:<span v-html="data.skuName"></span></p>
                <p class="money">¥<span v-html="data.skuPrice.toFixed(2)"></span></p>
            </div>
            <span class="num">×<span v-html="data.num"></span></span>
        </div>
    </div>
    <div class="order-items">
        <p class="item">
            <span>商品金额(不含税):</span>
            <span class="money">¥<span v-html="amountAll.toFixed(2)"></span></span>
        </p>
        <p class="item">
            <span>活动:</span>
            <span class="money">-¥<span v-html="discount.toFixed(2)"></span></span>
        </p>
        <p class="item">
            <span>优惠券优惠:</span>
            <span class="money">-¥<span v-html="couDiscount.toFixed(2)"></span></span>
        </p>
        <p class="item">
            <span>运费:</span>
            <span class="money">¥<span v-html="postAge.toFixed(2)"></span></span>
        </p>
        <p class="item">
            <span>税费:</span>
            <span class="money">¥<span v-html="taxAll.toFixed(2)"></span></span>
        </p>
        <p class="item">
            <span>应付总额:</span>
            <span class="money">¥<span v-html="relMoney.toFixed(2)"></span></span>
        </p>
        <div class="safe-tip">安全提醒：付款成功后，唯妮海购不会以付款异常，系统升级为理由联系您，请勿泄漏银行卡号，手机验证码，否则会造成钱款的损失。如有疑问请咨询客服，谨防电话诈骗。</div>
    </div>
    <div class="message-remarks">
        <div class="message">
            <p>留言备注:</p>
            <textarea v-model="remark"></textarea>
        </div>
    </div>
    <div class="pay-box">
        <p class="pay-header">选择支付方式:</p>
        <div class="pay-main">
            <a href="javascript:;" class="zfb active" v-if="!$store.state.weixin">
                <span>支付宝</span>
                <i></i>
            </a>
            <a href="javascript:;" class="wx active" v-else>
                <span>微信</span>
                <i></i>
            </a>
        </div>
    </div>
    <div class="pay-footer">
        <div class="all-money">共计:<span>¥<span v-html="relMoney.toFixed(2)"></span></span></div>
        <a href="javascript:;" v-on:click="goOrder()" class="pay-btn">确认并付款</a>
    </div>

    <!-- 实名认证弹框 -->
    <div class="real-box">
        <div class="real-bg"></div>
        <div class="real-main">
            <div class="real-header">
                <span>实名认证</span>
                <a href="javascript:;" class="close"></a>
            </div>
            <div class="real-con">
                <input type="text" name="" class="real-name" placeholder="您的真实姓名" v-model="name" />
                <input type="text" name="" class="real-crad-no"  placeholder="您的身份证号码（将加密处理）" v-model="cardId" />
                <p class="tips-box">备注: 海关要求购买跨境商品需提供实名信息哦！</p>
                <a href="javascript:;" class="sub-btn" v-on:click=" geTorealName()">完成</a>
            </div>
        </div>
    </div>

    <com-loading :isLoading="isLoading"></com-loading>

</div>
</template>

<script>
import commonMethods from '@/js/common';
import comLoading from '@/components/comLoading';
import comNavigation from '@/components/comNavigation';

export default {

    name : 'surePay',

    data () {
        return {
            tradeNo : '',
            addrList : [],
            post : [],
            shopList : [],
            cList : [],
            amountAll : 0,
            discount : 0,
            postAge : 0,
            couponId : '',
            couDiscount : 0,
            taxAll : 0,
            relMoney : 0,
            cou_flag : '',
            remark : '',
            name : '',
            cardId : '',
            isLoading : true,
        }
    },

    mounted() {
        this.getPayInfo();
    },

    methods : {
        getPayInfo() {
            var oThis = this;
            this.axios.post(this.API.toMoPalaceOrder).then( ( data ) => {
                var data = data.data;
                if (data.success) {
                    this.isLoading = false;
                    oThis.addrList = data.addrList;
                    oThis.post = data.post;
                    oThis.shopList = data.shopList;
                    oThis.cList = data.cList;
                    oThis.amountAll = data.amountAll;
                    oThis.discount = data.discount;
                    oThis.postAge = data.postAge;
                    oThis.couDiscount = data.couDiscount;
                    oThis.taxAll = data.taxAll;
                    oThis.relMoney = data.amountAll + data.postAge + data.taxAll - data.couDiscount - data.discount;
                } else{
                    oThis.$router.push('login');
                }
            });
        },

        goOrder() {
            var str = "",
                adrList = this.addrList,
                addressId = "",
                isSelect = 0,
                couponId = this.cou_flag,
                payStatus = 4,
                orderItem = {},
                orderList = [];

            // 判断是否是微信
            if( commonMethods.checkIsWx() ) {
                payStatus = 5;
            }

            this.shopList.forEach( (item, index, arr) => {
                orderItem = {
                    skuNo : item.skuNo,
                    num : item.num
                };
                orderList.push(orderItem);
            });

            if( adrList.length>0 ) {
                addressId = adrList[0].addr_id;
            }

            if( addressId==='' ) {
                window.$toast({
                    msg : '收货地址不能为空!'
                });
                return;
            }

            if( couponId!==0&&couponId!==''&&couponId!==null ){
                isSelect = 1;
            }

            this.axios.post(this.API.createOrder, $.param({
                param:JSON.stringify(orderList),
                remark:this.remark,
                addressId:addressId,
                couponId:couponId,
                isSelect:isSelect
                })).then( ( data ) => {
                var data = data.data;
                console.log(data);
                if( data.success ) {
                    this.goPay(payStatus, data.result);
                } else {
                    if( data.message==='未实名认证' ) {
                        $('.real-box').show();
                    } else {
                        window.$toast({
                            msg : data.message
                        });
                    }
                }
            });
        },

        goPay(payStatus, tradeNo) {
            this.axios.post(this.API.createOrder, $.param({
                tradeNo : tradeNo,
                payStatus : payStatus
                })).then( ( data ) => {
                var data = data.data;
                if( data.success ) {
                    window.location.href = data.result;
                } else {
                    if (data.msg==='000000012') {
                        window.$toast({
                            msg : '订单已超过支付时间，请重新下单'
                        });
                    } else if (data.msg==='000000014'){
                        window.$toast({
                            msg : '订单已支付，请不要重复提交'
                        });
                    } else {
                        window.$toast({
                            msg : '网络异常，请稍后再试'
                        });
                    }
                }
            });
        },

        geTorealName() {
            if ( this.name === '' ) {
                window.$toast({
                    msg : "请输入用户名",
                });
                return;
            }
            if ( !commonMethods.testVerifyCard(this.cardNo) ) {
                window.$toast({
                    msg : "请输入格式正确的身份证",
                });
                return;
            }
            this.axios.post(this.API.saveUserDetail, $.param({
                realName: this.realName,
                cardNo: this.cardNo
                })).then( ( data ) => {
                var data = data.data;
                if( data.success ) {
                    this.goOrder();
                }
            });

        }
    },

    components : {
        comLoading,
        comNavigation
    }
}
</script>

<style scoped>
.top-box {
    height: 3.5rem;
}
.address-box {
    margin-bottom: 0.708rem;
    height: 5.625rem;
    padding: 1rem 1.333rem;
    background:#fff;
    box-sizing: content-box;
    border-top: 3px solid transparent;
    overflow:hidden;
    border-image: 12 repeating-linear-gradient(-45deg,
                   #e56a70 0,  #e56a70 1rem,
                   transparent 0, transparent 2rem,
                   #8ab7e9 0, #8ab7e9 3rem,
                   transparent 0, transparent 4rem);
}
.address-box  .has-address,
.address-box  .no-address {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items:center;
    align-items: center;
    height: 100%;
    color: #000;
}
.address-box  .address-left,
.address-box  .add-address {
    width: 90%;
}
.address-box  .name-phone {
    font-size: 1.2rem;
}
.address-box  .address-tips {
    margin-top: 0.208rem;
    color: #d0d0d0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.address-box  .address-tips i {
    display: inline-block;
    vertical-align: middle;
    width: 0.9rem;
    height: 1.2rem;
    background: url(../../m-images/icon2.png) no-repeat 0 -24.2rem;
    background-size: 33.333rem 33.333rem;
}
.address-box  .add-address {
    color: #b1b1b1;
    padding-left: 2.0rem;
    height: 1.417rem;
    line-height: 1.417rem;
    background: url(../../m-images/logistics-icon.png) no-repeat 0 -2.3rem;
    background-size: 4.167rem 4.167rem;
}

.goods-items {
    margin-bottom: 0.708rem;
    border-top: 1px solid #ebebeb;
    background-color: #fff;
}
.goods-items h2 {
    height: 3rem;
    line-height: 3rem;
    padding:0 1.333rem;
    border-bottom: 1px solid #ebebeb;
    font-size: 1rem;
}
.goods-items .item {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content:space-between;
    -webkit-align-items:center;
    align-items: center;
    height: 5.833rem;
    padding: 0.833rem 1.333rem;
    border-bottom: 1px solid #ebebeb;
}
.goods-items .img-box {
    width: 4.167rem;
    height: 4.167rem;
    overflow:hidden;
}
.goods-items .details {
    margin: 0 0.417rem;
    width: 16.25rem;
}
.goods-items .goods-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.goods-items .norms {
    margin-bottom: 0.417rem;
    color: #999;
    font-size: 0.833rem;
}
.goods-items .money {
    color: #f34f34;
    font-size: 1.1rem;
}
.goods-items .num {
    color: #999;
}
.goods-items .post-tip {
    margin-left: 10px;
    position: relative;
    z-index: 10;
    border:1px solid #9f2e33;
    padding:2px 5px;
    color: #fff;
    box-shadow: 2px 2px 0 #c68d8f;
    font-size: 0.75rem;
    background: #9f2e33;
}
.goods-items .post-tip:before {
    content: '';
    position: absolute;
    left: -7px;
    top: 3.5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 6px solid #9f2e33;
    border-bottom: 5px solid transparent;
}

.order-items {
    margin-bottom: 0.708rem;
    border-top:1px solid #ebebeb;
    background-color: #fff;
}
.order-items .item {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content:space-between;
    -webkit-align-items:center;
    align-items: center;
    padding: 0 1.333rem;
    height: 2.708rem;
    border-bottom: 1px solid #ebebeb;
    color: #1a1a1a;
}
.order-items .money {
    color: #f34f34;
}
.order-items .safe-tip {
    padding: 0.833rem 1.0rem;
    font-size: 0.833rem;
    line-height: 1.5;
}

.message-remarks {
    margin-bottom: 0.708rem;
    border-top: 1px solid #ebebeb;
    background-color: #fff;
}
.message-remarks .item {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content:space-between;
    -webkit-align-items:center;
    align-items: center;
    height: 2.708rem;
    padding: 0 1.333rem;
    border-bottom: 1px solid #ebebeb;
}
.message-remarks .message {
    padding: 1.333rem;
    border-bottom: 1px solid #ebebeb;
}
.message-remarks .message p {
    margin-bottom: 0.417rem;
}
.message-remarks .message textarea {
    width: 100%;
    height: 4.833rem;
    overflow-y: auto;
    background-color: #f0f0f0;
    border: none;
    padding: 5px 10px;
}

/*支付方式开始*/
.pay-box {
    margin-bottom:4rem;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
    color: #1a1a1a;
}
.pay-box .pay-header {
    padding-left: 1.333rem;
    line-height: 2.708rem;
    border-bottom: 1px solid #ebebeb;
}
.pay-box .pay-main a {
    display: block;
    line-height: 2.417rem;
    color: #1a1a1a;
    margin-left: 1.333rem;
    box-sizing: content-box;
    padding: .5rem 1.333rem .5rem 3.458rem;
    background:url(../../m-images/pay.png) no-repeat 0 .5rem;
    background-size: 16.667rem 16.667rem;
}
.pay-box .pay-main a i,
.pay-box .pay-main .active i {
    float: right;
    margin-top: .5rem;
    width: 1.4rem;
    height: 1.4rem;
    background:url(../../m-images/pay.png) no-repeat 0 -9.8rem;
    background-size: 16.667rem 16.667rem;
}
.pay-box .pay-main .active i {
    background-position: 0 -13.65rem;
}
.pay-box .pay-main .zfb {
    background-position: 0 .5rem;
}
.pay-box .pay-main .wx {
    border-bottom: none;
    background-position: 0 -5rem;
}
/*支付方式结束*/

.pay-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background:#fff;
    border-top:1px solid #ebebeb;
    height: 45px;
    line-height: 45px;
}
.pay-footer .all-money {
    float: left;
    width: 70%;
    text-align: right;
    padding-right: 1.25rem;
    font-size: 1.083rem;
}
.pay-footer .all-money span {
    color: #9f2e33;
}
.pay-footer .pay-btn {
    float: left;
    width: 30%;
    background: #9f2e33;
    color: #fff;
    text-align: center;
    font-size: 1.167rem;
}

.coupon-num {
    color: #9f2e33;
}
.pop-box .tip-main  {
    padding: 1rem 1rem;
}
.pop-box .tip-main p {
    line-height: 1.5;
}

.real-box {
    display: none;
}
.real-box .real-bg {
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    opacity: .5;
}
.real-box .real-main {
    position:fixed;
    z-index: 101;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    width: 90%;
    height: 20.25rem;
    background: #fff;
}
.real-box .show-main {
    -webkit-transform: translateY(0) !important;
    transform: translateY(0) !important;
}
.real-box .real-header {
    height: 3.393rem;
    padding:1.071rem 1.286rem;
    font-size: 1.1rem;
    color: #000;
    border-bottom: 1px solid #e9ebf1;
    text-align: center;
}
.real-box .close {
    float: right;
    width: 1.2rem;
    height: 1.2rem;
    background: url(../../m-images/icon3.png) no-repeat 0 -3.042rem / 4.167rem 20.833rem;
}
.real-box .real-con {
    padding-top: 2rem;
}
.real-box .tips-box {
    position: relative;
    width: 90%;
    margin: 0 auto;
    font-size: 0.9rem;
    color: #808080;
}
.real-box input {
    display: block;
    margin:0 auto .7rem;
    width: 90%;
    height: 2.929rem;
    line-height: 2.929rem;
    padding:0 .5rem;
}
.real-box .sub-btn {
    display: block;
    width: 90%;
    line-height: 2.857rem;
    margin: 1.8rem auto 0;
    background: #9f2e33;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    font-size: 1.214rem;
}
</style>

