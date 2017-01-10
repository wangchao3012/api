module.exports = function (sequelize, DataTypes) {
    return sequelize.define('apiLog', {
        IP: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        method: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        cr: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        sr: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        useTime: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        statusCode: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        sn: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });
};