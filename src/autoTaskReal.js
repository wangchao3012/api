
const cache = require('./common/cache')
const sleep = require('thread-sleep');
const task = require('./service/task');
var autoTaskReal = {

    taskReal: async function () {
        while (true) {
            try {
                let obj = await cache.qpop(cache.key.taskReal);
                console.log('taskReal:', obj);

                if (obj) {
                    await task.runTask(JSON.parse(obj));
                    sleep(10);
                }
                else {
                    sleep(3000);
                }
            } catch (err) {
                sleep(3000);
            }
        }
    } ()
}

module.exports = autoTaskReal;