<template>
  <div id="app">
    <div class="header">
      <v_head :seller="seller"></v_head>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import head from './components/header/header.vue';
  const ERR_NO=0;//设置常量方便判定
  export default {
    data() {
      return{
        seller:{}
      }
    },
    created(){
      this.$http.get('/api/seller').then((response)=>{
        response=response.body;
        console.log(response);
        if (response.errno===ERR_NO){
          this.seller=response.data;
          console.log(response);
        }
      });
    },
    name: 'app',
    components: {
      v_head: head
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common/stylus/mixin.styl"
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing:antialiased
    -moz-osx-font-smoothing:grayscale
    /*text-align:center*/
    color:#2c3e50
    .tab
      display:flex
      width: 100%
      border-1px(rgba(7 ,17,77,0.1))
      .tab-item
          flex: 1
          width: 30%
          text-align: center
        a
         padding:10px
         display:block
        .active
          color:rgb(240, 20, 20)
</style>
