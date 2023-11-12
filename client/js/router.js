import { createRouter, createWebHistory } from 'vue-router'

import test from 'Components@/test.vue'
import another from 'Components@/another.vue'
import Users from 'Components@/users.vue'

const routes = [
    {
        path: '/',
        component: test
    },
    {
        path: '/users',
        component: Users
    },
    {
        path: '/another',
        component: another
    },
    {
        path: '/:pathMatch(.*)*',
        component: another
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})