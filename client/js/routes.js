import test from 'Components@/test.vue'
import another from 'Components@/another.vue'

export default [
    {
        path: '/',
        component: test
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