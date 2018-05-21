import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import { routerMode } from './common/env'

Vue.use(VueRouter)
// 这是首页
const home = r => require.ensure([], () => r(require('@/pages/home/home.vue')), 'home')
// 这是分类页面
const classification = r => require.ensure([], () => r(require('@/pages/classification/classification.vue')), 'classification')
// 这是订单中心页面
const orderCenter = r => require.ensure([], () => r(require('@/pages/order/order-center.vue')), 'orderCenter')
// 这是个人中心页面
const personalCenter = r => require.ensure([], () => r(require('@/pages/personal/personal-center.vue')), 'personalCenter')
// 这是详情页面
const details = r => require.ensure([], () => r(require('@/pages/details/details.vue')), 'details')
// 这是支付页面
const pay = r => require.ensure([], () => r(require('@/pages/details/pay.vue')), 'pay')
// 这是团期选择页面
const groupSelection = r => require.ensure([], () => r(require('@/pages/details/group-selection.vue')), 'groupSelection')
// 这是订单核对页面
const orderCheck = r => require.ensure([], () => r(require('@/pages/details/order-check.vue')), 'orderCheck')
// 这是信息填写页面
const fillInformation = r => require.ensure([], () => r(require('@/pages/details/fill-information.vue')), 'fillInformation')
// 这是搜索列表页面
const searchList = r => require.ensure([], () => r(require('@/pages/home/search-list.vue')), 'searchList')

const router = new VueRouter({
    mode: routerMode,
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: home,
        },
        {
            path: '/classification',
            meta: {
                title: '分类'
            },
            component: classification,
        },
        {
            path: '/order-center',
            meta: {
                title: '订单中心'
            },
            component: orderCenter,
        },
        {
            path: '/personal-center',
            meta: {
                title: '个人中心'
            },
            component: personalCenter,
        },
        {
            path: '/details/:id',
            meta: {
                title: '详情'
            },
            component: details,
        },
        {
            path: '/group-selection',
            meta: {
                title: '团期选择',
                keepAlive: true  
            },
            component: groupSelection,
        },
        {
            path: '/order-check',
            meta: {
                title: '订单核对'
            },
            component: orderCheck,
        },
        {
            path: '/fill-information',
            meta: {
                title: '填写信息'
            },
            component: fillInformation,
        },
        {
            path: '/pay',
            meta: {
                title: '支付'
            },
            component: pay,
        },
        {
            path: '/search-list',
            meta: {
                title: '搜索'
            },
            component: searchList,
        },
    ]
});

export default router
