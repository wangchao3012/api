var service = {
    user: require('./account/user'),
    sys: require('./account/sys'),
    role: require('./account/role'),

    apiLog: require('./log/apiLog'),

}
module.exports = service;