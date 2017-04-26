const Role = require('../dbAccount').Role;
var roleService = {
    async list(d) {
        let where = {
            name: {
                $like: '%' + d.txt
            }

        }
        return await Role.findAndCountAll({
            where,
            offset: d.offset,
            limit: d.pageSize,
            order: d.sort
        });
    },
    async edit(d) {

    }
}
module.exports = roleService;