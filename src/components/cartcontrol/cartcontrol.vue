<template>
  <!--购物车控制组件-->
    <div class="cartcontrol">
      <!--减少按钮-->
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
          <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>

      <!--中间显示数字-->
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
    export default {
      props:{
        food:{
          type:Object
        }
      },
//      created(){
//        console.log(this.food)
//      },
      methods:{
        addCart(event){
          if (!event._constructed){
            return;
          }
//          console.log(1111);
          if (!this.food.count){
            Vue.set(this.food,'count',1);
//            this.food.count=1;
          }else {
            this.food.count++;
          }
          this.$emit('add',event.target);
        },
        decreaseCart(event){
          if (this.food.count){
            this.food.count--;
          }
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .cartcontrol
    font-size:0
    .cart-decrease
      display:inline-block
      padding 6px
      opacity 1
      transform translate3d(0 0 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
      /*transtion all .4 linear*/
      /*.inner*/
        /*display inline-block*/
        /*border: 1px solid red*/
        /*width: 10px*/
        /*height:10px*/
        /*&.fade-enter-active,&.fade-leave-active*/
          /*transition: all .5s*/
        /*&.fade-enter,&.fade-leave-to*/
          /*opacity: 0*/

      /*&.move-transtion
        opacity 1
        transform translate3D(0 0 0)
        .inner
          font-size 24px
          display inline-block
          line-height 24px
          color: rgba(0 160 220 1)
          transtion all .4 linear
          transfrom rotate(0)
       &.move-enter,&move-leave
         opacity 0
         transform translate3D(24px 0 0)
         .inner
            transform rotate(0)*/
    .cart-count
      display:inline-block
      vertical-align top
      width 12px
      height auto
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color: rgb(147 153 159)
    .cart-add
      display:inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color: rgba(0 160 220 1)
    /*.cart-add*/
      /*display:inline-block*/
      /*font-size 24px*/
      /*line-height 24px*/
</style>
