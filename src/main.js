// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import config from './config'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: config.API_BASE_URL
})

if (!window.ga) {
  require('./social')()
}

const APP_NAME = '財團法人東吳企管文教基金會'

// router.beforeEach(function (transition) {
//   transition.next()
// })

router.afterEach(function (transition) {
  var properties = Object.getOwnPropertyNames(transition.params)

  if (properties.length > 0 && properties.indexOf('title') >= 0) {
    document.title = `${transition.params.title} | ${APP_NAME}`
  } else {
    document.title = APP_NAME
  }
  if (window.ga) {
    window.ga('send', 'pageview')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
