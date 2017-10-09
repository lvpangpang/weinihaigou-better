"use strict";
(function() {

    // 控制根字体大小
    let winWidth = document.body.clientWidth;
    if ( winWidth > 640 ) {
        winWidth = 640;
    }
    document.querySelector('html').style.fontSize = winWidth/640 * 24 + 'px';
    window.addEventListener('orientationchange', function(event){
        winWidth = document.body.clientWidth;
        if ( winWidth > 640 ) {
            winWidth = 640;
        }
        document.querySelector('html').style.fontSize = winWidth/640 * 24 + 'px';
    });

})();

const commonMthods = {
    checkIsWx() {
        let ua = navigator.userAgent.toLowerCase();
        if( ua.match(/MicroMessenger/i)==="micromessenger" ) {
            return true;
        }
        return false;
    },

    getUrlPram : function(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
            r = window.location.search.substr(1).match(reg);
        if(r!=null) {
            return  decodeURI(r[2]);
        }
        return null;
    },

    format : function(time) {
        var date = new Date(time);
        function two(day) {
            if( day<10 ) {
                return '0' + day;
            }
            return day;
        }
        return  date.getFullYear()+ '-' + two(date.getMonth()+1) + '-' +
        two(date.getDate());
    },

    testPhone : function(phone) {
        return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test( phone );
    },

    testPwd : function(pwd) {
        return /^\w{6,20}$/.test(pwd);
    },

    testVerifyCard : function(cardId) {
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(cardId);
    },
    // 设置Cookie
    setCookie : function(name, value) {
        var Days = .5;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + "; path=/";
    },

    // 获取Cookie
    getCookie : function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
        }
        return "";
    },

    // 删除Cookie
    delCookie : function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval= commonMthods.getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },

    toFixed : function(num, s) {
        var times = Math.pow(10, s),
            des = num * times + 0.5;
        des = parseInt(des, 10) / times;
        return des;
    }

};
export default commonMthods;