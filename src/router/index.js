import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => require(['@/views/Index.vue'], resolve)

const Page = resolve => require(['@/views/Page.vue'], resolve)

const Category = resolve => require(['@/views/Category.vue'], resolve)

const News = resolve => require(['@/views/News.vue'], resolve)

const Donate = resolve => require(['@/views/Donate.vue'], resolve)

const Res = resolve => require(['@/views/Res.vue'], resolve)

const Error = resolve => require(['@/views/Error.vue'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
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
      path: '/category/:title',
      name: 'category',
      component: Category
    }, {
      path: '/news/:title',
      name: 'news',
      component: News
    }, {
      path: '/donate',
      name: 'donate',
      component: Donate
    }, {
      path: '/res',
      name: 'res',
      component: Res
    }, {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
