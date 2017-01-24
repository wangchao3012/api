
const Tool = require('../../common/tool');
const Cache = require('../../common/cache');
const uuid = require('uuid/v4');
const rp = require('request-promise');

const sms = require('../../common/sms');
const ccap = require('ccap');
const moment = require('moment');


var sysService = {
    captcha: async function (d, cr) {
        let verCode = Math.random().toString().substr(2, 4);
        await Cache.set(Cache.keys(Cache.key.imgVerCode, cr.sn), verCode, 30);
        let data = ccap({
            width: 100,
            height: 40,
            offset: 22,
            quality: 10,
            fontsize: 30,
            generate: function () {
                return verCode;
            }
        }).get();
        return data[1];
    },
    sendSMS: async function (d, cr) {
        let imgVerCode = await Cache.get(Cache.keys(Cache.key.imgVerCode, cr.sn));
        Tool().isTrue(imgVerCode == d.verCode, '图片验证码不正确');
        let verCode = await Cache.get(Cache.keys(Cache.key.smsVerCode, cr.sn), () => {
            return Math.random().toString().substr(2, 4);
        }, moment().add(30, 'minutes'));
        await sms.sendSMS({ mobile: d.mobile, content: `【上海黑摩】${verCode} 注册验证码`, batchId: d.mobile })  
    }
}
module.exports = sysService;