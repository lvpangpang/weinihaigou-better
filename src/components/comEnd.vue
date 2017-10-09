<template>
<p class="com-end" v-show="isEnd">就到这里吧！我可是有底线的呢！</p>
</template>

<script>
export default {

    name : 'comEnd',

    props: {
        isEnd : {
            type : Boolean,
            default : false
        }
    }
}
</script>

<style scoped>
.com-end {
    font-size: 0.75rem;
    color: #c4c4c4;
    text-align: center;
    line-height: 3.667rem;
}
</style>