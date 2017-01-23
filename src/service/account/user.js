const uuid = require('uuid/v4');
const sequelize = require('../dbAccount').sequelize;
const User = require('../dbAccount').User;
const Role = require('../dbAccount').Role;
const UserInRole = require('../dbAccount').UserInRole;
const Tool = require('../../common/tool');
const Cache = require('../../common/cache');
const moment = require('moment');

var userService = {
    login: async function (d, cr) {
        let token = uuid();
        await Cache.set(Cache.keys(Cache.key.token, cr.sn), token, moment().add(30, 'minutes'));
        let token1 = await Cache.get(Cache.keys(Cache.key.token, cr.sn));

        let user,
            loweredUserName = d.userName.toLowerCase();
        switch (d.type) {
            case 1://用户名，密码登录 
                await User.findOne({ where: { $or: [{ loweredUserName: loweredUserName }, { mobile: loweredUserName }, { email: loweredUserName }] } }).then(dmu => {
                    Tool(dmu).notNull('用户名或密码错误').isTrue(Tool.createPassword(d.password, dmu.salt) == dmu.password, '用户名或密码错误');
                    user = dmu;
                })
                break;
            case 2://手机号，验证码登录
                let verCode = await Cache.hget(cr.oid, Cache.keys(Cache.key.token, cr.sn));
                Tool.isTrue(d.verCode == verCode, '验证码不正确');
                await User.findOne({ mobile: d.mobile }).then(dmu => {
                    user = dmu;
                })
                break;
            case 3://第三方登录

                break;
            default:
                break;
        }

        return getUserInfo(user, cr);
    },
    register: async function (d, cr) {
        let user;
        let loweredUserName = d.userName.toLowerCase();
        switch (d.type) {
            case 1://用户名，密码
                user = await sequelize.transaction(t => {
                    return User.findOne({
                        where: {
                            $or: [{ loweredUserName: loweredUserName }, { mobile: loweredUserName }, { email: loweredUserName }]
                        }
                    }).then(dmuser => {
                        Tool(dmuser).isNull('用户名已存在');
                        let salt = uuid();
                        let password = Tool.createPassword(d.password, salt);
                        return User.create({ userName: d.userName, loweredUserName: loweredUserName, salt: salt, password: password, openId: '111' }, { transaction: t }).then(dmuser1 => {
                            return Role.findOne({ code: 'user' }).then(dmrole => {
                                dmuser1.setRoles(dmrole);
                                return dmuser1;
                            });
                        });

                    });
                });

                break;
            case 2:

                break;
            default:
                break;
        }
        return getUserInfo(user, cr);
    },


}

let getUserInfo = async function (user, cr) {
    let token = uuid();
    await Cache.hset(user.openId, Cache.keys(Cache.key.token, cr.sn), token, 30);
    // let token1 = await Cache.hget(cr.oid, Cache.keys(Cache.key.token, cr.sn));
    return {
        userName: user.userName,
        openId: user.openId,
        token: token,
        head: user.head,
        email: user.email
    }
}
module.exports = userService;