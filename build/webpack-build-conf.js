/**
    1、合并基础的webpack配置
    2、配置webpack的输出
    3、配置webpack插件
**/
const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');
const webpackConfig = require('./webpack-base-conf');
const config = require('../config');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = merge(webpackConfig, {
    devtool: '#source-map',
    output: {
        path: utils.resolve(config.base.outputFolderName),
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
    	// 配置全局变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV':  JSON.stringify(config.build.processENV)
            }
        }),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true,
            mangle: true
        }),
         // 抽离css文件
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // 优化css样式
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // 模板
        new HtmlWebpackPlugin({
            title: config.build.title,
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        // 第三方库打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // 避免没有修改vendor，hash值改变问题。
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // 复制单个文件或整个目录生成目录
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }])
    ]
});
