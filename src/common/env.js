let baseUrl = '';
let routerMode = '';
let webSocketUrl = 'ws://192.168.1.72:8898';
// let apiUrl = window.location.origin;
let apiUrl = 'http://192.168.0.31:8081';
let isApp = false;

if (process.env.NODE_ENV == 'development') {
	isApp = false;
} else if (process.env.NODE_ENV == 'h5') {
	isApp = true;
	apiUrl = 'http://192.168.0.60:8081';
} else if (process.env.NODE_ENV == 'app') {
	isApp = true;
	apiUrl = 'http://192.168.1.72:8082';
}

export {
	baseUrl,
	routerMode,
	webSocketUrl,
	apiUrl,
	isApp
}