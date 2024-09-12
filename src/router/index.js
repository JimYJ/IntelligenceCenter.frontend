import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import InfoDetail from '../components/InfoDetail.vue'

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/pet1',
        name: 'InfoDetail',
        component: InfoDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router