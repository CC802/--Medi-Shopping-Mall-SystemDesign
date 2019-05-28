import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.prototype.$http = axios;

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
           notice: '【通知】新疆区域由于交通管制无法正常发货，恢复时间待定',
           tags: ['美的集团唯一官方商城', '全场包邮/全国联保', '微信/支付宝快捷支付', '7天无理由退换货'],
           img: [
                   '/img/1.jpg',
                   '/img/2.jpg',
                   '/img/3.jpg',
                   '/img/4.jpg'
               ],
           admin:{
              adminName:"vccc",
              id:"10021",
              login:false,
           },
           hotdata: [],
           newdata: [],
           myGoodsList:[],
           username:'',
           address:'',
           money:0,
           login:false,
           adminLogin:false,
           register:false
    },
    mutations: {
        gethotdata(state, params) {
                    console.log(params);
                    state.hotdata = params
                  },
        getnewdata(state,params){
                state.newdata = params;
                console.log(state.newdata);
        },
        getuserdata(state,params)
        {
            console.log(params);
            var userdata = params[0].filter(item =>{
                  return item.username === params[1];
            })
            console.log(userdata);
            state.username = userdata[0].username;
            state.address = userdata[0].address;
            state.money = userdata[0].money;

        },
        pushToMyList(state,array)
        {
            state.myGoodsList.push(array);
          // console.log(state.myGoodsList);
        },
        deleteMyGoods(state,index)
        {
          let arr = state.myGoodsList;
          arr.splice(index,1);
          state.myGoodsList = arr;
          // console.log(state.myGoodsList);
        },
        clearMyGoodList(state)
        {
          state.myGoodsList = [];
        },
        updateMoney(state,money)
        {
          state.money = money;
          console.log(state.money);
        }
    },
    actions:{
        getHotData(context) {
                    axios.get("/localApi/hotData")
                      .then(res => {
                        context.commit('gethotdata', res.data.data)
                      })
                  },
          getNewData(context)
          {
                axios.get("/localApi/newData").then(res =>{
                  context.commit('getnewdata',res.data.data)
                })
          },
          getUserData(context,name)
          {
               axios.get("/api/getUser").then(res=>{
                 context.commit('getuserdata',[res.data,name]);
               })
          }

    }
})
