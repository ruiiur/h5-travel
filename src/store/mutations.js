import {
	GET_TESTDATA,
	FETCH_LOADING,
	SET_USERINFO
} from './mutation-types'

export default {
	//测试信息存入vuex
	[GET_TESTDATA](state, data) {
		state.testData = data;
	},
	[FETCH_LOADING](state, data) {
		state.fetchLoading = data;
	},
	[SET_USERINFO](state,data){
		state.userInfo = data;
	}
}