import axios from 'axios'
import tools from '../common/tools'
import { apiUrl } from './env'
// axios 全局配置
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = apiUrl;
// axios.defaults.baseURL = 'http://192.168.0.212:8081';
// axios.defaults.baseURL = 'http://localhost:8080';
// 配置 CORS 跨域
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

// 请求时拦截
axios.interceptors.request.use((config) => {
	//发送请求
	console.log("开始请求");
	// if (config.accredit === true) {
	// 	let user = tools.getLocalStorage('USER') && JSON.parse(tools.getLocalStorage('USER'));
	// 	let token = '';
	// 	if (user) {
	// 		token = user.access_token;
	// 	}
	// 	config.headers.Authorization = 'Bearer ' + token;
	// }
	console.log(config);
	return config;
}, (error) => {
	return Promise.reject(error);
});

// 响应时拦截
axios.interceptors.response.use((response) => {
	return response.data;
}, (err) => {
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '请求错误'
				break
			case 401:
				err.message = '未授权，请登录'
				break
			case 403:
				err.message = '拒绝访问'
				break
			case 404:
				err.message = `请求地址出错: ${err.response.config.url}`
				break
			case 408:
				err.message = '请求超时'
				break
			case 500:
				err.message = '服务器内部错误'
				break
			case 501:
				err.message = '服务未实现'
				break
			case 502:
				err.message = '网关错误'
				break
			case 503:
				err.message = '服务不可用'
				break
			case 504:
				err.message = '网关超时'
				break
			case 505:
				err.message = 'HTTP版本不受支持'
				break
			default:
				err.message = '请求API异常'
				break
		}
	}
	return Promise.reject(err)
});

export default axios;
