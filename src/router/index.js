import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => require(['@/views/Index.vue'], resolve)

const Error = resolve => require(['@/views/Error.vue'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
