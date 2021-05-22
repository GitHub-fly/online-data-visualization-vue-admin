import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './util/Global.vue'
import global from './util/Global.vue'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')
