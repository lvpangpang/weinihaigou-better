<template>
<div class="quantity-selector clearfix">
    <span class="reduce" @click="reduce()" :class="{disable : val==1||count==0}">－</span>
    <input type="text" v-model="val" class="number" readonly="true" />
    <span class="add" @click="add()" :class="{disable : val==count||count==0}">＋</span>
</div>
</template>

<script>
export default {

    name : 'numControl',

    props : {
        number : {
            type : Number,
            required : true,
            default : 1,
            validator(value) {
                return value > 0 ;
            }
        },
        count : {
            type : Number,
            required : true,
        },

        indexArr : {
            type : Array
        }
    },

    data() {
        // 组件的data必须返回函数是因为不返回函数的话，多个使用该组件的都会共享同一个data
        return {
            // 如果你项修改传入组件的参数，那么就像下面这样写
            val :  this.number
        }
    },
    watch: {
        // 观察父组件的库存变化，从而改变子组件的数量值（主要是当父组件的库存为0时，重置子组件的数量为1，并通过触发并通过$emit触发父组件的对应事件，从而将子组件数量的变化传递给父组件）
        count() {
            if ( this.count == 0 ) {
                this.val = 1;
            }
            this.$emit('chang-event', {
                val : this.val,
                indexArr : this.indexArr
            });
        }
    },
    mounted : function() {
        if ( this.val < 1 ) {
            this.val = 1;
        }
        if ( this.val > this.count ) {
            this.val = this.count;
        }
        if ( this.count < 1 ) {
            this.count = 0;
            this.val = 1;
        }
    },
    methods : {
        add() {
            if ( this.val >= this.count ) {
                return;
            }
            this.val += 1;
            this.$emit('chang-event', {
                val : this.val,
                changeVal : 1,
                indexArr : this.indexArr
            });
        },
        reduce() {
            if ( this.val <= 1 || this.count === 0 ) {
                return;
            }
            this.val -= 1;
            this.$emit('chang-event', {
                val : this.val,
                changeVal : -1,
                indexArr : this.indexArr
            });
        }
    }
}
</script>

<style scoped>
.clearfix:after {
    content: ".";
    visibility: hidden;
    display: block;
    height: .1px;
    font-size: .1em;
    line-height: 0;
    clear: both;
}
.quantity-selector {
    margin-top: 2rem;
    width: 8.571rem;
    line-height: 2.9rem;
    border: 1px solid #d1d6e4;
    border-radius: 3px;
}
.quantity-selector .reduce,
.quantity-selector .add {
    float: left;
    width: 33.33%;
    border-right: 1px solid #d1d6e4;
    text-align: center;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 400;
}
.quantity-selector .number {
    float: left;
    width: 33.33%;
    height: 2.857rem;
    padding: .5rem 0;
    line-height: 1rem;
    border: none;
    text-align: center;
}
.quantity-selector .add {
    border-left: 1px solid #d1d6e4;
    border-right: none;
}
.quantity-selector  .disable {
    cursor: not-allowed;
    color: #d2d2d2;
}
</style>