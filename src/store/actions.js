// import { getTestData } from '../services/home'

// export const increment = ({ commit }) => commit("increment")
// export const decrement = ({ commit }) => commit("decrement")
//http://localhost:8082/auth/oauth2/selftoken?username=33893.13554282399&password=123456&usertype=3
import { getHomeList,getProductType,getDetail,getPriceList,getTourList,getMessage,getDeparture,addOrderInfo,validateInfo } from '../services/index'
import {
    GET_TESTDATA,
    FETCH_LOADING,
    SET_USERINFO
} from './mutation-types.js'

export default {
    // 测试一下
    increment(context) {
        context.commit("INCREMENT");
    },
    decrement({ commit }) {
        commit("DECREMENT")
    },
    FetchLoading({ commit }, params) {
        commit(FETCH_LOADING, params)
    },
    setUserInfo({ commit }, params) {
        commit(SET_USERINFO, params);
    },
     // 获取首页列表
     async getHomeList({ commit }, params) {
        let res = await getHomeList(params);
        return res;
    },
    // 获取首页产品类型
    async getProductType({ commit }, params) {
        let res = await getProductType(params);
        return res;
    },
    //获取详情
    async getDetail({ commit }, params) {
        let res = await getDetail(params);
        return res;
    },
    //获取价格列表
    async getPriceList({ commit }, params) {
        let res = await getPriceList(params);
        return res;
    },
    //日历
    async getTourList({ commit }, params) {
        let res = await getTourList(params);
        return res;
    },
    //机票
    async getMessage({ commit }, params) {
        let res = await getMessage(params);
        return res;
    },
    // 出发地
    async  getDeparture({ commit }, params) {
        let res = await  getDeparture(params);
        return res;
    },
     // 添加旅客信息
     async  addOrderInfo({ commit }, params) {
        let res = await  addOrderInfo(params);
        return res;
    },
    //验证信息
    async  validateInfo({ commit }, params) {
        let res = await  validateInfo(params);
        return res;
    },
}