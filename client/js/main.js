import { createApp, h } from 'vue'
import VueResource from 'vue-resource'
import { createRouter, createMemoryHistory } from 'vue-router'

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
    history: createMemoryHistory(),
    routes
})

// vue app
const app = createApp({
    render: () => h(App)
})

app.use(router)
app.use(VueResource)
app.use(apolloProvider)
app.mount('#app')