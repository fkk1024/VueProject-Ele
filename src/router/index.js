import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'

Vue.use(Router);
//导入模板
import goods from "components/goods/goods.vue"
import ratings from "components/ratings/ratings.vue"
import seller from "components/seller/seller.vue"
//定义路由
const routes = [
  {
    path: '/',
    component: goods
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/seller',
    component: seller
  }
]

export default new Router({
  routes:routes,
  linkActiveClass:"active"
})
