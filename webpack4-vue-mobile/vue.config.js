module.exports = {
  devServer: {
    port: 3008,
    proxy: {
      "/music": {
        target: "https://c.y.qq.com/",
        pathRewrite: {
          "^/music/": "",
        },
      },
    },
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 37.5,
          }),
        ],
      },
    },
  },
};
