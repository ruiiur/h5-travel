import { isApp } from './env'
let device = {};
if (isApp) {
    var destinationType;

    document.addEventListener("deviceready", onDeviceReady, false);

    //Cordova加载完成会触发
    function onDeviceReady() {
        destinationType = navigator.camera.DestinationType;
    }

    //拍照
    function capturePhoto() {
        //拍照并获取Base64编码的图像（quality : 存储图像的质量，范围是[0,100]）
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
            quality: 50,
            destinationType: destinationType.DATA_URL
        }
        );
    }

    //拍照成功
    function onPhotoDataSuccess(imageData) {
        console.log(imageData);
        // var smallImage = document.getElementById('smallImage');
        // smallImage.style.display = 'block';
        // smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    //拍照失败
    function onFail(message) {
        alert('拍照失败: ' + message);
    }

    function getCurrentPosition() {
        //定位数据获取成功响应
        var onSuccess = function (position) {
            alert('纬度: ' + position.coords.latitude + '\n' +
                '经度: ' + position.coords.longitude + '\n' +
                '海拔: ' + position.coords.altitude + '\n' +
                '水平精度: ' + position.coords.accuracy + '\n' +
                '垂直精度: ' + position.coords.altitudeAccuracy + '\n' +
                '方向: ' + position.coords.heading + '\n' +
                '速度: ' + position.coords.speed + '\n' +
                '时间戳: ' + position.timestamp + '\n');
        };

        //定位数据获取失败响应
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        //开始获取定位数据
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    function showStatusBar(color) {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString(color);
        StatusBar.show();
    }

    function hideStatusBar(color) {
        StatusBar.hide();
    }

    function setStatusBarTransparent() {
        StatusBar.overlaysWebView(true);
    }

    function getContacts() {
        var options = new ContactFindOptions();
        var fields = ["displayName", "phoneNumbers"];
        options.filter = "";
        options.multiple = true;
        options.hasPhoneNumber = true;

        navigator.contacts.find(fields, function (contacts) {
            getContactsSuccess(contacts);

        }, function onError(contactError) {
            alert(contactError);
        }, options);
    }

    function getContactsSuccess(contacts) {
        var contactsLength = contacts.length;
        alert("读取手机联系人" + contactsLength + "个");
    }

    device = {
        capturePhoto,
        getCurrentPosition,
        showStatusBar,
        hideStatusBar,
        setStatusBarTransparent,
        getContacts
    };
} else {
    device = {
        capturePhoto: () => { },
        getCurrentPosition: () => { },
        showStatusBar: () => { },
        hideStatusBar: () => { },
        setStatusBarTransparent: () => { }
    };
}
export default device
