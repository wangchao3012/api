const ApiLog = require('../dbLog').ApiLog;

// import ApiLog from '../dbLog'

var apiLogService = {
    async list(d) {
        let where = {
            method: {
                $like: '%' + d.txt
            }

        }
        return await ApiLog.findAndCountAll({
            where,
            offset: d.offset,
            limit: d.pageSize,
            order: d.sort
        });
    },
    async edit(d) {

    }
}
module.exports = apiLogService;