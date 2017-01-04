const request = require('supertest');
const should = require('should');
const rp = require('request-promise');
const config = require('config');
const tool = require('../src/common/tool');

var opt = {
    method: 'POST',
    uri: 'http://127.0.0.1:3000',
    body: {
        sn: '1111111111',
        m: '',
        oid: '',
        d: {
            type: 1,
            userName: 'admin' + new Date().getTime(),
            password: '111111'
        },
    },
    json: true
};
var defaultToken = 'E07657CD6002B363';
describe('account.', function () {
    describe('user.register', function () {
        opt.body.m = 'account.user.register';

        opt.body.d = JSON.stringify(opt.body.d);
        opt.body = tool.sign(opt.body, defaultToken);

        it('成功注册', function (done) {

            rp(opt).then(res => {
                res.sc.should.equal(0)
                done();
            });
        });
        it('注册.用户名重复', function (done1) {
            rp(opt).then(res => {
                res.sc.should.equal(-1)
                done1();
            });
        });


        describe('user.login', function () {
            // opt.body.m = 'account.user.login'

            // opt.body.d = JSON.stringify(opt.body.d);
            // opt.body = tool.sign(opt.body, defaultToken);

            // it('成功登录', function (done) {

            //     rp(opt).then(res => {
            //         console.log('res:', res);
            //         res.sc.should.equal(0)
            //         done();
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