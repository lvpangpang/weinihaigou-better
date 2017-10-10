<template>
<div>
    <!-- 公共返回组件 -->
    <com-navigation headerName="登录" :back="false"></com-navigation>
    <div class="login-header">
        <img src="../../m-images/login-bg.jpg" />
    </div>
    <div class="login-main" v-cloak>
        <div class="phone-pwd">
            <div class="phone">
                <input type="tel" placeholder="请输入账号" autocomplete="off" v-model="mobile.value"/>
            </div>
            <div class="pwd">
                <input type="password" placeholder="请输入密码" autocomplete="off" v-model="password.value"/>
            </div>
        </div>
        <a href="javascript:;" class="com-next" v-on:click="login()" :class="{unable:(mobile.value=='' || password.value=='')}">登录</a>
        <p class="register-back">
            <router-link to="register" class="com-color">注册账号</router-link>
        </p>
   </div>
</div>
</template>

<script>
import hex_md5 from '@/js/md5';
import commonMethods from '@/js/common';
import { mapState, mapActions } from 'vuex';
import comNavigation from '@/components/comNavigation';

export default {

    name : 'login',

    data () {
        return {
            mobile : {value:'', success:false, errorInfo: '手机号为空或者格式不正确'},
            password: {value:'', success:false, errorInfo: '密码为空或者格式不正确（长度在6-20位之间）'},
        }
    },

    computed : {
        ...mapState([
            'isLogin',
        ])
    },

    methods : {

        ...mapActions([
            'changeIsLogin1',
            'changeCarCount1'
        ]),

        checkMobile() {
            if( commonMethods.testPhone(this.mobile.value) ) {
                this.mobile.success = true;
            } else {
                this.mobile.success = false;
                window.$toast({
                    msg : this.mobile.errorInfo
                });
            }
        },

        checkPassword() {
            if( commonMethods.testPwd(this.password.value) ) {
                this.password.success = true;
            } else {
                this.password.success = false;
                window.$toast({
                    msg : this.password.errorInfo
                });
            }
        },

        login() {
            if ( this.mobile.value=="" || this.password.value=="" ) {
                return;
            }
            this.checkMobile();
            if( this.mobile.success ) {
                this.checkPassword();
                if( this.password.success ) {

                    this.axios.post(this.API.login, $.param({
                        mobile : this.mobile.value,
                        password : hex_md5(this.password.value)
                    })).then( ( data ) => {
                        var msg  = data.data.msg;
                        if( msg==='00000000' ) {
                            this.$router.go(-1);
                            this.changeIsLogin1(true);
                            this.axios.post(this.API.carCount).then( ( data ) => {
                                this.changeCarCount1(data.data.count);
                            });
                        } else if( msg==='00000001' ) {
                            window.$toast({
                                msg : '用户名或者密码错误'
                            });
                        } else if( msg=='00000007' ) {
                            window.$toast({
                                msg : '手机号错误'
                            });
                        }
                    });

                }
            }
        }
    },

    components : {
        comNavigation
    }
}
</script>

<style scoped>
.login-header {
    position:relative;
    padding-top: 3.5rem;
}
.login-main {
    padding: 1.333rem;
}
.login-main .phone-pwd {
    border: 1px solid #b5b5b5;
    padding: 15px;
    background-color: #fff;
}
.login-main  .phone {
    height: 2.5rem;
    border-bottom: 1px solid #eee;
    padding-left: 1.875rem;
    background:url(../../m-images/icon.png) 0 0.308rem no-repeat;
    background-size: 18.875rem 14.167rem;
}
.login-main .phone input,
.login-main .pwd input {
    width: 20rem;
    height: 2rem;
    border:none;
    font-size: 1.2rem;
}
.login-main .phone-pwd .pwd {
    height: 1.8rem;
    padding-left: 1.875rem;
    padding-top: 0.833rem;
    border-bottom: none;
    background:url(../../m-images/icon.png) 0 -3.5rem no-repeat;
    background-size: 18.875rem 14.167rem;
    box-sizing:content-box;
}
.login-main .register-back {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    margin-top: 10px;
    color: #000;
}
.login-main .register-back a {
    color: #000;
}
.login-main .register-back nth-child(1) {
    color: #9f2e33;
}
.login-main .unable {
    background: #d2d2d2;
}
</style>

