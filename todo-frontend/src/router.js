const { default: VueRouter } = require("vue-router");

import Signin from './components/Signin.vue';
import Signup from './components/Signup.vue';
import Home from './components/home/Home.vue';

const routes = [
    {
        path: '/signin', component: Signin,
    },
    {
        path: '/signup', component: Signup,
    },
    {
        path: '/home', component: Home,
    }
]

const router = new VueRouter({
    routes,
});

export default router;