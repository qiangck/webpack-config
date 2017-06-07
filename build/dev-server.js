const express = require('express');
const opn = require('opn');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack-dev-conf');
const config = require('../config');
const app = express();
const compiler = webpack(webpackConfig);
const port = config.dev.port;
// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    hot: true,
    historyApiFallback: true
});
// webpack-hot-middleware，用于实现热重载功能的中间件
const hotMiddleware = require('webpack-hot-middleware')(compiler, { log: () => {} });
// 重定向不存在的URL，常用于SPA
app.use(require('connect-history-api-fallback')());
// 即将webpack编译后输出到内存中的文件资源挂到express服务器上
app.use(devMiddleware);
// 将热重载中间件挂在到express服务器上
app.use(hotMiddleware);
// 将静态资源挂到express服务器上
app.use('/static', express.static('./static'));
// 打印log
var url = 'http://127.0.0.1:' + port;
console.log('> 正在启动服务....');
devMiddleware.waitUntilValid(() => {
    console.log('> 监听 ' + url + '端口' + '\n');
});
// 启动express服务器并监听相应的端口
var server = app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    opn(url);
});

module.exports = server;
