const request = require('supertest');
const should = require('should');

describe('account.test.js', function () {
    describe('注册', function () {
        it('', function (done) {
            '注册成功'.should.containEql('注册成功');
            done();
        })
    });
    describe('登录', function () {
        it('', function (done) {
            '登录成功'.should.containEql('用户名或密码不正确');
            
            done();
        })
    });
    describe('修改密码', function () {
        it('', function (done) {
            done();
        })
    });
    describe('发送验证码', function () {
        it('', function (done) {
            done();
        })
    });
});