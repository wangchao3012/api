const User = require('../dbAccount').User;

var user = {
    login: async function (d) {
        await User.findAll().then(res => {
            console.log('res:', res);
            return res;
        });
    },
    reg: async function (d) {
        // await User.create({})
    }
}
module.exports = user;