<!-- loading组件 -->
<template>
<div class="com-loading" v-show="isLoading">
    <img src="../m-images/loading.gif" />
</div>
</template>
<script>
export default {

    name : 'comLoading',

    props : {
        isLoading : {
            type : Boolean,
            default : false
        }
    }
}
</script>

<style scoped>
.com-loading {
    text-align: center;
}
.com-loading img {
    margin: 10px auto;
    width: 3rem;
}
</style>
