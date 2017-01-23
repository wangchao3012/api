const ssdb = require('ssdb');
const config = require('config');
const pool = ssdb.createPool(config.ssdb);
const util = require('util');

var cache = {
    key: {
        keyTime: 'keyTime',
        token: 'token',
        error: 'error',
        taskReal: 'taskReal',//实时任务
        taskFast: 'taskFast',//慢速任务
    },
    keys: function (...x) {
        return x.reduce((m, n) => m + '_' + n);
    },
    set: async function (k, v, m, h = 0, d = 0) {
        var conn = pool.acquire();

        if (util.isNumber(m)) {
            let time = (m + h * 60 + d * 24) * 60;
            conn.setx(cache.keys(cache.key.keyTime, k), time, time);
            conn.expire(m, time);
        }
        else if (util.isDate(m)) {
            let time = (new Date() - m);
            await conn.setx(k, v, time)
        }
        else {
            await conn.set(k, v)
        }
    },
    get: async function (k) {
        var conn = pool.acquire();
        let time = await conn.get(cache.keys(cache.key.keyTime, k));
        if (time) {
            conn.expire(cache.keys(cache.key.keyTime, k), time);
            conn.expire(k, time);
        }
        return await conn.hget(k, n);
    },
    getObject: function (k, fun, m, h, d) {
        let v = cache.get(k, fun, m, h, d);

        return JSON.parse(v);
    },

    /**
     * 
     * 
     * @param {any} n
     * @param {any} k
     * @param {any} v
     * @param {any} t
     * @param {number} [h=0]
     * @param {number} [d=0]
     */
    hset: async function (n, k, v, m, h = 0, d = 0) {
        var conn = pool.acquire();
        await conn.hset(k, n, v)
        if (util.isDate(m)) {
            let time = (new Date() - m)
            conn.expire(k, time);
        }
        else if (util.isNumber(m)) {
            let time = (m + h * 60 + d * 24) * 60;
            conn.setx(cache.keys(cache.key.keyTime, k), time, time);
            conn.expire(k, time);
        }
    },
    hget: async function (n, k) {
        var conn = pool.acquire();
        let time = await conn.get(cache.keys(cache.key.keyTime, k));
        if (time) {
            conn.expire(cache.keys(cache.key.keyTime, k), time);
            conn.expire(k, time);
        }
        return await conn.hget(k, n);
    },
    qpush: function (k, v) {
        var conn = pool.acquire();
        conn.qpush(k, v);
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
        return obj || null;
    },
}

module.exports = cache;




