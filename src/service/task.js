const ApiLog = require('./dbLog').ApiLog;
const ExceptionLog = require('./dbLog').ExceptionLog;
const task = require('../common/task')
var taskService = {
    runTask: async function (obj) {
        switch (obj.dataType) {
            case task.DataType.xAPI日志:
                obj.data.cr = JSON.stringify(obj.data.cr);
                obj.data.sr = JSON.stringify(obj.data.sr);
                await ApiLog.create(obj.data);
                break;
            case task.DataType.x错误日志:
                await ExceptionLog.create(obj.data);
                break;
            default:
                break;
        }

    }
}
module.exports = taskService;