
const Tool = require('../../common/tool');
const Cache = require('../../common/cache');
const uuid = require('uuid/v4');
const tasl = require('../../common/task');
const rp = require('request-promise');

var sysService = {
    sendSMS: async function (d) {
        let result = await rp().then(res => res);
        console.log('result:', result);
    }
}
module.exports = sysService;