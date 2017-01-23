
const cache = require('./common/cache')
const sleep = require('thread-sleep');
const taskService = require('./service/task');
const moment = require('moment');
const log4js = require('log4js');
// const logger = log4js.getLogger();
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console()); 
log4js.addAppender(log4js.appenders.file('logs/autoTask.log'), 'autoTask');
logger = log4js.getLogger('autoTask');
logger.setLevel('ERROR');

var autoTaskFast = {
    taskFast: async function () {
        while (true) {
            let obj  ;
            try {
                obj = JSON.parse(await cache.qpop(cache.key.taskFast))  ; 
                if (obj) {
                    await taskService.runTask(obj);
                }
                else {
                    console.log('没有数据，休息 1000 ms:', moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS'));
                    sleep(1000);
                }
            } catch (err) {

                if (obj.error < 3) {
                    obj.error++;
                    taskService.setTaskFast(obj.dataType, obj.data,obj. error);
                }
                logger.trace(err.stack)
                logger.error(obj)
                // sleep(10);
            }
        }
    } ()
}

module.exports = autoTaskFast;