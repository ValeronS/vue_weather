const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  configureWebpack: {
    devtool: 'source-map',
  },
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/vue_weather/' : '/',
});
