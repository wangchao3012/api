module.exports = function (sequelize, DataTypes) {
    return sequelize.define('exceptionLog', {
        method: {
            type: DataTypes.STRING
        },
        cr: {
            type: DataTypes.STRING
        },
        rs: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING
        },
        stack: {
            type: DataTypes.TEXT
        },
    });
};