'use strict'
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        openId: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        userName: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        loweredUserName: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        head: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        mobile: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        roleIds: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        roleNames: {
            type: DataTypes.STRING(1000),
            defaultValue: ''
        },
        salt: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        passwordErrorNum: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        isLoacked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
}
