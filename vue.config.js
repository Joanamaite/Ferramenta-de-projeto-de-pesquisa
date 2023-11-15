const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  devServer: {
    allowedHosts: 'all',
  },
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
  publicPath: '/',
  outputDir: 'dist',
});