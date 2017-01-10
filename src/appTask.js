
const cache = require('./common/cache')
const sleep = require('thread-sleep');
const task = require('./service/task');
var appTask = {
    taskFast: async function () {
        while (true) {
            try {
                let obj = await cache.qpop(cache.key.taskFast);
                console.log('taskFast:', obj);

                if (obj) {
                    await task.runTask(JSON.parse(obj));
                    sleep(100);
                }
                else {
                    sleep(3000);
                }
            } catch (err) {
                sleep(3000);
            }
        }
    } (),
    taskReal: async function () {
        while (true) {
            try {
                let obj = await cache.qpop(cache.key.taskReal);
                console.log('taskReal:', obj);

                if (obj) {
                    await task.runTask(JSON.parse(obj));
                    sleep(100);
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

module.exports = appTask;