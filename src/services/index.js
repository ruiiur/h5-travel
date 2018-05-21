import fetch from '../common/fetch'

// export const getTestData = (id) => fetch('/users/whatever', 'get', {
// 	client_id: '',
// 	client_secret: ''
// });

//获取首页列表
export const getHomeList = (params) => fetch({
	'url': '/list/productlist',
	'method': 'post',
	'data': params,
	'accredit': true
});
// 首页产品类型
export const getProductType = (params) => fetch({
	'url': '/list/producttype',
	'method': 'get',
	'params': params,
	'accredit': true
});
//获取详情
export const getDetail = (params) => fetch({
	'url': '/detail/'+params,
	'method': 'post',
	// 'params': params,
	'accredit': true
});
// 价格列表
export const getPriceList = (params) => fetch({
	'url': '/priceList',
	// 'url': '/priceList/'+id+'/'+params,
	'method': 'post',
	'data': params,
	'accredit': true
});
// 日历
export const getTourList = (params) => fetch({
	'url': '/tourList/'+params,
	'method': 'post',
	// 'data': params,
	'accredit': true
});

// 机票相关信息
export const getMessage = (params) => fetch({
	'url': '/getMessage',
	'method': 'post',
	'data': params,
	'accredit': true
});

// 出发地接口
export const getDeparture = (params) => fetch({
	'url': '/getDeparture/'+params,
	'method': 'post',
	// 'data': params,
	'accredit': true
});

// 添加旅客信息
export const addOrderInfo = (params) => fetch({
	'url': '/addOrderInfo',
	'method': 'post',
	'data': params,
	'accredit': true
});

//验证信息接口
export const validateInfo = (params) => fetch({
	'url': '/validate',
	'method': 'post',
	'data': params,
	'accredit': true
});

