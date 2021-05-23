/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-22 15:14:40
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './util/Global.vue'
import global from './util/Global.vue'
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global

Vue.use(VCharts)
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')
