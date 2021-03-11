import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/axios'
import './plugins/veevalidate'
import './plugins/vuecurrencyfilter'
import './plugins/vuemoment'
import VuetifyConfirm from 'vuetify-confirm'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API
// axios.defaults.baseURL = 'http://20.198.248.36:3000/'


Vue.use(VuetifyConfirm, { vuetify })
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')
