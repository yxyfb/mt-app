import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1, //1.就是到了才加载，1点几甚至更高就是还没到就开始加载
  attempt: 2 //尝试加载几次
})
