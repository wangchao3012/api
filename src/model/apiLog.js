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
            type: DataTypes.STRING,
            defaultValue: ''
        },
        rs: {
            type: DataTypes.STRING,
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