<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'heightlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></i>
          </div>
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'heightlight':totalPrice>0}">
          ￥{{totalPrice}}元
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div class="ball" v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook" ></div>
          </div>
        </transition>
      </div>
    </div>
    <div class="shopcart-list" >
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="food" v-for="food in sellctFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [{
            price: 10,
            count: 1
          }];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          }, {
            show: false
          }, {
            show: false
          }, {
            show: false
          }, {
            show: false
          }
        ],
        dropBalls: []
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    },
    methods: {
      drop(el) {
//        console.log(el);
        for (let i = 0; i <= this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop:function(el) {
//        console.log(el)
        let count = this.balls.length;
//        console.log(count);
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            console.log(y);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping:function(el,done) {
        /* eslint-disable no-unused-vars*/
        let rf=el.offestHeight;
        console.log(el);
//        console.log(rf);
        this.$nextTick(()=>{
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        })
      },
      afterDrop:function(el) {
        let ball=this.dropBalls.shift();
        if(ball){
          ball.show=false;
          el.style.display='none'
        }
      }
    },
    components:{
      cartcontrol
    }
//    transitions: {
//      drop: {
//        beforeEnter(el) {
//          let count = this.balls.length;
//          console.log(count);
//          while (count--) {
//            let ball = this.balls[count];
//            if (ball.show) {
//              let rect = ball.el.getBoundingClientRect();
//              let x = rect.left - 32;
//              let y = -(window.innerHeight - rect.top - 22);
//              console.log(x+'——'+y)
//              el.style.display = '';
//              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
//              el.style.transform = `translate3d(0,${y}px,0)`;
//              let inner = el.getElementsByClassName('inner-hook')[0];
//              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
//              inner.style.transform = `translate3d(${x}px,0,0)`;
//            }
//          }
//        },
//        enter(el) {
//          /*eslint-disable no-unused-vars*/
//          let rf=el.offsetHight;
//          this.$nextTick(()=>{
//            el.style.webkitTransform = 'translate3d(0,0,0)';
//            el.style.transform = 'translate3d(0,0,0)';
//            let inner = el.getElementsByClassName('inner-hook')[0];
//            inner.style.webkitTransform = 'translate3d(0,0,0)';
//            inner.style.transform = 'translate3d(0,0,0)';
//          })
//        },
//        afterEnter(el) {
//          let ball=this.dropBalls.shift();
//          if(ball){
//            ball.show=falsel;
//            el.style.display='none'
//          }
//        }
//      }
//    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .shopcart
    position fixed
    left 0
    bottom: 0
    z-index 50
    width 100%
    height: 48px
    /*background #000000*/
    .content
      display: flex
      background: #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width 56px
          height: 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            background #2b343c
            width 100%
            height: 100%
            border-radius 50%
            text-align center
            &.heightlight
              background rgb(0 160 220)
            .icon-shopping_cart
              color #80858a
              line-height 44px
              font-size 24px
              &.heightlight
                color: #fff
          .num
            position absolute
            top: 0
            right: 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight bold
            color: #ffffff
            background rgb(240 20 20)
            box-shadow 0 4px 8px 0 rgba(0 0 0 .4)
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255 255 255 0.1)
          font-size 16px
          font-weight: bold
          color rgba(255 255 255 .4)
          &.heightlight
            color #fff
        .desc
          display inline-block
          line-height 24px
          vertical-align top
          margin 12px 0 0 12px
          color: rgba(255 255 255 .4)
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          font-size 12px
          height: 48px
          line-height 48px
          text-align center
          color: rgba(255 255 255 .4)
          font-weight: bold
          background #2b333b
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left: 32px
        bottom: 22px
        z-index 200
        &.drop-transtion
          transtion all .4s
          .inner
            width: 16px
            height 16px
            border-radius 50%
            background: rgb(0 160 220)
            transtion all .4s
</style>
