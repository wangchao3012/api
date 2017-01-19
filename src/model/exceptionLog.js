module.exports = function (sequelize, DataTypes) {
    return sequelize.define('exceptionLog', {
        method: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        cr: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        solveCode: {   //解决状态
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        solveUserId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        solveUserName: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        message: {
            type: DataTypes.STRING(1000),
            defaultValue: ''
        },
        stack: {
            type: DataTypes.TEXT, 
        },
    });
};