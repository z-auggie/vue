import Vue from 'vue'
// 引入路由文件
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter)
// 引入根组件
import app from './App.vue'
// 按需引入MintUI(按需导入无法使用lazyload的加载样式)
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)
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
Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern)
})

// vue-preview 图片略缩图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 实例vue
new Vue({
  el: '#app',
  render: c => c(app),
  router
})

