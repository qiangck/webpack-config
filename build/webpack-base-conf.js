/**
    1、配置webpack编译入口
    2、配置webpack输出路径和命名规则
    3、配置模块resolve规则
    4、配置不同类型模块的处理规则
**/
const config = require('../config');
const { resolve, assetsPath } = require('./utils');
var entryArray = [],
    entryName = config.base.entryFileName;
if (entryName && entryName.length > 0) {
    entryNamee.forEach((value) => {
        entryArray.push(resolve(entryName) + '/' + value);
    });
} else {
    entryArray = [resolve('src') + '/app.js']
}

module.exports = {
    // 入口
    entry: {
        // 应用程序入口，可多个
        app: entryArray,
        // 公共库入口，可多个
        vendors: config.base.entryVendors
    },
    // 输出
    output: {
        // 输出目录
        path: resolve(config.base.outputFolderName),
        // 输出文件名
        filename: '[name].[hash:8].js',
        // 静态资源的引用路径
        publicPath: config.base.publicPath
    },
    // 解析
    resolve: {
        // 自动解析扩展名
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        // 设置别名
        alias: {
            'util$': resolve('util'),
            '@': resolve('src')
        }
    },
    /**
        1.test参数用来指示当前配置项针对哪些资源，该值应是一个条件值(condition)。
        2.exclude参数用来剔除掉需要忽略的资源，该值应是一个条件值(condition)。
        3.include参数用来表示本loader配置仅针对哪些目录/文件，该值应是一个条件值(condition)。
        而include参数则用来指示目录；注意同时使用这两者的时候，实际上是and的关系。
    **/
    module: {
        rules: [{
            test: /\.css/,
            use: ['style-loader', 'css-loader']
        }, {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'eslint-loader',
            include: resolve('src')
        }, {
            test: /\.(js|jsx)$/,
            use: [
                'react-hot-loader', {
                    loader: 'babel-loader'
                }
            ],
            exclude: /(node_modules)/
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    }
}
