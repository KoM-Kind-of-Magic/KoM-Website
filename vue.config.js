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
});

module.exports = {
  devServer: {
    allowedHosts: 'all',
    port: '80',
  },
};
