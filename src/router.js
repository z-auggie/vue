import VueRouter from 'vue-router'
// 引入组件
import home from './components/tabbar/HomeContainer.vue'
import member from './components/tabbar/MemberContainer.vue'
import search from './components/tabbar/SearchContainer.vue'
import shopcar from './components/tabbar/ShopcarContainer.vue'
// 创建路由
const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: home},
    {path: '/member', component: member},
    {path: '/search', component: search},
    {path: '/shopcar', component: shopcar}
  ],
  // 路由链接被选中高亮
  linkActiveClass: 'mui-active'
})
// 暴露路由
export default router