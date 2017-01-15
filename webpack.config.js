'use strict';

const path = require('path');//node自带的库
const args = require('minimist')(process.argv.slice(2));//处理命令行参数的模块

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test'];//环境配置

// Set the correct environment
let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}//确定env
process.env.REACT_WEBPACK_ENV = env;//后面具体每个env的配置，依赖于这个值

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, 'cfg/' + validEnv));// 例如加载cfg/dev
  return config;
}

module.exports = buildConfig(env);
