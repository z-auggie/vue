import Vue from 'vue'
// 引入路由文件
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter)

// 引入vuex
// 每次都先从缓存中获取商品数据
var car = JSON.parse(localStorage.getItem('car') || '[]')
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    //{ id:商品的id， count：商品数量， price：商品的的单价， selected：false商品是否被选择 }
    addToCar(state, goodsinfo) {
      // 为false则表示是新的商品重新添加
      let falg = false
      state.car.some(item => {
        // id相同则增加数量
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          falg = true
          return true
        }
      })
      if (!falg) {
        state.car.push(goodsinfo)
      }
      // 将数据存入本地缓存
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 更新好的商品数量存入缓存
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeGoods(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 删除好的商品存入缓存
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateSelected(state, info) {
      state.car.some(item => {
        if(item.id == info.id) {
          item.selected = info.selected
          return true
        }
      })
      // 更新好选择状态存入缓存
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    // 统计购物车的商品数量在徽标展示
    getNumber(state) {
      let c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    // 统计购物车的商品数量
    getGoodsCount(state) {
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getAmount(state) {
      let o = {
        count: 0, //勾选的商品数
        amount: 0, //勾选的商品总价
      }
      state.car.forEach(item => {
        if(item.selected) {
          o.count += item.count
          o.amount = item.count * item.price
        }
      })
      return o
    }
  }
})
// 引入根组件
import app from './App.vue'
// 按需引入MintUI(按需导入无法使用lazyload的加载样式)
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload) //无法使用按需导入操作
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI)
// 引入mui
import './lib/mui/css/mui.min.css'
import './lib/mui/fonts/mui-icons-extra.ttf'
import './lib/mui/css/icons-extra(1).css'
// 引入resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 引入请求的全局根路径
// Vue.http.options.root = 'http://localhost:5000'
Vue.http.options.emulateJSON = true

// 全局日期过滤器
import moment from 'moment'
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern)
})

// vue-preview 图片略缩图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 实例vue
new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})