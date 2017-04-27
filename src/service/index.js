var service = {
    user: require('./account/user'),
    sys: require('./account/sys'),
    role: require('./account/role'),
    menu: require('./account/menu'),

    apiLog: require('./log/apiLog'),

}
module.exports = service;