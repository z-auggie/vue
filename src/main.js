import Vue from 'vue'

import app from './App.vue'

import router from './router.js'
Vue.use(router)

import { Header} from 'mint-ui'
Vue.component(Header.name, Header)
import 'mint-ui/lib/style.min.css'

import './lib/mui/css/mui.min.css'

new Vue({
  el: '#app',
  render: c => c(app)
})

