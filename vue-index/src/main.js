require("es6-promise").polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import {Lazyload, Toast} from 'vant'
import 'lib-flexible/flexible'
import 'common/css/iconfont.css'
import './permission'
import './error'
fastclick.attach(document.body)

Vue.use(Lazyload, {
    loading: require('common/img/images/img_load.png'),
    error: require('common/img/images/img_fail.png')
})

Vue.use(Toast)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
