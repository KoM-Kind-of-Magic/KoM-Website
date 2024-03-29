const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/global.scss";
        `,
      },
    },
  },
  devServer: {
    allowedHosts: 'all',
    port: '8080',
    host: 'localhost',
  },
});
