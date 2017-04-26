const uuid = require('uuid/v4');
const sequelize = require('../dbAccount').sequelize;
const User = require('../dbAccount').User;
const Role = require('../dbAccount').Role;
const Menu = require('../dbAccount').Menu;
const UserInRole = require('../dbAccount').UserInRole;
const RoleInMenu = require('../dbAccount').RoleInMenu;
const Tool = require('../../common/tool');
const Cache = require('../../common/cache');
const moment = require('moment');

var userService = {
    login: async function (d, cr) {
        let token = uuid();
        let user, roleList,
            loweredUserName = d.userName.toLowerCase();
        switch (d.type) {
            case 1://用户名，密码登录  
                //  include: [Role],
                await User.findOne({
                    where: {
                        $or: [
                            { loweredUserName: loweredUserName },
                            { mobile: loweredUserName },
                            { email: loweredUserName }]
                    }
                }).then(dmu => {

                    Tool(dmu).notNull('用户名或密码错误').isFalse(dmu.isLoacked, '用户已锁定，请使用手机号动态验证码方式登录')
                        .isTrue(Tool.createPassword(d.password, dmu.salt) == dmu.password, '用户名或密码错误', () => {
                            dmu.passwordErrorNum++
                            dmu.passwordErrorNum > 10 && (dmu.isLoacked = true)
                            dmu.save();
                        });
                    user = dmu;
                })
                // var rl = a.getRoles();
                // rl.forEach(function (r) {
                //     // tag的notes可以通过tag.notes访问，关系模型可以通过tag.notes[0].tagging访问
                //     console.log(r);
                // });
                // var roles = await Role.findAll({
                //     'include': [
                //         {
                //             'model': User,
                //             // 这里可以对notes进行where
                //             where: {
                //                 $or: [{ loweredUserName: loweredUserName },
                //                 { mobile: loweredUserName },
                //                 { email: loweredUserName }]
                //             }
                //         }
                //     ]
                //     // 这里可以对tags进行where
                // });
                // roles.forEach(function (role) {
                //     // tag的notes可以通过tag.notes访问，关系模型可以通过tag.notes[0].tagging访问
                //     console.log(role);
                // });


                // var menus = await Menu.findAll({
                //     'include': [
                //         {
                //             'model': User,
                //             // 这里可以对notes进行where
                //             where: {
                //                 $or: [{ loweredUserName: loweredUserName },
                //                 { mobile: loweredUserName },
                //                 { email: loweredUserName }]
                //             }
                //         }
                //     ]
                //     // 这里可以对tags进行where
                // });
                // menus.forEach(function (menu) {
                //     // tag的notes可以通过tag.notes访问，关系模型可以通过tag.notes[0].tagging访问
                //     console.log('menu', menu);
                // });
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
                        return User.create({
                            userName: d.userName,
                            loweredUserName: loweredUserName,
                            salt: salt,
                            password: password,
                            openId: '111',
                            // email: 'aaa'
                        }, { transaction: t }).then(dmuser1 => {
                            return Role.findOne({ code: 'user' }).then(dmrole => {
                                dmuser1.setRoles(dmrole);
                                return dmuser1;
                            });
                        });

                    });
                });

                break;
            case 2://手机号、[第三方]、验证码

                break;
            default:
                break;
        }
        return getUserInfo(user, cr);
    },
    editPassword: async function (d, cr) {
        let dmu = await User.findOne({
            where: {
                openId: cr.oid
            }
        });

        Tool(dmu).notNull('用户不存在').isTrue(Tool.createPassword(d.password, dmu.salt) == dmu.password, '原密码不正确');
        dmu.password = d.newPassword;
        dmu.save();
    },
    async list(d) {
        let where = {
            $or: [
                {
                    loweredUserName: {
                        $like: '%' + d.txt
                    }
                },
                {
                    mobile: {
                        $like: '%' + d.txt
                    }
                },
                {
                    email: {
                        $like: '%' + d.txt
                    }
                }]
        }
        if (d.sex != -1) {
            where.sex = d.sex;
        }
        return await User.findAndCountAll({
            where,
            attributes: ['id', ['name', 'name'], 'userName', 'sex', 'head', 'mobile', 'isLoacked', 'updatedAt'],
            offset: d.offset,
            limit: d.pageSize,
            order: d.sort
        });
    }

}

let getUserInfo = async function (user, cr) {
    let token = uuid();
    await Cache.hset(user.openId, Cache.keys(Cache.key.token, cr.sn), token, 30);

    // let token1 = await Cache.hget(cr.oid, Cache.keys(Cache.key.token, cr.sn));

    // let role = await user.getRoles().then(rr => { return rr });

    // let roleList = await user.getRoles({

    //     'include': [
    //         {
    //             'model': Menu,
    //             // attributes: ['name', 'code', 'url'],  //roleInMenu
    //             attributes: ['id', 'name', 'code', 'url', 'isMenu', 'sort'],
    //             // 这里可以对notes进行where
    //             // where: {
    //             //     $or: [{ loweredUserName: loweredUserName },
    //             //     { mobile: loweredUserName },
    //             //     { email: loweredUserName }]
    //             // }

    //         }
    //     ],

    //     // exclude: ['roleInMenu']
    //     // 这里可以对tags进行where
    // });
    let roleIdList = user.roleIds.split(',');
    let menuList = await Menu.findAll(
        {
            include: [
                {
                    'model': Role,
                    where: {
                        id: {
                            $in: roleIdList
                        }
                    },
                    // 关联表列
                    attributes:[]
                    // required: false
                }
            ],
            attributes: ['id', 'name', 'code', 'url', 'isMenu', 'sort', 'icon'],
            order: 'sort'
        }
    )
    console.log(JSON.stringify(menuList))

    let menu = [], auth = [];
    menuList.forEach(m => {
        if (!(menu.find(m1 => m1.id == m.id) || auth.find(m1 => m1.id == m.id))) {
            if (m.isMenu) {
                let mm = {
                    name: m.name,
                    code: m.code,
                    to: m.url,
                    sort: m.sort,
                    icon: m.icon
                };
                if (m.sort.length == 2) {
                    menu.push(mm)
                }
                else {
                    let sort = m.sort.substring(0, m.sort.lastIndexOf('_'))
                    let menuChild = menu.find(m1 => m1.sort == sort)
                    menuChild.menu = menuChild.menu || [];
                    menuChild.menu.push(mm);
                }

            } else {
                auth.push({
                    name: m.name,
                    code: m.code
                })
            }

        }
    })

    return {
        name: user.name,
        userName: user.userName,
        oId: user.openId,
        token: token,
        head: user.head,
        email: user.email,
        menu: menu,
        auth: auth
    }
}
module.exports = userService;