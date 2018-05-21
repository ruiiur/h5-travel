import { webSocketUrl } from './env'

var start = function (f7) {
    try {
        let wsImpl = window.WebSocket || window.MozWebSocket;
        let ws = new wsImpl(webSocketUrl);
        ws.onopen = function (r) {
            console.log('连接Websocket[onopen]', r.returnValue);
        };
        ws.onmessage = function (r) {
            console.log('连接Websocket[onmessage]', r.data);
            f7.addNotification({
                title: '消息推送',
                subtitle: r.data,
                onClose: function () { }
            });
        };
        ws.onclose = function () {

        };
        return ws;
    } catch (err) {
        console.log('Socket服务器连接失败');
        return null;
    }
};
export default {
    install: function (Vue, f7) {
        Vue.prototype.ws = start(f7);
    }
}