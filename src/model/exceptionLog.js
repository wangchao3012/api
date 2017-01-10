module.exports = function (sequelize, DataTypes) {
    return sequelize.define('exceptionLog', {
        method: {
            type: DataTypes.STRING
        },
        cr: {
            type: DataTypes.STRING
        },
        sr: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING(1000)
        },
        stack: {
            type: DataTypes.TEXT
        },
    });
};