'use strict'
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('menu', {
        name: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        code: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        sort: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        // URL链接地址
        url: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        // 是否是菜单
        isMenu: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        ico: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        remark: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        appTypeId: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        appTypeName: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
    });
};