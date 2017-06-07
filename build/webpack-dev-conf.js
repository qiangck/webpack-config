const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack-base-conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('../config');
process.env.NODE_ENV = 'development'
// 将热加载相关代码添加到输入块中
Object.keys(baseConfig.entry).forEach(function(name) {
    baseConfig.entry[name].push('webpack-hot-middleware/client?noInfo=true&reload=true');
});
module.exports = merge(baseConfig, {
    devtool: '#cheap-module-source-map',
    plugins: [
        // 配置全局变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(config.dev.processENV)
            }
        }),
        // 排序输出
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 热替换模块
        new webpack.HotModuleReplacementPlugin(),
        // 后页面中的报错不会阻塞，但是会在编译结束后报错
        new webpack.NoEmitOnErrorsPlugin(),
        // 模板
        new HtmlWebpackPlugin({
            // 页面title
            title: 'test',
            // 模板文件
            template: './index.html',
            // 生产文件名
            filename: 'index.html',
            // 引用entry里面的哪入口文件
            chunks: ['app', 'vendors'],
            //引入的脚步插入到body标签里
            inject: 'body'
        }),
        // 错误提示
        new FriendlyErrorsPlugin(),
        // 定义第三方库为全局变量
        new webpack.ProvidePlugin({
            $: "jquery"
        })
    ]
})
