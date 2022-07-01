const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: ['/Users/franciscoquintero/Documents/repositories/citch/citch-admin-v3-ts/src/assets/styles/main.scss'],
    },
  },
});
