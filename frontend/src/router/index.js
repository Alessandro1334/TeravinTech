import Vue from 'vue'
import VueRouter from 'vue-router'


/**
 * Users Route
 */
import User from '../views/Users'
import Add from '../views/Users/add'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: User
    },
    {
        path: '/add',
        component: Add
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login', '/register'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');

//     if (authRequired && !loggedIn) {
//         return next('/login');
//     }

//     next();
// })

export default router
