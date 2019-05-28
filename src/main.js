import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$http = axios;

router.afterEach((to) => {
  // 无论你跳转至哪个页面,只要没登录,回到登录页面
  let isLogin = store.state.login
  let isAdminLogin = store.state.adminLogin;
  let isNeedToReg = store.state.register
  if (to.name !== 'Login') //未登录状态
  {
    // 跳转至登录页面
    //判断是否登陆而且是否需要注册
    if (!isLogin && !isNeedToReg && !isAdminLogin) {
      router.replace({
        name: 'Login'
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')