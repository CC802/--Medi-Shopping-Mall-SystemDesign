import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from './views/homepage/Home'
import One from './views/homepage/One'
import Two from './views/homepage/Two'
import MyOrderList from './views/homepage/MyOrderList'
import Admin from './views/adminpage/Admin'
import AdminOne from './views/adminpage/AdminOne'
import AdminTwo from './views/adminpage/AdminTwo'
import MygoodsList from './views/MygoodsList'
import AdminOrderlist from './views/adminpage/AdminOrderlist'
import AdminOlFinish from './views/adminpage/AdminOlFinish'
import AdminOlArrive from './views/adminpage/AdminOlArrive'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
          path: 'one',
          name: 'One',
          component: One,

        },
        {
          path: 'two',
          name: 'Two',
          component: Two,

        },
        {
          path: 'mygoodsList',
          name: 'MygoodsList',
          component: MygoodsList
        },
        {
          path: 'myorderList',
          name: 'MyOrderList',
          component: MyOrderList
        }

      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [{
          path: 'adminone',
          name: 'AdminOne',
          component: AdminOne,
        },
        {
          path: 'admintwo',
          name: 'AdminTwo',
          component: AdminTwo
        },
        {
            path: 'adminorderlist',
            name: 'AdminOrderlist',
            component: AdminOrderlist
        },
        {
          path: 'adminolfinish',
          name: 'AdminOlFinish',
          component: AdminOlFinish
        },
        {
          path: 'adminolarrive',
          name: 'AdminOlArrive',
          component: AdminOlArrive
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/goodsdetails',
      name: 'Goodsdetails',
      component: () => import( /* webpackChunkName: "about" */ './views/Goodsdetails.vue')
    },
    {
      path: '/paypage',
      name: 'PayPage',
      component: () => import( /* webpackChunkName: "about" */ './views/PayPage.vue')
    }
  ]
})