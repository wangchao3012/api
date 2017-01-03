
const md5 = require('md5');
const config = require('config');
var tool = function (obj) {
    return new tool.prototype.init(obj);
}
tool.signJoin = function (obj, token) {
    // 生成加密 
    let content = '';
    for (var key of Object.keys(obj).sort()) {
        let value = obj[key];
        key != 'si' && value != undefined && value != null && value !== '' && (content += key + value)
    }
    return content;

    // keys = keys.sort(function (a, b) {
    //     return a.toLowerCase() > b.toLowerCase() ? 1 : -1
    // }); 
};
tool.checkSign = function (obj, token) {

    return obj.sign == md5(this.signJoin(obj, token))
}
tool.createPassword = function (pwd, salt) {
    return md5(config.app.defaultPwdSalt + pwd + salt);
}
tool.prototype = {
    init: function (obj) {
        this.obj = obj;
    },
    isNull: function (msg) {
        if (!!this.obj) {
            throw msg;
        }
        return this;
    },
    notNull: function (msg) {
        if (!this.obj) {
            throw msg;
        }
        return this;
    },
    isTrue: function (msg) {
        if (!this.obj) {
            throw msg;
        }
        return this;
    },
    isFalse: function (msg) {
        if (this.obj) {
            throw msg;
        }
        return this;
    },
}
tool.prototype.init.prototype = tool.prototype;

module.exports = tool;