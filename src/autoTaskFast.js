
const cache = require('./common/cache')
const sleep = require('thread-sleep');
const task = require('./service/task');
const moment=require('moment');
var autoTaskFast = {
    taskFast: async function () {
        while (true) {
            try {
                let obj = await cache.qpop(cache.key.taskFast);
                if (obj) {
                    await task.runTask(JSON.parse(obj));
                    // sleep(10);
                }
                else {
                    console.log('没有数据，休息 1000 ms:',moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS'));
                    
                    sleep(1000); 
                }
            } catch (err) {
                sleep(3000);
            }
        }
    } () 
}

module.exports = autoTaskFast;