const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  chainWebpack: (config) => {
    config.module
      .rule("svg")
      .test(/\.svg$/)
      .use("svg-inline-loader")
      .loader("svg-inline-loader")
      .end();
  },
})
