<template>
<div class="header clearfix">
    <h1>{{headerName}}</h1>
    <a href="javascript:history.back();" class="header-back" v-if="back"></a>
    <router-link  to='/' class="header-back" v-else></router-link>
</div>
</template>

<script>
export default {

    name : 'comNavigation',

    props : {
        headerName : {
            required : true,
            type : String,
            default : ''
        },
        back : {
            type : Boolean,
            default : true
        }
    }
}
</script>

<style scoped>
.header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 2rem;
    padding: .75rem 0;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
}
.header h1 {
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
.header .header-back {
    position: absolute;
    top: 1rem;
    left: 0.875rem;
    width: 1.4rem;
    height: 1.4rem;
    background: url(../m-images/header-back.png) no-repeat center/ 1.3rem 1.3rem;
}
</style>