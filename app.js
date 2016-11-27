import Vue from 'vue'

import VueRouter from 'vue-router'

import VueResource from 'vue-resource'

import VueCookie from 'vue-cookie'

import {configureRouter} from './router-config.js'

import suba from './components/App.vue'

Vue.config.debug = false;
Vue.config.silent = true;
Vue.config.devtools = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueCookie);
Vue.http.options.root = 'https://www.suba.org.tw';

const router = new VueRouter({
        hashbang: false,
        history: true,
        root: '',
        linkActiveClass: 'active',
        transitionOnLoad: true
    });
const app = Vue.extend(suba);

configureRouter(router);
router.start(app, '#suba');