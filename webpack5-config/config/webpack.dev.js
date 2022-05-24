const base = require("./webpack.base.js");
const {merge} = require("webpack-merge");

module.exports = merge(base, {
  // mode: development 未压缩 production 压缩
  mode: "development",

  devServer: {
    port: 3000,
    open: true,
  },
});
