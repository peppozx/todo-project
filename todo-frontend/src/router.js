const { default: VueRouter } = require("vue-router");

import Signin from './components/Signin.vue';
import Signup from './components/Signup.vue';

const routes = [
    {
        path: '/signin', component: Signin,
    },
    {
        path: '/signup', component: Signup,
    }
]

const router = new VueRouter({
    routes,
});

export default router;