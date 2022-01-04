import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Element from 'element-ui'
import './bootstrap'

Vue.config.productionTip = false

Vue.use(Element)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
