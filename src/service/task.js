const ApiLog = require('./dbLog').ApiLog;
const ExceptionLog = require('./dbLog').ExceptionLog;
const cache = require('../common/cache');
const model = require('../model/model');

var taskService = {


    /**
     * 快速任务
     * 
     * @param {DataType} dataType 任务类型
     * @param {any} data
     */
    setTaskReal: function (dataType, data, error = 0) {
        let obj = {
            dataType: dataType,
            error: error,
            data: data
        }
        cache.qpush(cache.key.taskReal, JSON.stringify(obj));
    },
    /**
     * 慢速任务
     * 
     * @param {any} dataType
     * @param {any} data
     */
    setTaskFast: function (dataType, data, error = 0) {
        let obj = {
            dataType: dataType,
            error: error,
            data: data
        }
        cache.qpush(cache.key.taskFast, JSON.stringify(obj));
    },
    runTask: async function (obj) {
        let data = obj;
        switch (obj.dataType) {
            case model.Task.DataType.xAPI日志: 
                Object.assign(data, obj.data) 
                data.cr = JSON.stringify(data.cr);
                data.sr = JSON.stringify(data.sr);
                await ApiLog.create(data);
                break;
            case model.Task.DataType.x错误日志:
                await ExceptionLog.create(data);
                break;
            default:
                break;
        }

    }
}
module.exports = taskService;