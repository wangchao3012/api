
const Tool = require('../../common/tool');
const Cache = require('../../common/cache');
const uuid = require('uuid/v4');
const tasl = require('../../common/task');
const rp = require('request-promise');

const sms = require('../../common/sms');

var sysService = {
    sendSMS: async function (d) {
        await sms.sendSMS({ mobile: '15901793556', content: '【上海黑摩】5639 注册验证码', batchId: 111 })


    }
}
module.exports = sysService;