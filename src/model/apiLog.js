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
        },
        sr: {
            type: DataTypes.TEXT, 
            // type: DataTypes.TEXT('long'), 
        },
        useTime: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        statusCode: {
             type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sn: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });
};