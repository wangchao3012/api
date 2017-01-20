const ssdb = require('ssdb');
const config = require('config');
const pool = ssdb.createPool(config.ssdb);

var cache = {
    key: {
        token: 'token',
        error: 'error',
        taskReal: 'taskReal',//实时任务
        taskFast: 'taskFast',//慢速任务
    },
    keys: function (...x) {
        return x.reduce((m, n) => m + '_' + n);
    },
    set: async function (k, v, m = 30, h = 0, d = 0) {

        let conn = pool.acquire();
        // var a = yield conn.set('key', 'val222');
        let b = await conn.setx(k, v, (m + h * 60 + d * 24) * 60000);
        return b;

    },
    get: async function (k, v, m = 30, h = 0, d = 0) {

        var conn = pool.acquire(); 
        var b = await conn.getx(k);

        console.log(b);  // 1 'val' 
        return b;

    },
    getObject: function (k, fun, m, h, d) {
        let v = cache.get(k, fun, m, h, d);

        return JSON.parse(v);
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
    /**
     * 获取队列值
     * 
     * @param {cache.key} k 队列key
     * @returns 返回队列值
     */
    qpop: async function (k) {
        var conn = pool.acquire();
        let obj = await conn.qpop(k);
        return obj;
    },
}

module.exports = cache;




