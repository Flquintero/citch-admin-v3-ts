const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  devServer: {
    // https: true,
    // disableHostCheck: true //to use with ngrok enabled
  },
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/assets/styles/main.scss')],
    },
  },
});
