import { createApp, h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import VueResource from 'vue-resource'

import routes from './routes.js'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import App from './components/App.vue'

// apollo client
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

// vue router
const router = createRouter({
    history: createWebHistory(),
    routes
})

// vuex store
const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state){
            state.count++
        }
    }
})

// vue app
const app = createApp({
    render: () => h(App)
})

app.use(router)
app.use(store)
app.use(VueResource)
app.use(apolloProvider)
app.mount('#app')