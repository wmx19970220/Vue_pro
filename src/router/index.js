import Vue from 'vue'

import VueRouter from 'vue-router'

import Home from '../pages/home'
import Edit from '../pages/edit'
import Error from '../pages/error'
import Charts from '../pages/charts'
import Add_the_shop from '../pages/add_the_shop'
import Mine from '../pages/mine'
import Login from '../pages/mine/login'
import Users from '../pages/users'
import Register from '../pages/mine/register'
import ShopList from '../pages/shoplist'
import Modify from '../pages/shoplist/modify'
import Admin from '../pages/admin'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/mine/login'
    }, {
        path: '/mine',
        redirect: '/mine/login'
    }, {
        path: '/admin',
        component: Admin,
        name: 'admin'
    }, {
        path: '/home',
        component: Home,
        name: 'home'
    },
    {
        path: '/edit',
        component: Edit
    },
    {
        path: '/charts',
        component: Charts,
        name: 'charts'
    },
    {
        path: '/add_the_shop',
        component: Add_the_shop
    },
    {
        path: '/mine',
        component: Mine,
        children: [{
            path: 'login',
            component: Login,
            name: 'login'
        }, {
            path: 'register',
            component: Register,
            name: 'register'
        }]
    },
    {
        path: '/users',
        component: Users
    },
    {
        path: '/shoplist',
        component: ShopList,
        name: 'shoplist',
        children: [{
            path: 'modify',
            component: Modify,
            name: 'modify'
        }]
    },
    {
        path: '*',
        component: Error
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router