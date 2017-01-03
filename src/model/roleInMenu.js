'use strict'
// 第三方用户信息
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('roleInMenu', {
        roleId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        menuId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    });
};