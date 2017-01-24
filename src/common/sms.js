const config = require('config');
const rp = require('request-promise'); 
const xml2json = require('xml2json');

let sms = {
    sendSMS: async function (opt) {
        let smsOpt = config.sms;
        let url = `${smsOpt.url}?userName=${smsOpt.userName}&passWord=${smsOpt.password}&cmd=sendMessage&mobilePhone=${opt.mobile}&body=${opt.content}&clientMessageBatchId=${opt.batchId}`;
        url = encodeURI(url);

        let r = await rp(url).then(res => {
            let data = xml2json.toJson(res, { object: true });
            if (xml2json.toJson(res, { object: true }).message.body.field[0].$t != '0') {
                throw '发送验证码失败'
            };
        });


    }
}

module.exports = sms;