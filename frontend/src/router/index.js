import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Employees Route
 */
import Employee from '../views/Employees'
import Add from '../views/Employees/add'
import Edit from '../views/Employees/edit'
import Detail from '../views/Employees/detail'
import Delete from '../views/Employees/delete'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Employee
    },
    {
        path: '/add',
        component: Add
    },

    {
        path: '/edit/:id',
        component: Edit,
        name: 'employeeEdit',
        props: true
    },
    {
        path: '/detail/:id',
        component: Detail,
        name: 'employeeDetail',
        props: true
    },
    {
        path: '/delete/:id',
        component: Delete,
        name: 'employeeDelete',
        props: true
    },
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
