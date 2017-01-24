export function configureRouter (router) {
    var appName = '財團法人東吳企管文教基金會';
    router.mode = 'html5';
    router.map({
        '*': {
            component: require('./components/subaerror.vue'),
        },
        '/': {
            component: require('./components/subaindex.vue'),
        },
        '/index': {
            name: 'home',
            component: require('./components/subaindex.vue'),
        },
        '/page/:title': {
            name: 'page',
            component: require('./components/subapage.vue'),
        },
        '/category/:title': {
            name: 'category',
            component: require('./components/subacategory.vue'),
        },
        '/news/:title': {
            name: 'news',
            component: require('./components/subanews.vue'),
        }
    });
    router.beforeEach(function (transition) {
        if (transition.to.params === undefined) {
            transition.abort();
        } else {
            transition.next();
        }
    });
    router.afterEach(function (transition) {
        if (Object.getOwnPropertyNames(transition.to.params).length !== 0) {
            document.title = transition.to.params.title+' | '+appName;
        } else {
            document.title = appName;
        }
        ga('send', 'pageview');
    });
}