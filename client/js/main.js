import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import routes from './routes.js'

import App from './components/App.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

const httpLink = createHttpLink({
    uri: 'http://localhost:80/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

Vue.use(apolloProvider)

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior (to, from, sacedPosition){
        return { x: 0, y: 0 }
    }
})

let app = new Vue({
    el: '#app',
    router,
    render: (a) => {
        return a(App)
    }
})
