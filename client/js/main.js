import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import routes from './routes.js'

import App from './components/App.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, sacedPosition){
        return { x: 0, y: 0 }
    }
})

new Vue({
    el: '#app',
    router,
    render: (a) => {
        return a(App)
    }
})
