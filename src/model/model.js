var model = {
    StatusCode: {
        成功: 0,
        失败: -1,
        未登录: -2,
        系统错误: -4,
    },
    Task: {
        DataType: {
            xAPI日志: 1,
            x错误日志: 2,
            x发送短信: 3
        },
    },
    SendType: {
        app通知: 0,
        微信信息: 1,
        短信: 2,
    }
};

module.exports = model;