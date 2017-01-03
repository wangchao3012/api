'use strict'
// 第三方用户信息
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('userInRole', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        roleId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    });
};