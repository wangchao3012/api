const request = require('supertest');
const should = require('should');
const rp = require('request-promise');
const config = require('config');
const tool = require('../src/common/tool');
// 在项目目录下执行 mocha 进行测试
var opt = {
    method: 'POST',
    uri: 'http://127.0.0.1:3000',
    body: {
        sn: '1111111111',
        m: '',
        oid: '',
        d: null,
    },
    json: true
};
var defaultToken = 'E07657CD6002B363';
describe('用户.', function () {
    let aa = '11';
    describe('  注册', function () {

        opt.body.m = 'account.user.register';

        opt.body.d = JSON.stringify({
            type: 1,
            userName: 'admin' + new Date().getTime(),
            password: '111111'
        });
        opt.body = tool.sign(opt.body, defaultToken);

        it('成功注册', function (done) {
            for (var i = 0; i < 10; i++) {
                opt.body.d = JSON.stringify({
                    type: 1,
                    userName: 'admin' + new Date().getTime() + i,
                    password: '111111'
                });
                opt.body = tool.sign(opt.body, defaultToken);
                rp(opt).then(res => {
                    res.sc.should.equal(0);
                    done();
                });
            }

        });

        it('用户名重复', function (done) {
            rp(opt).then(res => {
                res.sc.should.equal(-1)
                done();
            });

        });





        describe('user.login', function () {
            console.log('aabbb::', aa);

            // opt.body.m = 'account.user.login'

            // opt.body.d = JSON.stringify(opt.body.d);
            // opt.body = tool.sign(opt.body, defaultToken);

            // it('成功登录', function (done2) {

            //     rp(opt).then(res => {
            //         console.log('res:', res);
            //         res.sc.should.equal(0)
            //         done2();
            //     });
            // })
            // it('登录.用户名错误', function (done) {
            //     opt.body.d.userName + new Date().getTime();
            //     rp(opt).then(res => {
            //         res.sc.should.equal(-1)
            //         done();
            //     });
            // })
            // it('密码错误', function (done) {
            //     opt.body.d.password = opt.body.d.password + + new Date().getTime();
            //     rp(opt).then(res => {
            //         res.sc.should.equal(-1)
            //         done();
            //     });
            // })
        });


    });







});