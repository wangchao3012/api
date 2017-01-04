const ssdb = require('ssdb');
const config = require('config');
const pool = ssdb.createPool(config.ssdb);

var cache = {
    key: {
        token: 'token',
        error: 'error',
        taskReal: 'taskReal',//实时任务
        taskFast: 'taskFast',//快速任务
    },
    keys: function (...x) {
        return x.reduce((m, n) => m + '_' + n);
    },
    set: async function (key, val) {

        var conn = pool.acquire();
        // var a = yield conn.set('key', 'val222');
        var b = await conn.get('key');

        console.log(b);  // 1 'val' 
        return b;

    },
    get: async function () {

        var conn = pool.acquire();
        // var a = yield conn.set('key', 'val222');
        var b = await conn.get('key');

        console.log(b);  // 1 'val' 
        return b;

    },
    hset: async function (n, k, v) {
        var conn = pool.acquire();
        return await conn.hset(k, n, v);
    },
    hget: async function (n, k) {
        var conn = pool.acquire();
        return await conn.hget(k, n);
    },
    qpush: function (k, v) {
        var conn = pool.acquire();
        return conn.qpush(k, v);
    },
    qpop: async function (k) {
        var conn = pool.acquire();
        return await conn.qpop(k);
    },
}

module.exports = cache;




