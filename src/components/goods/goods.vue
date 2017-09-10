<template>
  <div class="goods">
    <!-- 左边菜单 -->
    <div class="menu-wrapper" ref='menu_wrapper'>
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 右边菜品 -->
    <div class="foods-wrapper" ref='foods_wrapper'>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--购物车-->
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart.vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (var i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
//      组件联动
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        // console.log(response);
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._caculateHeight();
          })
          // console.log(response);
        }
      });
    },
    methods: {
      selectMenu: function (index, e) {
        console.log(e)
        if (!e._constructed) {
          return;
        }
        let foodList = this.$refs.foods_wrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300)
      },
      addFood(target){
        this._drop(target);
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu_wrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foods_wrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _caculateHeight() {
        let foodList = this.$refs.foods_wrapper.getElementsByClassName('food-list-hook');
        // window.console.log(foodList);
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
          // window.console.log(height);
        }
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  };
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position: absolute
    top: 174px
    width 100%
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height 14px
        border-1px(rgba(7 17 27 0.1))
        &.current
          background #fff
          position: relative
          z-index 10
          margin-top -1px
          font-weight 700
          .text
            border-none()
        &:after
          content ''
          border: none
          display none
        .icon
          width 12px
          margin-right 2px
          vertical-align top
          background-size 12px 12px
          background-repeat no-repeat
          height: 12px
          display: inline-block
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          font-size 12px
          display table-cell
          width: 56px
          vertical-align middle
          font-size 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left 14px
        height: 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color: rgb(147 153 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin 18px
        padding-top: 18px
        border-1px(rgba(7 17 27 0.1))
        border-none()
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height 14px
            font-size 14px
            color: rgb(7 17 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color: rgb(147 153 159)
          .desc
            margin-bottom 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color: rgb(240 20 20)
            .old
              text-decoration line-through
              font-size 10px
              color: rgb(147 153 159)
          .cartcontrol-wrapper
            position absolute
            right: 0
            bottom: 0px
</style>
