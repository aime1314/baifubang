import Vue from 'vue'
import App from './App'
import api from '@/common/utils/api'
import util from '@/common/util'

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.util = util

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
