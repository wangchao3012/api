'use strict'
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('messageTempContent', {
        messageTempId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sendTypeId: {
            type: DataTypes.INTEGER,
            defaultValue: -1
        },
        sendTypeName: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        content: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        pars: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        remark: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
    });
}
