/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');//webpack模块
const WebpackDevServer = require('webpack-dev-server');//webpack dev server，拥有实时加载特性的开发服务器
const config = require('./webpack.config');//根据env加载webpack.config.js
const open = require('open');//open a file or url in the user's preferred application

/**
 * Flag indicating whether webpack compiled for the first time.
 * @type {boolean}
 */
let isInitialCompilation = true;

const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer)//根据config启动server
.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
});

compiler.plugin('done', () => {
  if (isInitialCompilation) {
    // Ensures that we log after webpack printed its stats (is there a better way?)
    setTimeout(() => {
      console.log('\n✓ The bundle is now ready for serving!\n');
      console.log('  Open in iframe mode:\t\x1b[33m%s\x1b[0m',  'http://localhost:' + config.port + '/webpack-dev-server/');
      console.log('  Open in inline mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + config.port + '/\n');
      console.log('  \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes.')
    }, 350);
  }
  isInitialCompilation = false;
});
