<template>
<transition name="bounce">
    <div class="pop-box" v-show="isShow">
        <div class="pop-msg">{{msg}}</div>
    </div>
</transition>
</template>

<script>
export default {

    name : 'toast',

    data() {
        return {
            isShow : false,
            msg : ''
        }
    },

    mounted() {
        let vue = this;
        window.$toast = ( options ) => {
            vue.isShow = true;
            vue.msg = options.msg;
            setTimeout( () => {
                vue.isShow = false;
            }, options.timer || 2000);
        };
    }
};
</script>

<style scoped>
.pop-box {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content:center;
    justify-content: center;
    -webkit-align-items:center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
}
.pop-box .pop-msg {
    max-width: 80%;
    padding: .6rem 1rem;
    opacity: .8;
    background: #000;
    color: #fff;
    border-radius: .3rem;
    font-size: 1.2rem;
    word-break: break-all;
    text-align: center;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
    0% {

        transform: scale(0)  rotate(180deg);
    }
    50% {
        transform: scale(1.2) rotate(0deg);
    }
    100% {
        transform: scale(1);
    }
}
</style>