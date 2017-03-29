'use strict'
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('threeUser', {
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        openId: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        uuid: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        threeTypeId: {
            type: DataTypes.INTEGER,
            defaultValue: -1
        },
        nickname: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        sex: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        province: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });
};

