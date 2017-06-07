const ora = require('ora');
const exec = require('shelljs').exec;
const chalk = require('chalk');
var spinner = ora('代码上传中...');
function rel(project) {
	spinner.start();
	if(project) {
    	exec('ssh root@192.168.50.142 "rm -rf /home/fe/"' + project);
    	exec('scp -r ./dist root@192.168.50.142:/home/fe/' + project);
    }
    spinner.stop();
    console.log(chalk.red('上传成功.\n'));
}
function pre(project) {
	spinner.start();
	if(project) {
    	// exec('ssh root@192.168.50.142 "rm -rf /home/fe/"' + project);
    	// exec('scp -r ./dist root@192.168.50.142:/home/fe/' + project);
    }
    spinner.stop();
    console.log(chalk.red('上传成功.\n'));
}
module.exports = { rel, pre }
