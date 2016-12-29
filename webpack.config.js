'use strict';

const path = require('path');//node�Դ��Ŀ�
const args = require('minimist')(process.argv.slice(2));//���������в�����ģ��

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test'];//��������

// Set the correct environment
let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}//ȷ��env
process.env.REACT_WEBPACK_ENV = env;//�������ÿ��env�����ã����������ֵ

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, 'cfg/' + validEnv));// �������cfg/dev
  return config;
}

module.exports = buildConfig(env);