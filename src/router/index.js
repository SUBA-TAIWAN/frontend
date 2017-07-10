import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => require(['@/views/Index.vue'], resolve)

const Page = resolve => require(['@/views/Page.vue'], resolve)

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
      path: '/page/:title',
      name: 'page',
      component: Page
    }, {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
