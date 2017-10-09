<!-- loading组件 -->
<template>
<div class="com-no-num" v-show="isNoNum">
    <img src="../m-images/com-no-num.png" />
</div>
</template>
<script>
export default {

    name : 'comNavigation',

    props : {
        isNoNum : {
            type : Boolean,
            default : false
        }
    }
}
</script>

<style scoped>
.com-no-num {
    text-align: center;
}
.com-no-num img {
    width: 12rem;
}
</style>
