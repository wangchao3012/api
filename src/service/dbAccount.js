

const Sequelize = require('sequelize');
const config = require('config');

let sequelize = new Sequelize(config.mysql.account.dbname, config.mysql.account.user, config.mysql.account.password, config.mysql.account.options)


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

sequelize.sync({ force: true }).then(res => {
    console.info("%s   数据库同步成功", config.mysql.account.dbname);
}).catch(err => {
    console.log("%s   数据库同步失败: %s", config.mysql.account.dbname, err);
});

exports.User = User;
exports.Role = Role;
exports.Menu = Menu;
exports.ThreeUser = ThreeUser;
exports.UserInRole = UserInRole;
exports.RoleInMenu = RoleInMenu;