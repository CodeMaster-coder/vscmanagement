const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  assetsDir: 'static',
  transpileDependencies: true,
  productionSourceMap:false,
  publicPath: './',
  lintOnSave:false,
  devServer: {
    proxy: {
      '/glue/login': {
        target: 'https://www.liuke.xyz/glue/login',
        changeOrigin: true,
        pathRewrite: {
          '^/api1': '',
        },
      },
      '/electrode/login': {
        target: 'https://www.liuke.xyz/electrode/login',
        changeOrigin: true,
        pathRewrite: {
          '^/api2': '',
        },
      },
    },
  },
})

