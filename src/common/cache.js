const ssdb = require('ssdb');
const config = require('config');
// config.ssdb.FailError = function (err, data) {
//     if (err) throw err;
// }
ssdb.ConnectionRefusedError = function (err) {
    throw err;
}
const pool = ssdb.createPool(config.ssdb);
const util = require('util');

var cache = {
    key: {
        keyTime: 'keyTime',         //有效时间
        token: 'token',             //
        imgVerCode: 'imgVerCode',   //图片验证码
        smsVerCode: 'smsVerCode',   //短信验证码
        error: 'error',
        taskReal: 'taskReal',       //快速任务
        taskFast: 'taskFast',       //慢速任务
    },
    keys: function (...x) {
        return x.reduce((m, n) => m + '_' + n);
    },
    /**
     * 设置缓存
     * 
     * @param {string} k
     * @param {string|function} v
     * @param {number|Date} m        有效时间：
     *                              null：永久有效
     *                              分钟：在调用时延时
     *                              时间：在调用时不延时
     * @param {number} [h=0]     有效小时，当 m 为number时有效
     * @param {number} [d=0]     有效天，当 m 为number时有效
     */
    set: async function (k, v, m, h = 0, d = 0) {
        var conn = pool.acquire();
        if (!m) {
            await conn.set(k, v)
        }
        else if (typeof m == 'number') {
            let time = (m + h * 60 + d * 24) * 60;
            conn.setx(cache.keys(cache.key.keyTime, k), time, time);
            conn.setx(k, v, time);
        }
        else {
            let time = (m - new Date()) / 1000;
            await conn.setx(k, v, time)
        }
    },
    get: async function (k, v, m, h = 0, d = 0) {
        var conn = pool.acquire();
        let val = await conn.get(k);
        if (val) {
            let time = await conn.get(cache.keys(cache.key.keyTime, k));
            if (time) {
                conn.expire(cache.keys(cache.key.keyTime, k), time);
                conn.expire(k, time);
            }
        }
        else {
            val = typeof v == 'function' && v();
            cache.set(k, val, m, h, d);
        }
        return val;
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
        if (!m) {
            await conn.set(k, v)
        }
        else if (typeof m == 'number') {
            let time = (m + h * 60 + d * 24) * 60;
            conn.setx(cache.keys(cache.key.keyTime, k), time, time);
            conn.expire(k, time);
        }
        else {
            let time = (m - new Date()) / 1000;
            conn.expire(k, time);
        }

    },
    hget: async function (n, k, v, m, h = 0, d = 0) {
        var conn = pool.acquire();
        let val = await conn.hget(k, n);
        if (!val) {
            let time = await conn.get(cache.keys(cache.key.keyTime, k));
            if (time) {
                conn.expire(cache.keys(cache.key.keyTime, k), time);
                conn.expire(k, time);
            }
        }
        else {
            val = typeof v == 'function' && v();
            cache.hset(k, val, m, h, d);
        }

        return val;
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




