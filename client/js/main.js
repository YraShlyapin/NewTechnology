import { createApp, h } from 'vue'
import VueResource from 'vue-resource'

import router from './router.js'
import store from './vuex.js'
import apolloProvider from './apolloClient.js'

import App from './components/App.vue'

// vue app
const app = createApp({
    render: () => h(App)
})

app.use(router)
app.use(store)
app.use(VueResource)
app.use(apolloProvider)
app.mount('#app')