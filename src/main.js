import Vue from 'vue'
import iView from 'iview'
import { mapState, mapActions } from 'vuex'
import store from './store/index'

import router from './router'
import tools from './common/tools'
import Device from '@/common/device'

import 'iview/dist/styles/iview.css';
import './assets/css/base.scss'
//引入一些公用的
import './assets/css/mixin.scss'
import './assets/css/common.scss'

import VueI18n from 'vue-i18n';
import Locales from './locale/index';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';


// import Vue from 'vue'
// import {Validator} from 'vee-validate'
// import zh from 'vee-validate/dist/locale/zh_CN';//引入中文文件

// import  {VeeValidate } from 'vee-validate';
// import messages from 'assets/js/zh_CN';
// Validator.updateDictionary({
//     zh_CN: {
//         messages
//     }
// });
// const config = {
//     errorBagName: 'errors', // change if property conflicts.
//     delay: 0,
//     locale: 'zh_CN',
//     messages: null,
//     strict: true
// };
// Vue.use(VeeValidate,config);

// 引入mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'; 


// 引入日期插件
// import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
// import vueEventCalendar from 'vue-event-calendar'
// Vue.use(vueEventCalendar, {locale: 'zh'}) //可以设置语言，支持中文和英文

//引入rem.js
import Rem from './common/rem'

//引入图表
import IEcharts from 'vue-echarts-v3';
// 引入iview
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(IEcharts);
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.locale(lang, function () {
    require('@/locale/lang/' + lang + '.js')
    return fetch('./locale/lang/' + lang + '.js', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json()
    }).then(function (json) {
        if (Object.keys(json).length === 0) {
            return Promise.reject(new Error('locale empty !!'))
        } else {
            return Promise.resolve(json)
        }
    }).catch(function (error) {
        return Promise.reject()
    })
}, function () {
    Vue.config.lang = lang
});

// 多语言配置
// const locales = Locales;
// const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
// const mergeEN = Object.assign(enLocale, locales['en-US']);
// Vue.locale('zh-CN', mergeZH);
// Vue.locale('en-US', mergeEN);

// 路由切换前处理
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    let title = '事达国旅';
    to.matched.forEach((path) => {
        if (path.meta.title) {
            title = `${path.meta.title}`;
        }
    });
    document.title = title;
    next();
});
// 路由切换后
router.afterEach((to, from) => {
    iView.LoadingBar.finish();
});
new Vue({
    el: '#app',
    router: router,
    store: store,
    beforeUpdate: function () {
        // let user = JSON.parse(tools.getLocalStorage('USER'));
        // this.$store.dispatch('setUserInfo', user);
    }
});
