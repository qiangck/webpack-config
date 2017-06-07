const path = require('path');
// 返回目录绝对地址
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
    return path.posix.join('static', _path);
}

module.exports = { resolve, assetsPath }