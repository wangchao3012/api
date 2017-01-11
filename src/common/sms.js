const config = require('config');
const rp = require('request-promise');
const xml2js = require('xml2js');

let sms = {
    sendSMS: async function (opt) {
        let smsOpt = config.sms;
        let url = `${smsOpt.url}?userName=${smsOpt.userName}&passWord=${smsOpt.password}&cmd=sendMessage&mobilePhone=${opt.mobile}&body=${opt.content}&clientMessageBatchId=${opt.batchId}`;
        url = encodeURI(url);

        let r = await rp(url).then(res => {
              xml2js.parseString(res, { explicitArray: false }, (er, re) => {
                if (re.message.body.field[0]['_'] != '0') {
                    throw '发送验证码失败'
                } 
            })
            console.log('r:::', res);
        }
        ).catch(err => {
            console.log('err::', err);

        });


    }
}

module.exports = sms;