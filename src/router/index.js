import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
const Error = resolve => require(['@/views/Error.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
