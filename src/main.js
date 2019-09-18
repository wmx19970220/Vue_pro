import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import https from './utils/https'
import routerGlobal from './router/router_global'
import axios from 'axios'
import store from './store/index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$https = https
routerGlobal.init();

Vue.use(iView)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')