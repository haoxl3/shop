import {
    createRouter,
    createWebHashHistory
} from 'vue-router';

import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/product',
        name: 'product',
        component: () => import('../views/Product.vue')
    },
    {
        path: '/scene',
        name: 'scene',
        component: () => import('../views/Scene.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;