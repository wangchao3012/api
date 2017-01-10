
const cache = require('./cache');
var task = {
    DataType: {
        xAPI日志: 1,
        x错误日志: 2,
        x发送短信: 3
    },

    /**
     * 快速任务
     * 
     * @param {DataType} dataType 任务类型
     * @param {any} data
     */
    setTaskReal: function (dataType, data) {
        let obj = {
            dataType: dataType,
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
    setTaskFast: function (dataType, data) {
        let obj = {
            dataType: dataType,
            data: data
        }
        cache.qpush(cache.key.taskFast, JSON.stringify(obj));
    },


}
module.exports = task;