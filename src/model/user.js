'use strict'
const uuid = require('uuid/v4');
const Tool = require('../common/tool');
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
            defaultValue: '',
            set: function (val) {
                this.setDataValue('userName', val)
                this.setDataValue('loweredUserName', val.toLowerCase())
            }
        },
        loweredUserName: {
            type: DataTypes.STRING(50),
            defaultValue: '',
        },
        head: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        sex: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            get: function () {
                return this.getDataValue('sex') ? '女' : '男';
            }
        },
        mobile: {
            type: DataTypes.STRING(11),
            defaultValue: '',
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
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: '',
            set: function (val) {
                let salt = uuid();
                this.setDataValue('salt', salt);
                this.setDataValue('password', Tool.createPassword(val, salt));
            }
        },
        passwordErrorNum: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue: '',
            validate: {
                // notEmpty: true, 
                // notNull: false, 
                isEmail: {
                    args: true,
                    msg: '邮箱格式不正确'
                },
            }
        },
        isLoacked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
            // getterMethods: {
            //     upperUserName: function () {
            //         return this.userName.toUpperCase();
            //     }
            // },
            indexes: [{
                unique: true,
                fields: ['loweredUserName'] //索引列内容长度不能太长
            },
            {
                unique: true,
                fields: ['mobile'] //索引列内容长度不能太长
            }
            ]
        }
    );
}
