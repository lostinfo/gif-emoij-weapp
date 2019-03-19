import Vue from 'vue'
import App from './App'
import store from './store'

import fly from './utils/fly'
Vue.prototype.$http = fly

import './style/base.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
