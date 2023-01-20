const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ?'/eshop/'
  : '/',
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin({
        excludeAliases: ['console'],
      }),
    ],
  },
});
