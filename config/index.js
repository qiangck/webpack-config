var path = require('path')

module.exports = {
    dev: {
    	// 端口号
        port: 3001,
        processENV: 'development'
    },
    build: {
        processENV: 'production',
        title: 'one test title'
    },
    base: {
    	// 输入文件名，默认app.js
    	entryFileName: [],
    	// 输入文件目录
    	entryFolderName: 'src',
    	// 第三方库
    	entryVendors:['jquery'],
    	// 输出文件目录
    	outputFolderName: 'dist',
    	// 资源路径
    	publicPath: '/'
    }
}
