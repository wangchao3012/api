

const Sequelize = require('sequelize');
const config = require('config');

let sequelize = new Sequelize(config.mysql.account.dbname, config.mysql.account.user, config.mysql.account.password, config.mysql.account.options);


let User = sequelize.import('../model/user');
let Role = sequelize.import('../model/role');
let Menu = sequelize.import('../model/menu');
let ThreeUser = sequelize.import('../model/threeUser');

User.hasMany(ThreeUser, { foreignKey: 'userId', targetKey: 'id', as: 'ThreeUser' });

let UserInRole = sequelize.import('../model/userInRole');
User.belongsToMany(Role, { 'through': UserInRole, foreignKey: 'userId', targetKey: 'id', });
Role.belongsToMany(User, { 'through': UserInRole, foreignKey: 'roleId', targetKey: 'id', });

let RoleInMenu = sequelize.import('../model/roleInMenu');
Role.belongsToMany(Menu, { 'through': RoleInMenu, foreignKey: 'roleId', targetKey: 'id', });
Menu.belongsToMany(Role, { 'through': RoleInMenu, foreignKey: 'menuId', targetKey: 'id', });

let MessageTemp = sequelize.import('../model/messageTemp');
let MessageTempContent = sequelize.import('../model/messageTempContent');
MessageTemp.hasMany(MessageTempContent, { foreignKey: 'messageTempId', targetKey: 'id', as: 'MessageTempContent' });

// MessageTemp.hasMany(MessageTempContent);
MessageTempContent.belongsTo(MessageTemp);

// NOTE: nodejs
// TODO 发布后删除
const uuid = require('uuid/v4');
const Tool = require('../common/tool');

true && sequelize.sync({ force: true }).then(res => {

    console.info("%s   数据库同步成功", config.mysql.account.dbname);
    // 添加基础数据


    sequelize.transaction(t => {

        return MessageTemp.create({
            name: '注册验证码',
            code: 'register.VerCode'
        }, { transaction: t }).then(mt => {
            mt.createMessageTempContent({ content: '【上海】${verCode} 注册验证码' });
            mt.createMessageTempContent({ content: '【上海】${verCode} 登录证码' });
            mt.createMessageTempContent({ content: '【上海】${verCode} 修改密码证码' });
        });
    });


    // 初始化菜单
    let ms = Menu.bulkCreate([
        { name: '用户管理', sort: '01', icon: 'fa-user-o' },
        { name: '用户', sort: '01_01', icon: 'fa-user-o', url: '/user/list' },
        { name: '角色', sort: '01_02', icon: 'fa-file-text-o', url: '/role/list' },
        { name: '菜单', sort: '01_03', icon: 'fa-align-left', url: '/menu/list' }
    ]);

    // 初始化角色
    let rs = Role.bulkCreate([
        { name: '系统管理员', code: 'sysAdmin', sort: 1 },
        { name: '管理员', code: 'admin', sort: 2 },
        { name: '普通用户', code: 'user', sort: 3 }]
    );



    sequelize.transaction(t => {
        return User.findOne({
            where: {
                $or: [{ loweredUserName: 'admin' }, { mobile: 'admin' }, { email: 'admin' }]
            }
        }).then(dmuser => {
            if (dmuser != null) {
                return
            }
            // let salt = uuid();
            // let password = Tool.createPassword('111111', salt);
            return User.create({ userName: 'admin', password: '111111', openId: '111', roleIds: '1,2' }, { transaction: t }).then(dmuser1 => {
                return Role.findOne({ code: 'sysAdmin' }).then(dmrole => {
                    dmuser1.setRoles(dmrole);
                    let list = [];
                    for (var i = 0; i < 20; i++) {
                        list.push({ userName: 'admin_' + i, password: '111111' + i, openId: '1112' + i, roleIds: '1,2', mobile: i })
                    }
                    let us = User.bulkCreate(list);
                    return dmuser1;
                });
            });

        });
    });






    // sequelize.transaction(t => {
    //     return User.create({ name: '系统管理员1' }, { transaction: t }).then(u => {
    //         return Role.create({ name: '系统管理员', code: 'sysAdmin', sort: 1 }, { transaction: t }).then(r => {
    //             return u.setRoles(r, { transaction: t });
    //         })
    //     });

    // });


    // sequelize.transaction(t => {
    // Promise.all([
    //     User.create({ name: '系统管理员1' }),
    //     Role.create({ name: '系统管理员', code: 'sysAdmin', sort: 'sss',isLocked:'ddd' })
    // ]).then(res => {
    //     res[0].setRoles(res[1]);
    // });

    // });


    // console.info('rs:', rs);
    // var dm = sequelize.transaction(t => {
    //     return User.create({ name: 'name1' }, { transaction: t }).then(u => {

    //         u.addThreeUser({ name: 'b1' }, { transaction: t });
    //         // return User.create({ name: 'b1', passwordErrorNum: 'ssss' }, { transaction: t });
    //         return u.setThreeUser({ nickname: '昵称' }, { transaction: t }).then(tu => {
    //             return tu;
    //         });
    //     })
    // });





    // User.create({ name: '管理员', }, { transaction: t });
    // return u.setThreeUser({ nickname: '昵称' }, { transaction: t }).then(tu => {
    //     return tu;
    // });
    // }); 


    // Role.create({ name: '管理员' }).then(res => {

    // })
    // User.create({ name: 'admin' });
    // User.bulkCreate([{ name: 'a1' }, { name: 'b1', passwordErrorNum: 'ssss' }, { name: 'c1' }])
}).catch(err => {
    console.log("%s   数据库同步失败: %s", config.mysql.account.dbname, err);
});
exports.sequelize = sequelize;
exports.User = User;
exports.Role = Role;
exports.Menu = Menu;
exports.ThreeUser = ThreeUser;
exports.UserInRole = UserInRole;
exports.RoleInMenu = RoleInMenu;


exports.MessageTemp = MessageTemp;
exports.MessageTempContent = MessageTempContent;