'use strict'
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('messageTemp', {
        sendTypeId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        }
    });
}
