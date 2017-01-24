
'use strict'

const Koa = require('koa');
const app = new Koa();

const convert = require('koa-convert');
var config = require('config');
const cache = require('./common/cache');

// http 参数解析
const bodyparser = require('koa-bodyparser')();
app.use(convert(bodyparser));

const tool = require('./common/tool');
const taskService = require('./service/task');
const service = require('./service/index');
const model = require('./model/model');


app.use(async (ctx, next) => {
    let beginTime = new Date();
    let cr = ctx.request.body;
    var sr = await checkAuth(cr);
    if (sr.sc == model.StatusCode.成功) {
        var arr = cr.m.split('.');
        // var service = require('./service/' + arr[0] + '/' + arr[1]);
        try {
            cr.d = cr.d || '{}';
            sr.d = await service[arr[0]][arr[1]](JSON.parse(cr.d), cr);
        } catch (err) {


            sr.sc = model.StatusCode.失败;
            if (!err.name) {
                sr.msg = err;
            } else if (err.name == 'SequelizeValidationError') {
                sr.msg = err.errors[0].message;
            }
            else {
                console.error('err::', err)
                sr.msg = '服务器异常，请稍后重试';
                sr.sc = model.StatusCode.系统错误;
                taskService.setTaskFast(model.Task.DataType.x错误日志, {
                    method: cr.m,
                    cr: JSON.stringify(cr),
                    message: err.message,
                    stack: err.stack
                });
            }
        }
    }

    if (cr.m == 'sys.captcha') {
        ctx.type = 'image/png';
        ctx.body = sr.d;
    }
    else {
        ctx.body = sr;
        // for (var i = 0; i < 500000; i++) {
        let endTime = new Date();
        sr.sc != model.StatusCode.系统错误 && taskService.setTaskFast(model.Task.DataType.xAPI日志, {
            IP: ctx.ip,
            method: cr.m,
            cr: cr,
            sr: sr,
            useTime: endTime - beginTime,
            statusCode: sr.sc,
            sn: cr.sn,
            ctime: endTime,
        });
        // }

    }
});
var sr = {
    sc: -1,//状态号
    s: '',//返回状态信息
    d: null
};

const defaultToken = config.app.defaultToken;
const noCheckToken = ['account.user.login', 'user.register'];

var checkAuth = async function (cr) {

    if (cr.test || (noCheckToken.indexOf(cr.m) != -1 && tool.checkSign(cr, defaultToken))) {
        return { sc: model.StatusCode.成功 };
    }
    else {
        // var flag = await cache.hset(cr.uid, cr.si, uuid());
        var token = await cache.hget(cr.uid, cr.sn);
        if (tool.checkSign(cr, token)) {
            return { sc: model.StatusCode.成功, si: token };
        }
        else {
            return { sc: model.StatusCode.未登录, s: '签名不正确，正确签名字符串为：' + tool.signJoin(cr, token) };
        }
    }
}

app.on('error', (err, ctx) => {
    console.error('err:' + err.message + '\r\n' + err.stack);
});

app.listen(config.port);

console.log('env::', process.env.NODE_ENV);
console.log('服务启动成功:' + config.port)
module.exports = app;


const dbAccount = require('./service/dbAccount');
const dbLog = require('./service/dbLog')