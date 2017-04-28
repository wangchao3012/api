const Menu = require('../dbAccount').Menu;
var menuService = {
    async list(d) {
        let where = {
            name: {
                $like: '%' + d.txt
            }

        }
        if (d.isLocked != -1) {
            where.isLocked = d.isLocked;
        }
        return await Menu.findAndCountAll({
            where,
            offset: d.offset,
            limit: d.pageSize,
            order: d.sort
        });
    },
    async edit(d) {

        Menu.insertOrUpdate()
    },
    async del(d) {
        Menu.findAll({
            id: {
                $in: d.ids
            }
        }).delay();
    }
}
module.exports = menuService;