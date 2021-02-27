const { default: VueRouter } = require("vue-router");

import Login from './components/Login.vue';

const routes = [
    {
        path: '/signin', component: Login,
    },
]

const router = new VueRouter({
    routes,
});

export default router;