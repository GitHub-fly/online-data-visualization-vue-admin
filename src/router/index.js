/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-05-18 21:10:09
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index/Index.vue'
import Login from '../views/User/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // redirect: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/index',
        name: 'Index',
        component: Index,
        children: [
            {
                path: '/',
                redirect: 'addAdmin'
            },
            {
                path: 'addAdmin',
                name: 'AddAdmin',
                component: () => import('../views/User/AddAdmin.vue')
            },
            {
                path: 'updateUser',
                name: 'UpdateUser',
                component: () => import('../views/User/UpdateUser.vue')
            },
            {
                path: 'dataType',
                name: 'DataType',
                component: () => import('../views/System/DataType.vue')
            },
            {
                path: 'userDataInfo',
                name: 'UserDataInfo',
                component: () => import('../views/System/UserDataInfo.vue')
            },
            {
                path: 'userDataInfo',
                name: 'UserDataInfo',
                component: () => import('../views/System/UserDataInfo.vue')
            },
            {
                path: 'dataIndex',
                name: 'DataIndex',
                component: () => import('../views/Data/DataIndex.vue')
            }
        ]
    },
    {
        path: '/addAdmin',
        name: 'AddAdmin',
        component: () => import('../views/User/AddAdmin.vue'),
    },

]

const router = new VueRouter({
    routes,
})

export default router
