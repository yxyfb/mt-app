import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'
import product from './modules/product'

Vue.use(Vuex)

export default {
  modules: {
    geo,
    home,
    product
  },
  actions: {
    async nuxtServerInit({ //nuxt生命周期，服务器初始化时触发
      commit
    }, {
      req,
      app
    }) {
      //-------------------城市位置
      const {
        status,
        data: {
          province,
          city
        }
      } = await app.$axios.get('/geo/getPosition'); //从接口获取到值

      commit('setPosition', status === 200 ? { //提交到vuex
        city,
        province
      } : {
        city: '',
        province: ''
      })


      //-------------------menu------
      const {
        status: status1,
        data: {
          menu
        }
      } = await app.$axios.get('/geo/menu'); //从接口获取到值
      commit('setMenu', status1 === 200 ? menu : [])


      //---------------hotPlace----------
      const {
        status: status2,
        data: {
          result
        }
      } = await app.$axios.get('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      });
      commit('setHotPlace', status2 === 200 ? result : [])

    }
  }
}
