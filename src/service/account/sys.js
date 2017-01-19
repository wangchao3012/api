
const Tool = require('../../common/tool');
const Cache = require('../../common/cache');
const uuid = require('uuid/v4');
const tasl = require('../../common/task');
const rp = require('request-promise');

const sms = require('../../common/sms');
const ccap = require('ccap');

var sysService = {
    captcha: async function (d, cr) {
        let data = ccap({
            width: 100,
            height: 40,
            offset: 22,
            quality: 10,
            fontsize:30,
            generate: function () {
                return (parseInt(Math.random() * 9000) + 1000) + ""
            }
        }).get();
        return data[1];
    },
    sendSMS: async function (d) {
        await sms.sendSMS({ mobile: '15901793556', content: '【上海黑摩】5639 注册验证码', batchId: 111 })


    }
}
module.exports = sysService;