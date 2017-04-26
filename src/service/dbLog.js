

const Sequelize = require('sequelize');
const config = require('config');

let sequelize = new Sequelize(config.mysql.log.dbname, config.mysql.log.user, config.mysql.log.password, config.mysql.log.options)


let ApiLog = sequelize.import('../model/apiLog');
let ExceptionLog = sequelize.import('../model/exceptionLog');

false && sequelize.sync({ force: true }).then(res => {
    console.info("%s   数据库同步成功", config.mysql.log.dbname);
}).catch(err => {
    console.log("%s   数据库同步失败: %s", config.mysql.log.dbname, err);
});

exports.ApiLog = ApiLog;
exports.ExceptionLog = ExceptionLog; 