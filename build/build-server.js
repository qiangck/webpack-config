const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const webpack = require('webpack');
const webpackConfig = require('./webpack-build-conf');
const config = require('../config');
const utils = require('./utils');
const output = utils.resolve(config.base.outputFolderName);
var spinner = ora('生产环境代码打包中...').start();
// 文件处理
shell.rm('-rf', output);
shell.mkdir('-p', output);

webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
    console.log(chalk.red('打包成功.\n'));
});
